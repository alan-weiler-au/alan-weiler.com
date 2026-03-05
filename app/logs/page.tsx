"use client"

import { useEffect, useState } from "react"

export default function LogsPage() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/logs")
      .then(res => res.json())
      .then(setLogs)
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-xl text-[var(--fx-color)] mb-4">
        System Logs
      </h1>

      <pre className="bg-black/50 p-4 overflow-auto">
        {JSON.stringify(logs, null, 2)}
      </pre>
    </div>
  )
}