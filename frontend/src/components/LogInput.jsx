export default function LogInput({ log, setLog, onAnalyze, loading }) {
  return (
    <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-6 shadow-lg mb-6">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Paste your build log here
      </label>
      <textarea
        className="w-full h-52 bg-gray-800 text-gray-100 text-sm font-mono rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="ERROR: ModuleNotFoundError: No module named 'requests'..."
        value={log}
        onChange={(e) => setLog(e.target.value)}
      />
      <button
        onClick={onAnalyze}
        disabled={loading || !log.trim()}
        className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-white transition-all duration-200"
      >
        {loading ? "Analyzing..." : "Analyze Log"}
      </button>
    </div>
  )
}