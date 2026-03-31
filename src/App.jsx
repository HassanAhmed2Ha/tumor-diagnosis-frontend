import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Reveal = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
      {children}
    </div>
  )
}

const Tilt3D = ({ children, className = '' }) => {
  const ref = useRef(null)
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xRotation = -((y - rect.height / 2) / rect.height * 2)
    const yRotation = (x - rect.width / 2) / rect.width * 2
    ref.current.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
  }
  
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)'
  }
  
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transition-transform duration-200 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  )
}

const ShapVisualizer = ({ values, lang, labels }) => {
  const maxVal = Math.max(...values.map(Math.abs), 0.1)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-700 shadow-inner"
    >
      <h4 className="text-center text-teal-400 font-bold mb-6 tracking-widest uppercase text-xs">
        {lang === 'en' ? 'AI Decision Logic' : 'منطق قرار الذكاء الاصطناعي'}
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
  )
}

const contentEn = {
  brand: "NeuroScan AI",
  langBtn: "AR",
  heroTitle: "Breast Cancer Classification Engine",
  heroDesc: "Analyze clinical cell nuclei features in real-time Powered by Deep Learning and Explainable AI",
  inputsTitle: "Clinical Parameters",
  fields: [
    { id: 'worst_radius', label: 'Worst Radius' },
    { id: 'worst_texture', label: 'Worst Texture' },
    { id: 'worst_concave_points', label: 'Worst Concave Pts' },
    { id: 'worst_area', label: 'Worst Area' },
    { id: 'worst_concavity', label: 'Worst Concavity' }
  ],
  btnAnalyze: "Run Diagnostic Analysis",
  btnLoading: "AI is Thinking",
  output: "Diagnostic Output",
  malignant: "Malignant",
  benign: "Benign",
  confidence: "Prediction Confidence",
  disclaimer: "For research use only Not a medical substitute",
  aboutTitle: "How It Works",
  aboutDesc: "NeuroScan AI bridges the gap between deep learning and clinical trust We utilize a multi-layer Neural Network combined with SHAP to ensure every prediction is transparent and interpretable",
  contactTitle: "Developer Support",
  contactDesc: "Encountered a bug or have questions Feel free to reach out",
  emailLabel: "Email Support",
  githubLabel: "View Source Code",
  linkedinLabel: "Professional Network",
  footer: "2026 NeuroScan AI Developed by Hassan Ahmed"
}

const contentAr = {
  brand: "NeuroScan AI",
  langBtn: "EN",
  heroTitle: "محرك تصنيف أورام الثدي",
  heroDesc: "تحليل الخصائص السريرية لأنوية الخلايا لحظيا مدعوم بالتعلم العميق والذكاء الاصطناعي التفسيري",
  inputsTitle: "المعلمات السريرية",
  fields: [
    { id: 'worst_radius', label: 'أقصى نصف قطر' },
    { id: 'worst_texture', label: 'أقصى تباين للنسيج' },
    { id: 'worst_concave_points', label: 'أقصى نقاط مقعرة' },
    { id: 'worst_area', label: 'أقصى مساحة' },
    { id: 'worst_concavity', label: 'أقصى تقعر' }
  ],
  btnAnalyze: "بدء التحليل التشخيصي",
  btnLoading: "الذكاء الاصطناعي يفكر",
  output: "نتيجة التشخيص",
  malignant: "خبيث",
  benign: "حميد",
  confidence: "ثقة التنبؤ",
  disclaimer: "لأغراض البحث فقط ليس بديلا عن الاستشارة الطبية",
  aboutTitle: "كيف تعمل المنصة",
  aboutDesc: "تسد منصة نيورو سكان الفجوة بين التعلم العميق والثقة السريرية نستخدم شبكة عصبية متعددة الطبقات مع دمج تقنية شاب لضمان شفافية التنبؤ",
  contactTitle: "الدعم الفني والتواصل",
  contactDesc: "هل واجهت مشكلة تقنية او لديك استفسار لا تتردد في التواصل",
  emailLabel: "المراسلة عبر البريد",
  githubLabel: "الشيفرة المصدرية",
  linkedinLabel: "الشبكة المهنية",
  footer: "2026 NeuroScan AI تم التطوير بواسطة حسن أحمد"
}

