import { useState } from "react"

export default function AnalysisResult({ analysis, error, history }) {
  const [copied, setCopied] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {error && (
        <div className="w-full max-w-3xl bg-red-900/40 border border-red-500 text-red-300 rounded-2xl p-4 mb-6">
          {error}
        </div>
      )}

      {analysis && (
        <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-medium text-gray-400">AI Analysis</h2>
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all duration-200"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{analysis}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="w-full max-w-3xl">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 text-sm font-medium transition-all duration-200 mb-4"
          >
            {showHistory ? "Hide Past Analyses" : `Show Past Analyses (${history.length})`}
          </button>

          {showHistory && (
            <div className="flex flex-col gap-4">
              {history.map((item, index) => (
                <div key={index} className="bg-gray-900 rounded-2xl p-6 shadow-lg">
                  <p className="text-xs text-gray-500 mb-2">{item.timestamp}</p>
                  <p className="text-gray-400 text-xs font-mono mb-3 truncate">Log: {item.log}</p>
                  <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{item.analysis}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}