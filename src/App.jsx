import React, { useState } from 'react';

const i18n = {
  en: {
    brand: "NeuroScan.AI",
    badge: "Research & Diagnostic Tool",
    heroTitle: "Breast Cancer Classification Engine",
    heroDesc: "Enter the clinical cell nuclei features below. Our deep learning model analyzes these parameters in real-time to assist in classifying tumors.",
    inputsTitle: "Clinical Inputs",
    worstRadius: "Worst Radius",
    worstTexture: "Worst Texture",
    worstConcavePts: "Worst Concave Pts",
    worstArea: "Worst Area",
    worstConcavity: "Worst Concavity",
    btnAnalyze: "Run Analysis",
    btnLoading: "Processing Data...",
    awaiting: "Awaiting Data",
    awaitingDesc: "Fill in the required fields and run the analysis to view the AI prediction here.",
    output: "Diagnostic Output",
    confidence: "AI Confidence Level",
    disclaimer: "Disclaimer: This tool is a demonstration of AI capabilities and is not a substitute for professional medical advice.",
    errorMsg: "Connection failed. Please check your backend status.",
    footer: "2026 NeuroScan AI. Developed by Hassan Ahmed for academic research.",
    langBtn: "AR",
    malignant: "Malignant",
    benign: "Benign"
  },
  ar: {
    brand: "NeuroScan.AI",
    badge: "Translate Badge Here",
    heroTitle: "Translate Title Here",
    heroDesc: "Translate Description Here",
    inputsTitle: "Translate Inputs Title Here",
    worstRadius: "Translate Radius Here",
    worstTexture: "Translate Texture Here",
    worstConcavePts: "Translate Concave Pts Here",
    worstArea: "Translate Area Here",
    worstConcavity: "Translate Concavity Here",
    btnAnalyze: "Translate Button Here",
    btnLoading: "Translate Loading Here",
    awaiting: "Translate Awaiting Here",
    awaitingDesc: "Translate Awaiting Desc Here",
    output: "Translate Output Here",
    confidence: "Translate Confidence Here",
    disclaimer: "Translate Disclaimer Here",
    errorMsg: "Translate Error Here",
    footer: "2026 NeuroScan AI. Developed by Hassan Ahmed",
    langBtn: "EN",
    malignant: "Translate Malignant Here",
    benign: "Translate Benign Here"
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const t = i18n[lang];

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

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

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

      if (!response.ok) throw new Error(t.errorMsg);
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceScore = (prediction, probability) => {
    const rawScore = prediction === 'Malignant' ? (1 - probability) : probability;
    return (rawScore * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-teal-500/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <h1 className="text-xl font-bold tracking-wide text-slate-100">{t.brand}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {t.badge}
            </div>
            <button 
              onClick={toggleLang}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-400 border border-slate-700 transition font-bold text-sm tracking-wider"
            >
              {t.langBtn}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
            {t.heroTitle}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            {t.heroDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7">
            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-slate-200 border-b border-slate-700 pb-4">
                {t.inputsTitle}
              </h3>
              
              <form onSubmit={analyzeData} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {[
                    { id: 'worst_radius', label: t.worstRadius },
                    { id: 'worst_texture', label: t.worstTexture },
                    { id: 'worst_concave_points', label: t.worstConcavePts },
                    { id: 'worst_area', label: t.worstArea },
                    { id: 'worst_concavity', label: t.worstConcavity }
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="text-sm font-semibold text-slate-300 block mb-1.5">
                        {field.label}
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
                          {t.btnLoading}
                        </>
                      ) : t.btnAnalyze}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {error && (
              <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 flex items-start gap-3">
                <div className="text-sm font-medium">{error}</div>
              </div>
            )}

            {!result && !error && (
              <div className="flex-1 bg-slate-800/30 border border-slate-700 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="text-slate-300 font-bold mb-2">{t.awaiting}</h4>
                <p className="text-slate-500 text-sm max-w-[250px]">
                  {t.awaitingDesc}
                </p>
              </div>
            )}

            {result && (
              <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full ${result.prediction === 'Malignant' ? 'bg-rose-500/30' : 'bg-emerald-500/30'}`}></div>

                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{t.output}</div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <h3 className={`text-4xl font-black ${result.prediction === 'Malignant' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {result.prediction === 'Malignant' ? t.malignant : t.benign}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{t.confidence}</span>
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
                      <span className="text-amber-500 font-semibold">تنبيه </span> {t.disclaimer}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-slate-800 text-slate-600 text-sm">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

export default App;
