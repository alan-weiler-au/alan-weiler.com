"use client"

import React, { useEffect, useId, useMemo, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"

type CinematicModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void

  title?: string
  description?: string

  children?: React.ReactNode
  footer?: React.ReactNode

  // behavior
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  showCloseButton?: boolean

  // styling
  className?: string
  widthClassName?: string // e.g. "w-[360px]"
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",")
  return Array.from(container.querySelectorAll<HTMLElement>(selectors))
    .filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"))
}

export default function CinematicModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className,
  widthClassName = "w-[340px] sm:w-[380px]",
}: CinematicModalProps) {
  const titleId = useId()
  const descId = useId()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)

  const labelledBy = useMemo(() => (title ? titleId : undefined), [title, titleId])
  const describedBy = useMemo(
    () => (description ? descId : undefined),
    [description, descId]
  )

  const close = () => onOpenChange(false)

  // Save last focused element, move focus into modal on open, restore on close
  useEffect(() => {
    if (!open) return

    lastActiveRef.current = document.activeElement as HTMLElement | null

    // focus first focusable element (or panel) after mount
    const t = window.setTimeout(() => {
      const focusables = getFocusableElements(panelRef.current)
      if (focusables.length > 0) focusables[0].focus()
      else panelRef.current?.focus()
    }, 0)

    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (open) return
    lastActiveRef.current?.focus?.()
  }, [open])

  // ESC to close
  useEffect(() => {
    if (!open || !closeOnEsc) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, closeOnEsc])

  // Basic tab trap
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const panel = panelRef.current
      const focusables = getFocusableElements(panel)
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      const active = document.activeElement as HTMLElement | null
      const isShift = e.shiftKey

      if (!isShift && active === last) {
        e.preventDefault()
        first.focus()
      } else if (isShift && active === first) {
        e.preventDefault()
        last.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={false}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            onClick={closeOnOverlayClick ? close : undefined}
          />

          {/* Panel wrapper */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              aria-describedby={describedBy}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={[
                "relative rounded-2xl border border-white/15 bg-bodyColor/95 shadow-2xl",
                "ring-1 ring-[var(--fx-color)]/10",
                widthClassName,
                "p-5 sm:p-6",
                className ?? "",
              ].join(" ")}
              onClick={(e) => e.stopPropagation()}
            >
              {showCloseButton && (
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-3 top-2 text-white/60 hover:text-[var(--fx-color)] text-2xl leading-none"
                  aria-label="Close dialog"
                >
                  ×
                </button>
              )}

              {(title || description) && (
                <div className="mb-4">
                  {title && (
                    <h2 id={titleId} className="text-lg font-semibold text-[var(--fx-color)]">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id={descId} className="mt-1 text-sm text-white/70">
                      {description}
                    </p>
                  )}
                </div>
              )}

              <div>{children}</div>

              {footer && <div className="mt-4">{footer}</div>}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}