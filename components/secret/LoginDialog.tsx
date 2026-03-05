"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CinematicModal from "@/components/ui/CinematicModal"

type LoginDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function LoginDialog({ open, setOpen }: LoginDialogProps) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const close = () => {
    setOpen(false)
    setPassword("")
    setError("")
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      close()
      router.push("/logs")
    } else {
      setError("Access denied")
    }
  }

  return (
    <CinematicModal
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : close())}
      title="Authentication Required"
      description="Follow the white rabbit."
      closeOnOverlayClick
      closeOnEsc
      showCloseButton
      footer={
        <div className="flex gap-2">
          <button
            type="submit"
            form="login-form"
            className="flex-1 rounded-xl border border-[var(--fx-color)] text-[var(--fx-color)] py-2
                       hover:bg-[var(--fx-color)] hover:text-black transition-[background-color,color,border-color]"
          >
            Enter
          </button>

          <button
            type="button"
            onClick={close}
            className="flex-1 rounded-xl border border-white/15 text-white/70 py-2 hover:border-white/35 transition"
          >
            Cancel
          </button>
        </div>
      }
    >
      <form id="login-form" onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl bg-transparent border border-white/15 px-3 py-2
                     outline-none focus:border-[var(--fx-color)] transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        {error && <div className="mt-2 text-red-400 text-sm">{error}</div>}
      </form>
    </CinematicModal>
  )
}