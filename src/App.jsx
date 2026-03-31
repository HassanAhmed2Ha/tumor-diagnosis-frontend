import React, { useState } from 'react';

function App() {
  // 1. State for inputs
  const [formData, setFormData] = useState({
    worst_radius: '',
    worst_texture: '',
    worst_concave_points: '',
    worst_area: '',
    worst_concavity: ''
  });

  // 2. State for API response and loading
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Handling input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Function to call your Hugging Face API
  const analyzeData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://hassan2007-tumor-diagnosis-backend.hf.space/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worst_radius: parseFloat(formData.worst_radius),
          worst_texture: parseFloat(formData.worst_texture),
          worst_concave_points: parseFloat(formData.worst_concave_points),
          worst_area: parseFloat(formData.worst_area),
          worst_concavity: parseFloat(formData.worst_concavity)
        }),
      });

      if (!response.ok) throw new Error('Server Error');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Connection failed. Please check your backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <header className="py-6 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-500">NeuroScan AI</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-amber-500 transition">Dashboard</a>
            <a href="#" className="hover:text-amber-500 transition">History</a>
            <a href="#" className="hover:text-amber-500 transition">About AI Model</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            AI-Powered Tumor Analysis
          </h2>
          <p className="text-gray-400 text-lg">
            Enter the 5 clinical features to get a real-time diagnostic prediction using our trained Neural Network.
          </p>
        </div>

        {/* Diagnostic Form Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
          
          <form onSubmit={analyzeData} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'worst_radius', label: 'Worst Radius' },
                { id: 'worst_texture', label: 'Worst Texture' },
                { id: 'worst_concave_points', label: 'Worst Concave Points' },
                { id: 'worst_area', label: 'Worst Area' },
                { id: 'worst_concavity', label: 'Worst Concavity' }
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-300 block ml-1">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    step="any"
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-white"
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing with AI...' : 'Analyze & Get Result'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="mt-10 p-8 bg-gray-900 rounded-2xl border-2 border-amber-500 animate-pulse-subtle">
              <div className="flex flex-col items-center">
                <span className="text-gray-400 text-sm uppercase tracking-widest mb-2 font-bold">Prediction Result</span>
                <div className={`text-4xl font-black mb-4 ${result.prediction === 'Malignant' ? 'text-red-500' : 'text-emerald-500'}`}>
                  {result.prediction}
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 mb-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${result.prediction === 'Malignant' ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${(result.probability * 100).toFixed(1)}%` }}
                  ></div>
                </div>
                <p className="text-gray-300">
                  Confidence Score: <span className="font-bold text-white">{(result.probability * 100).toFixed(2)}%</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        &copy; 2026 NeuroScan AI. For research purposes only. Built by Hassan Ahmed.
      </footer>
    </div>
  );
}

export default App;
