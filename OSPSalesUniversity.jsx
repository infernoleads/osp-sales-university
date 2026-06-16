import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import {
  Trophy, Flame, GraduationCap, Users, Target, Bot, Award, BarChart3,
  Mail, Settings, Plug, ShieldCheck, LayoutDashboard, Briefcase, Dumbbell,
  Crown, Star, Zap, TrendingUp, UserPlus, CheckCircle2, Clock, AlertTriangle,
  ChevronRight, Search, Filter, Download, Send, Plus, Lock, Unlock, Play,
  MessageSquare, Phone, DoorOpen, Store, Building2, Megaphone, X, Sparkles,
  ArrowRight, Rocket, BookOpen, ClipboardList, Medal, LogOut, Menu, Circle,
  FileText, CheckCircle, Calendar, MapPin, Quote, ChevronDown, Headphones,
} from "lucide-react";

/* ============================================================
   OSP SALES UNIVERSITY — single-file demo
   Recruit. Train. Certify. Promote. Build Leaders.
   ============================================================ */

const C = {
  bg: "#05070f",
  panel: "#0a0f1d",
  panel2: "#0e1428",
  card: "#111934",
  border: "#1c2745",
  blue: "#2f7bff",
  blueSoft: "#5b9dff",
  gold: "#f5c451",
  goldSoft: "#ffd97a",
  text: "#eaf0ff",
  sub: "#8e9bc4",
  green: "#37d399",
  red: "#ff6b81",
  purple: "#9b6bff",
};

const grad = (a, b, deg = 135) => ({ background: `linear-gradient(${deg}deg, ${a}, ${b})` });

/* ---------------- MOCK DATA ---------------- */
const FIRST = ["Marcus","Aaliyah","Devin","Sofia","Jamal","Priya","Tyler","Nina","Andre","Grace","Cole","Maya","Brandon","Leah","Xavier","Zoe","Damon","Ivy","Trey","Carmen","Logan","Selena","Reggie","Bianca","Sean","Talia","Marco","Jade","Quinn","Rosa","Dre","Kayla","Victor","Nadia","Eli","Tasha","Omar","Brielle","Chris","Lana"];
const LAST = ["Reyes","Coleman","Brooks","Nguyen","Carter","Patel","Bennett","Soto","Walker","Hughes","Foster","Diaz","Price","Morgan","Ortiz","Ramsey","Cole","Ward","Bryant","Flynn","Khan","Pierce","Vance","Lloyd","Mercer","Boone","Frost","Reed","Cruz","Lane"];
const CITIES = [["Detroit","MI"],["Chicago","IL"],["Atlanta","GA"],["Dallas","TX"],["Phoenix","AZ"],["Tampa","FL"],["Columbus","OH"],["Charlotte","NC"],["Denver","CO"],["Newark","NJ"]];
const SOURCES = ["Indeed","ZipRecruiter","LinkedIn","Facebook Jobs","Referral","Walk-in","Craigslist","Handshake"];
const RANKS = ["New Recruit","Prospecting Apprentice","Conversation Builder","Objection Handler","Closing Specialist","Territory Captain","Master Craftsman","Wizard Salesman","Elite Brand Ambassador","OSP Sales Legend"];
const ENVS = ["Telesales","Door-to-Door","Retail","B2B","Public Selling"];

const seed = (n) => { let s = n; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
const rnd = seed(42);
const pick = (a) => a[Math.floor(rnd() * a.length)];
const range = (n) => Array.from({ length: n }, (_, i) => i);

const STUDENTS = range(50).map((i) => {
  const f = FIRST[i % FIRST.length], l = pick(LAST), city = pick(CITIES);
  const xp = Math.floor(rnd() * 9500) + 200;
  const rankIdx = Math.min(9, Math.floor(xp / 1000));
  return {
    id: "S" + (1000 + i), name: `${f} ${l}`, first: f, role: "Student",
    email: `${f.toLowerCase()}.${l.toLowerCase()}@osp.com`,
    city: city[0], state: city[1], source: pick(SOURCES), xp,
    rank: RANKS[rankIdx], rankIdx, manager: "M" + (1 + (i % 8)),
    courses: Math.floor(rnd() * 10), drills: Math.floor(rnd() * 80),
    roleplays: Math.floor(rnd() * 40), avgScore: 62 + Math.floor(rnd() * 38),
    streak: Math.floor(rnd() * 21), certs: Math.floor(rnd() * 5),
    status: rnd() > 0.82 ? "At Risk" : rnd() > 0.2 ? "Active" : "New",
    lastActive: Math.floor(rnd() * 14),
  };
});
const MANAGERS = range(8).map((i) => ({
  id: "M" + (1 + i), name: `${pick(FIRST)} ${pick(LAST)}`, role: "Manager",
  team: `Team ${["Alpha","Bravo","Charlie","Delta","Echo","Foxtrot","Gulf","Hotel"][i]}`,
  reps: 5 + Math.floor(rnd() * 8), close: 18 + Math.floor(rnd() * 22),
}));
const APPLICANTS = range(200).map((i) => {
  const f = pick(FIRST), l = pick(LAST), city = pick(CITIES);
  const stages = ["New Lead","Applied","Screened","Interview Scheduled","Accepted","Onboarding","Active Student"];
  return {
    id: "A" + (2000 + i), name: `${f} ${l}`, email: `${f.toLowerCase()}${i}@mail.com`,
    city: city[0], state: city[1], source: pick(SOURCES),
    stage: stages[Math.floor(rnd() * stages.length)], exp: pick(["None","Some","Experienced"]),
    days: Math.floor(rnd() * 30),
  };
});

const DRILL_CATS = ["Opening lines","Tonality","Discovery questions","Objection handling","Closing","Door-to-door","Retail","B2B","Telesales","Public selling","Follow-up","Confidence","Leadership","Product positioning","Referral asking","Customer retention"];
const DIFFS = ["Beginner","Intermediate","Advanced","Brutal"];
const DRILL_TEMPLATES = {
  "Opening lines": ["Craft a 7-second opener that earns 30 more seconds","Open without sounding like a salesperson","Pattern-interrupt a distracted prospect"],
  "Tonality": ["Lower your tone to project calm authority","Use the curious-uptick to invite a reply","Match-and-lead a high-energy buyer"],
  "Discovery questions": ["Uncover the real pain in 3 questions","Ask a question that reframes the budget","Get them to say the problem out loud"],
  "Objection handling": ["Neutralize 'I need to think about it'","Turn 'too expensive' into value","Handle 'just send me info' without folding"],
  "Closing": ["Run an assumptive close cleanly","Use the choice close on a fence-sitter","Stay silent after asking for the sale"],
  "Door-to-door": ["Earn a smile in the first 5 seconds at the door","Recover after a hard 'not interested'","Read the doorway and adjust your pitch"],
  "Retail": ["Approach a browsing shopper naturally","Create curiosity at a kiosk in one line","Manage two customers at once"],
  "B2B": ["Get past the gatekeeper with respect","Deliver a one-sentence value prop","Steer to an ROI conversation"],
  "Telesales": ["Beat the first 'we're not interested'","Keep tone warm through a script","Set the callback like it's already booked"],
  "Public selling": ["Approach a crowd without being awkward","Build a micro-commitment in public","Use crowd energy to your advantage"],
  "Follow-up": ["Write a follow-up that gets a reply","Re-open a cold lead with one message","Follow up without sounding desperate"],
  "Confidence": ["Reset your state after 5 rejections","Own the pause instead of filling it","Walk in like you belong there"],
  "Leadership": ["Run a 5-minute morning meeting","Coach a rep through a slump","Give feedback that lands"],
  "Product positioning": ["Position price against value, not cost","Tailor the pitch to the buyer's world","Lead with the outcome, not features"],
  "Referral asking": ["Ask for a referral at the peak moment","Make referring you feel easy","Turn a 'no' into a referral"],
  "Customer retention": ["Save an account that's drifting","Turn a complaint into loyalty","Schedule the next touch before you leave"],
};
const DRILLS = range(100).map((i) => {
  const cat = DRILL_CATS[i % DRILL_CATS.length];
  const t = DRILL_TEMPLATES[cat][i % 3];
  const diff = DIFFS[i % 4];
  return {
    id: "D" + (1 + i), title: t, cat, diff,
    objective: `Master "${cat}" under ${diff.toLowerCase()} pressure.`,
    instructions: `Launch the AI roleplay. You have one scenario. Apply the ${cat.toLowerCase()} technique and adapt to the customer's reaction in real time.`,
    success: `Score 80%+ on ${cat} and reach the agreed next step.`,
    scenario: `${pick(ENVS)} • ${pick(["friendly","skeptical","busy","rude","analytical","price-sensitive"])} customer`,
    mins: 3 + (i % 5),
  };
});

const COURSES = [
  { id: 1, title: "Welcome to OSP", env: "Foundation", icon: Rocket, color: C.blue, modules: ["OSP mission and culture","Brand representation","Professional standards","Growth mindset","How to use the app","First mission checklist"] },
  { id: 2, title: "Sales Foundations", env: "Foundation", icon: BookOpen, color: C.gold, modules: ["What selling really is","Confidence and posture","Understanding customers","Building trust fast","Asking better questions","Active listening","Ethical persuasion","Follow-up discipline"] },
  { id: 3, title: "Telesales Academy", env: "Telesales", icon: Phone, color: C.green, modules: ["Phone voice and tone","Opening scripts","Permission-based selling","Discovery questions","Handling hangups","Objection handling","Closing by phone","Follow-up cadence"] },
  { id: 4, title: "Door-to-Door Academy", env: "Door-to-Door", icon: DoorOpen, color: C.purple, modules: ["Territory mindset","First impression","Knock strategy","Safety & professionalism","Door opener scripts","Reading body language","Handling 'not interested'","Closing at the door"] },
  { id: 5, title: "Retail Sales Academy", env: "Retail", icon: Store, color: C.blueSoft, modules: ["Approaching shoppers","Creating curiosity","Kiosk/table presence","Product positioning","Short pitch mastery","Transitioning to close","Multi-customer awareness"] },
  { id: 6, title: "B2B Sales Academy", env: "B2B", icon: Building2, color: C.gold, modules: ["Business owner mindset","Gatekeeper strategy","Value proposition","Discovery","ROI conversation","Follow-up","Professional close"] },
  { id: 7, title: "Public Selling Academy", env: "Public", icon: Megaphone, color: C.red, modules: ["Public space confidence","Non-awkward approach","Reading pace & body language","Creating micro-commitments","Handling rejection publicly","Crowd energy","Fast close"] },
  { id: 8, title: "Objection Handling Mastery", env: "Skill", icon: ShieldCheck, color: C.green, modules: ["Not interested","Too expensive","I need to think about it","Talk to spouse/partner","I'm busy","I already have someone","Send me information","I don't trust salespeople"] },
  { id: 9, title: "Closing Mastery", env: "Skill", icon: Target, color: C.blue, modules: ["Assumptive close","Choice close","Summary close","Urgency without pressure","Trial close","Direct close","Next-step close","Silence after the close"] },
  { id: 10, title: "Leadership & Ownership Path", env: "Leadership", icon: Crown, color: C.gold, modules: ["Personal accountability","Coaching others","Running morning meetings","Tracking numbers","Building a team","Recruiting mindset","Leadership communication","Becoming an office leader"] },
].map((c, i) => ({ ...c, progress: [100,72,45,0,88,30,0,60,15,0][i], lessons: c.modules.length, enrolled: 120 - i * 7 }));

const BADGES = [
  ["First Login", Star], ["First Roleplay", Bot], ["10 Drills Done", Dumbbell], ["Objection Crusher", ShieldCheck],
  ["Door-to-Door Ready", DoorOpen], ["Retail Floor Ready", Store], ["B2B Pro", Building2], ["Telesales Titan", Phone],
  ["Public Performer", Megaphone], ["Perfect Quiz", CheckCircle2], ["7-Day Streak", Flame], ["Certified Closer", Target],
  ["Leadership Ready", Crown], ["Master Craftsman", Award], ["Wizard Salesman", Sparkles], ["OSP Legend", Trophy],
].map(([name, icon], i) => ({ name, icon, earned: i < 9 }));

const LEADERS = [...STUDENTS].sort((a, b) => b.xp - a.xp).slice(0, 12);
const CURRENT_STUDENT = { ...STUDENTS[3], name: "Marcus Reyes", first: "Marcus", xp: 6420, rank: RANKS[6], rankIdx: 6, streak: 9, certs: 4, courses: 6, drills: 47, roleplays: 23, avgScore: 88 };

const sparkSignups = range(14).map((i) => ({ d: `D${i + 1}`, signups: 8 + Math.round(Math.sin(i / 2) * 5 + rnd() * 6 + i / 2) }));
const courseBars = COURSES.map((c) => ({ name: c.title.split(" ")[0], done: Math.round(c.enrolled * (c.progress / 100)) }));
const funnel = [["New Lead", 200], ["Applied", 142], ["Screened", 96], ["Interview", 61], ["Accepted", 38], ["Active", 27]].map(([stage, v]) => ({ stage, v }));
const aiUsage = range(7).map((i) => ({ d: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i], rp: 20 + Math.round(rnd() * 60) }));
const teamPerf = MANAGERS.map((m) => ({ name: m.team.split(" ")[1], close: m.close }));
const sourcePie = SOURCES.slice(0, 6).map((s) => ({ name: s, v: 10 + Math.floor(rnd() * 40) }));
const PIE_COLORS = [C.blue, C.gold, C.green, C.purple, C.blueSoft, C.red];

