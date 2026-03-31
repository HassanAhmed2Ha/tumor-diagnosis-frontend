import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- مكون تحليل التأثير (SHAP Visualizer) ---
const ShapVisualizer = ({ values, lang, labels }) => {
  const maxVal = Math.max(...values.map(Math.abs), 0.1); // تجنب القسمة على صفر
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-inner"
    >
      <h4 className="text-center text-teal-400 font-bold mb-6 tracking-widest uppercase text-xs">
        {lang === 'en' ? 'AI Decision Logic (Feature Impact)' : 'منطق قرار الذكاء الاصطناعي (تأثير الخصائص)'}
      </h4>
      
      <div className="space-y-5">
        {values.map((val, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between text-[10px] mb-1.5 px-1 font-medium">
              <span className="text-slate-400">{labels[index].label}</span>
              <span className={val > 0 ? 'text-rose-400' : 'text-emerald-400'} dir="ltr">
                {val > 0 ? '▲' : '▼'} {(Math.abs(val) * 100).toFixed(1)}%
              </span>
            </div>
            
            {/* بار الرسم البياني */}
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex items-center relative border border-slate-700/50">
              {/* خط المنتصف الصفرى */}
              <div className="absolute left-1/2 w-0.5 h-full bg-slate-600 z-10"></div>
              
              {/* العمود المتحرك */}
              <motion.div
                initial={{ width: 0, left: "50%" }}
                animate={{ 
                  width: `${(Math.abs(val) / maxVal) * 50}%`,
                  left: val > 0 ? "50%" : `${50 - (Math.abs(val) / maxVal) * 50}%`
                }}
                transition={{ duration: 1.2, ease: "circOut", delay: index * 0.1 }}
                className={`h-full rounded-full relative z-0 ${
                  val > 0 
                  ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
                  : 'bg-gradient-to-l from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
        <span>{lang === 'en' ? 'Reducing Risk' : 'تقليل احتمالية الإصابة'}</span>
        <span>{lang === 'en' ? 'Increasing Risk' : 'زيادة احتمالية الإصابة'}</span>
      </div>
    </motion.div>
  );
};

// --- المكون الرئيسي للتطبيق ---
const contentEn = {
  brand: "NeuroScan.AI",
  badge: "Research & Diagnostic Tool",
  langBtn: "AR",
  heroTitle: "Breast Cancer Classification Engine",
  heroDesc: "Analyze clinical cell nuclei features in real-time. Powered by Deep Learning and Explainable AI (SHAP).",
  inputsTitle: "Clinical Parameters",
  fields: [
    { id: 'worst_radius', label: 'Worst Radius', desc: 'Max cell nuclei radius' },
    { id: 'worst_texture', label: 'Worst Texture', desc: 'Max gray-scale variation' },
    { id: 'worst_concave_points', label: 'Worst Concave Pts', desc: 'Max concave contour points' },
    { id: 'worst_area', label: 'Worst Area', desc: 'Max cell area measured' },
    { id: 'worst_concavity', label: 'Worst Concavity', desc: 'Max severity of concave portions' }
  ],
  btnAnalyze: "Run Diagnostic Analysis",
  btnLoading: "AI is Thinking...",
  output: "Diagnostic Output",
  malignant: "Malignant",
  benign: "Benign",
  confidence: "Prediction Confidence",
  disclaimer: "For research use only. Not a medical substitute.",
  footer: "© 2026 NeuroScan AI | Developed by Hassan Ahmed"
};

const contentAr = {
  brand: "NeuroScan.AI",
  badge: "أداة بحث وتشخيص",
  langBtn: "EN",
  heroTitle: "محرك تصنيف أورام الثدي",
  heroDesc: "تحليل الخصائص السريرية لأنوية الخلايا لحظياً. مدعوم بالتعلم العميق والذكاء الاصطناعي التفسيري (SHAP).",
  inputsTitle: "المعلمات السريرية",
  fields: [
    { id: 'worst_radius', label: 'أقصى نصف قطر', desc: 'متوسط أكبر قيم لنصف قطر النواة' },
    { id: 'worst_texture', label: 'أقصى تباين للنسيج', desc: 'الانحراف المعياري لقيم التدرج الرمادي' },
    { id: 'worst_concave_points', label: 'أقصى نقاط مقعرة', desc: 'أقصى عدد للتعرجات في محيط النواة' },
    { id: 'worst_area', label: 'أقصى مساحة', desc: 'أكبر مساحة تم قياسها للخلية' },
    { id: 'worst_concavity', label: 'أقصى تقعر', desc: 'أقصى عمق للتعرجات في الغلاف النووي' }
  ],
  btnAnalyze: "بدء التحليل التشخيصي",
  btnLoading: "الذكاء الاصطناعي يفكر...",
  output: "نتيجة التشخيص",
  malignant: "خبيث (Malignant)",
  benign: "حميد (Benign)",
  confidence: "ثقة التنبؤ",
  disclaimer: "لأغراض البحث فقط. ليس بديلاً عن الاستشارة الطبية.",
  footer: "2026 NeuroScan AI | تم التطوير بواسطة حسن أحمد"
};

function App() {
  const [lang, setLang] = useState('en');
  const [content, setContent] = useState(contentEn);
  const [formData, setFormData] = useState({ worst_radius: '', worst_texture: '', worst_concave_points: '', worst_area: '', worst_concavity: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContent(lang === 'en' ? contentEn : contentAr);
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  }, [lang]);

  const analyzeData = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("Error connecting to AI Server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-lg shadow-teal-500/10">
            <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none">
              <path d="M25 35 L50 20 M25 35 L50 50 M25 65 L50 50 M25 65 L50 80 M50 20 L75 50 M50 50 L75 50 M50 80 L75 50" stroke="currentColor" strokeWidth="4" opacity="0.6"/>
              <circle cx="25" cy="35" r="7" fill="currentColor" /> <circle cx="25" cy="65" r="7" fill="currentColor" />
              <circle cx="50" cy="20" r="6" fill="#0f172a" stroke="currentColor" strokeWidth="2"/> <circle cx="50" cy="50" r="6" fill="#0f172a" stroke="currentColor" strokeWidth="2"/> <circle cx="50" cy="80" r="6" fill="#0f172a" stroke="currentColor" strokeWidth="2"/>
              <circle cx="75" cy="50" r="9" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-tighter italic">{content.brand}</h1>
        </div>
        <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-teal-400 font-bold hover:bg-slate-700 transition-colors text-xs">
          {content.langBtn}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <header className="mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-none uppercase">{content.heroTitle}</h2>
            <p className="text-slate-400 text-lg">{content.heroDesc}</p>
          </header>

          <form onSubmit={analyzeData} className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl backdrop-blur-sm">
            <h3 className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-4">{content.inputsTitle}</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {content.fields.map(f => (
                <div key={f.id} className="group">
                  <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block group-hover:text-teal-400 transition-colors">{f.label}</label>
                  <input
                    type="number" step="any" required
                    value={formData[f.id]}
                    onChange={e => setFormData({...formData, [f.id]: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0.00"
                  />
                </div>
              ))}
            </div>
            <button disabled={loading} className="w-full bg-teal-600 hover:bg-teal-500 py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg shadow-teal-900/20 transition-all active:scale-95 disabled:opacity-50">
              {loading ? content.btnLoading : content.btnAnalyze}
            </button>
          </form>
        </div>

        <aside className="sticky top-28">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-10">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-700">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                </div>
                <h4 className="font-bold text-slate-500 uppercase text-sm mb-2">{content.awaiting}</h4>
                <p className="text-slate-600 text-xs leading-relaxed max-w-[200px]">{content.awaitingDesc}</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[100px] rounded-full ${result.prediction === 'Malignant' ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}></div>
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-widest">{content.output}</div>
                  <h3 className={`text-5xl font-black mb-6 ${result.prediction === 'Malignant' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {result.prediction === 'Malignant' ? content.malignant : content.benign}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase"><span className="text-slate-500">{content.confidence}</span><span className="text-white">{(result.probability < 0.5 ? (1-result.probability)*100 : result.probability*100).toFixed(1)}%</span></div>
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(result.probability < 0.5 ? (1-result.probability)*100 : result.probability*100)}%` }} transition={{ duration: 1.5 }} className={`h-full ${result.prediction === 'Malignant' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    </div>
                  </div>
                  {/* دمج الـ SHAP هنا */}
                  <ShapVisualizer values={result.shap_values} lang={lang} labels={content.fields} />
                  <p className="mt-8 text-[10px] text-slate-600 italic border-t border-slate-800 pt-4">{content.disclaimer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>
      <footer className="py-10 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest border-t border-slate-900 mt-10">{content.footer}</footer>
    </div>
  );
}

export default App;
