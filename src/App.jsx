import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- مكون تحليل التأثير (SHAP Visualizer) ---
const ShapVisualizer = ({ values, lang, labels }) => {
  const maxVal = Math.max(...values.map(Math.abs), 0.1); 
  
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
            
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex items-center relative border border-slate-700/50">
              <div className="absolute left-1/2 w-0.5 h-full bg-slate-600 z-10"></div>
              
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

// --- المحتوى النصي للغتين ---
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
  
  // نصوص الأقسام الجديدة
  aboutTitle: "How It Works",
  aboutDesc: "NeuroScan AI bridges the gap between deep learning and clinical trust. We utilize a multi-layer Neural Network trained on the Wisconsin Diagnostic dataset, combined with SHAP (SHapley Additive exPlanations) to ensure every prediction is transparent, interpretable, and mathematically justified.",
  contactTitle: "Developer & Technical Support",
  contactDesc: "Encountered a bug or have questions about the methodology? Feel free to reach out or contribute to the open-source repository.",
  emailLabel: "Email Support",
  githubLabel: "View Source Code",
  linkedinLabel: "Professional Network",
  
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
  
  // نصوص الأقسام الجديدة
  aboutTitle: "كيف تعمل المنصة؟",
  aboutDesc: "تسد منصة NeuroScan AI الفجوة بين التعلم العميق والثقة السريرية. نستخدم شبكة عصبية متعددة الطبقات مدربة على بيانات ويسكونسن التشخيصية، مع دمج تقنية SHAP لضمان أن كل تنبؤ شفاف، قابل للتفسير، ومبرر رياضياً.",
  contactTitle: "الدعم الفني والتواصل",
  contactDesc: "هل واجهت مشكلة تقنية أو لديك استفسار حول المنهجية؟ لا تتردد في التواصل معي أو المساهمة في المستودع مفتوح المصدر.",
  emailLabel: "المراسلة عبر البريد",
  githubLabel: "الشيفرة المصدرية",
  linkedinLabel: "الشبكة المهنية",

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
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30 relative overflow-hidden">
      
      {/* تأثيرات الإضاءة في الخلفية (Ambient Background) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-teal-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-emerald-900/10 blur-[100px]"></div>
      </div>

      <nav className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center relative">
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
        <div className="flex items-center gap-4">
          <a href="#support" className="text-xs font-bold text-slate-400 hover:text-teal-400 transition-colors hidden sm:block uppercase tracking-widest">
            {lang === 'en' ? 'Support' : 'الدعم الفني'}
          </a>
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-teal-400 font-bold hover:bg-slate-700 transition-colors text-xs">
            {content.langBtn}
          </button>
        </div>
      </nav>

      {/* القسم الأول: الأداة الرئيسية */}
      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-12 items-start relative z-10">
        <div>
          <header className="mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-none uppercase">{content.heroTitle}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{content.heroDesc}</p>
          </header>

          <form onSubmit={analyzeData} className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
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
            <button disabled={loading} className="w-full bg-teal-600 hover:bg-teal-500 py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg shadow-teal-900/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              )}
              {loading ? content.btnLoading : content.btnAnalyze}
            </button>
          </form>
        </div>

        <aside className="lg:sticky top-28">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] border-2 border-dashed border-slate-800/80 bg-slate-900/30 rounded-3xl flex flex-col items-center justify-center text-center p-10 backdrop-blur-sm">
                <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mb-4 text-slate-700 border border-slate-800">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                </div>
                <h4 className="font-bold text-slate-500 uppercase text-sm mb-2">{content.awaiting}</h4>
                <p className="text-slate-600 text-xs leading-relaxed max-w-[200px]">{content.awaitingDesc}</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[100px] rounded-full ${result.prediction === 'Malignant' ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}></div>
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-2 tracking-widest">{content.output}</div>
                  <h3 className={`text-5xl font-black mb-6 ${result.prediction === 'Malignant' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {result.prediction === 'Malignant' ? content.malignant : content.benign}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase"><span className="text-slate-400">{content.confidence}</span><span className="text-white">{(result.probability < 0.5 ? (1-result.probability)*100 : result.probability*100).toFixed(1)}%</span></div>
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700/50">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(result.probability < 0.5 ? (1-result.probability)*100 : result.probability*100)}%` }} transition={{ duration: 1.5 }} className={`h-full ${result.prediction === 'Malignant' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    </div>
                  </div>
                  <ShapVisualizer values={result.shap_values} lang={lang} labels={content.fields} />
                  <p className="mt-8 text-[10px] text-slate-500 italic border-t border-slate-800 pt-4">{content.disclaimer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      {/* القسم الثاني: كيف يعمل (About) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-16 relative z-10 border-t border-slate-900"
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
            <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
            {content.aboutTitle}
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            {content.aboutDesc}
          </p>
        </div>
      </motion.section>

      {/* القسم الثالث: الدعم والتواصل (Support & Contact) */}
      <motion.section 
        id="support"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-16 relative z-10 border-t border-slate-900 bg-slate-900/20"
      >
        <div className="mb-10 text-center md:text-start">
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">{content.contactTitle}</h2>
          <p className="text-slate-400 text-sm max-w-xl">{content.contactDesc}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* Email Card */}
          <a href="mailto:hassanahmed07.e9@gmail.com" className="group p-5 bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl transition-all hover:bg-slate-800/80 flex flex-col items-center sm:items-start text-center sm:text-start gap-4">
            <div className="w-12 h-12 bg-slate-950 text-slate-300 group-hover:text-teal-400 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{content.emailLabel}</div>
              <div className="text-sm font-medium text-slate-200">hassanahmed07.e9@gmail.com</div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a href="https://linkedin.com/in/hassan-ahmed2007" target="_blank" rel="noreferrer" className="group p-5 bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition-all hover:bg-slate-800/80 flex flex-col items-center sm:items-start text-center sm:text-start gap-4">
            <div className="w-12 h-12 bg-slate-950 text-slate-300 group-hover:text-blue-400 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{content.linkedinLabel}</div>
              <div className="text-sm font-medium text-slate-200">hassan-ahmed2007</div>
            </div>
          </a>

          {/* GitHub Card */}
          <a href="https://github.com/HassanAhmed2Ha" target="_blank" rel="noreferrer" className="group p-5 bg-slate-900 border border-slate-800 hover:border-slate-400/50 rounded-2xl transition-all hover:bg-slate-800/80 flex flex-col items-center sm:items-start text-center sm:text-start gap-4">
            <div className="w-12 h-12 bg-slate-950 text-slate-300 group-hover:text-white rounded-full flex items-center justify-center transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{content.githubLabel}</div>
              <div className="text-sm font-medium text-slate-200">HassanAhmed2Ha</div>
            </div>
          </a>
        </div>
      </motion.section>

      {/* الفوتر */}
      <footer className="py-8 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest border-t border-slate-900 bg-slate-950 relative z-10">
        {content.footer}
      </footer>
    </div>
  );
}

export default App;
