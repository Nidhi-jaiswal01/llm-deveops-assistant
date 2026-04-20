export default function AnalysisResult({ analysis, error }) {
  return (
    <>
      {error && (
        <div className="w-full max-w-3xl bg-red-900/40 border border-red-500 text-red-300 rounded-2xl p-4 mb-6">
          {error}
        </div>
      )}

      {analysis && (
        <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-sm font-medium text-gray-400 mb-3">AI Analysis</h2>
          <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
            {analysis}
          </p>
        </div>
      )}
    </>
  )
}