import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Utensils, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  Globe
} from 'lucide-react';

const MESSAGES = {
  en: {
    pageTitle: "Is Chachapoyas for you? Free trip briefing | Hotel Chachapoyas, Chachapoyas",
    metaDesc: "Take the free 90-second quiz and get a personalized 72-hour Chachapoyas briefing — local logistics, food, hikes, and safety from Hotel Chachapoyas, three blocks from the Plaza de Armas.",
    title: "Is Chachapoyas for you?",
    subtitle: "Take the 90-second quiz. Get a trip briefing written by people who live three blocks from the Plaza de Armas.",
    microcopy: "Bilingual · Free PDF + future video series · We email about once a month · GDPR-clean.",
    cta_start: "Start the quiz",
    partnership: "Local guide by Hotel Chachapoyas. Stay reliability by Casa Dina.",
    reviews: [
      "\"The most beautiful courtyard in Chachapoyas. Felt like home.\"",
      "\"Steps from the Plaza, but perfectly quiet. The staff knows every trail.\"",
      "\"High-speed Wi-Fi in a colonial house? They actually delivered.\""
    ],
    bullets: [
      { icon: 'itinerary', text: "Personalized 72-hour itinerary" },
      { icon: 'logistics', text: "Kueláp + Gocta logistics with current entry fees" },
      { icon: 'food', text: "Food + workspace map (depends on your track)" },
      { icon: 'safety', text: "Safety + nighttime intel for solo travelers" }
    ],
    footer: "Jr. Grau 940, Chachapoyas 01001, Perú · reservas@hotelchachapoyas.com",
    gdpr_footer: "GDPR · We email about once a month · Unsubscribe in one click.",
    quiz_progress: "Question",
    quiz_next: "Next",
    quiz_back: "Back",
    result_title: {
      cultural: "You're a Cultural Explorer.",
      adventurer: "You're an Adventurer.",
      solo: "You're a Solo Traveler.",
      working: "You're on a Working Stay."
    },
    result_desc: {
      cultural: "You value history, local flavors, and the rhythm of the city. Your briefing focuses on colonial secrets and market finds.",
      adventurer: "You're here for the heights and the falls. Your briefing covers trail conditions and the best early-start logistics.",
      solo: "You seek independence and safety. Your briefing includes social spots and secure nighttime navigation.",
      working: "You need to stay connected while you explore. Your briefing maps the best desks and quietest coffee corners."
    },
    form_label_email: "Where should we send your briefing?",
    form_label_month: "Trip month",
    form_placeholder: "your@email.com",
    form_button: "Send me my briefing",
    form_success: "Check your inbox. Your briefing is on its way.",
    form_consent: "By submitting you agree to receive about one email per month from Hotel Chachapoyas. Unsubscribe any time.",
    hero_alt: "The central courtyard of Hotel Chachapoyas at golden hour, three blocks from the Plaza de Armas in Chachapoyas."
  },
  es: {
    pageTitle: "¿Chachapoyas es para ti? Guía de viaje gratis | Hotel Chachapoyas, Chachapoyas",
    metaDesc: "Haz el quiz gratuito de 90 segundos y recibe una guía personalizada de 72 horas en Chachapoyas — logística local, comida, caminatas y seguridad por Hotel Chachapoyas, a tres cuadras de la Plaza de Armas.",
    title: "¿Chachapoyas es para ti?",
    subtitle: "Haz el quiz de 90 segundos. Recibe una guía de viaje escrita por gente que vive a tres cuadras de la Plaza de Armas.",
    microcopy: "Bilingüe · PDF gratuito + futura serie de video · Te escribimos una vez al mes · Cumple con el RGPD.",
    cta_start: "Empezar el quiz",
    partnership: "Guía local por Hotel Chachapoyas. Estadía confiable por Casa Dina.",
    reviews: [
      "\"El patio más hermoso de Chachapoyas. Se siente como en casa.\"",
      "\"A pasos de la Plaza, pero perfectamente silencioso. El staff conoce cada ruta.\"",
      "\"¿Wi-Fi de alta velocidad en una casa colonial? Realmente cumplieron.\""
    ],
    bullets: [
      { icon: 'itinerary', text: "Itinerario personalizado para 72 horas" },
      { icon: 'logistics', text: "Logística para Kueláp + Gocta con tarifas actuales" },
      { icon: 'food', text: "Mapa de comida + espacios de trabajo (según tu perfil)" },
      { icon: 'safety', text: "Información de seguridad nocturna para viajeros solos" }
    ],
    footer: "Jr. Grau 940, Chachapoyas 01001, Perú · reservas@hotelchachapoyas.com",
    gdpr_footer: "RGPD · Te escribimos una vez al mes · Descríbete en un clic.",
    quiz_progress: "Pregunta",
    quiz_next: "Siguiente",
    quiz_back: "Atrás",
    result_title: {
      cultural: "Eres un explorador cultural.",
      adventurer: "Eres un aventurero.",
      solo: "Eres un viajero solo.",
      working: "Estás en una estadía de trabajo."
    },
    result_desc: {
      cultural: "Valoras la historia, los sabores locales y el ritmo de la ciudad. Tu guía se enfoca en secretos coloniales y el mercado.",
      adventurer: "Vienes por las alturas y las cataratas. Tu guía cubre el estado de rutas y logística de salida temprana.",
      solo: "Buscas independencia y seguridad. Tu guía incluye puntos de encuentro social y navegación nocturna segura.",
      working: "Necesitas estar conectado mientras exploras. Tu guía mapea los mejores escritorios y rincones tranquilos."
    },
    form_label_email: "¿A dónde enviamos tu guía?",
    form_label_month: "Mes del viaje",
    form_placeholder: "tu@email.com",
    form_button: "Envíame mi guía",
    form_success: "Revisa tu bandeja. Tu guía va en camino.",
    form_consent: "Al enviar aceptas recibir un correo mensual de Hotel Chachapoyas. Descríbete cuando quieras.",
    hero_alt: "El patio central del Hotel Chachapoyas al atardecer, a tres cuadras de la Plaza de Armas en Chachapoyas."
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    en: "How do you like to travel?",
    es: "¿Cómo te gusta viajar?",
    options: [
      { en: "Slowly. Markets, food, time to wander.", es: "Lento. Mercados, comida, tiempo para pasear.", value: "cultural" },
      { en: "Active. Hikes, viewpoints, big days.", es: "Activo. Caminatas, miradores, días intensos.", value: "adventurer" },
      { en: "Solo, at my own pace, eyes open.", es: "Solo, a mi ritmo, con ojos abiertos.", value: "solo" },
      { en: "With work. I need a desk and good Wi-Fi.", es: "Con trabajo. Necesito escritorio y buen Wi-Fi.", value: "working" }
    ]
  },
  {
    id: 2,
    en: "Who's coming?",
    es: "¿Quién viene contigo?",
    options: [
      { en: "Just me.", es: "Solo yo.", value: "solo" },
      { en: "Couple.", es: "En pareja.", value: "cultural" },
      { en: "Friends or family group.", es: "Amigos o familia.", value: "cultural" },
      { en: "It's a work trip / extended stay.", es: "Viaje de trabajo / estadía larga.", value: "working" }
    ]
  },
  {
    id: 3, 
    en: "Top of the list?",
    es: "¿Qué es lo primero en tu lista?",
    options: [
      { en: "Kueláp and Gocta.", es: "Kueláp y Gocta.", value: "adventurer" },
      { en: "Colonial architecture, courtyards, history.", es: "Arquitectura colonial, patios e historia.", value: "cultural" },
      { en: "Local food and markets.", es: "Comida local y mercados.", value: "cultural" },
      { en: "A quiet, reliable base to work from.", es: "Una base tranquila y confiable para trabajar.", value: "working" }
    ]
  },
  {
    id: 4,
    en: "What concerns you most?",
    es: "¿Qué es lo que más te preocupa?",
    options: [
      { en: "Whether it's safe at night, alone.", es: "Si es seguro de noche, estando solo.", value: "solo" },
      { en: "Whether the Wi-Fi will hold up.", es: "Si el Wi-Fi aguantará.", value: "working" },
      { en: "Whether I'll find food worth flying for.", es: "Si encontraré comida que valga el viaje.", value: "cultural" },
      { en: "Whether the hikes are within my fitness.", es: "Si las rutas están a mi nivel físico.", value: "adventurer" }
    ]
  },
  {
    id: 5,
    en: "When are you going?",
    es: "¿Cuándo tienes pensado ir?",
    options: [
      { en: "Within 8 weeks.", es: "En las próximas 8 semanas.", value: "imminent" },
      { en: "2 to 6 months out.", es: "En 2 a 6 meses.", value: "researching" },
      { en: "No dates yet, just exploring.", es: "Sin fecha aún, solo explorando.", value: "wanderer" }
    ]
  }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('landing'); 
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState('');
  const [tripMonth, setTripMonth] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = MESSAGES[lang];

  useEffect(() => {
    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", t.metaDesc);
    }
  }, [lang, t]);

  const result = useMemo(() => {
    if (answers.length < 4) return null;
    const trackVotes = { cultural: 0, adventurer: 0, solo: 0, working: 0 };
    answers.slice(0, 4).forEach(a => {
      if (trackVotes[a.value] !== undefined) trackVotes[a.value]++;
    });

    let winningTrack = null;
    let maxVotes = -1;
    let isTie = false;

    for (const [track, votes] of Object.entries(trackVotes)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        winningTrack = track;
        isTie = false;
      } else if (votes === maxVotes) {
        isTie = true;
      }
    }

    if (isTie) {
      // Q3 is the tie-breaker
      winningTrack = answers[2].value;
    }

    return winningTrack;
  }, [answers]);

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
    
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setView('result');
      window.scrollTo(0, 0);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("LEAD CAPTURED:", { 
      email, 
      tripMonth,
      track: result, 
      language: lang,
    });
    setSubmitted(true);
  };

  const Header = () => (
    <header className="flex justify-between items-center px-6 py-4 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="font-serif font-bold text-[#3C3A36] text-lg">Hotel Chachapoyas</span>
        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Asociado Casa Dina</span>
      </div>
      <button 
        onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        className="text-xs font-bold tracking-tighter text-[#3C3A36] hover:underline cursor-pointer flex items-center gap-1"
      >
        <Globe size={14} />
        {lang === 'en' ? 'EN | ES' : 'ES | EN'}
      </button>
    </header>
  );

  const PartnershipStrip = () => (
    <div className="bg-[#F5EFE6] border-y border-stone-200 py-6 my-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        <p className="text-sm font-medium text-[#3C3A36] italic">
          {t.partnership}
        </p>
        <div className="flex items-center gap-2 opacity-70 grayscale">
          <div className="bg-stone-400 text-white text-[10px] px-2 py-1 font-bold rounded" role="img" aria-label="Casa Dina Logo">CASA DINA</div>
        </div>
      </div>
    </div>
  );

  if (view === 'quiz') {
    const q = QUIZ_QUESTIONS[step];
    return (
      <div className="min-h-screen bg-[#F5EFE6] text-[#3C3A36] flex flex-col items-center">
        <Header />
        <main className="max-w-3xl w-full px-6 py-12 flex-1">
          <div className="flex gap-2 mb-12 justify-center">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-2 rounded-full transition-colors ${i <= step ? 'bg-[#1F4E5F]' : 'bg-stone-300'}`}
              ></div>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-150">
            <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
              {q[lang]}
            </h2>
            <div className="grid gap-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="w-full text-left p-4 rounded-xl border-2 border-stone-200 bg-white hover:border-[#B85C3D] hover:bg-stone-50 transition-all text-sm font-medium flex items-center justify-between group"
                >
                  {opt[lang]}
                  <ChevronRight size={18} className="text-stone-300 group-hover:text-[#B85C3D]" />
                </button>
              ))}
            </div>
          </div>
          
          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="mt-8 flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 mx-auto"
            >
              <ArrowLeft size={14} /> {t.quiz_back}
            </button>
          )}
        </main>
      </div>
    );
  }

  if (view === 'result') {
    return (
      <div className="min-h-screen bg-[#F5EFE6] text-[#3C3A36]">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-[#1F4E5F]">
              {t.result_title[result]}
            </h2>
            <p className="text-lg leading-relaxed text-stone-600">
              {t.result_desc[result]}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200 border border-stone-100 mb-8">
            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-stone-400">
                    {t.form_label_email}
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder={t.form_placeholder}
                    className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E5F]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-stone-400">
                    {t.form_label_month}
                  </label>
                  <select 
                    required
                    className="w-full p-4 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#1F4E5F] text-[#3C3A36]"
                    value={tripMonth}
                    onChange={(e) => setTripMonth(e.target.value)}
                  >
                    <option value="" disabled>{lang === 'en' ? 'Select an option...' : 'Selecciona una opción...'}</option>
                    <option value="Within 8 weeks">{lang === 'en' ? 'Within 8 weeks' : 'En menos de 8 semanas'}</option>
                    <option value="2-3 months">{lang === 'en' ? '2–3 months' : '2 a 3 meses'}</option>
                    <option value="4-6 months">{lang === 'en' ? '4–6 months' : '4 a 6 meses'}</option>
                    <option value="Later">{lang === 'en' ? 'Later' : 'Más adelante'}</option>
                    <option value="Not sure">{lang === 'en' ? 'Not sure' : 'No estoy seguro'}</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#1F4E5F] text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-[#163a47] transition-all flex items-center justify-center gap-2"
                >
                  {t.form_button} <ChevronRight size={20} />
                </button>
                <p className="text-[10px] text-center text-stone-400 leading-tight">
                  {t.form_consent}
                </p>
              </form>
            ) : (
              <div className="text-center py-8 animate-in zoom-in-95 duration-500">
                <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.form_success}</h3>
                <p className="text-sm text-stone-500 mb-8">
                  {lang === 'en' ? 'While you wait — meet Chachapoyas in 60 seconds:' : 'Mientras esperas — conoce Chachapoyas en 60 segundos:'}
                </p>
                <a 
                  href="https://youtube.com/@hotelchachapoyas" 
                  className="text-[#1F4E5F] font-bold border-b-2 border-[#1F4E5F] pb-1 hover:text-[#163a47]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chachapoyas Stories →
                </a>
              </div>
            )}
          </div>
          {submitted && <PartnershipStrip />}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#3C3A36]">
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight tracking-tight">
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 mb-6 leading-relaxed">
          {t.subtitle}
        </p>
        <p className="text-[11px] text-stone-400 font-medium uppercase tracking-[0.2em] mb-12">
          {t.microcopy}
        </p>

        <div className="relative aspect-[4/3] md:aspect-[16/9] bg-stone-100 rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
          {/* Simulation of a priority image using actual dimensions requirement 2400x1350 */}
          <img 
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1600" 
            alt={t.hero_alt}
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <button 
          onClick={() => setView('quiz')}
          className="bg-[#1F4E5F] text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:bg-[#163a47] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.cta_start}
        </button>
      </section>

      <section className="bg-stone-50 py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start gap-4 p-4">
              <div className="bg-[#B85C3D]/10 p-3 rounded-lg text-[#B85C3D]">
                {bullet.icon === 'itinerary' && <MapPin size={24} />}
                {bullet.icon === 'logistics' && <ChevronRight size={24} />}
                {bullet.icon === 'food' && <Utensils size={24} />}
                {bullet.icon === 'safety' && <ShieldCheck size={24} />}
              </div>
              <p className="font-medium text-stone-700 pt-1 leading-tight">
                {bullet.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <PartnershipStrip />

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="space-y-8 mb-16">
          {t.reviews.map((rev, i) => (
            <p key={i} className="text-xl font-serif italic text-stone-500">
              {rev}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale">
            <span className="font-bold tracking-widest text-sm" role="img" aria-label="PromPeru Logo">PROMPERÚ</span>
            <span className="font-bold tracking-widest text-sm" role="img" aria-label="Casa Dina Logo">CASA DINA</span>
        </div>
      </section>

      <footer className="bg-stone-100 py-12 px-6 text-center border-t border-stone-200">
        <p className="text-xs text-stone-400 mb-4 tracking-wide uppercase">
          {t.footer}
        </p>
        <div className="flex justify-center gap-6 text-xs font-bold text-stone-600">
          <a href="mailto:reservas@hotelchachapoyas.com" className="hover:text-[#B85C3D]">Email</a>
          <a href="https://hotelchachapoyas.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B85C3D]">hotelchachapoyas.com</a>
        </div>
        <p className="mt-8 text-[10px] text-stone-400">
          {t.gdpr_footer}
        </p>
      </footer>
    </div>
  );
}
