import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    worst_radius: '',
    worst_texture: '',
    worst_concave_points: '',
    worst_area: '',
    worst_concavity: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  // Calculate true confidence based on prediction
  const getConfidenceScore = (prediction, probability) => {
    const rawScore = prediction === 'Malignant' ? (1 - probability) : probability;
    return (rawScore * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-teal-500/30">
      
      {/* Navbar - Clean and Purposeful */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-slate-900 shadow-[0_0_15px_rgba(20,184,166,0.4)]">
              N
            </div>
            <h1 className="text-xl font-bold tracking-wide text-slate-100">NeuroScan<span className="text-teal-500">.AI</span></h1>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            Research & Diagnostic Tool
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
            Breast Cancer Classification Engine
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Enter the clinical cell nuclei features below. Our deep learning model analyzes these parameters in real-time to assist in classifying tumors as Benign or Malignant.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-slate-200 border-b border-slate-700 pb-4">
                Clinical Inputs
              </h3>
              
              <form onSubmit={analyzeData} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {[
                    { id: 'worst_radius', label: 'Worst Radius', desc: 'Mean of distances from center to points on perimeter' },
                    { id: 'worst_texture', label: 'Worst Texture', desc: 'Standard deviation of gray-scale values' },
                    { id: 'worst_concave_points', label: 'Worst Concave Pts', desc: 'Number of concave portions of the contour' },
                    { id: 'worst_area', label: 'Worst Area', desc: 'Total cellular area' },
                    { id: 'worst_concavity', label: 'Worst Concavity', desc: 'Severity of concave portions' }
                  ].map((field) => (
                    <div key={field.id} className="group">
                      <label className="text-sm font-semibold text-slate-300 block mb-1.5 flex justify-between items-baseline">
                        {field.label}
                        <span className="text-[10px] text-slate-500 font-normal opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline-block">
                          {field.desc}
                        </span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all shadow-inner"
                        required
                      />
                    </div>
                  ))}

                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative group overflow-hidden rounded-xl bg-teal-600 px-6 py-4 font-bold text-white shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all hover:bg-teal-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Data...
                        </>
                      ) : 'Run Analysis'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Error State */}
            {error && (
              <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 flex items-start gap-3">
                <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm font-medium">{error}</div>
              </div>
            )}

            {/* Empty State / Instruction */}
            {!result && !error && (
              <div className="flex-1 bg-slate-800/30 border border-slate-700 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="text-slate-300 font-bold mb-2">Awaiting Data</h4>
                <p className="text-slate-500 text-sm max-w-[250px]">
                  Fill in the required fields and run the analysis to view the AI prediction here.
                </p>
              </div>
            )}

            {/* Result State */}
            {result && (
              <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Result Background Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full ${result.prediction === 'Malignant' ? 'bg-rose-500/30' : 'bg-emerald-500/30'}`}></div>

                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Diagnostic Output</div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <h3 className={`text-4xl font-black ${result.prediction === 'Malignant' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {result.prediction}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">AI Confidence Level</span>
                      <span className="text-white font-bold">{getConfidenceScore(result.prediction, result.probability)}%</span>
                    </div>
                    
                    <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
                      <div 
                        className={`h-full transition-all duration-1500 ease-out rounded-full ${result.prediction === 'Malignant' ? 'bg-gradient-to-r from-rose-600 to-rose-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}
                        style={{ width: `${getConfidenceScore(result.prediction, result.probability)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <span className="text-amber-500 font-semibold">Disclaimer:</span> This tool is a demonstration of AI capabilities and is not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-slate-800 text-slate-600 text-sm">
        <p>&copy; 2026 NeuroScan AI. Developed by Hassan Ahmed for academic research.</p>
      </footer>
    </div>
  );
}

export default App;