const QUIZ = [
  { q: "A prospect says 'I need to think about it.' What's the strongest first move?", a: ["Agree and leave","Ask what specifically they want to think over","Drop the price","Send a brochure"], correct: 1, why: "Naming the real hesitation keeps the conversation alive and surfaces the true objection." },
  { q: "The fastest way to build trust at the door is to:", a: ["Talk more","Lead with price","Be genuinely curious about them","Read your script faster"], correct: 2, why: "Curiosity signals respect. People buy from people who make them feel understood." },
  { q: "After you ask for the sale, you should:", a: ["Keep talking","Stay silent and let them respond","Lower the price","Change the subject"], correct: 1, why: "Silence after the close transfers the decision to the buyer. Whoever speaks first often concedes." },
  { q: "A strong opener earns you:", a: ["The sale","Their phone number","30 more seconds of attention","A referral"], correct: 2, why: "An opener's only job is to buy time and curiosity — not to close." },
  { q: "'Too expensive' usually means:", a: ["They can't afford it","They don't see the value yet","You should leave","Discount immediately"], correct: 1, why: "Price objections are value gaps. Reframe to outcome before touching the number." },
];

/* ---------------- PRIMITIVES ---------------- */
const Card = ({ children, style, className = "", glow, onClick }) => (
  <div onClick={onClick} className={`rounded-2xl ${className}`} style={{
    background: C.card, border: `1px solid ${C.border}`,
    boxShadow: glow ? `0 0 0 1px ${C.blue}22, 0 8px 40px ${C.blue}18` : "0 8px 30px #00000040",
    cursor: onClick ? "pointer" : "default", ...style,
  }}>{children}</div>
);

const Btn = ({ children, kind = "primary", className = "", style, ...p }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 px-4 py-2.5 text-sm";
  const kinds = {
    primary: { ...grad(C.blue, "#1456d6"), color: "#fff", boxShadow: `0 6px 20px ${C.blue}55` },
    gold: { ...grad(C.goldSoft, C.gold), color: "#1a1304", boxShadow: `0 6px 20px ${C.gold}40` },
    ghost: { background: "transparent", color: C.text, border: `1px solid ${C.border}` },
    soft: { background: C.panel2, color: C.text, border: `1px solid ${C.border}` },
  };
  return <button className={`${base} ${className}`} style={{ ...kinds[kind], ...style }} {...p}>{children}</button>;
};

const Pill = ({ children, color = C.blue, soft = true }) => (
  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
    style={{ background: soft ? color + "1f" : color, color: soft ? color : "#fff", border: `1px solid ${color}40` }}>{children}</span>
);

const Ring = ({ value, size = 92, stroke = 9, color = C.gold, label, sub }) => {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="absolute text-center">
        <div className="font-bold" style={{ color: C.text, fontSize: size / 4.5 }}>{label ?? value + "%"}</div>
        {sub && <div style={{ color: C.sub, fontSize: 10 }}>{sub}</div>}
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, delta, color = C.blue }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-xs font-medium" style={{ color: C.sub }}>{label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight" style={{ color: C.text }}>{value}</div>
        {delta != null && <div className="mt-1 text-xs font-semibold" style={{ color: delta >= 0 ? C.green : C.red }}>{delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%</div>}
      </div>
      <div className="rounded-xl p-2.5" style={{ background: color + "1f", border: `1px solid ${color}33` }}><Icon size={20} color={color} /></div>
    </div>
  </Card>
);

const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "#000000bb", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full overflow-hidden rounded-2xl"
        style={{ maxWidth: wide ? 760 : 520, maxHeight: "88vh", background: C.panel, border: `1px solid ${C.border}`, boxShadow: "0 30px 80px #000" }}>
        <div className="flex items-center justify-between border-b p-4" style={{ borderColor: C.border }}>
          <div className="font-bold" style={{ color: C.text }}>{title}</div>
          <button onClick={onClose} className="rounded-lg p-1.5" style={{ background: C.panel2 }}><X size={18} color={C.sub} /></button>
        </div>
        <div className="overflow-auto p-5" style={{ maxHeight: "72vh" }}>{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, ...p }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>{label}</span>
    <input {...p} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
      style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
  </label>
);

const ChartCard = ({ title, children, action }) => (
  <Card className="p-4">
    <div className="mb-3 flex items-center justify-between">
      <div className="font-semibold" style={{ color: C.text }}>{title}</div>
      {action}
    </div>
    {children}
  </Card>
);
const tip = { background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, color: C.text };

