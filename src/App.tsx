import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ArrowLeftRight, BadgeCheck, Banknote, BriefcaseBusiness, Building2, Calculator, Check, ChevronDown, CircleDollarSign, ClipboardList, Compass, CarFront, HandCoins, House, Landmark, ChartLine as LineChart, Lock, MapPin, Menu, MessageCircle, MoveRight, ShieldCheck, Sparkles, TrendingUp, UserRound, UsersRound, X, Zap } from 'lucide-react';

const logoPath = '/assets/images/ChatGPT_Image_Aug_10,_2026,_09_40_33_PM.png';
const portraitPath = '/assets/images/WhatsApp_Image_2026-08-10_at_8.51.41_PM.jpeg';

const solutions = [
  { icon: Building2, number: '01', title: 'Business Loan', text: 'A financial solution designed to help businesses meet operational and growth-related requirements.', tag: 'Growth', range: '₹1L – upto ₹2Cr', interest: 'From 10.5% p.a.', detail: 'Business loans can support working capital, equipment purchases, expansion plans and other operating needs. The suitable structure depends on your business profile, turnover, documentation and repayment comfort.' },
  { icon: CircleDollarSign, number: '02', title: 'Personal Loan', text: 'An unsecured loan that helps individuals meet personal financial needs without providing collateral.', tag: 'Personal needs', range: '₹50K – ₹1Cr', interest: 'From 9.9% p.a.', detail: 'A personal loan may be useful for planned expenses such as education, medical needs, travel or home improvements. Approval, pricing and repayment terms depend on eligibility and lender criteria.' },
  { icon: House, number: '03', title: 'Loan Against Property', text: 'Unlock the value of residential, commercial or industrial property for personal or business requirements.', tag: 'Property-backed', range: '₹25L – ₹10Cr', interest: 'From 9% p.a.', detail: 'Loan Against Property uses an eligible property as security and may offer access to a larger amount over a longer repayment period. The property assessment and applicant profile are considered during evaluation.' },
  { icon: House, number: '04', title: 'Home Loan', text: 'A home loan helps individuals purchase, construct, renovate or extend a residential property.', tag: 'Home', range: '₹10L – ₹5Cr', interest: 'From 8.5% p.a.', detail: 'Home loan options may cover a new purchase, construction, renovation or extension. The final terms can vary based on the property, income, credit profile, documentation and applicable lender policies.' },
  { icon: CarFront, number: '05', title: 'Vehicle Loan', text: 'Finance the purchase of a new or used vehicle without making a large upfront payment.', tag: 'Mobility', range: '₹50K – ₹1Cr', interest: 'From 9.9% p.a.', detail: 'Vehicle finance can help individuals and businesses purchase eligible new or pre-owned vehicles. Loan amount, tenure and repayment terms may depend on the vehicle, applicant profile and lender requirements.' },
  { icon: ArrowLeftRight, number: '06', title: 'Supply Chain Finance', text: 'Improve business cash flow with timely financing against invoices, purchase orders or receivables.', tag: 'Cash flow', range: '₹10L – ₹5Cr', interest: 'From 10% p.a.', detail: 'Supply Chain Finance can help eligible businesses bridge working-capital gaps while waiting for invoice payments. Assessment may include business transactions, buyer relationships, invoices and repayment cycles.' },
];

const faqs = [
  ['What financial solutions can I enquire about?', 'You can enquire about personal, business, home and loan against property solutions. Our team will understand your requirement and guide you on the next steps.'],
  ['How does the enquiry process work?', 'Share a few details through the enquiry form. We review your requirement, discuss suitable options and help you understand what comes next.'],
  ['What documents may be required?', 'Requirements can vary based on the solution and your profile. Our team will let you know what information or documents may be relevant to your enquiry.'],
  ['How is eligibility determined?', 'Eligibility depends on several factors, which can include your requirement, profile, documentation and applicable lender criteria.'],
  ['How long does the process take?', 'The time can vary depending on the solution and the information required. We aim to keep the process clear and guide you at each stage.'],
  ['Can I enquire online?', 'Yes. You can submit an enquiry online and share your requirement with the FINZOCASH team.'],
];

const marqueeItems = [
  { name: 'SBI', image: '/assets/images/sbi-investigates-reported-massive-data-leak-showcase_image-2-a-11986.jpg' },
  { name: 'Axis Bank', image: '/assets/images/Screenshot_2026-08-25_190417.png' },
  { name: 'IndusInd Bank', image: '/assets/images/indusind-01.webp' },
  { name: 'Bank of Baroda', image: '/assets/images/Bank-of-Baroda.jpg' },
  { name: 'Central Bank of India', image: '/assets/images/centralbankofindia-1618313972.webp' },
  { name: 'Canara Bank', image: '/assets/images/CANARA-BANK-23-12-2024.jpg' },
  { name: 'AU Bank', image: '/assets/images/AU-Bank-new-logo-for-GBM_1024X1024_(cropped).png' },
  { name: 'Kotak Bank', image: '/assets/images/Screenshot_2026-08-25_190814.png' },
];

