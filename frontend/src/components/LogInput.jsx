export default function LogInput({ log, setLog, onAnalyze, loading }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => setLog(event.target.result)
    reader.readAsText(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => setLog(event.target.result)
    reader.readAsText(file)
  }

  return (
    <div className="w-full max-w-3xl bg-gray-900 rounded-2xl p-6 shadow-lg mb-6">
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Paste your build log here or upload a file
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-700 rounded-xl p-3 mb-3 text-center text-gray-500 text-sm hover:border-blue-500 transition-colors cursor-pointer"
        onClick={() => document.getElementById('fileInput').click()}
      >
        drag & drop a .log file here or click to browse
        <input
          id="fileInput"
          type="file"
          accept=".log,.txt"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

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