export default function AnalysisResult({ analysis, error, history }) {
  return (
    <>
      {error && (
        <div className="w-full max-w-3xl bg-red-900/40 border border-red-500 text-red-300 rounded-2xl p-4 mb-6">
          {error}
        </div>
      )}

      {analysis && (
        <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-sm font-medium text-gray-400 mb-3">AI Analysis</h2>
          <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{analysis}</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="w-full max-w-3xl">
          <h2 className="text-sm font-medium text-gray-400 mb-3">Past Analyses</h2>
          <div className="flex flex-col gap-4">
            {history.map((item, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-6 shadow-lg">
                <p className="text-xs text-gray-500 mb-2">{item.timestamp}</p>
                <p className="text-gray-400 text-xs font-mono mb-3 truncate">Log: {item.log}</p>
                <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">{item.analysis}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}