function App() {
  const [lang, setLang] = useState('en')
  const [content, setContent] = useState(contentEn)
  const [formData, setFormData] = useState({ worst_radius: '', worst_texture: '', worst_concave_points: '', worst_area: '', worst_concavity: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setContent(lang === 'en' ? contentEn : contentAr)
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl'
  }, [lang])

  const analyzeData = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90
        return prev + Math.floor(Math.random() * 12) + 3
      })
    }, 150)

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
      })
      const data = await response.json()
      clearInterval(interval)
      setProgress(100)
      
      setTimeout(() => {
        setResult(data)
        setLoading(false)
      }, 500)
      
    } catch (err) {
      clearInterval(interval)
      setLoading(false)
      alert("Error connecting to AI Server")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30 relative overflow-hidden">
      
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
        <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-teal-400 font-bold hover:bg-slate-700 transition-colors text-xs">
          {content.langBtn}
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16 grid lg:grid-cols-2 gap-12 items-start relative z-10">
        <Reveal>
          <header className="mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-none uppercase">{content.heroTitle}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{content.heroDesc}</p>
          </header>

          <Tilt3D>
            <form onSubmit={analyzeData} className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
              <h3 className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-4">{content.inputsTitle}</h3>
              <div className="grid md:grid-cols-2 gap-5">
                {content.fields.map(f => (
                  <div key={f.id} className="group">
                    <label className="text-[11px] font-bold text-slate-500 uppercase mb-1 block group-hover:text-teal-400 transition-colors">{f.label}</label>
                    <input
                      type="number" step="any" required
                      dir="ltr"
                      value={formData[f.id]}
                      onChange={e => setFormData({...formData, [f.id]: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-left rtl:text-right"
                    />
                  </div>
                ))}
              </div>
              <button disabled={loading} className="w-full bg-teal-600 hover:bg-teal-500 py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg shadow-teal-900/20 transition-all active:scale-95 disabled:opacity-50">
                {loading ? content.btnLoading : content.btnAnalyze}
              </button>
            </form>
          </Tilt3D>
        </Reveal>

        <aside className="lg:sticky top-28">
          <AnimatePresence mode="wait">
            {!result && !loading ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-[400px] border-2 border-dashed border-slate-800/80 bg-slate-900/30 rounded-3xl flex flex-col items-center justify-center text-center p-10 backdrop-blur-sm">
                <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center mb-4 text-slate-700 border border-slate-800">
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                </div>
              </motion.div>
            ) : loading ? (
              <motion.div key="loading" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="h-[400px] border border-slate-700 bg-slate-900/80 rounded-3xl flex flex-col items-center justify-center text-center p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.8)] z-0" />
                <div className="relative z-10 w-full max-w-xs flex flex-col items-center">
                  <div className="text-[10px] font-bold uppercase text-teal-400 mb-4 tracking-widest">
                    {lang === 'en' ? 'Scanning Clinical Parameters' : 'جاري فحص المعلمات السريرية'}
                  </div>
                  <div className="text-6xl font-black text-white mb-8 font-mono tracking-tighter">
                    {progress}%
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <motion.div className="h-full bg-gradient-to-r from-teal-600 to-teal-400" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Tilt3D className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
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
                </Tilt3D>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      <Reveal className="max-w-6xl mx-auto px-6 py-16 relative z-10 border-t border-slate-900">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wide flex items-center gap-3">
            <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
            {content.aboutTitle}
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            {content.aboutDesc}
          </p>
        </div>
      </Reveal>

      <Reveal className="max-w-6xl mx-auto px-6 py-16 relative z-10 border-t border-slate-900 bg-slate-900/20">
        <div className="mb-10 text-center md:text-start">
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">{content.contactTitle}</h2>
          <p className="text-slate-400 text-sm max-w-xl">{content.contactDesc}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <Tilt3D>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-start gap-4 h-full">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{content.emailLabel}</div>
              <div className="text-sm font-medium text-slate-200">hassanahmed07e9@gmailcom</div>
            </div>
          </Tilt3D>
          <Tilt3D>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-start gap-4 h-full">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{content.linkedinLabel}</div>
              <div className="text-sm font-medium text-slate-200">hassanahmed2007</div>
            </div>
          </Tilt3D>
          <Tilt3D>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-start gap-4 h-full">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{content.githubLabel}</div>
              <div className="text-sm font-medium text-slate-200">HassanAhmed2Ha</div>
            </div>
          </Tilt3D>
        </div>
      </Reveal>

      <footer className="py-8 text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest border-t border-slate-900 bg-slate-950 relative z-10">
        {content.footer}
      </footer>
    </div>
  )
}

export default App