function Reveal({ children, className = '', delay = 0, variant = 'up' }: { children: ReactNode; className?: string; delay?: number; variant?: 'up' | 'left' | 'right' | 'scale' | 'tilt' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const v = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : variant === 'scale' ? 'reveal-scale' : variant === 'tilt' ? 'reveal-tilt' : 'reveal-up';
  return <div ref={ref} className={`${v} ${visible ? 'reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const raf = useRef<number | undefined>(undefined);
  const from = useRef(target);
  const start = useRef(0);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    from.current = value;
    start.current = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start.current) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from.current + (target - from.current) * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

function CustomerCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const target = 1600;
  const duration = 2200;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setCount(Math.floor(target * eased));
          if (t < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasAnimated]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F3F6FA] via-[#DDF5F4] to-[#F3F6FA] px-5 py-16 md:py-20">
      <div className="float-orb absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#DDF5F4] blur-3xl opacity-60" />
      <div className="dot-float absolute left-1/4 top-1/3 h-2.5 w-2.5 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.5)]" />
      <div className="dot-float-slow absolute right-1/3 bottom-1/4 h-2 w-2 rounded-full bg-[#08B3B5] shadow-[0_0_10px_rgba(8,179,181,.5)]" />
      <div ref={ref} className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#8DD6D5] bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#082B52] shadow-sm backdrop-blur-sm">
          <UsersRound size={13} className="text-[#08B3B5]" /> Growing every day
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-display text-6xl font-extrabold tracking-[-0.05em] text-[#08B3B5] tabular-nums sm:text-7xl md:text-8xl number-pop" key={count}>{count.toLocaleString('en-IN')}</span>
          <span className="font-display text-5xl font-extrabold text-[#08B3B5] sm:text-6xl md:text-7xl">+</span>
        </div>
        <p className="text-lg font-bold text-[#082B52] sm:text-xl">Customer Base</p>
        <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#08B3B5] to-transparent" />
        <p className="mt-2 max-w-md text-sm leading-6 text-[#5C748A]">Trusted by customers across India to find the right financial solution.</p>
      </div>
    </section>
  );
}

function BankMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const offset = useRef(0);
  const scrollVelocity = useRef(0);
  const lastTime = useRef(0);
  const dragging = useRef(false);
  const pointerStartX = useRef(0);
  const offsetAtGrab = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const dragVelocity = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    let raf = 0;
    const baseSpeed = 55;

    const tick = (now: number) => {
      const dt = lastTime.current ? (now - lastTime.current) / 1000 : 0;
      lastTime.current = now;
      const track = trackRef.current;
      if (track) {
        if (!dragging.current) {
          offset.current -= baseSpeed * dt;
          offset.current += scrollVelocity.current * dt;
          scrollVelocity.current *= 0.92;
          offset.current += dragVelocity.current * dt * 60;
          dragVelocity.current *= 0.9;
        }
        const half = track.scrollWidth / 2;
        if (offset.current <= -half) offset.current += half;
        if (offset.current >= 0) offset.current -= half;
        track.style.transform = `translateX(${offset.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 2 || Math.abs(e.deltaX) > 2) {
        scrollVelocity.current += e.deltaY * 0.8 + e.deltaX * 0.8;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true;
      setIsGrabbing(true);
      pointerStartX.current = e.clientX;
      offsetAtGrab.current = offset.current;
      lastPointerX.current = e.clientX;
      lastPointerTime.current = performance.now();
      dragVelocity.current = 0;
      scrollVelocity.current = 0;
      section.setPointerCapture(e.pointerId);
      document.body.style.overflow = 'hidden';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - pointerStartX.current;
      offset.current = offsetAtGrab.current + delta;
      const now = performance.now();
      const elapsed = now - lastPointerTime.current;
      if (elapsed > 0) {
        dragVelocity.current = (e.clientX - lastPointerX.current) / elapsed * 16;
      }
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;
      const track = trackRef.current;
      if (track) {
        const half = track.scrollWidth / 2;
        if (offset.current <= -half) offset.current += half;
        if (offset.current >= 0) offset.current -= half;
        track.style.transform = `translateX(${offset.current}px)`;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      setIsGrabbing(false);
      try { section.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      document.body.style.overflow = '';
    };

    section.addEventListener('wheel', onWheel, { passive: false });
    section.addEventListener('pointerdown', onPointerDown);
    section.addEventListener('pointermove', onPointerMove);
    section.addEventListener('pointerup', onPointerUp);
    section.addEventListener('pointercancel', onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('wheel', onWheel);
      section.removeEventListener('pointerdown', onPointerDown);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerup', onPointerUp);
      section.removeEventListener('pointercancel', onPointerUp);
      document.body.style.overflow = '';
    };
  }, []);

  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section ref={sectionRef} className={`border-y-2 border-[#08B3B5]/10 bg-gradient-to-r from-[#082B52] via-[#08B3B5] to-[#082B52] py-3 ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}>
      <div className="overflow-hidden select-none">
        <div ref={trackRef} className="flex w-max items-center gap-10 whitespace-nowrap py-1 will-change-transform">
          {items.map((item, i) => (
            <span key={`${item.name}-${i}`} className="flex items-center gap-10 text-[14px] font-bold uppercase tracking-[0.16em] text-[#DDF5F4]">
              {item.image ? (
                <span className="flex h-[52px] w-[156px] items-center justify-center overflow-hidden rounded-xl border border-white/40 bg-white/90 px-3 py-1.5 shadow-[0_4px_14px_rgba(0,20,45,.14)] backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full rounded-md object-contain opacity-90" />
                </span>
              ) : (
                <span className="transition-colors hover:text-white">{item.name}</span>
              )}
              <Sparkles size={14} className="text-[#A6E8E7]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [loanAmount, setLoanAmount] = useState(750000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<(typeof solutions)[number] | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const emi = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    if (!monthlyRate) return loanAmount / months;
    return loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  }, [interestRate, loanAmount, tenure]);
  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - loanAmount;
  const principalRatio = totalPayable > 0 ? Math.min(100, Math.max(0, (loanAmount / totalPayable) * 100)) : 0;

  const emiAnim = useCountUp(emi);
  const interestAnim = useCountUp(totalInterest);
  const payableAnim = useCountUp(totalPayable);

  const formatCurrency = (value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`;
  const closeMobile = () => setMobileOpen(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    closeMobile();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#F3F6FA] text-[#102b3a]">
      <div className="fixed inset-x-0 top-0 z-[60] h-1.5 bg-transparent"><div className="h-full bg-gradient-to-r from-[#08B3B5] via-[#08B3B5] to-[#08B3B5] transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <div className="fixed inset-x-0 top-0 z-50">
        <div className={`overflow-hidden bg-gradient-to-r from-[#082B52] via-[#08B3B5] to-[#082B52] transition-all duration-300 ${scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'}`}>
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2.5 px-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#DDF5F4]">
            <Zap size={13} className="text-[#08B3B5]" /> Smart financial solutions <span className="text-[#08B3B5]">·</span> explore with FINZOCASH <span className="text-[#08B3B5]">·</span> clear & guided
          </div>
        </div>
        <header className={`border-b transition-all duration-300 ${scrolled ? 'border-slate-200/80 bg-white/95 shadow-[0_10px_40px_rgba(10,50,65,0.1)] backdrop-blur-xl' : 'border-transparent bg-gradient-to-b from-[#F3F6FA]/90 to-[#F3F6FA]/40 backdrop-blur-md'}`}>
          <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 md:px-6 ${scrolled ? 'h-[74px]' : 'h-[100px] md:h-[120px]'}`}>
            <button onClick={() => scrollTo('home')} className="flex items-center" aria-label="FINZOCASH home">
              <img src={logoPath} alt="FINZOCASH — Smart Financial Solutions" className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12 md:h-16' : 'h-20 md:h-28'}`} />
            </button>
            <nav className="hidden items-center gap-6 lg:flex">
              {[['Home', 'home'], ['Loan Solutions', 'solutions'], ['How It Works', 'process'], ['About Us', 'about'], ['FAQ', 'faq'], ['Contact', 'contact']].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="group relative text-[13px] font-bold tracking-wide text-[#5C748A] transition hover:text-[#0b897e]">{label}<span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#08B3B5] transition-all duration-300 group-hover:w-full" /></button>
              ))}
            </nav>
            <button onClick={() => scrollTo('contact')} className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#0ABFC0] px-7 py-3 text-sm font-bold text-[#082B52] shadow-[0_8px_24px_rgba(8,179,181,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(8,179,181,0.4)] lg:flex">Apply Now <ArrowUpRight size={16} className="transition group-hover:rotate-45" /></button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-[#8DD6D5] bg-white/60 p-2.5 text-[#123e4a] lg:hidden" aria-label="Toggle menu">{mobileOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
          {mobileOpen && <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden"><div className="flex flex-col gap-1">{[['Home', 'home'], ['Loan Solutions', 'solutions'], ['How It Works', 'process'], ['About Us', 'about'], ['FAQ', 'faq'], ['Contact', 'contact']].map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#5C748A] hover:bg-[#F3F6FA]">{label}</button>)}<button onClick={() => scrollTo('contact')} className="mt-3 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#0ABFC0] px-5 py-3 text-sm font-bold text-[#082B52]">Apply Now</button></div></div>}
        </header>
      </div>

      <main>
        {/* HERO */}
        <section id="home" className="relative min-h-[800px] overflow-hidden bg-gradient-to-br from-[#F3F6FA] via-[#EAF1F7] to-[#F3F6FA] pt-44 md:min-h-[880px] md:pt-52">
          <div className="mesh-bg absolute inset-0 opacity-70" />
          <div className="float-orb absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#A6E8E7] to-[#A6E8E7] blur-3xl" />
          <div className="float-orb-slow absolute -left-52 bottom-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#DDF5F4] to-[#EAF1F7] blur-3xl" />
          <div className="spin-slow absolute right-[6%] top-[38%] h-[500px] w-[500px] rounded-full border border-dashed border-[#8DD6D5] opacity-50" />
          <div className="spin-slow-reverse absolute right-[14%] top-[48%] h-[340px] w-[340px] rounded-full border border-[#DCE6EF] opacity-60" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:pb-28">
            <div className="relative z-10 max-w-2xl animate-fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8DD6D5] bg-white/70 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#082B52] shadow-[0_4px_20px_rgba(8,179,181,0.12)] backdrop-blur-sm color-pulse"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#08B3B5] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#08B3B5]" /></span> Smart financial solutions</div>
              <h1 className="max-w-xl font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.06em] text-[#082B52] sm:text-6xl lg:text-[80px]">Financial solutions <span className="relative whitespace-nowrap"><span className="gradient-animate bg-gradient-to-r from-[#08B3B5] via-[#08B3B5] via-[#08B3B5] to-[#08B3B5] bg-clip-text text-transparent">designed around you.</span><svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none"><path d="M2 9C60 3 120 3 180 6C240 9 280 5 298 4" stroke="#08B3B5" strokeWidth="4" strokeLinecap="round" /></svg></span></h1>
              <p className="mt-8 max-w-lg text-lg leading-8 text-[#5C748A]">Explore financial solutions through a simple, clear and guided enquiry experience.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><button onClick={() => scrollTo('contact')} className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#082B52] px-8 py-4 text-sm font-bold text-white shadow-[0_16px_36px_rgba(8,179,181,0.3)] transition hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(8,179,181,0.4)]">Apply Now <ArrowUpRight size={17} className="transition group-hover:rotate-45" /></button><button onClick={() => scrollTo('solutions')} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#08B3B5]/20 bg-white/60 px-7 py-4 text-sm font-bold text-[#082B52] backdrop-blur-sm transition hover:border-[#08B3B5] hover:bg-white">Explore Loan Solutions <ArrowRight size={17} /></button></div>
              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#DCE6EF] pt-7 text-sm font-semibold text-[#5C748A]"><div className="flex items-center gap-2"><ShieldCheck size={19} className="text-[#08B3B5]" /> Clear information</div><div className="flex items-center gap-2"><BadgeCheck size={19} className="text-[#08B3B5]" /> Guided assistance</div><div className="flex items-center gap-2"><UsersRound size={19} className="text-[#08B3B5]" /> Customer-focused</div></div>
            </div>
            <div className="relative min-h-[440px] animate-fade-in lg:min-h-[560px]">
              <div className="absolute right-2 top-2 h-[360px] w-[360px] rounded-full border-2 border-[#8DD6D5] md:right-12 md:top-0 md:h-[480px] md:w-[480px]" /><div className="absolute right-20 top-16 h-[300px] w-[300px] rounded-full border border-dashed border-[#8DD6D5] md:right-28 md:top-16 md:h-[380px] md:w-[380px]" />
              <div className="float-card absolute right-4 top-12 w-[280px] rounded-3xl border border-white bg-white/90 p-5 shadow-[0_28px_70px_rgba(8,43,82,0.16)] backdrop-blur-md md:right-6 md:top-20 md:w-[340px]"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#5C748A]">Your plan</span><span className="rounded-full bg-gradient-to-r from-[#DDF5F4] to-[#DDF5F4] px-3 py-1 text-[10px] font-bold text-[#082B52]">Simple & clear</span></div><div className="mt-7 flex items-end justify-between"><div><p className="text-xs text-[#5C748A]">Monthly estimate</p><p className="mt-1 font-display text-3xl font-bold tracking-tight text-[#082B52]">₹18,240</p></div><div className="mb-1 rounded-2xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-3 text-[#08B3B5]"><Calculator size={22} /></div></div><div className="mt-7 h-2.5 overflow-hidden rounded-full bg-[#DCE6EF]"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#08B3B5] to-[#08B3B5]" /></div><div className="mt-3 flex justify-between text-[11px] font-semibold text-[#5C748A]"><span>Comfortable planning</span><span>68%</span></div></div>
              <div className="float-card-slow absolute left-0 top-48 flex items-center gap-3 rounded-2xl border border-white bg-white/90 p-3.5 shadow-[0_20px_50px_rgba(8,43,82,0.14)] backdrop-blur-md md:left-2 md:top-44"><div className="rounded-xl bg-gradient-to-br from-[#e6f5ef] to-[#DDF5F4] p-2.5 text-[#08B3B5]"><ClipboardList size={20} /></div><div><p className="text-[11px] text-[#5C748A]">Enquiry journey</p><p className="text-sm font-bold text-[#082B52]">One step at a time</p></div></div>
              <div className="float-card absolute bottom-2 left-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#08B3B5] to-[#082B52] shadow-[0_18px_40px_rgba(8,179,181,0.3)] md:bottom-10 md:left-12 md:h-40 md:w-40"><div className="text-center text-white"><p className="font-display text-3xl font-bold">4</p><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#A6E8E7]">clear steps</p></div><div className="absolute inset-0 rounded-full border-2 border-[#08B3B5]/30 animate-ping-slow" /></div>
              <div className="float-card-slow absolute bottom-10 right-2 h-28 w-28 rounded-[30px] bg-gradient-to-br from-[#08B3B5] to-[#082B52] p-4 shadow-[0_18px_40px_rgba(8,179,181,0.28)] md:bottom-24 md:right-12"><MoveRight className="text-[#5C748A]" size={26} /><p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#5C748A]">Move forward</p></div>
              <div className="float-card absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md md:left-8"><TrendingUp size={16} className="text-[#08B3B5]" /><span className="text-[11px] font-bold text-[#5C748A]">Guided pathway</span></div>
              <div className="dot-float absolute left-1/2 top-8 h-3 w-3 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.6)]" />
              <div className="dot-float-slow absolute right-1/3 bottom-1/3 h-2.5 w-2.5 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.6)]" />
              <div className="dot-float absolute right-6 top-1/2 h-2 w-2 rounded-full bg-[#08B3B5] shadow-[0_0_10px_rgba(8,179,181,.6)]" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <BankMarquee />

        {/* BENEFITS */}
        <section className="relative bg-white"><div className="shimmer-band h-1.5 w-full" /><div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-12 md:grid-cols-4 md:px-8 md:py-14">{[[ClipboardList, 'Simple process', 'A straightforward first step'], [MessageCircle, 'Clear guidance', 'Information you can follow'], [CircleDollarSign, 'Flexible solutions', 'Explore what suits you'], [UsersRound, 'Dedicated assistance', 'Support throughout']].map(([Icon, label, sub], i) => <Reveal key={label as string} delay={i * 110} variant="tilt"><div className="group relative m-1 overflow-hidden rounded-2xl border border-[#DCE6EF] bg-gradient-to-br from-[#FFFFFF] to-white p-5 transition duration-300 hover:-translate-y-1.5 hover:border-[#8DD6D5] hover:shadow-[0_18px_40px_rgba(8,43,82,0.1)] md:m-2 md:p-6"><div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#DDF5F4] to-transparent opacity-0 transition group-hover:opacity-100" /><div className="relative mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-3 text-[#08B3B5] transition group-hover:from-[#08B3B5] group-hover:to-[#082B52] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(8,179,181,0.3)]"><Icon size={24} /></div><h3 className="relative text-sm font-bold text-[#082B52] md:text-base">{label as string}</h3><p className="relative mt-1.5 text-xs leading-5 text-[#5C748A]">{sub as string}</p></div></Reveal>)}</div></section>

        {/* SOLUTIONS */}
        <section id="solutions" className="relative overflow-hidden bg-gradient-to-b from-[#F3F6FA] to-white px-5 py-24 md:px-8 md:py-32"><div className="float-orb absolute right-0 top-20 h-72 w-72 rounded-full bg-[#DDF5F4] blur-3xl opacity-50" /><div className="relative mx-auto max-w-7xl"><Reveal variant="up"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Solutions that fit your next step</p><h2 className="section-title">Explore financial solutions</h2></div><p className="max-w-sm text-sm leading-6 text-[#5C748A]">Start with a simple enquiry. We help you understand the possibilities relevant to your requirement.</p></div></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{solutions.map(({ icon: Icon, number, title, text, tag, range, interest }, i) => <Reveal key={title} delay={i * 100} variant="tilt"><article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#DCE6EF] bg-white transition duration-500 hover:-translate-y-3 hover:border-[#08B3B5] hover:shadow-[0_28px_60px_rgba(8,43,82,0.16)]"><div className="absolute inset-0 bg-gradient-to-br from-[#F3F6FA] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" /><div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-[#DDF5F4] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" /><div className="relative flex flex-1 flex-col p-7"><div className="flex items-start justify-between"><div className="rounded-2xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-4 text-[#08B3B5] shadow-sm transition duration-500 group-hover:bg-gradient-to-br group-hover:from-[#08B3B5] group-hover:to-[#082B52] group-hover:text-white group-hover:shadow-[0_10px_25px_rgba(8,179,181,0.3)]"><Icon size={26} /></div><span className="rounded-full bg-[#DDF5F4] px-3 py-1 text-[10px] font-bold text-[#08B3B5]">{interest}</span></div><span className="mt-5 inline-block self-start rounded-full bg-[#DDF5F4] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#082B52] transition group-hover:bg-[#08B3B5]">{tag}</span><h3 className="mt-3 text-xl font-bold text-[#082B52]">{title}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-[#5C748A]">{text}</p><div className="mt-7 grid grid-cols-2 border-t border-[#DCE6EF] pt-5"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA8B5]">Loan range</p><p className="mt-1 text-sm font-bold text-[#082B52]">{range}</p></div><div className="border-l border-[#DCE6EF] pl-4"><p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA8B5]">Interest rate</p><p className="mt-1 text-sm font-bold text-[#082B52]">{interest}</p></div></div></div><button onClick={() => setSelectedSolution(solutions[i])} className="relative flex w-full items-center justify-between border-t border-[#DCE6EF] bg-[#F8FAFC] px-7 py-4 text-left text-sm font-bold text-[#082B52] transition hover:bg-[#DDF5F4]">More Info <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button></article></Reveal>)}</div><Reveal delay={200}><div className="mt-10 text-center"><button onClick={() => scrollTo('contact')} className="group inline-flex items-center gap-3 rounded-full border-2 border-[#08B3B5]/20 bg-white px-7 py-4 text-sm font-bold text-[#082B52] transition hover:border-[#08B3B5] hover:bg-[#F3F6FA] hover:shadow-[0_10px_30px_rgba(8,179,181,0.12)]">Explore all solutions <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button></div></Reveal>{selectedSolution && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#082B52]/55 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="solution-detail-title" onClick={() => setSelectedSolution(null)}><div className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-[28px] bg-white p-7 shadow-[0_30px_90px_rgba(8,43,82,0.3)] md:p-9" onClick={(event) => event.stopPropagation()}><button onClick={() => setSelectedSolution(null)} className="absolute right-5 top-5 rounded-full bg-[#F3F6FA] p-2 text-[#5C748A] transition hover:bg-[#DDF5F4] hover:text-[#082B52]" aria-label="Close details"><X size={18} /></button><div className="pr-10"><p className="eyebrow">Loan solution details</p><h3 id="solution-detail-title" className="mt-2 font-display text-3xl font-bold text-[#082B52]">{selectedSolution.title}</h3><p className="mt-5 text-sm leading-7 text-[#5C748A]">{selectedSolution.detail}</p><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#F3F6FA] p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA8B5]">Loan range</p><p className="mt-1 text-sm font-bold text-[#082B52]">{selectedSolution.range}</p></div><div className="rounded-2xl bg-[#DDF5F4] p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-[#5C748A]">Interest rate</p><p className="mt-1 text-sm font-bold text-[#082B52]">{selectedSolution.interest}</p></div></div><button onClick={() => { setSelectedSolution(null); scrollTo('contact'); }} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#082B52] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5">Start an enquiry <ArrowUpRight size={16} /></button><p className="mt-4 text-center text-[11px] leading-5 text-[#5C748A]">Rates, limits and eligibility are illustrative and may vary by applicant and lender.</p></div></div></div>}</div></section>

        {/* TAGLINE BANNER */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#082B52] via-[#0A3160] to-[#082B52] py-20 md:py-28">
          <div className="mesh-bg-dark absolute inset-0 opacity-50" />
          <div className="float-orb absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#08B3B5]/25 blur-3xl" />
          <div className="float-orb-slow absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#08B3B5]/15 blur-3xl" />
          <div className="dot-float absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-[#08B3B5] shadow-[0_0_14px_rgba(8,179,181,.6)]" />
          <div className="dot-float-slow absolute right-1/3 bottom-1/4 h-2.5 w-2.5 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.5)]" />
          <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
            <Reveal variant="scale">
              <p className="eyebrow eyebrow-light">The FINZOCASH promise</p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-[64px]">Loans Made Simple, <span className="gradient-animate bg-gradient-to-r from-[#08B3B5] via-[#0ABFC0] to-[#A6E8E7] bg-clip-text text-transparent">Lives Made Better.</span></h2>
              <div className="mx-auto mt-7 h-1 w-28 rounded-full bg-gradient-to-r from-transparent via-[#08B3B5] to-transparent" />
            </Reveal>
          </div>
        </section>

        {/* MULTI-LENDER ACCESS */}
        <section id="process" className="relative overflow-hidden bg-white px-5 py-24 md:px-8 md:py-32">
          <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-[#DDF5F4] opacity-60 blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#EAF1F7] opacity-70 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
            <Reveal variant="left">
              <div>
                <p className="eyebrow">Multi-lender access</p>
                <h2 className="mt-5 max-w-xl font-display text-5xl font-extrabold leading-[1.06] tracking-[-0.055em] text-[#082B52] sm:text-6xl">One Application.<br />50+ Lenders.<br />Best Rate <span className="text-[#08B3B5]">Guaranteed.</span></h2>
                <p className="mt-7 max-w-lg text-base leading-7 text-[#5C748A]">Stop running from bank to bank. FINZOCASH compares <strong className="font-bold text-[#082B52]">50+ banks and NBFCs</strong> simultaneously, finding you the lowest rate and the best terms that match your exact profile and loan requirement.</p>
                <button onClick={() => scrollTo('contact')} className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#08B3B5] transition hover:gap-3">Explore our lender network <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button>
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[[Building2, '50+ Lenders', 'In One Place'], [TrendingUp, 'Best Rate', 'Guaranteed'], [Zap, 'Saves Time', '& Effort'], [ShieldCheck, '100% Secure', '& Trusted']].map(([Icon, title, text], index) => {
                    const BenefitIcon = Icon as typeof Building2;
                    return <Reveal key={title as string} delay={index * 100} variant="tilt"><div className="group rounded-2xl border border-[#E7EBF0] bg-[#FAFBFC] p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#8DD6D5] hover:bg-white hover:shadow-[0_14px_30px_rgba(8,179,181,0.1)]"><div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#DDF5F4] text-[#08B3B5] transition group-hover:scale-110"><BenefitIcon size={17} /></div><p className="mt-3 text-[11px] font-extrabold text-[#082B52]">{title as string}</p><p className="text-[10px] leading-4 text-[#9AA8B5]">{text as string}</p></div></Reveal>;
                  })}
                </div>
              </div>
            </Reveal>
            <Reveal variant="right" delay={140}>
              <div className="group relative overflow-hidden rounded-[28px] border border-[#E7EBF0] bg-white p-2 shadow-[0_24px_70px_rgba(8,43,82,0.13)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(8,43,82,0.18)]">
                <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/80" />
                <img src="/assets/images/ChatGPT_Image_Aug_24,_2026,_10_40_33_PM.png" alt="A secure network connecting FINZOCASH with multiple lenders" className="relative aspect-[1.28] w-full rounded-[22px] object-cover transition duration-700 group-hover:scale-[1.025]" />
                <div className="pointer-events-none absolute bottom-6 left-6 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#08B3B5] shadow-lg backdrop-blur-sm opacity-0 transition duration-500 group-hover:opacity-100">One trusted network</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CUSTOMER BASE COUNTER */}
        <CustomerCounter />

        {/* EMI CALCULATOR */}
        <section id="calculator" className="relative overflow-hidden bg-white px-5 py-24 md:px-8 md:py-32"><div className="shimmer-band absolute top-0 left-0 h-1.5 w-full" /><div className="float-orb-slow absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#EAF1F7] blur-3xl opacity-40" /><div className="float-orb absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#DDF5F4] blur-3xl opacity-40" /><div className="dot-float absolute left-10 top-1/3 h-3 w-3 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.5)]" /><div className="dot-float-slow absolute right-16 bottom-1/4 h-2.5 w-2.5 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.5)]" /><div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><Reveal variant="left"><div><p className="eyebrow">Plan with perspective</p><h2 className="section-title">Plan your EMI</h2><p className="mt-5 max-w-md text-base leading-7 text-[#5C748A]">Use this simple calculator to create an illustrative estimate and get a feel for your monthly planning.</p><div className="mt-8 flex items-center gap-3 text-sm font-semibold text-[#5C748A]"><div className="rounded-full bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-2.5 text-[#08B3B5]"><Calculator size={19} /></div> Adjust the details to explore different scenarios.</div><div className="mt-8 grid grid-cols-3 gap-3">{[['₹1L', 'Min amount'], ['5–20%', 'Rate range'], ['1–20 yr', 'Tenure']].map(([v, l]) => <div key={l} className="rounded-xl border border-[#DCE6EF] bg-[#FFFFFF] p-3 text-center"><p className="font-display text-base font-bold text-[#08B3B5]">{v}</p><p className="mt-1 text-[10px] font-semibold text-[#5C748A]">{l}</p></div>)}</div></div></Reveal><Reveal variant="right" delay={120}><div className="rounded-[32px] bg-gradient-to-br from-[#082B52] via-[#0A3160] to-[#082B52] p-6 text-white shadow-[0_30px_70px_rgba(8,43,82,0.25)] md:p-9"><div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A6E8E7]">EMI Calculator</p><p className="mt-1 text-[11px] text-[#A6E8E7]">Illustrative estimate</p></div><div className="rounded-xl border-glow bg-white/10 p-2.5 text-[#08B3B5]"><Calculator size={22} /></div></div><div className="grid gap-8 md:grid-cols-[1fr_1fr]"><div className="space-y-7"><label className="block"><div className="mb-3 flex justify-between text-sm font-semibold"><span className="text-[#cfe2df]">Loan amount</span><span className="rounded-lg bg-[#08B3B5]/15 px-2.5 py-0.5 text-[#08B3B5]">{formatCurrency(loanAmount)}</span></div><input type="range" min="100000" max="5000000" step="50000" value={loanAmount} onChange={(event) => setLoanAmount(Number(event.target.value))} style={{ ['--val' as string]: `${((loanAmount - 100000) / (5000000 - 100000)) * 100}%` }} /></label><label className="block"><div className="mb-3 flex justify-between text-sm font-semibold"><span className="text-[#cfe2df]">Interest rate</span><span className="rounded-lg bg-[#08B3B5]/15 px-2.5 py-0.5 text-[#08B3B5]">{interestRate.toFixed(1)}%</span></div><input type="range" min="5" max="20" step="0.1" value={interestRate} onChange={(event) => setInterestRate(Number(event.target.value))} style={{ ['--val' as string]: `${((interestRate - 5) / (20 - 5)) * 100}%` }} /></label><label className="block"><div className="mb-3 flex justify-between text-sm font-semibold"><span className="text-[#cfe2df]">Loan tenure</span><span className="rounded-lg bg-[#08B3B5]/15 px-2.5 py-0.5 text-[#08B3B5]">{tenure} years</span></div><input type="range" min="1" max="20" step="1" value={tenure} onChange={(event) => setTenure(Number(event.target.value))} style={{ ['--val' as string]: `${((tenure - 1) / (20 - 1)) * 100}%` }} /></label></div><div className="rounded-2xl bg-gradient-to-br from-[#0A3160] to-[#082B52] p-6 shadow-inner"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A6E8E7]">Estimated monthly EMI</p><p className="mt-3 font-display text-4xl font-bold text-white tabular-nums">{formatCurrency(emiAnim)}</p><div className="my-6 h-px bg-white/15" /><div className="space-y-4 text-sm"><div className="flex justify-between"><span className="text-[#A6E8E7]">Total interest</span><span className="font-bold text-[#08B3B5] tabular-nums">{formatCurrency(interestAnim)}</span></div><div className="flex justify-between"><span className="text-[#A6E8E7]">Total payable</span><span className="font-bold text-white tabular-nums">{formatCurrency(payableAnim)}</span></div></div><div className="mt-6"><div className="mb-2 flex justify-between text-[11px] font-semibold text-[#A6E8E7]"><span>Principal {Math.round(principalRatio)}%</span><span>Interest {Math.round(100 - principalRatio)}%</span></div><div className="flex h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-l-full bg-gradient-to-r from-[#08B3B5] to-[#08B3B5] transition-all duration-500" style={{ width: `${principalRatio}%` }} /><div className="h-full rounded-r-full bg-gradient-to-r from-[#08B3B5] to-[#0ABFC0] transition-all duration-500" style={{ width: `${100 - principalRatio}%` }} /></div></div></div></div><p className="mt-7 text-xs leading-5 text-[#A6E8E7]">This calculator provides an illustrative estimate only. Actual loan terms and eligibility may vary.</p></div></Reveal></div></section>

        {/* ABOUT */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F6FA] to-[#F3F6FA] px-5 py-24 md:px-8 md:py-32"><div className="float-orb absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#DDF5F4] blur-3xl opacity-40" /><div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center"><Reveal variant="left"><div className="relative min-h-[460px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#dcefea] to-[#DCE6EF] shadow-[0_20px_50px_rgba(8,43,82,0.12)]"><div className="float-orb absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#A6E8E7] opacity-60" /><div className="float-orb-slow absolute bottom-[-80px] right-[-30px] h-72 w-72 rounded-full bg-[#A6E8E7] opacity-50" /><div className="float-card absolute left-8 top-12 z-10 rounded-2xl border border-white bg-white/90 p-4 shadow-lg backdrop-blur-sm"><div className="flex items-center gap-2 text-xs font-bold text-[#5C748A]"><Check size={15} className="text-[#08B3B5]" /> Information you can understand</div></div><div className="float-card-slow absolute bottom-8 right-8 z-10 max-w-[200px] rounded-2xl border border-white/20 bg-[#082B52] p-5 text-white shadow-xl"><Sparkles size={20} className="text-[#08B3B5]" /><p className="mt-3 text-sm font-bold leading-5">A simple experience for meaningful decisions.</p></div><div className="absolute bottom-0 left-1/2 h-[400px] w-[320px] -translate-x-1/2 overflow-hidden rounded-t-[160px] bg-[#A6E8E7]"><img src={portraitPath} alt="FINZOCASH team representative" className="h-full w-full object-cover object-top mix-blend-multiply opacity-90" /></div></div></Reveal><Reveal variant="right" delay={120}><div id="about"><p className="eyebrow">A customer-focused approach</p><h2 className="section-title">Financial solutions, made simpler.</h2><p className="mt-6 text-base leading-8 text-[#5C748A]">FINZOCASH aims to make the financial enquiry process simpler, clearer and more accessible by helping customers explore suitable financial solutions based on their requirements.</p><div className="mt-9 grid gap-4 sm:grid-cols-2"><div className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#8DD6D5] hover:shadow-[0_18px_44px_rgba(8,43,82,0.12)]"><div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-3 text-[#08B3B5] transition group-hover:from-[#08B3B5] group-hover:to-[#082B52] group-hover:text-white"><UsersRound size={22} /></div><h3 className="font-bold text-[#082B52]">Our Mission</h3><p className="mt-2 text-sm leading-6 text-[#5C748A]">To make financial solutions easier to understand through clear information, guided assistance and a straightforward enquiry experience.</p></div><div className="group rounded-2xl border border-[#DCE6EF] bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#8DD6D5] hover:shadow-[0_18px_44px_rgba(8,43,82,0.12)]"><div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-3 text-[#082B52] transition group-hover:from-[#08B3B5] group-hover:to-[#082B52] group-hover:text-white"><Compass size={22} /></div><h3 className="font-bold text-[#082B52]">Our Vision</h3><p className="mt-2 text-sm leading-6 text-[#5C748A]">To create a simple, trustworthy and customer-focused digital experience for people exploring financial solutions.</p></div></div></div></Reveal></div></section>

        {/* WHY FINZOCASH */}
        <section className="why-choose-section px-5 py-24 md:px-8 md:py-28"><div className="mesh-bg-dark absolute inset-0 opacity-50" /><div className="float-orb absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#08B3B5]/30 blur-3xl" /><div className="float-orb-slow absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#08B3B5]/15 blur-3xl" /><div className="dot-float absolute left-12 top-1/3 h-3 w-3 rounded-full bg-[#08B3B5] shadow-[0_0_14px_rgba(8,179,181,.6)]" /><div className="dot-float-slow absolute right-20 bottom-1/4 h-3 w-3 rounded-full bg-[#08B3B5] shadow-[0_0_14px_rgba(8,179,181,.6)]" /><div className="dot-float absolute left-1/3 bottom-12 h-2 w-2 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.6)]" style={{ animationDelay: '1s' }} /><div className="relative mx-auto max-w-7xl"><Reveal variant="up"><div className="max-w-xl"><p className="eyebrow eyebrow-light">What guides us</p><h2 className="section-title text-white">Why choose FINZOCASH?</h2></div></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{['Clear communication', 'Customer-focused assistance', 'Simple enquiry experience', 'Guided financial solutions', 'Transparent information'].map((item, index) => <Reveal key={item} delay={index * 100} variant="scale"><div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#08B3B5]/40 hover:bg-white/10 hover:shadow-[0_20px_45px_rgba(8,43,82,0.25)]"><div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-[#08B3B5]/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" /><span className="relative font-display text-4xl font-bold text-[#08B3B5]">0{index + 1}</span><p className="relative mt-8 text-sm font-bold leading-5 text-[#F3F6FA]">{item}</p><div className="relative mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#08B3B5] to-transparent transition-all duration-500 group-hover:w-full" /></div></Reveal>)}</div></div></section>

        {/* FAQ */}
        <section id="faq" className="bg-white px-5 py-24 md:px-8 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.75fr_1.25fr]"><Reveal variant="left"><div><p className="eyebrow">Questions, answered clearly</p><h2 className="section-title">Frequently asked questions</h2><p className="mt-5 max-w-sm text-base leading-7 text-[#5C748A]">A few helpful answers before you begin your enquiry.</p><div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[#DCE6EF] bg-[#FFFFFF] p-4"><div className="rounded-xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-2.5 text-[#08B3B5]"><MessageCircle size={20} /></div><div><p className="text-sm font-bold text-[#082B52]">Still have a question?</p><button onClick={() => scrollTo('contact')} className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-[#08B3B5]">Get in touch <ArrowRight size={14} /></button></div></div></div></Reveal><Reveal variant="right" delay={120}><div className="divide-y divide-[#DCE6EF] border-y border-[#DCE6EF]">{faqs.map(([question, answer], index) => <div key={question} className="group"><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-bold text-[#082B52] transition group-hover:text-[#08B3B5]"><span>{question}</span><span className={`shrink-0 rounded-full p-2 transition-all duration-300 ${activeFaq === index ? 'rotate-180 bg-gradient-to-br from-[#08B3B5] to-[#082B52] text-white shadow-[0_6px_15px_rgba(8,179,181,0.3)]' : 'bg-[#F3F6FA] text-[#5C748A]'}`}><ChevronDown size={17} /></span></button><div className={`grid transition-all duration-400 ${activeFaq === index ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="overflow-hidden pr-10 text-sm leading-6 text-[#5C748A]">{answer}</p></div></div>)}</div></Reveal></div></section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#F3F6FA] via-[#EAF1F7] to-[#F3F6FA] px-5 py-24 md:px-8 md:py-32"><div className="float-orb absolute right-0 top-20 h-80 w-80 rounded-full bg-[#DDF5F4] blur-3xl opacity-50" /><div className="float-orb-slow absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-[#EAF1F7] blur-3xl opacity-40" /><div className="dot-float absolute right-10 top-1/3 h-3 w-3 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.5)]" /><div className="dot-float-slow absolute left-1/4 bottom-1/4 h-2.5 w-2.5 rounded-full bg-[#08B3B5] shadow-[0_0_12px_rgba(8,179,181,.5)]" /><div className="relative mx-auto max-w-7xl"><Reveal variant="up"><div className="grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:items-start"><div><div className="inline-flex items-center gap-2 rounded-full border border-[#8DD6D5] bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#082B52] shadow-sm backdrop-blur-sm"><Sparkles size={13} className="text-[#08B3B5]" /> Let's begin</div><h2 className="section-title max-w-lg">Let's find the right financial solution for you.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#5C748A]">Have a financial requirement? Get in touch with our team and share your enquiry.</p><div className="mt-10 space-y-5"><div className="group flex gap-4 rounded-2xl border border-[#DCE6EF] bg-white/70 p-4 transition hover:border-[#8DD6D5] hover:bg-white hover:shadow-[0_12px_30px_rgba(8,43,82,0.08)]"><div className="rounded-xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-3 text-[#08B3B5]"><MapPin size={20} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-[#5C748A]">Visit us</p><p className="mt-1 max-w-xs text-sm leading-6 text-[#082B52]">Cateye Consultancy Services Private Limited<br />UNIT NO. 201, 2ND FLOOR CTS NO 733<br />PHENOMENAL HOUSE, ANDHERI KURLA ROAD<br />MAROL NAKA, JB NAGAR<br />ANDHERI (E), MUMBAI<br />MAHARASHTRA - 400059</p></div></div><div className="group flex gap-4 rounded-2xl border border-[#DCE6EF] bg-white/70 p-4 transition hover:border-[#8DD6D5] hover:bg-white hover:shadow-[0_12px_30px_rgba(8,43,82,0.08)]"><div className="rounded-xl bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-3 text-[#082B52]"><MessageCircle size={20} /></div><div><p className="text-xs font-bold uppercase tracking-wider text-[#5C748A]">Start a conversation</p><p className="mt-1 text-sm text-[#082B52]">Share your requirement using the form.</p></div></div></div></div><div className="rounded-[30px] border border-white bg-white p-6 shadow-[0_28px_70px_rgba(8,43,82,0.15)] md:p-9">{submitted ? <div className="flex min-h-[450px] flex-col items-center justify-center text-center"><div className="success-ring rounded-full bg-gradient-to-br from-[#DDF5F4] to-[#DDF5F4] p-6 text-[#08B3B5]"><Check size={36} /></div><h3 className="mt-6 font-display text-3xl font-bold text-[#082B52]">Thank you for reaching out.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#5C748A]">Your enquiry has been noted for this demo. The FINZOCASH team can follow up with you from here.</p><button onClick={() => setSubmitted(false)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#082B52] px-6 py-3 text-sm font-bold text-white">Submit another enquiry <ArrowRight size={15} /></button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="mb-7"><h3 className="text-2xl font-bold text-[#082B52]">Tell us what you need</h3><p className="mt-2 text-sm text-[#5C748A]">A few details help us understand your enquiry.</p></div><div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Name<input required type="text" placeholder="Your full name" /></label><label className="field-label">Mobile number<input required type="tel" placeholder="Your mobile number" /></label><label className="field-label">Email<input required type="email" placeholder="you@example.com" /></label><label className="field-label">Requirement<select defaultValue=""><option value="" disabled>Select a solution</option><option>Personal Loan</option><option>Business Loan</option><option>Home Loan</option><option>Loan Against Property</option></select></label><label className="field-label sm:col-span-2">Message<textarea required rows={4} placeholder="Tell us a little about your requirement" /></label></div><button className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#082B52] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(8,179,181,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(8,179,181,0.35)]">Apply Now <ArrowUpRight size={17} className="transition group-hover:rotate-45" /></button><p className="mt-4 text-center text-[11px] leading-5 text-[#5C748A]">This is a demo enquiry form and does not send real data.</p></form>}</div></div></Reveal></div></section>
      </main>

      <button onClick={() => scrollTo('contact')} className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#08B3B5] to-[#082B52] px-6 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(8,43,82,0.4)] transition hover:-translate-y-1 lg:hidden">Apply Now <ArrowUpRight size={16} /></button>

      <footer className="relative overflow-hidden bg-gradient-to-br from-[#061d26] via-[#082B52] to-[#061d26] px-5 py-14 text-white md:px-8"><div className="mesh-bg-dark absolute inset-0 opacity-30" /><div className="float-orb absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#08B3B5]/20 blur-3xl" /><div className="relative mx-auto max-w-7xl"><div className="grid gap-12 md:grid-cols-[1fr_auto_auto] md:gap-20"><div><img src={logoPath} alt="FINZOCASH" className="h-24 w-auto object-contain brightness-125 md:h-28" /><p className="mt-4 text-xs font-bold uppercase tracking-[0.22em] text-[#A6E8E7]">Smart financial solutions</p><p className="mt-6 max-w-xs text-sm leading-6 text-[#A6E8E7]">Cateye Consultancy Services Private Limited</p></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#08B3B5]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[#A6E8E7]">{[['Home', 'home'], ['Loan Solutions', 'solutions'], ['How It Works', 'process'], ['About Us', 'about'], ['FAQ', 'faq'], ['Contact', 'contact']].map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="text-left transition hover:text-[#08B3B5]">{label}</button>)}</div></div><div className="max-w-[240px]"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#08B3B5]">Office</p><p className="mt-5 text-sm leading-6 text-[#A6E8E7]">UNIT NO. 201, 2ND FLOOR CTS NO 733<br />PHENOMENAL HOUSE, ANDHERI KURLA ROAD<br />MAROL NAKA, JB NAGAR<br />ANDHERI (E), MUMBAI<br />MAHARASHTRA - 400059</p></div></div><div className="mt-12 border-t border-white/10 pt-7"><p className="max-w-4xl text-[11px] leading-5 text-[#8DD6D5]">Financial solutions and loan terms are subject to applicable eligibility criteria, lender policies and terms and conditions. Submission of an enquiry does not guarantee approval.</p><div className="mt-5 flex items-center justify-between text-[11px] text-[#8DD6D5]"><span>© 2026 FINZOCASH</span><span>Powered by clarity.</span></div></div></div></footer>
    </div>
  );
}

export default App;