/* ---------------- LANDING ---------------- */
function Landing({ onLogin, onSignup }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(null);
  const [form, setForm] = useState({ first: "", email: "", phone: "", city: "", state: "", exp: "None", env: "Telesales", source: "Indeed" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const benefits = [
    [Zap, "Paid skill development", "Get better while you build momentum."],
    [Crown, "Real leadership path", "From recruit to office leader, mapped out."],
    [Users, "Mentorship", "Learn from people who've closed in every room."],
    [Bot, "AI coaching 24/7", "Practice live roleplay any hour, judgment-free."],
    [Award, "Certifications", "Earn credentials that prove your skill."],
    [TrendingUp, "Advancement", "Rank up on performance, not politics."],
  ];
  const steps = [["Apply", UserPlus], ["Train", BookOpen], ["Practice", Bot], ["Certify", Award], ["Rank Up", TrendingUp], ["Lead", Crown]];
  const faqs = [
    ["Do I need sales experience?", "No. The university starts at New Recruit and takes you to Legend. Beginners welcome."],
    ["Is the training paid?", "OSP invests in paid skill development as you progress through the program."],
    ["How long until I'm selling?", "Most recruits finish Welcome to OSP and their first AI roleplay on day one."],
    ["What makes OSP different?", "AI roleplay, gamified ranks, real mentorship, and a clear path to leadership."],
  ];
  return (
    <div style={{ background: C.bg, color: C.text }}>
      {/* nav */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-4 md:px-10" style={{ background: C.bg + "e6", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.border}` }}>
        <Logo />
        <div className="flex items-center gap-2">
          <Btn kind="ghost" onClick={onLogin}>Log in</Btn>
          <Btn kind="gold" onClick={() => setOpen(true)}>Start Your Journey</Btn>
        </div>
      </div>

      {/* hero */}
      <div className="relative overflow-hidden px-5 pb-20 pt-16 text-center md:px-10 md:pt-24">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(700px 360px at 50% -10%, ${C.blue}33, transparent), radial-gradient(500px 300px at 80% 20%, ${C.gold}18, transparent)` }} />
        <div className="relative mx-auto max-w-4xl">
          <Pill color={C.gold}><Sparkles size={12} /> Recruit · Train · Certify · Promote · Build Leaders</Pill>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Build Your Future in Sales with <span style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.blueSoft})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>OSP Sales University</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg" style={{ color: C.sub }}>
            Learn direct sales, retail, B2B, door-to-door, and public selling. Train with AI coaching, earn certifications, and climb a clear path toward leadership and financial stability.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Btn kind="gold" className="px-6 py-3 text-base" onClick={() => setOpen(true)}><Rocket size={18} /> Start Your Sales Journey</Btn>
            <Btn kind="ghost" className="px-6 py-3 text-base" onClick={onLogin}>Explore the Academy <ArrowRight size={16} /></Btn>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4">
            {[["50+","Active students"],["10","Academies"],["100","AI drills"]].map(([n, l]) => (
              <Card key={l} className="p-4"><div className="text-3xl font-extrabold" style={{ color: C.gold }}>{n}</div><div className="text-xs" style={{ color: C.sub }}>{l}</div></Card>
            ))}
          </div>
        </div>
      </div>

      {/* benefits */}
      <Section eyebrow="Why OSP" title="Everything you need to win in any room">
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map(([Icon, t, d]) => (
            <Card key={t} className="p-5">
              <div className="mb-3 inline-flex rounded-xl p-2.5" style={{ background: C.blue + "1f", border: `1px solid ${C.blue}33` }}><Icon size={22} color={C.blueSoft} /></div>
              <div className="font-bold">{t}</div><div className="mt-1 text-sm" style={{ color: C.sub }}>{d}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* how it works */}
      <Section eyebrow="The Path" title="How it works">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {steps.map(([t, Icon], i) => (
            <Card key={t} className="p-4 text-center">
              <div className="mb-2 text-xs font-bold" style={{ color: C.gold }}>0{i + 1}</div>
              <div className="mx-auto mb-2 inline-flex rounded-full p-3" style={{ background: C.panel2, border: `1px solid ${C.border}` }}><Icon size={20} color={C.blueSoft} /></div>
              <div className="text-sm font-semibold">{t}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* course preview */}
      <Section eyebrow="The Curriculum" title="Train across every selling environment">
        <div className="grid gap-4 md:grid-cols-3">
          {COURSES.slice(0, 6).map((c) => (
            <Card key={c.id} className="overflow-hidden p-0">
              <div className="flex items-center gap-3 p-4" style={grad(c.color + "22", "transparent")}>
                <div className="rounded-xl p-2.5" style={{ background: c.color + "22", border: `1px solid ${c.color}44` }}><c.icon size={20} color={c.color} /></div>
                <div><div className="font-bold">{c.title}</div><div className="text-xs" style={{ color: C.sub }}>{c.lessons} modules · {c.enrolled} enrolled</div></div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* testimonials */}
      <Section eyebrow="Voices" title="Recruits who leveled up">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Devin Brooks","Closing Specialist","Six months ago I'd never knocked a door. The roleplay arena got me reps before the real ones — now I lead our morning meetings."],
            ["Aaliyah Coleman","Territory Captain","The drills are addictive. I hit a 14-day streak and my close rate doubled. The path to leadership is actually real here."],
            ["Jamal Carter","Elite Brand Ambassador","OSP felt like a university, not a hustle. Certifications, mentorship, and a team that wants you to win."]].map(([n, r, q]) => (
            <Card key={n} className="p-5">
              <Quote size={20} color={C.gold} />
              <p className="mt-3 text-sm" style={{ color: C.text }}>{q}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{n[0]}</div>
                <div><div className="text-sm font-semibold">{n}</div><div className="text-xs" style={{ color: C.gold }}>{r}</div></div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Questions" title="Frequently asked">
        <div className="mx-auto max-w-2xl space-y-3">{faqs.map(([q, a]) => <FAQ key={q} q={q} a={a} />)}</div>
      </Section>

      {/* CTA */}
      <div className="px-5 py-16 text-center md:px-10">
        <Card glow className="mx-auto max-w-3xl p-10" style={grad(C.blue + "22", C.gold + "11")}>
          <h2 className="text-3xl font-extrabold md:text-4xl">Your future belongs to people who take action.</h2>
          <p className="mx-auto mt-3 max-w-xl" style={{ color: C.sub }}>Apply now and start your first AI roleplay today.</p>
          <Btn kind="gold" className="mt-6 px-7 py-3 text-base" onClick={() => setOpen(true)}><Rocket size={18} /> Start Your Sales Journey</Btn>
        </Card>
      </div>
      <div className="border-t px-5 py-8 text-center text-xs md:px-10" style={{ borderColor: C.border, color: C.sub }}>
        © 2026 One Source Provider · OSP Sales University · Owned by Dean Elali
      </div>

      {/* signup modal */}
      <Modal open={open && !done} onClose={() => setOpen(false)} title="Start Your Sales Journey" wide>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="First & last name" value={form.first} onChange={set("first")} placeholder="Marcus Reyes" />
          <Field label="Email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
          <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="(555) 555-0100" />
          <Field label="City" value={form.city} onChange={set("city")} placeholder="Detroit" />
          <Field label="State" value={form.state} onChange={set("state")} placeholder="MI" />
          <Select label="Experience level" value={form.exp} onChange={set("exp")} options={["None","Some","Experienced"]} />
          <Select label="Desired sales environment" value={form.env} onChange={set("env")} options={ENVS} />
          <Select label="How did you hear about us?" value={form.source} onChange={set("source")} options={SOURCES} />
        </div>
        <Btn kind="gold" className="mt-5 w-full py-3" onClick={() => { setDone(form.first || "Recruit"); onSignup && onSignup(form); }}>
          Submit application <ArrowRight size={16} />
        </Btn>
      </Modal>

      {/* success + welcome email */}
      <Modal open={!!done} onClose={() => { setDone(null); setOpen(false); }} title="Application received 🎉" wide>
        <div className="text-center">
          <div className="mx-auto mb-3 inline-flex rounded-full p-4" style={{ background: C.green + "22" }}><CheckCircle2 size={40} color={C.green} /></div>
          <h3 className="text-xl font-bold">Welcome to the team, {done}!</h3>
          <p className="mt-1 text-sm" style={{ color: C.sub }}>Your account is being created. Here's the welcome email landing in your inbox:</p>
        </div>
        <WelcomeEmail first={done} className="mt-4" />
        <Btn kind="primary" className="mt-4 w-full py-3" onClick={onLogin}>Go to the Academy <ArrowRight size={16} /></Btn>
      </Modal>
    </div>
  );
}

const Section = ({ eyebrow, title, children }) => (
  <div className="px-5 py-12 md:px-10">
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 text-center">
        <div className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>{eyebrow}</div>
        <h2 className="mt-1 text-2xl font-extrabold md:text-3xl" style={{ color: C.text }}>{title}</h2>
      </div>
      {children}
    </div>
  </div>
);
const Select = ({ label, options, ...p }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>{label}</span>
    <select {...p} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }}>
      {options.map((o) => <option key={o} value={o} style={{ background: C.panel }}>{o}</option>)}
    </select>
  </label>
);
const FAQ = ({ q, a }) => {
  const [o, setO] = useState(false);
  return (
    <Card className="p-0">
      <button onClick={() => setO(!o)} className="flex w-full items-center justify-between p-4 text-left">
        <span className="font-semibold" style={{ color: C.text }}>{q}</span>
        <ChevronDown size={18} color={C.sub} style={{ transform: o ? "rotate(180deg)" : "none", transition: ".2s" }} />
      </button>
      {o && <div className="px-4 pb-4 text-sm" style={{ color: C.sub }}>{a}</div>}
    </Card>
  );
};
const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl font-extrabold" style={{ ...grad(C.gold, "#e0a82e"), color: "#1a1304" }}>O</div>
    <div className="leading-tight"><div className="text-sm font-extrabold" style={{ color: C.text }}>OSP Sales University</div><div style={{ color: C.sub, fontSize: 10 }}>Recruit · Train · Certify · Lead</div></div>
  </div>
);

function WelcomeEmail({ first = "Marcus", className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl ${className}`} style={{ border: `1px solid ${C.border}`, background: C.panel2 }}>
      <div className="border-b px-4 py-2 text-xs" style={{ borderColor: C.border, color: C.sub }}>
        <span style={{ color: C.text }}>To:</span> {first.toLowerCase()}@email.com &nbsp;·&nbsp; <span style={{ color: C.text }}>From:</span> OSP Sales University
      </div>
      <div className="p-5" style={{ color: C.text }}>
        <div className="mb-3 font-bold" style={{ color: C.gold }}>Welcome to OSP Sales University — Your Future Starts Now</div>
        <p className="text-sm leading-relaxed" style={{ color: C.sub }}>
          Congratulations {first}! You just took a powerful step toward a more consistent, confident, and financially stable future.
          Welcome to OSP Sales University — the training ground built to help you win in any room, any neighborhood, any retail floor, and any business conversation. This is your launchpad.
        </p>
        <div className="mt-3 text-sm font-semibold">Inside your dashboard you'll find:</div>
        <ul className="mt-1 space-y-1 text-sm" style={{ color: C.sub }}>
          {["Your personalized training path","AI coaching and live roleplay practice","Sales drills to sharpen your confidence","Courses for telesales, door-to-door, B2B, retail, and public selling","Certifications, badges, rankings, and achievement levels","A clear path from beginner to elite sales leader"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 size={14} color={C.green} className="mt-0.5 shrink-0" /> {x}</li>)}
        </ul>
        <div className="mt-3 rounded-lg p-3 text-sm" style={{ background: C.blue + "1a", border: `1px solid ${C.blue}33` }}>
          <b style={{ color: C.text }}>Your first mission:</b> <span style={{ color: C.sub }}>Log in, complete your Welcome to OSP course, and start your first AI roleplay.</span>
        </div>
        <p className="mt-3 text-sm" style={{ color: C.sub }}>We're excited to watch you level up.<br />Welcome to the team,<br /><b style={{ color: C.text }}>OSP Sales University</b></p>
      </div>
    </div>
  );
}

/* ---------------- LOGIN ---------------- */
function Login({ onAuth, onBack }) {
  const roles = [
    ["admin@osp.com", "Super Admin", ShieldCheck, C.gold, "admin"],
    ["manager@osp.com", "Recruiter / Manager", Briefcase, C.blue, "manager"],
    ["student@osp.com", "Sales Student / Agent", GraduationCap, C.green, "student"],
  ];
  return (
    <div className="flex min-h-screen items-center justify-center p-5" style={{ background: C.bg }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(600px 300px at 50% 0%, ${C.blue}22, transparent)` }} />
      <Card glow className="relative w-full max-w-md p-7">
        <div className="mb-6 flex justify-center"><Logo /></div>
        <div className="mb-1 text-center text-lg font-bold" style={{ color: C.text }}>Choose a demo role</div>
        <div className="mb-5 text-center text-xs" style={{ color: C.sub }}>One-click login · password is <code style={{ color: C.gold }}>password</code></div>
        <div className="space-y-2.5">
          {roles.map(([email, label, Icon, color, role]) => (
            <button key={role} onClick={() => onAuth(role)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all hover:translate-x-1"
              style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
              <div className="rounded-lg p-2" style={{ background: color + "22", border: `1px solid ${color}44` }}><Icon size={20} color={color} /></div>
              <div className="flex-1"><div className="font-semibold" style={{ color: C.text }}>{label}</div><div className="text-xs" style={{ color: C.sub }}>{email}</div></div>
              <ChevronRight size={18} color={C.sub} />
            </button>
          ))}
        </div>
        <button onClick={onBack} className="mt-5 w-full text-center text-xs" style={{ color: C.sub }}>← Back to landing page</button>
      </Card>
    </div>
  );
}

/* ---------------- APP SHELL ---------------- */
const NAV = {
  admin: [
    ["Overview", LayoutDashboard], ["Users", Users], ["Recruiting", Briefcase], ["Courses", GraduationCap],
    ["Drills", Dumbbell], ["AI Command", Bot], ["Certificates", Award], ["Leaderboards", Trophy],
    ["Reports", BarChart3], ["Templates", Mail], ["Settings", Settings], ["Integrations", Plug],
  ],
  student: [
    ["My Dashboard", LayoutDashboard], ["My Courses", GraduationCap], ["AI Coach", Bot], ["Roleplay Arena", Target],
    ["Sales Drills", Dumbbell], ["Tests", ClipboardList], ["Badges", Award], ["Leaderboard", Trophy],
    ["My Tasks", CheckCircle], ["Resources", BookOpen], ["Profile", Users],
  ],
  manager: [
    ["Overview", LayoutDashboard], ["Recruiting", Briefcase], ["My Team", Users], ["Courses", GraduationCap],
    ["Leaderboards", Trophy], ["Reports", BarChart3],
  ],
};

function Shell({ role, onLogout }) {
  const nav = NAV[role];
  const [tab, setTab] = useState(nav[0][0]);
  const [openNav, setOpenNav] = useState(false);
  const roleLabel = { admin: "Super Admin", manager: "Manager", student: "Sales Student" }[role];
  return (
    <div className="flex min-h-screen" style={{ background: C.bg, color: C.text }}>
      {/* sidebar */}
      <div className={`fixed z-40 h-screen w-64 shrink-0 flex-col border-r p-3 md:flex ${openNav ? "flex" : "hidden"}`} style={{ background: C.panel, borderColor: C.border }}>
        <div className="px-2 py-3"><Logo /></div>
        <div className="mt-2 flex-1 space-y-1 overflow-auto">
          {nav.map(([name, Icon]) => {
            const active = tab === name;
            return (
              <button key={name} onClick={() => { setTab(name); setOpenNav(false); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                style={{ background: active ? C.blue + "22" : "transparent", color: active ? C.text : C.sub, border: `1px solid ${active ? C.blue + "44" : "transparent"}` }}>
                <Icon size={18} color={active ? C.blueSoft : C.sub} /> {name}
                {active && <div className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: C.gold }} />}
              </button>
            );
          })}
        </div>
        <button onClick={onLogout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm" style={{ color: C.sub }}><LogOut size={18} /> Log out</button>
      </div>

      {/* main */}
      <div className="flex-1 md:ml-64">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 md:px-7" style={{ background: C.bg + "e6", backdropFilter: "blur(10px)", borderColor: C.border }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpenNav(!openNav)}><Menu size={22} color={C.text} /></button>
            <div><div className="text-lg font-bold">{tab}</div><div className="text-xs" style={{ color: C.sub }}>{roleLabel} workspace</div></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl px-3 py-2 md:flex" style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
              <Search size={15} color={C.sub} /><input placeholder="Search…" className="bg-transparent text-sm outline-none" style={{ color: C.text, width: 130 }} />
            </div>
            <div className="flex items-center gap-2 rounded-xl px-2.5 py-1.5" style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{role === "student" ? "MR" : role === "admin" ? "SA" : "MG"}</div>
              <span className="hidden text-sm font-semibold md:inline">{role === "student" ? "Marcus R." : roleLabel}</span>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-7">
          {role === "admin" && <AdminViews tab={tab} />}
          {role === "manager" && <AdminViews tab={tab} manager />}
          {role === "student" && <StudentViews tab={tab} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- ADMIN VIEWS ---------------- */
function AdminViews({ tab, manager }) {
  switch (tab) {
    case "Overview": return <AdminOverview manager={manager} />;
    case "Users": case "My Team": return <UsersView manager={manager} />;
    case "Recruiting": return <Recruiting />;
    case "Courses": return <CoursesView admin />;
    case "Drills": return <DrillsView />;
    case "AI Command": return <AICommand />;
    case "Certificates": return <CertsView />;
    case "Leaderboards": case "Leaderboard": return <LeaderboardView />;
    case "Reports": return <Reports />;
    case "Templates": return <Templates />;
    case "Settings": return <SettingsView />;
    case "Integrations": return <Integrations />;
    default: return <AdminOverview />;
  }
}

function AdminOverview({ manager }) {
  const stats = [
    [Users, "Total users", "258", 12, C.blue], [UserPlus, "New recruits today", "14", 22, C.green],
    [GraduationCap, "Active students", "190", 4, C.blueSoft], [Target, "Course completion", "68%", 6, C.gold],
    [ClipboardList, "Avg test score", "84%", 3, C.purple], [Bot, "AI roleplays done", "1,247", 31, C.green],
    [Award, "Certs issued", "312", 9, C.gold], [TrendingUp, "Mock sales (mo)", "$184k", 15, C.blue],
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{stats.map((s) => <Stat key={s[1]} icon={s[0]} label={s[1]} value={s[2]} delta={s[3]} color={s[4]} />)}</div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><ChartCard title="Signups over time (14 days)" action={<Pill color={C.green}>▲ 22%</Pill>}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={sparkSignups}><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity={0.7} /><stop offset="100%" stopColor={C.blue} stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="d" stroke={C.sub} fontSize={11} /><YAxis stroke={C.sub} fontSize={11} /><Tooltip contentStyle={tip} />
              <Area type="monotone" dataKey="signups" stroke={C.blueSoft} strokeWidth={2} fill="url(#g1)" /></AreaChart>
          </ResponsiveContainer></ChartCard></div>
        <ChartCard title="Applicant source breakdown">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={sourcePie} dataKey="v" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>{sourcePie.map((e, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}</Pie><Tooltip contentStyle={tip} /></PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-2">{sourcePie.map((e, i) => <span key={e.name} className="flex items-center gap-1 text-xs" style={{ color: C.sub }}><span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />{e.name}</span>)}</div>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Recruiting funnel">
          <div className="space-y-2">{funnel.map((f, i) => (
            <div key={f.stage}><div className="mb-1 flex justify-between text-xs"><span style={{ color: C.sub }}>{f.stage}</span><span style={{ color: C.text }}>{f.v}</span></div>
              <div className="h-2.5 rounded-full" style={{ background: C.panel2 }}><div className="h-2.5 rounded-full" style={{ width: `${(f.v / 200) * 100}%`, ...grad(C.blue, C.gold) }} /></div></div>
          ))}</div>
        </ChartCard>
        <ChartCard title="Course completions by course">
          <ResponsiveContainer width="100%" height={200}><BarChart data={courseBars}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="name" stroke={C.sub} fontSize={10} /><YAxis stroke={C.sub} fontSize={11} /><Tooltip contentStyle={tip} /><Bar dataKey="done" fill={C.gold} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="AI coaching usage (week)">
          <ResponsiveContainer width="100%" height={200}><LineChart data={aiUsage}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="d" stroke={C.sub} fontSize={11} /><YAxis stroke={C.sub} fontSize={11} /><Tooltip contentStyle={tip} /><Line type="monotone" dataKey="rp" stroke={C.green} strokeWidth={2.5} dot={{ r: 3 }} /></LineChart></ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4"><div className="mb-3 flex items-center gap-2 font-semibold"><Trophy size={16} color={C.gold} /> Top performers</div>
          <div className="space-y-2">{LEADERS.slice(0, 5).map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 rounded-lg p-2" style={{ background: i === 0 ? C.gold + "12" : "transparent" }}>
              <span className="w-5 text-center text-sm font-bold" style={{ color: i < 3 ? C.gold : C.sub }}>{i + 1}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{s.name[0]}</div>
              <div className="flex-1 text-sm"><div className="font-semibold">{s.name}</div><div className="text-xs" style={{ color: C.sub }}>{s.rank}</div></div>
              <span className="text-sm font-bold" style={{ color: C.gold }}>{s.xp.toLocaleString()} XP</span>
            </div>
          ))}</div></Card>
        <Card className="p-4"><div className="mb-3 flex items-center gap-2 font-semibold"><AlertTriangle size={16} color={C.red} /> At-risk students</div>
          <div className="space-y-2">{STUDENTS.filter((s) => s.status === "At Risk").slice(0, 5).map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-lg p-2" style={{ background: C.red + "0d" }}>
              <div className="text-sm"><div className="font-semibold">{s.name}</div><div className="text-xs" style={{ color: C.sub }}>Inactive {s.lastActive}d · {s.courses}/10 courses</div></div>
              <Pill color={C.red}>At risk</Pill>
            </div>
          ))}</div></Card>
        <Card className="p-4"><div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2 font-semibold"><Clock size={16} color={C.blueSoft} /> Pending applicants</div><Pill color={C.blue}>{APPLICANTS.filter((a) => a.stage === "Applied").length} new</Pill></div>
          <div className="space-y-2">{APPLICANTS.slice(0, 5).map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg p-2" style={{ background: C.panel2 }}>
              <div className="text-sm"><div className="font-semibold">{a.name}</div><div className="text-xs" style={{ color: C.sub }}>{a.city}, {a.state} · {a.source}</div></div>
              <Pill color={C.blueSoft} soft>{a.stage}</Pill>
            </div>
          ))}</div></Card>
      </div>
    </div>
  );
}

function UsersView({ manager }) {
  const [q, setQ] = useState("");
  const data = [...STUDENTS, ...MANAGERS].filter((u) => u.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
          <Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="bg-transparent text-sm outline-none" style={{ color: C.text }} />
        </div>
        <Btn kind="soft"><Filter size={15} /> Filters</Btn>
        <Btn kind="primary" className="ml-auto"><Plus size={15} /> Add user</Btn>
      </div>
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr style={{ color: C.sub }}>{["Name","Role","Location","Rank / Team","XP","Avg score","Status"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
            <tbody>{data.slice(0, 30).map((u, i) => (
              <tr key={u.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 ? C.panel2 + "55" : "transparent" }}>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{u.name[0]}</div><span className="font-semibold" style={{ color: C.text }}>{u.name}</span></div></td>
                <td className="px-4 py-3"><Pill color={u.role === "Manager" ? C.blue : C.green}>{u.role}</Pill></td>
                <td className="px-4 py-3" style={{ color: C.sub }}>{u.city ? `${u.city}, ${u.state}` : "—"}</td>
                <td className="px-4 py-3" style={{ color: C.sub }}>{u.rank || u.team}</td>
                <td className="px-4 py-3" style={{ color: C.gold }}>{u.xp ? u.xp.toLocaleString() : "—"}</td>
                <td className="px-4 py-3" style={{ color: C.text }}>{u.avgScore ? u.avgScore + "%" : "—"}</td>
                <td className="px-4 py-3">{u.status ? <Pill color={u.status === "At Risk" ? C.red : u.status === "New" ? C.blueSoft : C.green}>{u.status}</Pill> : <Pill color={C.purple}>Staff</Pill>}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Card>
      <div className="text-xs" style={{ color: C.sub }}>Showing 30 of {data.length} users · 50 students + 8 managers + 200 applicants seeded</div>
    </div>
  );
}

function Recruiting() {
  const [builder, setBuilder] = useState(false);
  const stages = ["New Lead","Applied","Screened","Interview Scheduled","Accepted","Onboarding","Active Student"];
  const stageColor = [C.sub, C.blueSoft, C.blue, C.purple, C.gold, C.green, C.green];
  const platforms = [["Indeed","Connected",C.green],["ZipRecruiter","Connected",C.green],["LinkedIn","Needs API",C.gold],["Facebook Jobs","Manual Review",C.red],["Craigslist","Needs API",C.gold],["Handshake","Connected",C.green]];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Btn kind="gold" onClick={() => setBuilder(true)}><Plus size={15} /> Create job post</Btn>
        <Btn kind="soft"><Bot size={15} /> AI generate post</Btn>
        <Btn kind="soft"><Calendar size={15} /> Recruiting calendar</Btn>
        <Btn kind="ghost" className="ml-auto"><Send size={15} /> Post to platforms</Btn>
      </div>

      <Card className="p-4">
        <div className="mb-3 font-semibold">Platform integrations</div>
        <div className="grid gap-3 md:grid-cols-3">{platforms.map(([n, s, c]) => (
          <div key={n} className="flex items-center justify-between rounded-xl p-3" style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
            <span className="font-semibold" style={{ color: C.text }}>{n}</span><Pill color={c}>{s}</Pill>
          </div>
        ))}</div>
      </Card>

      <div>
        <div className="mb-3 font-semibold">Applicant pipeline · 200 candidates</div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {stages.map((st, si) => {
            const cands = APPLICANTS.filter((a) => a.stage === st).slice(0, 4);
            return (
              <div key={st} className="w-60 shrink-0 rounded-xl p-3" style={{ background: C.panel, border: `1px solid ${C.border}` }}>
                <div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold" style={{ color: stageColor[si] }}>{st}</span><Pill color={stageColor[si]}>{APPLICANTS.filter((a) => a.stage === st).length}</Pill></div>
                <div className="space-y-2">{cands.map((a) => (
                  <Card key={a.id} className="p-3" style={{ background: C.panel2 }}>
                    <div className="text-sm font-semibold">{a.name}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs" style={{ color: C.sub }}><MapPin size={11} /> {a.city}, {a.state}</div>
                    <div className="mt-2 flex items-center justify-between"><Pill color={C.blueSoft}>{a.source}</Pill><span className="text-xs" style={{ color: C.sub }}>{a.days}d</span></div>
                  </Card>
                ))}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal open={builder} onClose={() => setBuilder(false)} title="Job post builder" wide>
        <div className="grid gap-3">
          <Field label="Job title" defaultValue="Entry-Level Sales Representative — Paid Training" />
          <Field label="Location" defaultValue="Detroit, MI (Field + Office)" />
          <label className="block"><span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>Description</span>
            <textarea rows={5} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }}
              defaultValue="Join OSP Sales University — a paid training ground for ambitious people who want a real career in sales. No experience required. AI coaching, certifications, and a clear path to leadership." /></label>
          <div><div className="mb-2 text-xs font-semibold" style={{ color: C.sub }}>Post to platforms</div>
            <div className="flex flex-wrap gap-2">{["Indeed","ZipRecruiter","LinkedIn","Facebook Jobs","Handshake","Internal referral"].map((p) => <Pill key={p} color={C.blue}>{p}</Pill>)}</div></div>
          <Card className="p-3" style={{ background: C.blue + "12" }}><div className="flex items-center gap-2 text-sm"><Bot size={16} color={C.blueSoft} /> <span style={{ color: C.sub }}>AI can rewrite this post per platform tone (LinkedIn = professional, Facebook = energetic). Mocked in demo.</span></div></Card>
        </div>
        <Btn kind="gold" className="mt-4 w-full py-3" onClick={() => setBuilder(false)}><Send size={16} /> Publish & post to platforms</Btn>
      </Modal>
    </div>
  );
}

function CoursesView({ admin }) {
  const [active, setActive] = useState(null);
  if (active) return <CourseDetail course={active} onBack={() => setActive(null)} admin={admin} />;
  return (
    <div className="space-y-4">
      {admin && <div className="flex gap-3"><Btn kind="gold"><Plus size={15} /> New course</Btn><Btn kind="soft"><Bot size={15} /> AI course outline</Btn></div>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <Card key={c.id} className="overflow-hidden p-0" glow={c.progress === 100} onClick={() => setActive(c)}>
            <div className="flex items-center gap-3 p-4" style={grad(c.color + "1f", "transparent")}>
              <div className="rounded-xl p-2.5" style={{ background: c.color + "22", border: `1px solid ${c.color}44` }}><c.icon size={22} color={c.color} /></div>
              <div className="flex-1"><div className="font-bold">{c.title}</div><div className="text-xs" style={{ color: C.sub }}>{c.env} · {c.lessons} modules</div></div>
              {c.progress === 0 ? <Lock size={16} color={C.sub} /> : c.progress === 100 ? <CheckCircle2 size={18} color={C.green} /> : <Unlock size={16} color={C.gold} />}
            </div>
            <div className="px-4 pb-4">
              <div className="mb-1 flex justify-between text-xs"><span style={{ color: C.sub }}>{admin ? `${c.enrolled} enrolled` : "Progress"}</span><span style={{ color: C.text }}>{c.progress}%</span></div>
              <div className="h-2 rounded-full" style={{ background: C.panel2 }}><div className="h-2 rounded-full" style={{ width: `${c.progress}%`, ...grad(c.color, c.color) }} /></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CourseDetail({ course, onBack, admin }) {
  const [quiz, setQuiz] = useState(false);
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm" style={{ color: C.sub }}>← All courses</button>
      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-4 p-5" style={grad(course.color + "22", "transparent")}>
          <div className="rounded-2xl p-3" style={{ background: course.color + "22", border: `1px solid ${course.color}44` }}><course.icon size={32} color={course.color} /></div>
          <div className="flex-1"><div className="text-xl font-bold">{course.title}</div><div className="text-sm" style={{ color: C.sub }}>{course.env} Academy · {course.lessons} modules · quiz + certificate</div></div>
          <Ring value={course.progress} size={70} color={course.color} />
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><Card className="p-4">
          <div className="mb-3 font-semibold">Modules</div>
          <div className="space-y-2">{course.modules.map((m, i) => {
            const doneCount = Math.round((course.progress / 100) * course.modules.length);
            const done = i < doneCount;
            return (
              <div key={m} className="flex items-center gap-3 rounded-xl p-3" style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ background: done ? C.green + "22" : C.card, color: done ? C.green : C.sub, border: `1px solid ${done ? C.green : C.border}` }}>{done ? <CheckCircle2 size={15} /> : i + 1}</div>
                <span className="flex-1 text-sm" style={{ color: C.text }}>{m}</span>
                {done ? <Pill color={C.green}>Done</Pill> : <Play size={16} color={C.blueSoft} />}
              </div>
            );
          })}</div>
        </Card></div>
        <div className="space-y-4">
          <Card className="p-4"><div className="mb-2 font-semibold">Course quiz</div><div className="text-sm" style={{ color: C.sub }}>{QUIZ.length} questions · 80% to pass · unlimited retakes · AI explains wrong answers.</div>
            <Btn kind="gold" className="mt-3 w-full" onClick={() => setQuiz(true)}><ClipboardList size={15} /> Take the quiz</Btn></Card>
          <Card className="p-4"><div className="mb-2 font-semibold">Certificate</div><div className="text-sm" style={{ color: C.sub }}>Pass the quiz to unlock your completion certificate and the course badge.</div>
            {course.progress === 100 ? <Pill color={C.green} >Earned</Pill> : <div className="mt-2 text-xs" style={{ color: C.gold }}>🔒 Locked until passed</div>}</Card>
        </div>
      </div>
      <Quiz open={quiz} onClose={() => setQuiz(false)} course={course} />
    </div>
  );
}

function Quiz({ open, onClose, course }) {
  const [i, setI] = useState(0); const [sel, setSel] = useState(null); const [score, setScore] = useState(0); const [done, setDone] = useState(false); const [reveal, setReveal] = useState(false);
  useEffect(() => { if (open) { setI(0); setSel(null); setScore(0); setDone(false); setReveal(false); } }, [open]);
  const q = QUIZ[i];
  const submit = () => {
    if (sel == null) return;
    setReveal(true);
    if (sel === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= QUIZ.length) setDone(true);
    else { setI(i + 1); setSel(null); setReveal(false); }
  };
  const pct = Math.round((score / QUIZ.length) * 100);
  return (
    <Modal open={open} onClose={onClose} title={`${course.title} · Quiz`} wide>
      {!done ? (
        <div>
          <div className="mb-2 flex items-center justify-between text-xs" style={{ color: C.sub }}><span>Question {i + 1} of {QUIZ.length}</span><span>Score {score}</span></div>
          <div className="mb-4 h-1.5 rounded-full" style={{ background: C.panel2 }}><div className="h-1.5 rounded-full" style={{ width: `${((i) / QUIZ.length) * 100}%`, ...grad(C.blue, C.gold) }} /></div>
          <div className="mb-3 text-base font-semibold">{q.q}</div>
          <div className="space-y-2">{q.a.map((opt, oi) => {
            const isCorrect = reveal && oi === q.correct, isWrong = reveal && oi === sel && sel !== q.correct;
            return (
              <button key={oi} disabled={reveal} onClick={() => setSel(oi)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm"
                style={{ background: sel === oi ? C.blue + "22" : C.panel2, border: `1px solid ${isCorrect ? C.green : isWrong ? C.red : sel === oi ? C.blue : C.border}`, color: C.text }}>
                <div className="flex h-5 w-5 items-center justify-center rounded-full text-xs" style={{ border: `1px solid ${C.border}` }}>{String.fromCharCode(65 + oi)}</div>
                {opt}{isCorrect && <CheckCircle2 size={16} color={C.green} className="ml-auto" />}{isWrong && <X size={16} color={C.red} className="ml-auto" />}
              </button>
            );
          })}</div>
          {reveal && <Card className="mt-3 p-3" style={{ background: C.blue + "12" }}><div className="flex gap-2 text-sm"><Bot size={16} color={C.blueSoft} className="mt-0.5 shrink-0" /><span style={{ color: C.sub }}><b style={{ color: C.text }}>AI explanation:</b> {q.why}</span></div></Card>}
          {!reveal ? <Btn kind="primary" className="mt-4 w-full" onClick={submit}>Submit answer</Btn> : <Btn kind="gold" className="mt-3 w-full" onClick={next}>{i + 1 >= QUIZ.length ? "See results" : "Next question"} <ArrowRight size={15} /></Btn>}
        </div>
      ) : (
        <div className="text-center">
          <Ring value={pct} size={120} color={pct >= 80 ? C.green : C.gold} />
          <div className="mt-4 text-xl font-bold">{pct >= 80 ? "Passed! 🎉" : "Almost — retake to pass"}</div>
          <div className="mt-1 text-sm" style={{ color: C.sub }}>You scored {score}/{QUIZ.length}. {pct >= 80 ? "Certificate and badge unlocked." : "You need 80% to pass — review the AI notes and try again."}</div>
          <div className="mt-4 flex gap-2">
            <Btn kind="soft" className="flex-1" onClick={() => { setI(0); setSel(null); setScore(0); setDone(false); setReveal(false); }}>Retake</Btn>
            {pct >= 80 && <Btn kind="gold" className="flex-1" onClick={onClose}><Award size={15} /> View certificate</Btn>}
          </div>
        </div>
      )}
    </Modal>
  );
}

function DrillsView() {
  const [cat, setCat] = useState("All"); const [diff, setDiff] = useState("All"); const [sel, setSel] = useState(null);
  const filtered = DRILLS.filter((d) => (cat === "All" || d.cat === cat) && (diff === "All" || d.diff === diff));
  const diffColor = { Beginner: C.green, Intermediate: C.blueSoft, Advanced: C.gold, Brutal: C.red };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select label="" value={cat} onChange={(e) => setCat(e.target.value)} options={["All", ...DRILL_CATS]} />
        <Select label="" value={diff} onChange={(e) => setDiff(e.target.value)} options={["All", ...DIFFS]} />
        <div className="ml-auto self-end text-sm" style={{ color: C.sub }}>{filtered.length} of 100 drills</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 24).map((d) => (
          <Card key={d.id} className="p-4" onClick={() => setSel(d)}>
            <div className="mb-2 flex items-center justify-between"><Pill color={C.blue}>{d.cat}</Pill><Pill color={diffColor[d.diff]}>{d.diff}</Pill></div>
            <div className="font-semibold" style={{ color: C.text }}>{d.title}</div>
            <div className="mt-1 text-xs" style={{ color: C.sub }}>{d.scenario} · {d.mins} min</div>
            <Btn kind="soft" className="mt-3 w-full"><Play size={14} /> Launch roleplay</Btn>
          </Card>
        ))}
      </div>
      {filtered.length > 24 && <div className="text-center text-xs" style={{ color: C.sub }}>Showing first 24 — filter to narrow the full 100-drill library.</div>}
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.title}>
        {sel && <div className="space-y-3 text-sm">
          <div className="flex gap-2"><Pill color={C.blue}>{sel.cat}</Pill><Pill color={diffColor[sel.diff]}>{sel.diff}</Pill><Pill color={C.purple}>{sel.mins} min</Pill></div>
          <Row label="Objective" v={sel.objective} /><Row label="Scenario" v={sel.scenario} /><Row label="Instructions" v={sel.instructions} /><Row label="Success criteria" v={sel.success} />
          <Btn kind="gold" className="w-full py-3"><Play size={16} /> Launch AI roleplay</Btn>
        </div>}
      </Modal>
    </div>
  );
}
const Row = ({ label, v }) => <div><div className="text-xs font-semibold" style={{ color: C.gold }}>{label}</div><div style={{ color: C.text }}>{v}</div></div>;

function AICommand() {
  const tools = [
    [Megaphone, "Recruiting post", "Generate a platform-ready job ad"],
    [BookOpen, "Course outline", "Draft modules + lessons for a topic"],
    [ClipboardList, "Quiz questions", "Auto-write a graded quiz"],
    [MessageSquare, "Objection script", "Build a rebuttal flow"],
    [Mail, "Email/SMS campaign", "Draft a nurture sequence"],
    [Target, "Coaching plan", "Analyze a rep and prescribe drills"],
  ];
  const [out, setOut] = useState(null); const [busy, setBusy] = useState(false);
  const run = (t) => { setBusy(true); setOut(null); setTimeout(() => { setBusy(false); setOut(MOCK_AI[t] || "Generated content (mock). Connect an OpenAI or Anthropic API key in Integrations to make this live."); }, 700); };
  return (
    <div className="space-y-5">
      <Card className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><Bot size={18} color={C.blueSoft} /> System prompts</div>
        <div className="text-sm" style={{ color: C.sub }}>Manage the master prompts that drive roleplay, coaching, and generators.</div>
        <div className="mt-3 grid gap-2 md:grid-cols-3">{["Roleplay Customer","Sales Coach","Recruiting Writer"].map((p) => (
          <div key={p} className="rounded-xl p-3" style={{ background: C.panel2, border: `1px solid ${C.border}` }}><div className="text-sm font-semibold">{p}</div><div className="mt-1 text-xs" style={{ color: C.green }}>● Active</div></div>
        ))}</div>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">{tools.map(([Icon, t, d]) => (
        <Card key={t} className="p-4" onClick={() => run(t)}>
          <div className="mb-2 inline-flex rounded-xl p-2.5" style={{ background: C.blue + "1f", border: `1px solid ${C.blue}33` }}><Icon size={20} color={C.blueSoft} /></div>
          <div className="font-semibold">{t}</div><div className="mt-0.5 text-xs" style={{ color: C.sub }}>{d}</div>
          <Btn kind="soft" className="mt-3 w-full"><Sparkles size={14} /> Generate</Btn>
        </Card>
      ))}</div>
      {(busy || out) && <Card glow className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><Sparkles size={16} color={C.gold} /> AI output</div>
        {busy ? <div className="text-sm" style={{ color: C.sub }}>Generating…</div> : <pre className="whitespace-pre-wrap text-sm" style={{ color: C.text, fontFamily: "inherit" }}>{out}</pre>}
        <div className="mt-3 text-xs" style={{ color: C.sub }}>⚙ Mocked output. Add an API key in Integrations to go live.</div>
      </Card>}
    </div>
  );
}
const MOCK_AI = {
  "Recruiting post": "🚀 Entry-Level Sales Rep — Paid Training (No Experience Needed)\n\nOSP Sales University is hiring ambitious people ready to build a real career. You'll train with AI coaching, earn certifications, and follow a clear path to leadership.\n\n✅ Paid skill development\n✅ Mentorship from top closers\n✅ Advancement on performance, not politics\n\nApply today — your future starts now.",
  "Course outline": "Course: Closing Mastery\n\nModule 1 — The psychology of yes\nModule 2 — The assumptive close\nModule 3 — The choice close\nModule 4 — Trial closes\nModule 5 — Silence after the close\n\nEach module: 1 video, 1 drill, 3 quiz questions.",
  "Quiz questions": "1) After asking for the sale, the strongest move is to ___.\n   a) keep talking  b) stay silent ✓  c) drop the price\n\n2) 'Too expensive' most often signals ___.\n   a) no money  b) a value gap ✓  c) wrong product",
  "Objection script": "Objection: 'I need to think about it.'\n→ 'Totally fair. When you say think about it — is it the timing, the fit, or the investment?'\n→ Isolate → address the real concern → trial close.",
  "Email/SMS campaign": "Day 0 — Welcome + first mission\nDay 1 — 'Did you start your roleplay?'\nDay 3 — Success story + nudge\nDay 7 — Streak reminder + leaderboard tease",
  "Coaching plan": "Rep: Marcus R. — strong opener, weak on price objections.\nPrescribed drills: D14 'too expensive→value', D27 'isolate the objection', D41 'trial close'.\nGoal: lift objection score from 71% → 85% in 2 weeks.",
};

function CertsView() {
  const certs = STUDENTS.slice(0, 12).map((s, i) => ({ ...s, course: COURSES[i % COURSES.length].title, date: `Apr ${5 + i}, 2026`, cid: `OSP-${2026}-${(1000 + i)}` }));
  const [view, setView] = useState(null);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4">
          <Stat icon={Award} label="Certs issued" value="312" color={C.gold} />
          <Stat icon={Medal} label="Badges awarded" value="1,840" color={C.purple} />
          <Stat icon={CheckCircle2} label="Pass rate" value="84%" color={C.green} />
          <Stat icon={GraduationCap} label="Top course" value="Sales Foundations" color={C.blue} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {certs.map((c) => (
          <Card key={c.cid} className="flex items-center gap-3 p-4">
            <div className="rounded-xl p-2.5" style={{ background: C.gold + "1f", border: `1px solid ${C.gold}44` }}><Award size={22} color={C.gold} /></div>
            <div className="flex-1"><div className="font-semibold">{c.name}</div><div className="text-xs" style={{ color: C.sub }}>{c.course} · {c.date} · {c.cid}</div></div>
            <Btn kind="soft" onClick={() => setView(c)}>View</Btn>
            <Btn kind="ghost"><Send size={14} /> Resend</Btn>
          </Card>
        ))}
      </div>
      <Modal open={!!view} onClose={() => setView(null)} title="Certificate" wide>
        {view && <Certificate name={view.name} course={view.course} date={view.date} cid={view.cid} />}
      </Modal>
    </div>
  );
}
function Certificate({ name, course, date, cid }) {
  return (
    <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,#0a0f1d,#111934)", border: `2px solid ${C.gold}55` }}>
      <div className="mx-auto mb-3 inline-flex rounded-full p-3" style={{ background: C.gold + "1f", border: `1px solid ${C.gold}55` }}><Trophy size={28} color={C.gold} /></div>
      <div className="text-xs uppercase tracking-widest" style={{ color: C.gold }}>OSP Sales University · Certificate of Completion</div>
      <div className="mt-4 text-3xl font-extrabold" style={{ color: C.text }}>{name}</div>
      <div className="mt-2 text-sm" style={{ color: C.sub }}>has successfully completed</div>
      <div className="mt-1 text-xl font-bold" style={{ color: C.gold }}>{course}</div>
      <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs" style={{ borderColor: C.border, color: C.sub }}>
        <span>Issued {date}</span><span>Dean Elali · Founder</span><span>ID {cid}</span>
      </div>
    </div>
  );
}

function LeaderboardView() {
  const [filter, setFilter] = useState("All-time"); const [metric, setMetric] = useState("XP");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {["Weekly","Monthly","All-time"].map((f) => <button key={f} onClick={() => setFilter(f)} className="rounded-xl px-3 py-2 text-sm font-semibold" style={{ background: filter === f ? C.blue + "22" : C.panel2, color: filter === f ? C.text : C.sub, border: `1px solid ${filter === f ? C.blue : C.border}` }}>{f}</button>)}
        <div className="ml-auto"><Select label="" value={metric} onChange={(e) => setMetric(e.target.value)} options={["XP","Course completions","Roleplay score","Drill streak","Tests passed","Certifications"]} /></div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {LEADERS.slice(0, 3).map((s, i) => (
          <Card key={s.id} glow={i === 0} className="p-5 text-center" style={{ order: i === 0 ? 2 : i === 1 ? 1 : 3 }}>
            <div className="mx-auto mb-2 inline-flex rounded-full p-3" style={{ background: [C.gold, "#c0c7d8", "#cd7f4f"][i] + "22", border: `1px solid ${[C.gold, "#c0c7d8", "#cd7f4f"][i]}` }}>
              {i === 0 ? <Crown size={26} color={C.gold} /> : <Medal size={24} color={["#c0c7d8", "#cd7f4f"][i - 1]} />}</div>
            <div className="font-bold">{s.name}</div><div className="text-xs" style={{ color: C.sub }}>{s.rank}</div>
            <div className="mt-2 text-2xl font-extrabold" style={{ color: C.gold }}>{s.xp.toLocaleString()}</div><div className="text-xs" style={{ color: C.sub }}>XP</div>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden p-0"><table className="w-full text-sm">
        <thead><tr style={{ color: C.sub }}>{["#","Student","Rank","Streak","Courses","XP"].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
        <tbody>{LEADERS.map((s, i) => (
          <tr key={s.id} style={{ borderTop: `1px solid ${C.border}` }}>
            <td className="px-4 py-3 font-bold" style={{ color: i < 3 ? C.gold : C.sub }}>{i + 1}</td>
            <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{s.name[0]}</div><span className="font-semibold">{s.name}</span></div></td>
            <td className="px-4 py-3" style={{ color: C.sub }}>{s.rank}</td>
            <td className="px-4 py-3"><span className="flex items-center gap-1" style={{ color: C.gold }}><Flame size={13} /> {s.streak}</span></td>
            <td className="px-4 py-3" style={{ color: C.text }}>{s.courses}/10</td>
            <td className="px-4 py-3 font-bold" style={{ color: C.gold }}>{s.xp.toLocaleString()}</td>
          </tr>
        ))}</tbody>
      </table></Card>
    </div>
  );
}

function Reports() {
  const reports = ["User progress","Recruiting source","Course completion","Test score","Drill participation","AI roleplay usage","Certification","Leaderboard","Manager/team","At-risk student","Login activity","Funnel conversion"];
  const [sel, setSel] = useState(null);
  return (
    <div className="space-y-4">
      <Card className="p-4"><div className="mb-3 font-semibold">Filters</div>
        <div className="grid gap-3 md:grid-cols-4">
          <Field label="Date range" defaultValue="Apr 1 – Apr 30, 2026" /><Select label="Role" options={["All","Student","Manager"]} />
          <Select label="Location" options={["All", ...CITIES.map((c) => c[0])]} /><Select label="Source" options={["All", ...SOURCES]} />
        </div>
      </Card>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{reports.map((r) => (
        <Card key={r} className="flex items-center gap-3 p-4" onClick={() => setSel(r)}>
          <div className="rounded-xl p-2.5" style={{ background: C.blue + "1f", border: `1px solid ${C.blue}33` }}><FileText size={18} color={C.blueSoft} /></div>
          <div className="flex-1 text-sm font-semibold">{r} report</div><ChevronRight size={16} color={C.sub} />
        </Card>
      ))}</div>
      <Modal open={!!sel} onClose={() => setSel(null)} title={`${sel} report`} wide>
        <div className="space-y-3">
          <div className="text-sm" style={{ color: C.sub }}>Generated for Apr 1–30, 2026 · all roles · all locations.</div>
          <Card className="p-3" style={{ background: C.panel2 }}>
            <ResponsiveContainer width="100%" height={180}><BarChart data={courseBars}><CartesianGrid strokeDasharray="3 3" stroke={C.border} /><XAxis dataKey="name" stroke={C.sub} fontSize={10} /><YAxis stroke={C.sub} fontSize={11} /><Tooltip contentStyle={tip} /><Bar dataKey="done" fill={C.blue} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>
          </Card>
          <div className="flex gap-2"><Btn kind="soft" className="flex-1"><Download size={14} /> CSV</Btn><Btn kind="soft" className="flex-1"><Download size={14} /> PDF</Btn><Btn kind="gold" className="flex-1"><Send size={14} /> Email report</Btn></div>
        </div>
      </Modal>
    </div>
  );
}

const TEMPLATES = [
  { id: "welcome", name: "Welcome email", channel: "email", subject: "Welcome to OSP Sales University — Your Future Starts Now",
    body: "Congratulations {{firstName}}!\n\nYou just took a powerful step toward a more consistent, confident, and financially stable future. Welcome to OSP Sales University — the training ground built to help you win in any room, any neighborhood, any retail floor, and any business conversation.\n\nYour first mission: log in, complete your Welcome to OSP course, and start your first AI roleplay.\n\nWelcome to the team,\nOSP Sales University\n\n{{link}}" },
  { id: "incomplete", name: "Incomplete signup follow-up", channel: "email", subject: "You're almost in, {{firstName}} — finish your OSP signup",
    body: "Hi {{firstName}},\n\nYou started your OSP Sales University application but didn't finish. It only takes 60 seconds to complete — your training path is ready and waiting.\n\nFinish here: {{link}}\n\nWe'd love to have you on the team.\nOSP Sales University" },
  { id: "interview", name: "Interview reminder", channel: "email", subject: "Reminder: your OSP interview is coming up",
    body: "Hi {{firstName}},\n\nThis is a friendly reminder about your upcoming interview with OSP. Please arrive a few minutes early and bring your energy — we're excited to meet you.\n\nDetails & confirmation: {{link}}\n\nSee you soon,\nOSP Recruiting" },
  { id: "firstlogin", name: "First login reminder", channel: "email", subject: "Your OSP dashboard is ready, {{firstName}}",
    body: "Hi {{firstName}},\n\nYour account is live but you haven't logged in yet. Your first mission is simple: log in and complete the Welcome to OSP course.\n\nLog in: {{link}}\n\nThe future belongs to people who take action.\nOSP Sales University" },
  { id: "completion", name: "Course completion", channel: "email", subject: "🎓 You completed {{course}}!",
    body: "Way to go, {{firstName}}!\n\nYou just completed {{course}}. That's real progress toward your next rank: {{rank}}.\n\nKeep the momentum — your certificate is in your dashboard: {{link}}\n\nProud of you,\nOSP Sales University" },
  { id: "certificate", name: "Certificate earned", channel: "email", subject: "Your {{course}} certificate is ready",
    body: "Congratulations {{firstName}}!\n\nYour certificate for {{course}} (ID {{certId}}) has been issued. Download it, share it, and wear it with pride.\n\nView certificate: {{link}}\n\nOSP Sales University" },
  { id: "badge", name: "Badge earned", channel: "sms", subject: "",
    body: "🏆 Nice work {{firstName}}! You just earned the \"{{badge}}\" badge at OSP Sales University. Keep stacking wins: {{link}}" },
  { id: "inactive", name: "Inactive reactivation", channel: "sms", subject: "",
    body: "Hey {{firstName}}, we miss you at OSP! Your {{rank}} streak is waiting. Jump back in with one quick roleplay today: {{link}}" },
  { id: "leaderboard", name: "Leaderboard congrats", channel: "sms", subject: "",
    body: "🔥 {{firstName}}, you cracked the OSP leaderboard top 10! Hold your spot — run a drill before someone passes you: {{link}}" },
  { id: "atrisk", name: "At-risk manager alert", channel: "email", subject: "⚠ At-risk student: {{firstName}}",
    body: "Heads up,\n\n{{firstName}} ({{rank}}) is showing at-risk signals — no login in 7+ days and stalled course progress.\n\nRecommended action: a quick check-in call and one assigned roleplay.\n\nView profile: {{link}}\n\nOSP Coaching System" },
];
const MERGE_FIELDS = ["{{firstName}}","{{course}}","{{rank}}","{{badge}}","{{certId}}","{{link}}"];
const fillTemplate = (s) => (s || "")
  .split("{{firstName}}").join("Marcus")
  .split("{{course}}").join("Telesales Academy")
  .split("{{rank}}").join("Closing Specialist")
  .split("{{badge}}").join("Certified Closer")
  .split("{{certId}}").join("OSP-2026-1042")
  .split("{{link}}").join("app.ospsales.university/login");

function Templates() {
  const [drafts, setDrafts] = useState(() => Object.fromEntries(TEMPLATES.map((t) => [t.id, { subject: t.subject, body: t.body }])));
  const [selId, setSelId] = useState(TEMPLATES[0].id);
  const [sent, setSent] = useState(false);
  const bodyRef = useRef(null);
  const sel = TEMPLATES.find((t) => t.id === selId);
  const draft = drafts[selId];
  const update = (k, v) => setDrafts((d) => ({ ...d, [selId]: { ...d[selId], [k]: v } }));
  const reset = () => setDrafts((d) => ({ ...d, [selId]: { subject: sel.subject, body: sel.body } }));
  const insert = (token) => {
    const ta = bodyRef.current;
    const cur = draft.body;
    if (!ta) { update("body", cur + token); return; }
    const s = ta.selectionStart, e = ta.selectionEnd;
    update("body", cur.slice(0, s) + token + cur.slice(e));
    requestAnimationFrame(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = s + token.length; });
  };
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="p-2 lg:col-span-1"><div className="px-2 py-2 text-sm font-semibold">Templates</div>
        <div className="space-y-1">{TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => setSelId(t.id)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm"
            style={{ background: selId === t.id ? C.blue + "1f" : "transparent", color: selId === t.id ? C.text : C.sub }}>
            {t.channel === "email" ? <Mail size={14} /> : <MessageSquare size={14} />} <span className="flex-1">{t.name}</span>
            <Pill color={t.channel === "email" ? C.blue : C.purple}>{t.channel === "email" ? "Email" : "SMS"}</Pill>
          </button>
        ))}</div>
      </Card>

      <div className="space-y-4 lg:col-span-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-bold" style={{ color: C.gold }}>{sel.name}</div>
            <Pill color={sel.channel === "email" ? C.blue : C.purple}>{sel.channel === "email" ? "Email" : "SMS"}</Pill>
          </div>

          {sel.channel === "email" && (
            <label className="mb-3 block">
              <span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>Subject</span>
              <input value={draft.subject} onChange={(e) => update("subject", e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
            </label>
          )}

          <div className="mb-2">
            <span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>Insert merge field</span>
            <div className="flex flex-wrap gap-2">{MERGE_FIELDS.map((f) => (
              <button key={f} onClick={() => insert(f)} className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ background: C.gold + "1f", color: C.gold, border: `1px solid ${C.gold}40` }}>{f}</button>
            ))}</div>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>{sel.channel === "email" ? "Email body" : "Message"}</span>
            <textarea ref={bodyRef} value={draft.body} onChange={(e) => update("body", e.target.value)} rows={sel.channel === "email" ? 10 : 4}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text, lineHeight: 1.6 }} />
          </label>
          {sel.channel === "sms" && <div className="mt-1 text-xs" style={{ color: C.sub }}>{fillTemplate(draft.body).length} characters (~{Math.ceil(fillTemplate(draft.body).length / 160)} SMS)</div>}

          <div className="mt-4 flex gap-2">
            <Btn kind="soft" onClick={reset}>Reset to default</Btn>
            <Btn kind="gold" className="ml-auto" onClick={() => setSent(true)}><Send size={14} /> Send test</Btn>
          </div>
        </Card>

        <Card className="p-0">
          <div className="border-b px-4 py-2 text-xs font-semibold" style={{ borderColor: C.border, color: C.sub }}>Live preview (sample data)</div>
          {sel.channel === "email" ? (
            <div className="p-5" style={{ color: C.text }}>
              <div className="mb-3 font-bold" style={{ color: C.gold }}>{fillTemplate(draft.subject) || "(no subject)"}</div>
              <div className="whitespace-pre-wrap text-sm" style={{ color: C.sub, lineHeight: 1.6 }}>{fillTemplate(draft.body)}</div>
            </div>
          ) : (
            <div className="p-5">
              <div className="max-w-xs rounded-2xl px-4 py-2.5 text-sm" style={{ background: C.blue, color: "#fff" }}>{fillTemplate(draft.body)}</div>
            </div>
          )}
        </Card>
      </div>

      <Modal open={sent} onClose={() => setSent(false)} title="Test sent (mock)">
        <div className="text-center">
          <div className="mx-auto mb-3 inline-flex rounded-full p-3" style={{ background: C.green + "22" }}><CheckCircle2 size={32} color={C.green} /></div>
          <div className="font-bold" style={{ color: C.text }}>"{sel.name}" {sel.channel === "email" ? "email" : "SMS"} sent</div>
          <div className="mt-1 text-sm" style={{ color: C.sub }}>Delivered to {sel.channel === "email" ? "admin@osp.com" : "+1 (313) 555-0142"} with sample data filled in.</div>
          <div className="mt-3 text-xs" style={{ color: C.sub }}>⚙ Mocked. Connect Resend (email) or Twilio (SMS) in Integrations to send for real.</div>
          <Btn kind="primary" className="mt-4 w-full" onClick={() => setSent(false)}>Got it</Btn>
        </div>
      </Modal>
    </div>
  );
}

function SettingsView() {
  const groups = [["Branding","Logo, colors, university name"],["Course visibility","Show/hide & sequence courses"],["Passing scores","Default 80% · per-course override"],["XP rules","Points per lesson, drill, roleplay"],["Badge rules","Triggers & thresholds"],["User roles","Permissions per role"],["Recruiting sources","Manage source list"],["Notifications","Email/SMS/push toggles"]];
  return (
    <div className="grid gap-3 md:grid-cols-2">{groups.map(([t, d]) => (
      <Card key={t} className="p-4">
        <div className="flex items-center justify-between"><div className="font-semibold">{t}</div><Settings size={16} color={C.sub} /></div>
        <div className="mt-1 text-sm" style={{ color: C.sub }}>{d}</div>
        <div className="mt-3 flex items-center gap-2"><div className="h-6 w-11 rounded-full p-0.5" style={{ background: C.blue }}><div className="h-5 w-5 rounded-full bg-white" style={{ marginLeft: "auto" }} /></div><span className="text-xs" style={{ color: C.green }}>Enabled</span></div>
      </Card>
    ))}</div>
  );
}

function Integrations() {
  const items = [["OpenAI / Anthropic API","AI roleplay & coaching","Needs API",C.gold],["Supabase / Postgres","Database & auth","Needs API",C.gold],["Resend / Twilio","Email & SMS","Needs API",C.gold],["Indeed","Job posting","Connected",C.green],["LinkedIn Jobs","Job posting","Needs API",C.gold],["Stripe","Payments (optional)","Not connected",C.sub]];
  return (
    <div className="space-y-4">
      <Card className="p-4" style={{ background: C.blue + "12" }}><div className="flex items-center gap-2 text-sm"><Plug size={16} color={C.blueSoft} /><span style={{ color: C.sub }}>This demo runs on mock data. Connect the services below to make AI, auth, email, and job posting live — the UI is already wired for them.</span></div></Card>
      <div className="grid gap-3 md:grid-cols-2">{items.map(([t, d, s, c]) => (
        <Card key={t} className="flex items-center gap-3 p-4">
          <div className="rounded-xl p-2.5" style={{ background: c + "1f", border: `1px solid ${c}33` }}><Plug size={18} color={c} /></div>
          <div className="flex-1"><div className="font-semibold">{t}</div><div className="text-xs" style={{ color: C.sub }}>{d}</div></div>
          <Pill color={c}>{s}</Pill>
        </Card>
      ))}</div>
    </div>
  );
}

/* ---------------- STUDENT VIEWS ---------------- */
function StudentViews({ tab }) {
  switch (tab) {
    case "My Dashboard": return <StudentDashboard />;
    case "My Courses": return <CoursesView />;
    case "AI Coach": return <AICoach />;
    case "Roleplay Arena": return <RoleplayArena />;
    case "Sales Drills": return <DrillsView />;
    case "Tests": return <TestsView />;
    case "Badges": return <BadgesView />;
    case "Leaderboard": return <LeaderboardView />;
    case "My Tasks": return <TasksView />;
    case "Resources": return <Resources />;
    case "Profile": return <Profile />;
    default: return <StudentDashboard />;
  }
}

function StudentDashboard() {
  const s = CURRENT_STUDENT;
  const nextRankXp = (s.rankIdx + 1) * 1000;
  const rankPct = Math.round(((s.xp % 1000) / 1000) * 100);
  return (
    <div className="space-y-6">
      <Card glow className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center" style={grad(C.blue + "1f", C.gold + "0d")}>
          <div className="flex items-center gap-4">
            <Ring value={rankPct} size={88} color={C.gold} label={s.rankIdx + 1} sub="Level" />
            <div><div className="text-xs" style={{ color: C.gold }}>Current rank</div><div className="text-xl font-extrabold">{s.rank}</div>
              <div className="mt-1 text-xs" style={{ color: C.sub }}>{(nextRankXp - s.xp).toLocaleString()} XP to {RANKS[s.rankIdx + 1]}</div></div>
          </div>
          <div className="md:ml-auto grid grid-cols-3 gap-3">
            {[[Zap, s.xp.toLocaleString(), "XP", C.gold], [Flame, s.streak, "Day streak", C.red], [Award, s.certs, "Certs", C.green]].map(([Icon, v, l, c]) => (
              <div key={l} className="rounded-xl px-4 py-3 text-center" style={{ background: C.panel2, border: `1px solid ${C.border}` }}>
                <Icon size={18} color={c} className="mx-auto" /><div className="mt-1 text-lg font-bold">{v}</div><div className="text-xs" style={{ color: C.sub }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={GraduationCap} label="Courses done" value={`${s.courses}/10`} color={C.blue} />
        <Stat icon={Dumbbell} label="Drills" value={s.drills} color={C.purple} />
        <Stat icon={Bot} label="Roleplays" value={s.roleplays} color={C.green} />
        <Stat icon={Trophy} label="Leaderboard" value="#4" color={C.gold} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2"><div className="mb-3 font-semibold">Course progress</div>
          <div className="space-y-3">{COURSES.slice(0, 5).map((c) => (
            <div key={c.id}><div className="mb-1 flex items-center justify-between text-sm"><span className="flex items-center gap-2"><c.icon size={15} color={c.color} /> {c.title}</span><span style={{ color: C.sub }}>{c.progress}%</span></div>
              <div className="h-2 rounded-full" style={{ background: C.panel2 }}><div className="h-2 rounded-full" style={{ width: `${c.progress}%`, ...grad(c.color, c.color) }} /></div></div>
          ))}</div>
        </Card>
        <div className="space-y-4">
          <Card glow className="p-4"><div className="mb-1 flex items-center gap-2 text-sm font-semibold"><Sparkles size={15} color={C.gold} /> Next recommended</div>
            <div className="text-sm" style={{ color: C.text }}>Telesales Academy → "Handling hangups"</div>
            <Btn kind="gold" className="mt-3 w-full"><Play size={14} /> Resume lesson</Btn></Card>
          <Card className="p-4"><div className="mb-2 flex items-center gap-2 text-sm font-semibold"><CheckCircle size={15} color={C.green} /> Open tasks</div>
            <div className="space-y-2 text-sm">{["Finish Welcome to OSP quiz","Run 2 roleplays today","Complete drill D27"].map((t) => (
              <div key={t} className="flex items-center gap-2"><Circle size={14} color={C.sub} /><span style={{ color: C.sub }}>{t}</span></div>
            ))}</div></Card>
        </div>
      </div>
    </div>
  );
}

function AICoach() {
  const [msgs, setMsgs] = useState([{ r: "ai", t: "Hey Marcus 👋 I'm your AI sales coach. Ask me anything — how to use the app, how to handle an objection, or hit me with 'give me my daily confidence message.'" }]);
  const [val, setVal] = useState(""); const ref = useRef(null);
  useEffect(() => { ref.current?.scrollTo(0, 9e9); }, [msgs]);
  const send = (text) => {
    const t = text || val; if (!t.trim()) return;
    setMsgs((m) => [...m, { r: "me", t }]); setVal("");
    setTimeout(() => setMsgs((m) => [...m, { r: "ai", t: coachReply(t) }]), 500);
  };
  const chips = ["Daily confidence message","Handle 'too expensive'","How do I start a roleplay?","Door-to-door opener"];
  return (
    <div className="space-y-3">
      <Card className="flex flex-col p-0" style={{ height: 480 }}>
        <div ref={ref} className="flex-1 space-y-3 overflow-auto p-4">{msgs.map((m, i) => (
          <div key={i} className={`flex ${m.r === "me" ? "justify-end" : "justify-start"}`}>
            <div className="rounded-2xl px-4 py-2.5 text-sm" style={{ maxWidth: "80%", background: m.r === "me" ? C.blue : C.panel2, color: C.text, border: m.r === "me" ? "none" : `1px solid ${C.border}` }}>{m.t}</div>
          </div>
        ))}</div>
        <div className="border-t p-3" style={{ borderColor: C.border }}>
          <div className="mb-2 flex flex-wrap gap-2">{chips.map((c) => <button key={c} onClick={() => send(c)} className="rounded-full px-3 py-1.5 text-xs" style={{ background: C.panel2, color: C.sub, border: `1px solid ${C.border}` }}>{c}</button>)}</div>
          <div className="flex gap-2">
            <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask your coach…" className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
            <Btn kind="primary" onClick={() => send()}><Send size={16} /></Btn>
          </div>
        </div>
      </Card>
      <div className="text-xs" style={{ color: C.sub }}>⚙ Responses are mocked. Add an AI API key in Integrations for live coaching.</div>
    </div>
  );
}
function coachReply(t) {
  const x = t.toLowerCase();
  if (x.includes("confidence")) return "Today's truth: rejection isn't about you — it's data. Every 'no' sharpens your next 'yes.' Walk in like you've already won, because the rep who believes earns the trust. Go get 3 reps before lunch. 💪";
  if (x.includes("expensive")) return "When you hear 'too expensive,' don't defend the price — reframe to value. Try: 'Compared to what?' then connect the cost to the outcome they told you they want. Price objections are almost always value gaps.";
  if (x.includes("roleplay")) return "Head to the Roleplay Arena tab. Pick your environment, difficulty, and a customer personality, then chat live with the AI customer. At the end you'll get a scorecard and recommended drills. Want me to suggest a scenario?";
  if (x.includes("door")) return "Best door opener: smile, step back (non-threatening), and lead with curiosity not pitch. 'Hey — quick one, are you the homeowner?' Earn the first 5 seconds, then the next 30.";
  return "Great question. Here's the move: lead with curiosity, isolate the real concern, and always go for the next step. Want me to turn this into a quick drill you can practice?";
}

function RoleplayArena() {
  const [cfg, setCfg] = useState({ env: "Door-to-Door", diff: "Intermediate", persona: "skeptical", goal: "make sale" });
  const [stage, setStage] = useState("config"); // config | chat | score
  const [msgs, setMsgs] = useState([]); const [val, setVal] = useState(""); const [turns, setTurns] = useState(0); const ref = useRef(null);
  useEffect(() => { ref.current?.scrollTo(0, 9e9); }, [msgs]);
  const start = () => {
    setStage("chat"); setTurns(0);
    setMsgs([{ r: "ai", t: personaOpen(cfg) }]);
  };
  const send = () => {
    if (!val.trim()) return;
    const me = val; setMsgs((m) => [...m, { r: "me", t: me }]); setVal("");
    const nt = turns + 1; setTurns(nt);
    setTimeout(() => {
      if (nt >= 4) { setMsgs((m) => [...m, { r: "ai", t: "Alright — you've earned it. Let's set the next step. 👍" }]); setTimeout(() => setStage("score"), 700); }
      else setMsgs((m) => [...m, { r: "ai", t: personaReply(cfg, nt) }]);
    }, 550);
  };
  const scores = { Opener: 84, Rapport: 78, Discovery: 71, "Objection handling": 80, Confidence: 88, Close: 74, Professionalism: 90, "Next step": 82 };
  const radar = Object.entries(scores).map(([k, v]) => ({ k, v }));
  if (stage === "config") return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2 text-lg font-bold"><Target size={20} color={C.gold} /> Configure your roleplay</div>
        <div className="grid gap-3 md:grid-cols-2">
          <Select label="Sales environment" value={cfg.env} onChange={(e) => setCfg({ ...cfg, env: e.target.value })} options={ENVS} />
          <Select label="Difficulty" value={cfg.diff} onChange={(e) => setCfg({ ...cfg, diff: e.target.value })} options={DIFFS} />
          <Select label="Customer personality" value={cfg.persona} onChange={(e) => setCfg({ ...cfg, persona: e.target.value })} options={["friendly","skeptical","busy","rude","analytical","price-sensitive","confused","loyal to competitor"]} />
          <Select label="Objective" value={cfg.goal} onChange={(e) => setCfg({ ...cfg, goal: e.target.value })} options={["book appointment","make sale","collect info","overcome objection","retain customer"]} />
        </div>
        <Btn kind="gold" className="mt-5 w-full py-3" onClick={start}><Play size={16} /> Enter the arena</Btn>
      </Card>
    </div>
  );
  if (stage === "chat") return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Pill color={C.blue}>{cfg.env}</Pill><Pill color={C.gold}>{cfg.diff}</Pill><Pill color={C.purple}>{cfg.persona}</Pill><Pill color={C.green}>Goal: {cfg.goal}</Pill>
        <span className="ml-auto" style={{ color: C.sub }}>Turn {turns}/4</span>
      </div>
      <Card className="flex flex-col p-0" style={{ height: 440 }}>
        <div ref={ref} className="flex-1 space-y-3 overflow-auto p-4">{msgs.map((m, i) => (
          <div key={i} className={`flex ${m.r === "me" ? "justify-end" : "justify-start"}`}>
            {m.r === "ai" && <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: C.purple + "33" }}><Bot size={15} color={C.purple} /></div>}
            <div className="rounded-2xl px-4 py-2.5 text-sm" style={{ maxWidth: "78%", background: m.r === "me" ? C.blue : C.panel2, color: C.text, border: m.r === "me" ? "none" : `1px solid ${C.border}` }}>{m.t}</div>
          </div>
        ))}</div>
        <div className="flex gap-2 border-t p-3" style={{ borderColor: C.border }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Your response to the customer…" className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
          <Btn kind="primary" onClick={send}><Send size={16} /></Btn>
        </div>
      </Card>
      <div className="text-xs" style={{ color: C.sub }}>⚙ AI customer is scripted in this demo. After 4 turns you'll get a full scorecard.</div>
    </div>
  );
  return (
    <div className="space-y-4">
      <Card glow className="p-5 text-center"><div className="mx-auto mb-2 inline-flex rounded-full p-3" style={{ background: C.green + "22" }}><CheckCircle2 size={28} color={C.green} /></div>
        <div className="text-xl font-bold">Roleplay complete</div><div className="text-sm" style={{ color: C.sub }}>{cfg.env} · {cfg.persona} customer · {cfg.diff}</div>
        <div className="mt-2 text-3xl font-extrabold" style={{ color: C.gold }}>81% overall</div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4"><div className="mb-2 font-semibold">Scorecard</div>
          <ResponsiveContainer width="100%" height={240}><RadarChart data={radar}><PolarGrid stroke={C.border} /><PolarAngleAxis dataKey="k" tick={{ fill: C.sub, fontSize: 10 }} /><Radar dataKey="v" stroke={C.gold} fill={C.gold} fillOpacity={0.4} /></RadarChart></ResponsiveContainer>
        </Card>
        <Card className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><Bot size={16} color={C.blueSoft} /> AI feedback</div>
          <div className="space-y-2 text-sm" style={{ color: C.sub }}>
            <p><b style={{ color: C.green }}>Strengths:</b> Confident opener and very professional tone — you held the frame under a skeptical customer.</p>
            <p><b style={{ color: C.gold }}>Grow here:</b> Your discovery was a little thin. Ask one more pain question before pitching.</p>
            <div className="mt-2"><div className="mb-1 text-xs font-semibold" style={{ color: C.text }}>Recommended drills:</div>
              <div className="flex flex-wrap gap-2">{["Discovery questions","Trial close","Isolate the objection"].map((d) => <Pill key={d} color={C.blue}>{d}</Pill>)}</div></div>
          </div>
        </Card>
      </div>
      <Btn kind="gold" className="w-full py-3" onClick={() => setStage("config")}><Target size={16} /> Run another roleplay</Btn>
    </div>
  );
}
function personaOpen(c) {
  const m = {
    skeptical: "Yeah? Look, I've heard every pitch in the book. You've got about ten seconds before I close this door.",
    friendly: "Oh hey! Sure, what's this about? I've got a minute.",
    busy: "I'm slammed right now — what do you need? Make it fast.",
    rude: "Whatever you're selling, I'm not interested. Why are you here?",
    analytical: "Before you start — what exactly is the product and what's the measurable benefit?",
    "price-sensitive": "Let me guess, this is gonna cost me money. How much?",
    confused: "Wait, I'm sorry — who are you with again? I don't really get it.",
    "loyal to competitor": "I already use someone for this and I'm happy. So…?",
  };
  return m[c.persona] || "Okay, I'm listening. What's this about?";
}
function personaReply(c, turn) {
  const lines = [
    "Hmm. Okay, you've got my attention. Keep going.",
    "Alright, that's a fair point — but how do I know it actually works?",
    "I mean… it's not the worst idea I've heard today. What would this look like for me?",
  ];
  return lines[Math.min(turn - 1, lines.length - 1)];
}

function TestsView() {
  const [course, setCourse] = useState(null);
  if (course) return <Quiz open onClose={() => setCourse(null)} course={course} />;
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {COURSES.map((c) => (
        <Card key={c.id} className="p-4">
          <div className="mb-2 flex items-center gap-2"><c.icon size={18} color={c.color} /><span className="font-semibold">{c.title}</span></div>
          <div className="text-xs" style={{ color: C.sub }}>{QUIZ.length} questions · 80% to pass</div>
          <div className="mt-2 flex items-center justify-between"><Pill color={c.progress === 100 ? C.green : C.gold}>{c.progress === 100 ? "Passed" : "Not taken"}</Pill>
            <Btn kind="soft" onClick={() => setCourse(c)}>{c.progress === 100 ? "Retake" : "Start"}</Btn></div>
        </Card>
      ))}
    </div>
  );
}

function BadgesView() {
  return (
    <div className="space-y-5">
      <Card className="p-4"><div className="mb-1 font-semibold">Rank ladder</div>
        <div className="flex flex-wrap gap-2">{RANKS.map((r, i) => (
          <div key={r} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold" style={{ background: i <= CURRENT_STUDENT.rankIdx ? C.gold + "1f" : C.panel2, color: i <= CURRENT_STUDENT.rankIdx ? C.gold : C.sub, border: `1px solid ${i === CURRENT_STUDENT.rankIdx ? C.gold : C.border}` }}>
            {i <= CURRENT_STUDENT.rankIdx && <CheckCircle2 size={12} />} {i + 1}. {r}
          </div>
        ))}</div>
      </Card>
      <div><div className="mb-3 font-semibold">Badges · {BADGES.filter((b) => b.earned).length}/{BADGES.length} earned</div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{BADGES.map((b) => (
          <Card key={b.name} className="p-4 text-center" style={{ opacity: b.earned ? 1 : 0.45 }}>
            <div className="mx-auto mb-2 inline-flex rounded-full p-3" style={{ background: b.earned ? C.gold + "1f" : C.panel2, border: `1px solid ${b.earned ? C.gold + "55" : C.border}` }}><b.icon size={22} color={b.earned ? C.gold : C.sub} /></div>
            <div className="text-sm font-semibold">{b.name}</div>
            <div className="text-xs" style={{ color: b.earned ? C.green : C.sub }}>{b.earned ? "Earned" : "Locked"}</div>
          </Card>
        ))}</div>
      </div>
    </div>
  );
}

function TasksView() {
  const tasks = [["Finish Welcome to OSP quiz","Today",false],["Run 2 AI roleplays","Today",false],["Complete drill D27 — isolate the objection","Today",true],["Watch morning meeting video","Tomorrow",false],["Hit a 10-day streak","This week",false]];
  return (
    <div className="space-y-2">{tasks.map(([t, when, done]) => (
      <Card key={t} className="flex items-center gap-3 p-4">
        {done ? <CheckCircle2 size={20} color={C.green} /> : <Circle size={20} color={C.sub} />}
        <span className="flex-1 text-sm" style={{ color: done ? C.sub : C.text, textDecoration: done ? "line-through" : "none" }}>{t}</span>
        <Pill color={when === "Today" ? C.gold : C.blue}>{when}</Pill>
      </Card>
    ))}</div>
  );
}

function Resources() {
  const items = [[FileText,"Scripts","Phone, door, retail openers"],[ClipboardList,"Objection flashcards","Top 8 objections + rebuttals"],[Megaphone,"Pitch templates","30-sec & 2-min pitches"],[Mail,"Follow-up templates","Email & SMS that get replies"],[Play,"Morning meeting videos","Daily energy + skill clips"],[Headphones,"OSP TV","Brand & culture content"],[Crown,"Leadership resources","Coaching & team-building"],[UserPlus,"Recruiting scripts","Referral & outreach"]];
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{items.map(([Icon, t, d]) => (
      <Card key={t} className="p-4">
        <div className="mb-2 inline-flex rounded-xl p-2.5" style={{ background: C.blue + "1f", border: `1px solid ${C.blue}33` }}><Icon size={20} color={C.blueSoft} /></div>
        <div className="font-semibold">{t}</div><div className="mt-0.5 text-xs" style={{ color: C.sub }}>{d}</div>
      </Card>
    ))}</div>
  );
}

function Profile() {
  const s = CURRENT_STUDENT;
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="p-5 text-center lg:col-span-1">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>MR</div>
        <div className="mt-3 text-lg font-bold">{s.name}</div><div className="text-sm" style={{ color: C.gold }}>{s.rank}</div>
        <div className="mt-1 text-xs" style={{ color: C.sub }}>Detroit, MI · joined Mar 2026</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">{[[s.xp.toLocaleString(),"XP"],[s.streak,"Streak"],[s.certs,"Certs"]].map(([v, l]) => (
          <div key={l} className="rounded-xl py-2" style={{ background: C.panel2 }}><div className="font-bold" style={{ color: C.text }}>{v}</div><div className="text-xs" style={{ color: C.sub }}>{l}</div></div>
        ))}</div>
      </Card>
      <div className="space-y-4 lg:col-span-2">
        <Card className="p-4"><div className="mb-3 font-semibold">Recent badges</div>
          <div className="flex flex-wrap gap-3">{BADGES.filter((b) => b.earned).slice(0, 6).map((b) => (
            <div key={b.name} className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: C.gold + "12", border: `1px solid ${C.gold}33` }}><b.icon size={16} color={C.gold} /><span className="text-xs font-semibold">{b.name}</span></div>
          ))}</div>
        </Card>
        <Card className="p-4"><div className="mb-3 font-semibold">Account</div>
          <div className="grid gap-3 md:grid-cols-2"><Field label="Full name" defaultValue={s.name} /><Field label="Email" defaultValue="marcus@osp.com" /><Field label="Phone" defaultValue="(313) 555-0142" /><Field label="Manager" defaultValue="Team Alpha" /></div>
          <Btn kind="gold" className="mt-4">Save changes</Btn>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- ROOT ---------------- */
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  const [role, setRole] = useState(null);
  if (screen === "landing") return <Landing onLogin={() => setScreen("login")} onSignup={() => {}} />;
  if (screen === "login") return <Login onAuth={(r) => { setRole(r); setScreen("app"); }} onBack={() => setScreen("landing")} />;
  return <Shell role={role} onLogout={() => { setRole(null); setScreen("landing"); }} />;
}
