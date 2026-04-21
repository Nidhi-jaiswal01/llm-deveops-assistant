import { useState } from "react"
import Header from "./components/Header"
import LogInput from "./components/LogInput"
import AnalysisResult from "./components/AnalysisResult"

export default function App() {
  const [log, setLog] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeLog = async () => {
    if (!log.trim()) return
    setLoading(true)
    setAnalysis("")
    setError("")

    try {
      const response = await fetch("https://nidhi1531-llm-deveops-backend.hf.space/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ log }),
      })
      if (!response.ok) throw new Error("Server error")
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError("Something went wrong. Make sure your backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-16 px-4">
      <Header />
      <LogInput log={log} setLog={setLog} onAnalyze={analyzeLog} loading={loading} />
      <AnalysisResult analysis={analysis} error={error} />
    </div>
  )
}