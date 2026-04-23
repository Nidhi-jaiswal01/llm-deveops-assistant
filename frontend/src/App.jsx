import { useState, useEffect } from "react"
import Header from "./components/Header"
import LogInput from "./components/LogInput"
import AnalysisResult from "./components/AnalysisResult"
import { supabase } from "./supabase"

export default function App() {
  const [log, setLog] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (!error && data) {
      setHistory(data.map(item => ({
        log: item.log.slice(0, 80),
        analysis: item.analysis,
        timestamp: new Date(item.created_at).toLocaleString()
      })))
    }
  }

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

      await supabase.from("analyses").insert({
        log: log,
        analysis: data.analysis
      })

      fetchHistory()

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
      <AnalysisResult analysis={analysis} error={error} history={history} />
    </div>
  )
}