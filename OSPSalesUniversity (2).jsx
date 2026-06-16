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
  Heart, MessageCircle, Pin, Hash, Copy, Bookmark, PlayCircle, ArrowUp,
  ArrowDown, Trash2, Pencil, Share2, Timer, PartyPopper, Lightbulb,
  HelpCircle, Flag, Volume2, Pause, ChevronUp, Smile, Gift, Crosshair,
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

function GlobalStyles() {
  return (
    <style>{`
      @keyframes ospShine { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
      @keyframes ospFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-5px) } }
      @keyframes ospPop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.08) } 100% { transform: scale(1); opacity: 1 } }
      @keyframes ospSpinGlow { 0% { box-shadow: 0 0 12px var(--g, #f5c451) } 50% { box-shadow: 0 0 28px var(--g, #f5c451) } 100% { box-shadow: 0 0 12px var(--g, #f5c451) } }
      @keyframes ospSlideIn { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      .osp-shine { background-size: 200% 100%; animation: ospShine 2.4s linear infinite; }
      .osp-float { animation: ospFloat 3.5s ease-in-out infinite; }
      .osp-pop { animation: ospPop .4s ease-out both; }
      .osp-slide { animation: ospSlideIn .35s ease-out both; }
      .osp-hover { transition: transform .15s ease, box-shadow .15s ease; }
      .osp-hover:hover { transform: translateY(-3px); }
      * { scrollbar-width: thin; scrollbar-color: #1c2745 transparent; }
    `}</style>
  );
}


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
  const aptitude = 48 + Math.floor(rnd() * 51);
  return {
    id: "A" + (2000 + i), name: `${f} ${l}`, email: `${f.toLowerCase()}${i}@mail.com`,
    city: city[0], state: city[1], source: pick(SOURCES),
    stage: stages[Math.floor(rnd() * stages.length)], exp: pick(["None","Some","Experienced"]),
    days: Math.floor(rnd() * 30), aptitude, eligible: aptitude >= 70,
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

/* ---- Sales Aptitude Assessment (landing-page eligibility gate) ---- */
/* Edit APTITUDE_PASS to change the qualifying score. Each option carries weighted points (best answer = highest). */
const APTITUDE_PASS = 70; // percent required to qualify for an in-person interview
const APTITUDE = [
  { trait: "Resilience", q: "You knock on 20 doors and get 20 no's in a row. What do you do next?",
    a: [["Knock on door 21 with the same energy", 3], ["Take a long break — you've earned it", 1], ["Assume it's a bad area and head home", 0], ["Call your manager to vent", 1]] },
  { trait: "Coachability", q: "Your manager gives you tough feedback on your pitch. You:",
    a: [["Thank them, ask exactly what to change, and try it", 3], ["Explain why your way already works", 1], ["Nod, then keep doing it your way", 0], ["Feel crushed and second-guess everything", 1]] },
  { trait: "Empathy", q: "A customer goes quiet and seems hesitant. Best move?",
    a: [["Ask an open question and actually listen", 3], ["Talk faster to fill the silence", 0], ["Push hard for the close before they bail", 1], ["Immediately drop the price", 1]] },
  { trait: "Integrity", q: "A customer thinks the product does something it doesn't. You:",
    a: [["Clarify honestly, even if it risks the sale", 3], ["Let it slide so you can close", 0], ["Change the subject", 1], ["Vaguely agree with them", 0]] },
  { trait: "Drive", q: "It's 4pm and you've already hit your daily goal. You:",
    a: [["Keep going to beat your record", 3], ["Help teammates but stop selling yourself", 2], ["Coast for the rest of the day", 1], ["Head home — goal met", 1]] },
  { trait: "Handling rejection", q: "A prospect is rude and dismissive. You feel:",
    a: [["It's not personal — on to the next", 3], ["Like arguing your point back", 1], ["Like calling it a day", 0], ["Angry and rattled for the next few doors", 0]] },
  { trait: "Learning attitude", q: "You're brand new and barely know the product. Best approach?",
    a: [["Study the material and shadow a top rep", 3], ["Only approach the easy customers", 1], ["Avoid questions you can't answer", 1], ["Wing it and hope it works out", 0]] },
  { trait: "Communication", q: "The strongest opener mainly does which?",
    a: [["Earns curiosity and a few more seconds", 3], ["Lists every feature up front", 1], ["Leads with the price", 0], ["Asks for the sale immediately", 0]] },
  { trait: "Work ethic", q: "Long-term success in sales comes mostly from:",
    a: [["Consistent daily effort and reps", 3], ["Natural talent you're born with", 1], ["Good luck and territory", 0], ["Knowing the right people", 1]] },
  { trait: "Self-motivation", q: "On a slow, discouraging day, what keeps you going?",
    a: [["My own goals and the reason I started", 3], ["Someone keeping an eye on me", 1], ["Fear of getting in trouble", 1], ["Honestly, nothing — I'd stop", 0]] },
];
const APTITUDE_MAX = APTITUDE.length * 3;

/* ===================== UPGRADE DATA ===================== */

/* --- Course video lessons (Welcome to OSP = id 1, Sales Foundations = id 2) --- */
const VIDEO_LESSONS = {
  1: [
    { title: "Welcome to OSP Sales University", duration: "4:12", desc: "Your launchpad into a real sales career — what this university is and why you're here.",
      objectives: ["Understand the OSP mission", "See the path from recruit to leader", "Commit to your first 7 days"],
      transcript: "Welcome to OSP Sales University. If you're watching this, you've already done something most people never do — you decided to bet on yourself.\n\nThis isn't a job board or a get-rich-quick pitch. It's a training ground. Every lesson, drill, and roleplay here exists to make you the kind of professional who can walk into any room, any neighborhood, any retail floor, and create value.\n\nHere's how it works: you'll train, you'll practice with our AI coach, you'll earn certifications and badges, and you'll climb a clear path from New Recruit all the way to OSP Legend. Your rank is earned on performance, not politics.\n\nYour only job today is simple: finish this Welcome course and run your first AI roleplay. Action beats talent every single time. Let's get to work." },
    { title: "What OSP Represents", duration: "5:03", desc: "Brand, standards, and the reputation you carry every time you represent OSP.",
      objectives: ["Know the OSP brand promise", "Represent with professionalism", "Protect your reputation"],
      transcript: "Every time you say the name OSP, you're representing more than a company — you're representing a standard.\n\nOSP stands for One Source Provider. We are the bridge between great brands and real people. When we knock, call, or stand on a retail floor, we are the face of that brand. That's a responsibility and a privilege.\n\nThe standard is simple: be honest, be helpful, be sharp. We never trick a customer into a yes. We earn it. We show up on time, we dress the part, and we treat a 'no' with the same respect as a 'yes.'\n\nWhen you protect the brand, the brand protects your income. Reputation compounds. Build it on day one." },
    { title: "The Opportunity Ahead", duration: "6:20", desc: "The real income and leadership path available to people who do the work.",
      objectives: ["See the income ladder", "Understand the leadership track", "Set a 90-day target"],
      transcript: "Let's talk about what's actually possible here.\n\nMost careers ask you to wait your turn. Sales doesn't. Your results are visible, measurable, and rewarded. The reps who show up, practice, and stay coachable move up fast.\n\nThe ladder looks like this: you start by mastering conversations, then objections, then closes. From there you earn the right to lead — running morning meetings, coaching newer reps, and eventually building your own team.\n\nIncome follows skill. As you climb the ranks in this university, you're not collecting points for fun — you're proving you can be trusted with bigger opportunities. Pick a 90-day goal today and let every drill move you toward it." },
    { title: "How to Use Your Dashboard", duration: "3:48", desc: "A quick tour of your training command center so nothing feels confusing.",
      objectives: ["Navigate the dashboard", "Find courses, drills, and roleplay", "Track XP and rank"],
      transcript: "Let's give you a quick tour so the app never slows you down.\n\nYour dashboard is your command center. At the top you'll see your rank, XP, and streak — that's your progress at a glance. Your recommended next lesson is always one click away.\n\nThe sidebar is your map. My Courses holds your training. Roleplay Arena is where you practice live with an AI customer. Sales Drills are quick skill reps. Tests unlock your certifications. Badges and Leaderboard keep it fun and competitive.\n\nThe rule of thumb: when in doubt, do the next recommended action. The app is built to keep you moving. Now let's keep going." },
    { title: "Your First 7 Days", duration: "5:35", desc: "The exact game plan to build momentum in your first week.",
      objectives: ["Plan your first week", "Hit early milestones", "Build the daily habit"],
      transcript: "Momentum is everything in your first week. Here's the plan.\n\nDays one and two: finish Welcome to OSP and Sales Foundations. Get the language and mindset down. Run two roleplays even if they feel awkward — awkward is just unfamiliar.\n\nDays three through five: pick your environment — telesales, door, retail, B2B, or public — and run drills daily. Aim for a five-day streak. Streaks build identity.\n\nDays six and seven: take your first course test, earn your first certification, and post a win in the Board Room. Celebrate it.\n\nDo this and by day seven you won't feel like a beginner anymore. You'll feel like a rep." },
    { title: "Becoming a Brand Ambassador", duration: "4:57", desc: "What separates a rep from a true OSP Brand Ambassador.",
      objectives: ["Embody the ambassador mindset", "Lead by example", "Mentor the next recruit"],
      transcript: "An Elite Brand Ambassador isn't just a great closer. They're someone the whole team wants to be around.\n\nAmbassadors bring energy to the morning meeting. They celebrate teammates' wins louder than their own. They handle rejection with class and treat every customer like a person, not a transaction.\n\nThe shift happens when you stop asking 'what can I get' and start asking 'what can I give.' Give effort, give encouragement, give your best pitch every single time.\n\nThat's the version of you this university is building. Carry the brand like it's your own name on the door — because in here, it is. Welcome to the team." },
  ],
  2: [
    { title: "What Selling Really Is", duration: "5:10", desc: "Reframing sales from pushing product to helping people decide.",
      objectives: ["Redefine selling as service", "Drop the pushy stereotype", "Lead with value"],
      transcript: "Forget everything movies taught you about salespeople.\n\nSelling isn't pushing something on someone who doesn't want it. Real selling is helping a person make a decision that's good for them, with confidence. You're a guide, not a pressure machine.\n\nThe best reps are the most curious people in the room. They ask, they listen, and they connect a real problem to a real solution. The close is just the natural end of a helpful conversation.\n\nWhen you sell with that mindset, two things happen: customers trust you faster, and you can do this for a lifetime without burning out. Lead with value, and the income takes care of itself." },
    { title: "Building Confidence Fast", duration: "4:40", desc: "Practical ways to project calm authority before you feel it.",
      objectives: ["Use posture and tone", "Reset after rejection", "Act your way into belief"],
      transcript: "Confidence isn't something you're born with — it's something you build, rep by rep.\n\nStart with the body. Stand tall, shoulders back, slow your breathing. Your physiology leads your psychology. Lower your tone slightly and slow your pace; calm sounds like authority.\n\nNext, manage your state. After a hard no, take one breath and reset. The rep who treats rejection as data instead of identity keeps their energy all day.\n\nAnd here's the secret: you don't wait to feel confident before you act. You act, you get a small win, and the feeling follows. Move first. The belief catches up." },
    { title: "Reading the Customer", duration: "5:55", desc: "Spotting the signals that tell you how to adapt in real time.",
      objectives: ["Read body language", "Match energy", "Adjust your approach live"],
      transcript: "Every customer is broadcasting signals. Your job is to read them and adapt.\n\nWatch the body. Crossed arms and a step back mean slow down and lower the pressure. Leaning in and eye contact mean you've earned permission to go deeper.\n\nListen to pace. A fast talker wants you efficient. A careful, quiet customer wants you patient. Match their energy first, then gently lead.\n\nThe mistake beginners make is running the same script at everyone. Pros run the same goal with a different approach for each person. Read first, then respond. That's how conversations turn into closes." },
    { title: "Asking Powerful Questions", duration: "6:02", desc: "The questions that surface real needs and make customers think.",
      objectives: ["Ask open questions", "Uncover the real pain", "Let them sell themselves"],
      transcript: "The person asking the questions controls the conversation — and the best questions make the customer do the thinking.\n\nTrade yes-or-no questions for open ones. Instead of 'Are you happy with your current setup?' try 'What would you change about how it works today?' That opens a door.\n\nThen go one layer deeper. When they name a problem, ask what it's costing them. When they hesitate, ask what would make this an easy yes. You're not interrogating — you're helping them say their own reasons out loud.\n\nWhen a customer hears themselves describe the problem, your solution stops being a pitch and starts being the obvious answer." },
    { title: "Active Listening", duration: "4:25", desc: "Listening so well the customer feels truly understood.",
      objectives: ["Listen to understand", "Reflect back what you hear", "Build instant rapport"],
      transcript: "Most people listen just to reply. Top reps listen to understand — and customers can feel the difference instantly.\n\nThe technique is simple but rare. Stop planning your next line while they talk. Actually hear them. Then reflect it back: 'So what I'm hearing is timing is the real concern — did I get that right?'\n\nThat one move does three things: it proves you were listening, it makes them feel respected, and it surfaces the real issue so you can solve it.\n\nPeople buy from those who make them feel understood. Listening isn't passive — it's your most powerful rapport tool." },
    { title: "Handling Rejection", duration: "5:18", desc: "Turning no's into fuel instead of letting them drain you.",
      objectives: ["Depersonalize the no", "Keep your energy high", "Find the lesson in every no"],
      transcript: "You will hear no more than yes. That's not failure — that's the job, and the math is on your side.\n\nFirst, depersonalize it. A no is rarely about you. It's about timing, budget, or a bad day on their end. Let it pass through you, not into you.\n\nSecond, protect your energy. The next customer deserves the same enthusiasm as the first. One bad door can't be allowed to cost you the next ten.\n\nThird, mine it. Every no carries a lesson — a weak opener, a missed signal, a rushed close. Adjust one thing and move on. Reps who can take a no with a smile are unstoppable, because nothing can knock them off their game." },
    { title: "Creating Trust", duration: "4:50", desc: "The fast, honest ways to earn trust with a stranger.",
      objectives: ["Build trust quickly", "Be radically honest", "Keep small promises"],
      transcript: "Trust is the real currency of sales, and you can build it faster than you think.\n\nStart with honesty, even when it costs you. If your product isn't a fit, say so. That one honest moment buys you more credibility than ten polished pitches.\n\nKeep small promises immediately. 'I'll send that in five minutes' — then do it in four. Tiny reliability signals big reliability.\n\nAnd be a real person. Drop the robotic script, make eye contact, use their name. People trust humans, not pitches. Earn trust early and the close becomes a formality instead of a fight." },
    { title: "Closing the Next Step", duration: "5:30", desc: "Why every great conversation ends with a clear next step.",
      objectives: ["Always define the next step", "Use trial closes", "Close with confidence, not pressure"],
      transcript: "Closing isn't one dramatic moment at the end — it's a series of small, confident next steps.\n\nThroughout the conversation, use trial closes: 'How does this sound so far?' Their answer tells you exactly where you stand.\n\nWhen it's time, don't get timid and trail off. Be calm and direct: 'Here's what I'd recommend — let's get you started.' Then stop talking. Silence after the ask is your most powerful tool.\n\nAnd if it's not a yes today, never leave empty-handed. Set the next step — a callback, a follow-up, a referral. A conversation with a clear next step is never wasted. That's how pros turn maybes into momentum." },
  ],
};

/* --- Upgraded badges with rarity, category, progress --- */
const RARITY = {
  Common: { c: "#9fb0d6", glow: "#9fb0d633" },
  Rare: { c: "#5b9dff", glow: "#5b9dff44" },
  Epic: { c: "#9b6bff", glow: "#9b6bff55" },
  Legendary: { c: "#f5c451", glow: "#f5c45166" },
  Mythic: { c: "#ff6b81", glow: "#ff6b8166" },
};
const BADGE_VAULT = [
  { name: "First Flame", cat: "Streaks", rarity: "Common", icon: Flame, xp: 50, earned: true, date: "Mar 14, 2026", desc: "Log in and start your first streak." },
  { name: "First Roleplay", cat: "Roleplay", rarity: "Common", icon: Bot, xp: 75, earned: true, date: "Mar 15, 2026", desc: "Complete your first AI roleplay." },
  { name: "Objection Crusher", cat: "Roleplay", rarity: "Rare", icon: ShieldCheck, xp: 150, earned: true, date: "Mar 28, 2026", desc: "Score 85%+ on objection handling in a roleplay." },
  { name: "Telesales Titan", cat: "Training", rarity: "Epic", icon: Phone, xp: 300, earned: true, date: "Apr 6, 2026", desc: "Complete the Telesales Academy." },
  { name: "Door-to-Door Warrior", cat: "Training", rarity: "Epic", icon: DoorOpen, xp: 300, earned: false, prog: [4, 8], desc: "Complete the Door-to-Door Academy." },
  { name: "Retail Floor Pro", cat: "Training", rarity: "Rare", icon: Store, xp: 200, earned: true, date: "Apr 2, 2026", desc: "Complete the Retail Sales Academy." },
  { name: "Public Selling Performer", cat: "Training", rarity: "Epic", icon: Megaphone, xp: 300, earned: false, prog: [2, 7], desc: "Complete the Public Selling Academy." },
  { name: "B2B Strategist", cat: "Training", rarity: "Epic", icon: Building2, xp: 300, earned: false, prog: [3, 7], desc: "Complete the B2B Sales Academy." },
  { name: "Certified Closer", cat: "Tests", rarity: "Legendary", icon: Target, xp: 500, earned: true, date: "Apr 9, 2026", desc: "Pass the Closing Mastery certification." },
  { name: "Perfect Score", cat: "Tests", rarity: "Rare", icon: CheckCircle2, xp: 200, earned: true, date: "Apr 1, 2026", desc: "Ace a course test with 100%." },
  { name: "7-Day Fire Streak", cat: "Streaks", rarity: "Rare", icon: Flame, xp: 175, earned: true, date: "Apr 4, 2026", desc: "Train 7 days in a row." },
  { name: "30-Day Inferno", cat: "Streaks", rarity: "Legendary", icon: Flame, xp: 600, earned: false, prog: [9, 30], desc: "Train 30 days in a row." },
  { name: "10 Drills Done", cat: "Roleplay", rarity: "Common", icon: Dumbbell, xp: 100, earned: true, date: "Mar 22, 2026", desc: "Finish 10 sales drills." },
  { name: "Recruiter", cat: "Recruiting", rarity: "Rare", icon: UserPlus, xp: 250, earned: false, prog: [1, 3], desc: "Refer 3 recruits who qualify." },
  { name: "Leadership Ready", cat: "Leadership", rarity: "Epic", icon: Crown, xp: 400, earned: false, prog: [6, 8], desc: "Complete the Leadership & Ownership path." },
  { name: "Master Craftsman", cat: "Elite", rarity: "Legendary", icon: Award, xp: 750, earned: false, prog: [6, 10], desc: "Complete all 10 academies." },
  { name: "Wizard Salesman", cat: "Elite", rarity: "Mythic", icon: Sparkles, xp: 1000, earned: false, prog: [6420, 8000], desc: "Reach 8,000 XP and 90% roleplay average." },
  { name: "OSP Legend", cat: "Elite", rarity: "Mythic", icon: Trophy, xp: 1500, earned: false, prog: [6420, 10000], desc: "Reach the top rank: OSP Sales Legend." },
];
const BADGE_CATS = ["All", "Training", "Roleplay", "Tests", "Leadership", "Streaks", "Recruiting", "Elite"];

/* --- Rich profiles for leaderboard modals --- */
const BIOS = ["Came from retail, fell in love with the door. Chasing Territory Captain by summer.", "Former athlete turning competitive energy into closes. Mornings are mine.", "Single parent building a better future one conversation at a time.", "Quiet closer. I let the customer talk themselves into the yes.", "Energy is my edge. I bring the morning meeting to life.", "Numbers nerd who found out sales is just a game you can win."];
const GOALS = ["Hit Closing Specialist in 30 days", "Run my own team by Q4", "First $10k month", "30-day streak, no excuses", "Top 3 on the all-time board", "Earn the Wizard Salesman badge"];
const SKILLS = ["Objection handling", "Opening lines", "Discovery", "Closing", "Rapport", "Follow-up"];
const enrichLeader = (s, i) => ({
  ...s,
  level: s.rankIdx + 1,
  hometown: pick(CITIES)[0], bio: BIOS[i % BIOS.length], favEnv: pick(ENVS),
  strongest: SKILLS[i % SKILLS.length], goal: GOALS[i % GOALS.length],
  rpAvg: 72 + Math.floor(rnd() * 26), movement: [2, 1, 0, -1, 3, -2, 1, 0, 4, -1, 2, 0][i % 12],
  badgeCount: 3 + Math.floor(rnd() * 12), team: "Team " + ["Alpha","Bravo","Charlie","Delta","Echo","Foxtrot"][i % 6],
  recentWins: ["Passed Closing Mastery", "8-day streak", "Booked 3 interviews"].slice(0, 1 + (i % 3)),
});
const LEADERS_RICH = LEADERS.map(enrichLeader);

/* --- Board Room seed posts --- */
const POST_TYPES = {
  Win: { c: "#37d399", icon: Trophy }, Question: { c: "#5b9dff", icon: HelpCircle },
  Tip: { c: "#f5c451", icon: Lightbulb }, Motivation: { c: "#ff6b81", icon: Flame },
  "Badge Earned": { c: "#9b6bff", icon: Award }, "Course Completed": { c: "#37d399", icon: GraduationCap },
  Announcement: { c: "#f5c451", icon: Megaphone },
};
const SEED_POSTS = [
  { id: "p0", author: "OSP Admin", avatar: "OS", type: "Announcement", time: "Pinned", pinned: true,
    text: "🏆 New monthly leaderboard challenge is LIVE. Top 3 by roleplay score win OSP gear + a shoutout on OSP TV. Get your reps in!", likes: 64, liked: false,
    comments: [{ author: "Aaliyah C.", text: "Let's gooo 🔥" }, { author: "Devin B.", text: "Already booking time tonight." }] },
  { id: "p1", author: "Devin Brooks", avatar: "DB", type: "Win", time: "2h ago", rank: "Closing Specialist",
    text: "Just completed Objection Handling Mastery! Six weeks ago 'too expensive' shut me down every time. Today I reframed it and closed. This stuff works.", likes: 41, liked: true,
    comments: [{ author: "Maya P.", text: "Huge! Congrats 👏" }, { author: "OSP Admin", text: "Proud of you, Devin." }] },
  { id: "p2", author: "Grace Hughes", avatar: "GH", type: "Win", time: "4h ago", rank: "Conversation Builder",
    text: "Had my first confident door approach today. Didn't rush, smiled, asked a question — and they actually invited me in. Tiny win but it felt massive.", likes: 33, liked: false,
    comments: [{ author: "Trey B.", text: "That's the whole game right there." }] },
  { id: "p3", author: "Cole Foster", avatar: "CF", type: "Question", time: "5h ago", rank: "Prospecting Apprentice",
    text: "What opener works best in retail when someone says 'just looking'? I keep freezing on that one.", likes: 12, liked: false,
    comments: [{ author: "Nina W.", text: "Try: 'Perfect, looking is the fun part — what caught your eye?' Keeps it light." }, { author: "Marcus R.", text: "Agree, curiosity over pressure every time." }] },
  { id: "p4", author: "Aaliyah Coleman", avatar: "AC", type: "Tip", time: "7h ago", rank: "Territory Captain",
    text: "Tip that doubled my close rate: after you ask for the sale, SHUT UP. Whoever talks first loses. Silence feels long to you, normal to them.", likes: 58, liked: true,
    comments: [{ author: "Cole F.", text: "Needed this today 🙏" }] },
  { id: "p5", author: "Jamal Carter", avatar: "JC", type: "Badge Earned", time: "Yesterday", rank: "Elite Brand Ambassador",
    text: "Just unlocked Certified Closer 🏅 Legendary tier! The grind is paying off. Shoutout to my manager for the late-night roleplay reps.", likes: 47, liked: false,
    comments: [{ author: "Grace H.", text: "Legend behavior 👑" }] },
  { id: "p6", author: "Maya Price", avatar: "MP", type: "Motivation", time: "Yesterday", rank: "Objection Handler",
    text: "Reminder for anyone having a rough day on the doors: a no isn't about you. It's data. Take the breath, knock the next door. You've got this. 💪", likes: 39, liked: false,
    comments: [] },
];

/* --- Resources content --- */
const RES_SCRIPTS = [
  { name: "Telesales opener", body: "Hi {name}, this is {you} with OSP — I know I'm catching you out of the blue, so I'll be quick. We're helping folks in {area} {benefit}. Do you have 30 seconds for me to see if it's even a fit?" },
  { name: "Door-to-door opener", body: "Hey, I'll be honest — I'm not here to take up your whole day. I'm {you} with OSP, working with a few of your neighbors on {benefit}. Quick question: are you the homeowner?" },
  { name: "Retail opener", body: "Hey there! Looking is the fun part — what caught your eye today? (listen) Nice choice. A lot of people grab that for {reason}. Want me to show you the part most people miss?" },
  { name: "B2B opener", body: "Hi {name}, I'll keep this respectful of your time. I work with businesses like yours on {benefit}. I'm not asking for a decision today — just whether it's worth a 10-minute look. Fair?" },
  { name: "Public selling opener", body: "Hey! Quick one — you look like someone who appreciates {value}. We're doing something today that most people walk right past and regret. Got 20 seconds?" },
];
const RES_OBJECTIONS = [
  { name: "Not interested", front: "“I'm not interested.”", back: "Totally fair — most people aren't at first. Quick question so I don't waste your time: is it the timing, or just not something you've thought about? (Then isolate and address.)" },
  { name: "Too expensive", front: "“It's too expensive.”", back: "I hear you. Compared to what, though? Most folks find the cost of NOT solving this is the expensive part. Can I show you the math for 30 seconds?" },
  { name: "I need to think about it", front: "“I need to think about it.”", back: "Smart — I'd never want you to rush. When you say think about it, is it the fit, the timing, or the investment? Let's knock out the real question now." },
  { name: "Send me information", front: "“Just send me info.”", back: "Happy to. So I send the right thing and not a brochure you'll never open — what's the one thing you'd most want it to answer?" },
  { name: "I'm busy", front: "“I'm busy right now.”", back: "Totally respect that — I'm quick. Would later today or tomorrow morning be better for 5 minutes? I'll call exactly when I say." },
  { name: "I already have someone", front: "“I already have someone.”", back: "Good — that means you value this. I'm not asking you to switch. Just a quick second opinion so you know you've got the best deal. Worst case, you confirm you already do." },
  { name: "I don't trust salespeople", front: "“I don't trust salespeople.”", back: "Honestly? Neither do I when they're pushy. So I won't be. Ask me anything and I'll give it to you straight — even if the answer is 'we're not a fit.'" },
  { name: "Talk to my spouse/partner", front: "“I need to talk to my spouse.”", back: "Of course — big decisions should be shared. What do you think they'll want to know? Let's get those answers ready so you're not guessing when you talk." },
];
const RES_PITCHES = [
  { name: "15-second pitch", body: "We help {audience} {result} without {pain}. Most see {proof} in the first {time}. Worth a quick look?" },
  { name: "30-second pitch", body: "You know how {audience} struggle with {problem}? We fix that. OSP partners with {brand} to {benefit}, and unlike {alternative}, we {differentiator}. People usually ask me {common question} — and the answer is {payoff}. Want the 2-minute version?" },
  { name: "60-second pitch", body: "Here's the full picture: {problem} costs {audience} {cost} every month. We solve it three ways — {one}, {two}, {three}. The result is {outcome}. We've done this for {social proof}, and getting started takes {effort}. The only question is whether {their goal} is worth {small ask}." },
  { name: "Consultative pitch", body: "Before I pitch anything — tell me how you handle {area} today. (listen) Got it. Based on that, the piece I'd focus on is {priority}, because {reason}. Here's specifically how that'd work for you…" },
  { name: "Urgency pitch", body: "I'll be straight: this offer is tied to {real reason}, so it genuinely changes after {date}. I don't want you to rush a bad decision — but if this is a yes anyway, now saves you {amount}. Want to lock it in?" },
];
const RES_FOLLOWUPS = [
  { name: "First follow-up", body: "Hey {name}, great talking today! As promised, here's {thing}. One quick question to make sure I point you the right way: {question} Talk soon — {you}" },
  { name: "No answer", body: "Hi {name}, tried to reach you — totally my fault for not catching a better time. When's good for a quick 5 minutes? Mornings or afternoons easier for you?" },
  { name: "After objection", body: "Hey {name}, been thinking about what you said re: {objection}. You were right to raise it. Here's the part I didn't explain well: {clarify}. Does that change the picture?" },
  { name: "After appointment", body: "{name}, really enjoyed the conversation. Recapping what we agreed: {recap}. Next step is {next step} on {date}. Anything I missed?" },
  { name: "Reactivation", body: "Hey {name}, it's been a minute! No agenda — just thought of you when {trigger} came up. Still worth revisiting {topic}, or is the timing off right now?" },
];
const OSP_TV = [
  { name: "Morning Motivation", len: "6:30", tag: "Mindset", desc: "Daily energy to start your shift strong." },
  { name: "Top Performer Interview", len: "14:20", tag: "Stories", desc: "How a New Recruit hit Territory Captain in 90 days." },
  { name: "Objection Breakdown", len: "11:05", tag: "Skill", desc: "Frame-by-frame teardown of a real 'too expensive' save." },
  { name: "Retail Floor Training", len: "9:48", tag: "Retail", desc: "Approaching browsers without the awkwardness." },
  { name: "Door Approach Breakdown", len: "8:12", tag: "Door", desc: "The first 5 seconds that decide the whole knock." },
];

/* --- Tasks seed (graduation pacing) --- */
const SEED_TASKS = [
  { id: "t1", title: "Complete Welcome to OSP course", cat: "course", priority: "high", due: -1, status: "open", auto: true, notes: "Your first mission — sets up everything else." },
  { id: "t2", title: "Watch all 6 Welcome video lessons", cat: "course", priority: "medium", due: 0, status: "open", auto: true, notes: "" },
  { id: "t3", title: "Finish Sales Foundations", cat: "course", priority: "high", due: 2, status: "open", auto: true, notes: "" },
  { id: "t4", title: "Complete 5 drills this week", cat: "drill", priority: "medium", due: 3, status: "open", auto: true, notes: "Mix environments to find your strength." },
  { id: "t5", title: "Run 2 AI roleplays this week", cat: "roleplay", priority: "medium", due: 3, status: "open", auto: true, notes: "" },
  { id: "t6", title: "Take the Sales Foundations test", cat: "test", priority: "high", due: 5, status: "open", auto: true, notes: "80% to pass and certify." },
  { id: "t7", title: "Earn your first certification", cat: "test", priority: "urgent", due: 6, status: "open", auto: true, notes: "" },
  { id: "t8", title: "Meet weekly XP goal (1,000 XP)", cat: "personal", priority: "medium", due: 6, status: "open", auto: true, notes: "" },
  { id: "t9", title: "Shadow a top rep's roleplay", cat: "manager assigned", priority: "low", due: 9, status: "open", auto: false, notes: "Manager: Team Alpha" },
  { id: "t10", title: "Post your first win in the Board Room", cat: "personal", priority: "low", due: -3, status: "done", auto: false, notes: "" },
];
const TASK_CATS = ["course", "drill", "roleplay", "test", "recruiting", "personal", "manager assigned"];
const PRIORITY = { urgent: "#ff6b81", high: "#f5c451", medium: "#5b9dff", low: "#8e9bc4" };

/* --- Profile questionnaire --- */
const PROFILE_QS = [
  ["born", "Where were you born?"], ["live", "Where do you live now?"], ["exp", "What is your sales experience?"],
  ["env", "What sales environment excites you most?"], ["income", "What income goal are you chasing?"],
  ["motivates", "What motivates you?"], ["scares", "What scares you about sales?"], ["strengths", "Your top 3 strengths?"],
  ["manager", "What should your manager know about you?"], ["leader", "Do you want to become a leader?"],
  ["comfort", "Most comfortable: phone, door, retail, public, or B2B?"], ["availability", "Weekly availability?"],
  ["goal90", "Your 90-day goal?"],
];
const DEFAULT_PROFILE = {
  name: "Marcus Reyes", email: "marcus@osp.com", phone: "(313) 555-0142", city: "Detroit, MI",
  bio: "Came from retail, fell in love with the craft of selling. Building a future I'm proud of.",
  favStyle: "Door-to-Door", strongest: "Building rapport", improve: "Closing under pressure",
  income: "$120k/year", schedule: "Weekday afternoons + Saturdays", experience: "Some",
  q: { born: "Flint, MI", live: "Detroit, MI", exp: "Some — retail + serving", env: "Door-to-Door",
    income: "$10k/month", motivates: "My family and proving I can do hard things", scares: "Freezing on objections",
    strengths: "Energy, empathy, consistency", manager: "Push me — I respond to a challenge", leader: "Yes, eventually run a team",
    comfort: "Door-to-door", availability: "30-40 hrs, afternoons/Saturdays", goal90: "Reach Closing Specialist + first $10k month" },
};

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
  const [join, setJoin] = useState(false);
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
          <Btn kind="gold" onClick={() => setJoin(true)}>Start Your Journey</Btn>
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
            <Btn kind="gold" className="px-6 py-3 text-base" onClick={() => setJoin(true)}><Rocket size={18} /> Start Your Sales Journey</Btn>
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
          <Btn kind="gold" className="mt-6 px-7 py-3 text-base" onClick={() => setJoin(true)}><Rocket size={18} /> Start Your Sales Journey</Btn>
        </Card>
      </div>
      <div className="border-t px-5 py-8 text-center text-xs md:px-10" style={{ borderColor: C.border, color: C.sub }}>
        © 2026 One Source Provider · OSP Sales University · Owned by Dean Elali
      </div>

      {/* apply → aptitude test → result */}
      <JoinFlow open={join} onClose={() => setJoin(false)} onLogin={onLogin} onSignup={onSignup} />
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

function InterviewEmail({ first = "Marcus", score = 90, slot = "Tue, Jun 18 · 10:00 AM", className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl ${className}`} style={{ border: `1px solid ${C.gold}55`, background: C.panel2 }}>
      <div className="border-b px-4 py-2 text-xs" style={{ borderColor: C.border, color: C.sub }}>
        <span style={{ color: C.text }}>To:</span> {first.toLowerCase()}@email.com &nbsp;·&nbsp; <span style={{ color: C.text }}>From:</span> OSP Recruiting
      </div>
      <div className="p-5" style={{ color: C.text }}>
        <div className="mb-3 font-bold" style={{ color: C.gold }}>You're Invited — OSP Sales University In-Person Interview</div>
        <p className="text-sm leading-relaxed" style={{ color: C.sub }}>
          Congratulations {first} — you scored <b style={{ color: C.gold }}>{score}%</b> on the OSP Sales Aptitude Assessment, clearing our bar for an in-person interview. That tells us you've got the mindset we build champions on.
        </p>
        <div className="mt-3 rounded-lg p-3 text-sm" style={{ background: C.gold + "14", border: `1px solid ${C.gold}33` }}>
          <b style={{ color: C.text }}>Your interview:</b> <span style={{ color: C.sub }}>{slot} · OSP Office (address in your confirmation)</span>
        </div>
        <div className="mt-3 text-sm font-semibold">What to bring:</div>
        <ul className="mt-1 space-y-1 text-sm" style={{ color: C.sub }}>
          {["A great attitude and your energy","A valid photo ID","Two questions about the OSP path","Business-casual dress"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 size={14} color={C.green} className="mt-0.5 shrink-0" /> {x}</li>)}
        </ul>
        <p className="mt-3 text-sm" style={{ color: C.sub }}>A passing interview grants you full access to OSP Sales University. See you soon,<br /><b style={{ color: C.text }}>OSP Recruiting</b></p>
      </div>
    </div>
  );
}

const SLOTS = ["Tue, Jun 18 · 10:00 AM", "Tue, Jun 18 · 2:30 PM", "Wed, Jun 19 · 11:00 AM", "Thu, Jun 20 · 9:30 AM", "Thu, Jun 20 · 4:00 PM"];

function JoinFlow({ open, onClose, onLogin, onSignup }) {
  const [step, setStep] = useState("form"); // form | test | result | scheduled
  const [form, setForm] = useState({ first: "", email: "", phone: "", city: "", state: "", exp: "None", env: "Telesales", source: "Indeed" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [slot, setSlot] = useState(null);

  useEffect(() => { if (open) { setStep("form"); setQi(0); setAnswers({}); setSlot(null); } }, [open]);

  const earned = Object.values(answers).reduce((s, v) => s + v, 0);
  const score = Math.round((earned / APTITUDE_MAX) * 100);
  const passed = score >= APTITUDE_PASS;
  const first = form.first.trim().split(" ")[0] || "Recruit";

  const choose = (pts) => {
    const next = { ...answers, [qi]: pts };
    setAnswers(next);
    setTimeout(() => {
      if (qi + 1 >= APTITUDE.length) setStep("result");
      else setQi(qi + 1);
    }, 180);
  };
  const retake = () => { setAnswers({}); setQi(0); setStep("test"); };

  const titles = { form: "Apply to OSP Sales University", test: "Sales Aptitude Assessment", result: passed ? "You qualified! 🎉" : "Assessment results", scheduled: "Interview scheduled ✅" };

  return (
    <Modal open={open} onClose={onClose} title={titles[step]} wide>
      {/* STEP 1 — APPLICATION */}
      {step === "form" && (
        <div>
          <p className="mb-4 text-sm" style={{ color: C.sub }}>Tell us about yourself, then take a short sales aptitude assessment. Score {APTITUDE_PASS}%+ to qualify for an in-person interview and a spot at OSP Sales University.</p>
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
          <Btn kind="gold" className="mt-5 w-full py-3" onClick={() => { onSignup && onSignup(form); setStep("test"); }}>
            Start the aptitude assessment <ArrowRight size={16} />
          </Btn>
        </div>
      )}

      {/* STEP 2 — APTITUDE TEST */}
      {step === "test" && (() => {
        const item = APTITUDE[qi];
        return (
          <div>
            <div className="mb-2 flex items-center justify-between text-xs" style={{ color: C.sub }}>
              <span>Question {qi + 1} of {APTITUDE.length}</span><Pill color={C.blue}>{item.trait}</Pill>
            </div>
            <div className="mb-4 h-1.5 rounded-full" style={{ background: C.panel2 }}><div className="h-1.5 rounded-full" style={{ width: `${(qi / APTITUDE.length) * 100}%`, ...grad(C.blue, C.gold) }} /></div>
            <div className="mb-4 text-base font-semibold" style={{ color: C.text }}>{item.q}</div>
            <div className="space-y-2">{item.a.map(([label, pts], oi) => (
              <button key={oi} onClick={() => choose(pts)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm"
                style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }}>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs" style={{ border: `1px solid ${C.border}` }}>{String.fromCharCode(65 + oi)}</div>
                {label}
              </button>
            ))}</div>
            <div className="mt-3 text-center text-xs" style={{ color: C.sub }}>Answer honestly — there's no single "trick" answer. We're measuring how you think.</div>
          </div>
        );
      })()}

      {/* STEP 3 — RESULT */}
      {step === "result" && (
        <div>
          <div className="text-center">
            <Ring value={score} size={120} color={passed ? C.green : C.gold} />
            <div className="mt-4 text-xl font-bold" style={{ color: C.text }}>{passed ? `You scored ${score}% — you qualify!` : `You scored ${score}%`}</div>
            <div className="mt-1 text-sm" style={{ color: C.sub }}>
              {passed
                ? `That clears our ${APTITUDE_PASS}% bar. You're eligible for an in-person interview — pick a time below.`
                : `Our interview bar is ${APTITUDE_PASS}%. You're close — sharpen your approach and retake the assessment to qualify.`}
            </div>
          </div>

          {passed ? (
            <div className="mt-5">
              <div className="mb-2 text-sm font-semibold" style={{ color: C.text }}>Choose your interview slot</div>
              <div className="grid gap-2 md:grid-cols-2">{SLOTS.map((s) => (
                <button key={s} onClick={() => setSlot(s)} className="flex items-center gap-2 rounded-xl p-3 text-left text-sm"
                  style={{ background: slot === s ? C.gold + "1f" : C.panel2, border: `1px solid ${slot === s ? C.gold : C.border}`, color: C.text }}>
                  <Calendar size={15} color={slot === s ? C.gold : C.sub} /> {s}
                </button>
              ))}</div>
              <Btn kind="gold" className="mt-4 w-full py-3" style={{ opacity: slot ? 1 : 0.5 }} onClick={() => slot && setStep("scheduled")}>
                Confirm interview {slot ? `· ${slot}` : ""} <ArrowRight size={16} />
              </Btn>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-2">
              <Card className="p-3" style={{ background: C.blue + "12" }}>
                <div className="flex gap-2 text-sm"><Bot size={16} color={C.blueSoft} className="mt-0.5 shrink-0" /><span style={{ color: C.sub }}>Tip: top scorers lead with curiosity, stay coachable, and treat rejection as data. Re-read each scenario and choose the response that keeps the relationship and the momentum.</span></div>
              </Card>
              <Btn kind="gold" className="w-full py-3" onClick={retake}><ArrowRight size={16} /> Retake the assessment</Btn>
              <Btn kind="ghost" className="w-full" onClick={onClose}>Back to home</Btn>
            </div>
          )}
        </div>
      )}

      {/* STEP 4 — SCHEDULED */}
      {step === "scheduled" && (
        <div>
          <div className="text-center">
            <div className="mx-auto mb-3 inline-flex rounded-full p-4" style={{ background: C.green + "22" }}><CheckCircle2 size={40} color={C.green} /></div>
            <h3 className="text-xl font-bold" style={{ color: C.text }}>You're booked, {first}!</h3>
            <p className="mt-1 text-sm" style={{ color: C.sub }}>Your interview is set for <b style={{ color: C.gold }}>{slot}</b>. Here's your invitation:</p>
          </div>
          <InterviewEmail first={first} score={score} slot={slot} className="mt-4" />
          <p className="mt-4 text-center text-xs" style={{ color: C.sub }}>A passing interview unlocks full access to OSP Sales University. For this demo, you can explore the Academy now.</p>
          <Btn kind="primary" className="mt-3 w-full py-3" onClick={onLogin}>Explore the Academy <ArrowRight size={16} /></Btn>
        </div>
      )}
    </Modal>
  );
}
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
    ["Board Room", MessageCircle], ["Reports", BarChart3], ["Templates", Mail], ["Settings", Settings], ["Integrations", Plug],
  ],
  student: [
    ["My Dashboard", LayoutDashboard], ["My Courses", GraduationCap], ["AI Coach", Bot], ["Roleplay Arena", Target],
    ["Sales Drills", Dumbbell], ["Tests", ClipboardList], ["Badges", Award], ["Leaderboard", Trophy],
    ["Board Room", MessageCircle], ["My Tasks", CheckCircle], ["Resources", BookOpen], ["Profile", Users],
  ],
  manager: [
    ["Overview", LayoutDashboard], ["Recruiting", Briefcase], ["My Team", Users], ["Courses", GraduationCap],
    ["Leaderboards", Trophy], ["Board Room", MessageCircle], ["Reports", BarChart3],
  ],
};

function Shell({ role, onLogout }) {
  const nav = NAV[role];
  const [tab, setTab] = useState(nav[0][0]);
  const [openNav, setOpenNav] = useState(false);
  const roleLabel = { admin: "Super Admin", manager: "Manager", student: "Sales Student" }[role];
  // shared session state (persists across tab switches)
  const [posts, setPosts] = useState(SEED_POSTS);
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [toast, setToast] = useState(null);
  const notify = (msg, kind = "success") => setToast({ msg, kind, t: Date.now() });
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2600); return () => clearTimeout(id); }, [toast]);
  const store = { posts, setPosts, tasks, setTasks, profile, setProfile, notify, role };
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
          {role === "admin" && <AdminViews tab={tab} store={store} />}
          {role === "manager" && <AdminViews tab={tab} manager store={store} />}
          {role === "student" && <StudentViews tab={tab} store={store} />}
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[60] osp-pop" style={{ transform: "translateX(-50%)" }}>
          <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg"
            style={{ background: C.panel, border: `1px solid ${toast.kind === "success" ? C.green : C.blue}55`, color: C.text, boxShadow: "0 12px 40px #000" }}>
            <CheckCircle2 size={16} color={toast.kind === "success" ? C.green : C.blueSoft} /> {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- ADMIN VIEWS ---------------- */
function AdminViews({ tab, manager, store }) {
  switch (tab) {
    case "Overview": return <AdminOverview manager={manager} />;
    case "Users": case "My Team": return <UsersView manager={manager} />;
    case "Recruiting": return <Recruiting />;
    case "Courses": return <CoursesView admin />;
    case "Drills": return <DrillsView />;
    case "AI Command": return <AICommand />;
    case "Certificates": return <CertsView />;
    case "Leaderboards": case "Leaderboard": return <LeaderboardView />;
    case "Board Room": return <BoardRoom store={store} admin />;
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
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                      <Pill color={a.eligible ? C.green : C.red}>{a.eligible ? <CheckCircle2 size={11} /> : <X size={11} />} Aptitude {a.aptitude}%</Pill>
                    </div>
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

function VideoModal({ lesson, open, onClose, done, onComplete }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => { if (open) setPlaying(false); }, [open, lesson]);
  return (
    <Modal open={open} onClose={onClose} title={lesson?.title || ""} wide>
      {lesson && <>
      <div className="relative flex items-center justify-center overflow-hidden rounded-xl" style={{ height: 240, ...grad(C.blue + "33", C.purple + "22") }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(400px 200px at 50% 40%, ${C.blue}33, transparent)` }} />
        {!playing ? (
          <button onClick={() => setPlaying(true)} className="z-10 flex h-16 w-16 items-center justify-center rounded-full osp-float" style={{ background: "#000000aa", border: `1px solid ${C.gold}55` }}><Play size={26} color="#fff" /></button>
        ) : (
          <div className="z-10 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full osp-pop" style={{ background: C.gold + "22" }}><Volume2 size={20} color={C.gold} /></div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>Now playing — OSP Studio</div>
            <div className="text-xs" style={{ color: C.sub }}>(Video playback is mocked in this demo)</div>
          </div>
        )}
        <span className="absolute bottom-2 right-3 z-10 rounded px-1.5 py-0.5 text-xs" style={{ background: "#000000aa", color: "#fff" }}>{lesson.duration}</span>
      </div>
      <p className="mt-3 text-sm" style={{ color: C.sub }}>{lesson.desc}</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Card className="p-3" style={{ background: C.panel2 }}>
          <div className="mb-1 text-xs font-bold" style={{ color: C.gold }}>Lesson objectives</div>
          <ul className="space-y-1 text-sm" style={{ color: C.sub }}>{lesson.objectives.map((o) => <li key={o} className="flex gap-2"><Target size={13} color={C.blueSoft} className="mt-0.5 shrink-0" /> {o}</li>)}</ul>
        </Card>
        <Card className="p-3" style={{ background: C.panel2 }}>
          <div className="mb-1 text-xs font-bold" style={{ color: C.gold }}>Transcript</div>
          <div className="max-h-32 overflow-auto whitespace-pre-line text-sm" style={{ color: C.sub }}>{lesson.transcript}</div>
        </Card>
      </div>
      <Btn kind={done ? "soft" : "gold"} className="mt-4 w-full py-3" onClick={onComplete}>
        {done ? <><CheckCircle2 size={16} /> Completed</> : <><CheckCircle2 size={16} /> Mark lesson complete</>}
      </Btn>
      </>}
    </Modal>
  );
}

function CourseDetail({ course, onBack, admin }) {
  const [quiz, setQuiz] = useState(false);
  const lessons = VIDEO_LESSONS[course.id] || [];
  const [vid, setVid] = useState(null);
  const [doneVids, setDoneVids] = useState(() => {
    // pre-complete lessons proportional to existing course progress
    const n = Math.round((course.progress / 100) * lessons.length);
    const init = {}; for (let i = 0; i < n; i++) init[i] = true; return init;
  });
  const vidDoneCount = Object.values(doneVids).filter(Boolean).length;
  const vidPct = lessons.length ? Math.round((vidDoneCount / lessons.length) * 100) : course.progress;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm" style={{ color: C.sub }}>← All courses</button>
      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-4 p-5" style={grad(course.color + "22", "transparent")}>
          <div className="rounded-2xl p-3" style={{ background: course.color + "22", border: `1px solid ${course.color}44` }}><course.icon size={32} color={course.color} /></div>
          <div className="flex-1"><div className="text-xl font-bold">{course.title}</div><div className="text-sm" style={{ color: C.sub }}>{course.env} Academy · {lessons.length || course.lessons} lessons · quiz + certificate</div></div>
          <Ring value={lessons.length ? vidPct : course.progress} size={70} color={course.color} />
        </div>
      </Card>

      {lessons.length > 0 && (
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2 font-semibold"><PlayCircle size={18} color={course.color} /> Video lessons</div><Pill color={C.green}>{vidDoneCount}/{lessons.length} watched</Pill></div>
          <div className="grid gap-3 md:grid-cols-2">{lessons.map((l, i) => {
            const done = !!doneVids[i];
            return (
              <Card key={l.title} className="osp-hover overflow-hidden p-0 cursor-pointer" onClick={() => setVid(i)}>
                <div className="relative flex h-28 items-center justify-center" style={grad(course.color + "33", C.purple + "22")}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "#000000aa" }}><Play size={18} color="#fff" /></div>
                  <span className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-xs" style={{ background: "#000000aa", color: "#fff" }}>{l.duration}</span>
                  <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: done ? C.green : "#000000aa", color: "#fff" }}>{done ? <CheckCircle2 size={13} /> : i + 1}</span>
                </div>
                <div className="p-3"><div className="text-sm font-semibold" style={{ color: C.text }}>{l.title}</div><div className="mt-0.5 line-clamp-2 text-xs" style={{ color: C.sub }}>{l.desc}</div></div>
              </Card>
            );
          })}</div>
        </Card>
      )}

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

      <VideoModal lesson={vid != null ? lessons[vid] : null} open={vid != null} onClose={() => setVid(null)} done={!!doneVids[vid]} onComplete={() => { setDoneVids((d) => ({ ...d, [vid]: true })); setVid(null); }} />
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

function DrillsView({ store }) {
  const [cat, setCat] = useState("All"); const [diff, setDiff] = useState("All"); const [sel, setSel] = useState(null);
  const [live, setLive] = useState(null); // drill being roleplayed
  const [show, setShow] = useState(24);
  const filtered = DRILLS.filter((d) => (cat === "All" || d.cat === cat) && (diff === "All" || d.diff === diff));
  const diffColor = { Beginner: C.green, Intermediate: C.blueSoft, Advanced: C.gold, Brutal: C.red };
  const launch = (d) => { setSel(null); setLive(d); };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select label="" value={cat} onChange={(e) => { setCat(e.target.value); setShow(24); }} options={["All", ...DRILL_CATS]} />
        <Select label="" value={diff} onChange={(e) => { setDiff(e.target.value); setShow(24); }} options={["All", ...DIFFS]} />
        <div className="ml-auto self-end text-sm" style={{ color: C.sub }}>{filtered.length} of 100 drills</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, show).map((d) => (
          <Card key={d.id} className="osp-hover p-4">
            <div className="mb-2 flex items-center justify-between"><Pill color={C.blue}>{d.cat}</Pill><Pill color={diffColor[d.diff]}>{d.diff}</Pill></div>
            <div className="font-semibold" style={{ color: C.text }}>{d.title}</div>
            <div className="mt-1 text-xs" style={{ color: C.sub }}>{d.scenario} · {d.mins} min</div>
            <div className="mt-3 flex gap-2">
              <Btn kind="soft" className="flex-1" onClick={() => setSel(d)}>Details</Btn>
              <Btn kind="gold" className="flex-1" onClick={() => launch(d)}><Play size={14} /> Launch</Btn>
            </div>
          </Card>
        ))}
      </div>
      {show < filtered.length && <div className="text-center"><Btn kind="soft" onClick={() => setShow(show + 24)}>Load more drills ({filtered.length - show} left)</Btn></div>}

      <Modal open={!!sel} onClose={() => setSel(null)} title={sel?.title}>
        {sel && <div className="space-y-3 text-sm">
          <div className="flex gap-2"><Pill color={C.blue}>{sel.cat}</Pill><Pill color={diffColor[sel.diff]}>{sel.diff}</Pill><Pill color={C.purple}>{sel.mins} min</Pill></div>
          <Row label="Objective" v={sel.objective} /><Row label="Scenario" v={sel.scenario} /><Row label="Instructions" v={sel.instructions} /><Row label="Success criteria" v={sel.success} />
          <Btn kind="gold" className="w-full py-3" onClick={() => launch(sel)}><Play size={16} /> Launch AI roleplay</Btn>
        </div>}
      </Modal>

      <Modal open={!!live} onClose={() => setLive(null)} title={live ? `Drill · ${live.title}` : ""} wide>
        {live && <RoleplaySession config={drillToConfig(live)} store={store} embedded onClose={() => setLive(null)} />}
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
  const [filter, setFilter] = useState("All-time");
  const [metric, setMetric] = useState("XP");
  const [team, setTeam] = useState("All teams");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);

  const metricVal = (s) => ({ "XP": s.xp, "Course completions": s.courses, "Roleplay score": s.rpAvg, "Drill streak": s.streak, "Tests passed": s.certs, "Certifications": s.certs }[metric] ?? s.xp);
  const teams = ["All teams", ...Array.from(new Set(LEADERS_RICH.map((s) => s.team)))];
  const ranked = LEADERS_RICH
    .filter((s) => (team === "All teams" || s.team === team) && s.name.toLowerCase().includes(q.toLowerCase()))
    .map((s) => ({ ...s, _m: metricVal(s) })).sort((a, b) => b._m - a._m);
  const podium = ranked.slice(0, 3);
  const fmt = (s) => metric === "Roleplay score" ? `${s._m}%` : metric === "Course completions" ? `${s._m}/10` : s._m.toLocaleString();
  const Move = ({ m }) => m === 0
    ? <span className="flex items-center gap-0.5 text-xs" style={{ color: C.sub }}>–</span>
    : <span className="flex items-center gap-0.5 text-xs" style={{ color: m > 0 ? C.green : C.red }}>{m > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(m)}</span>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {["Weekly", "Monthly", "All-time"].map((f) => <button key={f} onClick={() => setFilter(f)} className="rounded-xl px-3 py-2 text-sm font-semibold" style={{ background: filter === f ? C.blue + "22" : C.panel2, color: filter === f ? C.text : C.sub, border: `1px solid ${filter === f ? C.blue : C.border}` }}>{f}</button>)}
        <div className="ml-auto flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: C.panel2, border: `1px solid ${C.border}` }}><Search size={15} color={C.sub} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students…" className="bg-transparent text-sm outline-none" style={{ color: C.text, width: 140 }} /></div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select label="" value={metric} onChange={(e) => setMetric(e.target.value)} options={["XP", "Course completions", "Roleplay score", "Drill streak", "Tests passed", "Certifications"]} />
        <Select label="" value={team} onChange={(e) => setTeam(e.target.value)} options={teams} />
      </div>

      {/* podium */}
      {podium.length === 3 && (
        <div className="grid grid-cols-3 items-end gap-3">
          {[1, 0, 2].map((idx) => { const s = podium[idx]; const colors = [C.gold, "#c0c7d8", "#cd7f4f"]; const h = [150, 120, 100]; return (
            <button key={s.id} onClick={() => setSel(s)} className="flex flex-col items-center">
              <div className="relative mb-2 flex flex-col items-center osp-pop">
                <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-extrabold" style={{ ...grad(C.blue, C.purple), color: "#fff", border: `2px solid ${colors[idx]}`, boxShadow: `0 0 18px ${colors[idx]}66` }}>{s.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
                <div className="mt-1 text-sm font-bold">{s.name.split(" ")[0]}</div>
                <div className="text-xs font-extrabold" style={{ color: colors[idx] }}>{fmt(s)}</div>
              </div>
              <div className="flex w-full items-start justify-center rounded-t-xl pt-2 osp-hover" style={{ height: h[idx], background: `linear-gradient(180deg, ${colors[idx]}33, ${C.panel2})`, border: `1px solid ${colors[idx]}55` }}>
                {idx === 0 ? <Crown size={22} color={C.gold} /> : <Medal size={20} color={colors[idx]} />}
              </div>
            </button>
          ); })}
        </div>
      )}

      <Card className="overflow-hidden p-0"><table className="w-full text-sm">
        <thead><tr style={{ color: C.sub }}>{["#", "", "Student", "Move", "Streak", metric, ""].map((h, i) => <th key={i} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr></thead>
        <tbody>{ranked.map((s, i) => (
          <tr key={s.id} className="cursor-pointer" style={{ borderTop: `1px solid ${C.border}` }} onClick={() => setSel(s)}>
            <td className="px-4 py-3 font-bold" style={{ color: i < 3 ? C.gold : C.sub }}>{i + 1}</td>
            <td className="py-3 pl-4"><div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{s.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div></td>
            <td className="px-4 py-3"><div className="font-semibold">{s.name}</div><div className="text-xs" style={{ color: C.sub }}>{s.rank} · {s.team}</div></td>
            <td className="px-4 py-3"><Move m={s.movement} /></td>
            <td className="px-4 py-3"><span className="flex items-center gap-1" style={{ color: C.gold }}><Flame size={13} /> {s.streak}</span></td>
            <td className="px-4 py-3 font-bold" style={{ color: C.gold }}>{fmt({ ...s, _m: metricVal(s) })}</td>
            <td className="px-4 py-3"><ChevronRight size={16} color={C.sub} /></td>
          </tr>
        ))}</tbody>
      </table></Card>

      <StudentProfileModal s={sel} open={!!sel} onClose={() => setSel(null)} />
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
  const groups = [["Branding","Logo, colors, university name"],["Aptitude pass score",`Qualify for interview at ${APTITUDE_PASS}%+`],["Course visibility","Show/hide & sequence courses"],["Passing scores","Default 80% · per-course override"],["XP rules","Points per lesson, drill, roleplay"],["Badge rules","Triggers & thresholds"],["User roles","Permissions per role"],["Recruiting sources","Manage source list"],["Notifications","Email/SMS/push toggles"]];
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
function StudentViews({ tab, store }) {
  switch (tab) {
    case "My Dashboard": return <StudentDashboard />;
    case "My Courses": return <CoursesView />;
    case "AI Coach": return <AICoach />;
    case "Roleplay Arena": return <RoleplayArena />;
    case "Sales Drills": return <DrillsView store={store} />;
    case "Tests": return <TestsView store={store} />;
    case "Badges": return <BadgesView />;
    case "Leaderboard": return <LeaderboardView />;
    case "Board Room": return <BoardRoom store={store} />;
    case "My Tasks": return <TasksView store={store} />;
    case "Resources": return <Resources store={store} />;
    case "Profile": return <Profile store={store} />;
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

/* ---- Reusable roleplay engine (used by Arena + every Drill) ---- */
const PERSONAS = ["friendly","skeptical","busy","rude","analytical","price-sensitive","confused","loyal to competitor"];
const RP_GOALS = ["book appointment","make sale","collect info","overcome objection","retain customer"];
function drillToConfig(d) {
  const parts = (d.scenario || "").split("•").map((x) => x.trim());
  const env = ENVS.includes(parts[0]) ? parts[0] : "Door-to-Door";
  const persona = (parts[1] || "skeptical").replace(" customer", "").trim();
  const goalMap = { "Objection handling": "overcome objection", "Closing": "make sale", "Discovery questions": "collect info", "Follow-up": "retain customer", "Referral asking": "collect info", "Customer retention": "retain customer" };
  return { env, diff: d.diff, persona: PERSONAS.includes(persona) ? persona : "skeptical", goal: goalMap[d.cat] || "make sale", drill: d.title, cat: d.cat };
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
function personaReply(c, turn, userText) {
  const t = (userText || "").toLowerCase();
  if (/\$|price|cost|how much|expensive|afford/.test(t)) return "See, that's what worries me — the price. Convince me it's actually worth it.";
  if (t.includes("?")) return "Good question to ask me, actually. Okay… I'd say my main concern is whether this really works for someone like me.";
  if (/free|guarantee|risk|trial|no obligation/.test(t)) return "Hm. No risk, huh? That does make it easier to consider. Keep going.";
  if (/you|your|family|save|time|help/.test(t)) return "Alright, you're speaking my language a little now. What would the next step even look like?";
  const lines = [
    "Hmm. Okay, you've got my attention. Keep going.",
    "Alright, that's a fair point — but how do I know it actually works?",
    "I mean… it's not the worst idea I've heard today. What would this look like for me?",
    "Okay, you've earned a few minutes. Walk me through it.",
  ];
  return lines[Math.min(turn - 1, lines.length - 1)];
}

function RoleplaySession({ config, onClose, store, embedded }) {
  const [msgs, setMsgs] = useState([{ r: "ai", t: personaOpen(config) }]);
  const [val, setVal] = useState(""); const [turns, setTurns] = useState(0);
  const [stage, setStage] = useState("chat"); const [typing, setTyping] = useState(false);
  const ref = useRef(null);
  useEffect(() => { ref.current?.scrollTo(0, 9e9); }, [msgs, typing]);
  const send = () => {
    if (!val.trim()) return;
    const me = val; setMsgs((m) => [...m, { r: "me", t: me }]); setVal("");
    const nt = turns + 1; setTurns(nt); setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { r: "ai", t: personaReply(config, nt, me) }]); }, 650);
  };
  const finish = () => setStage("score");

  // derive a believable scorecard from engagement
  const base = Math.min(95, 60 + turns * 7 + Math.floor(rnd() * 8));
  const jit = (n) => Math.max(55, Math.min(98, base + n));
  const scores = { Opener: jit(6), Rapport: jit(2), Discovery: jit(-4), "Objection handling": jit(3), Confidence: jit(8), Close: jit(-2), Professionalism: jit(10), "Next step": jit(1) };
  const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 8);
  const radar = Object.entries(scores).map(([k, v]) => ({ k, v }));
  const xp = 40 + turns * 15 + (overall >= 80 ? 40 : 0);
  const weakest = Object.entries(scores).sort((a, b) => a[1] - b[1])[0][0];
  const nextDrill = DRILLS.find((d) => d.cat === (config.cat || "Discovery questions")) || DRILLS[0];

  useEffect(() => { if (stage === "score" && store) store.notify(`Roleplay complete · +${xp} XP`); }, [stage]);

  if (stage === "chat") return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {config.drill && <Pill color={C.gold}><Dumbbell size={11} /> {config.drill}</Pill>}
        <Pill color={C.blue}>{config.env}</Pill><Pill color={C.purple}>{config.persona}</Pill><Pill color={C.red}>{config.diff}</Pill><Pill color={C.green}>Goal: {config.goal}</Pill>
      </div>
      <Card className="flex flex-col p-0" style={{ height: embedded ? 380 : 440 }}>
        <div ref={ref} className="flex-1 space-y-3 overflow-auto p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex osp-slide ${m.r === "me" ? "justify-end" : "justify-start"}`}>
              {m.r === "ai" && <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: C.purple + "33" }}><Bot size={15} color={C.purple} /></div>}
              <div className="rounded-2xl px-4 py-2.5 text-sm" style={{ maxWidth: "78%", background: m.r === "me" ? C.blue : C.panel2, color: C.text, border: m.r === "me" ? "none" : `1px solid ${C.border}` }}>{m.t}</div>
            </div>
          ))}
          {typing && <div className="flex items-center gap-2 text-xs" style={{ color: C.sub }}><Bot size={14} color={C.purple} /> customer is typing…</div>}
        </div>
        <div className="flex gap-2 border-t p-3" style={{ borderColor: C.border }}>
          <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Your response to the customer…" className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
          <Btn kind="primary" onClick={send}><Send size={16} /></Btn>
        </div>
      </Card>
      <div className="flex gap-2">
        <Btn kind="ghost" className="flex-1" onClick={onClose}><X size={15} /> End roleplay</Btn>
        <Btn kind="gold" className="flex-1" style={{ opacity: turns >= 1 ? 1 : 0.5 }} onClick={() => turns >= 1 && finish()}><Sparkles size={15} /> Get feedback</Btn>
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <Card glow className="p-5 text-center"><div className="mx-auto mb-2 inline-flex rounded-full p-3 osp-float" style={{ background: (overall >= 80 ? C.green : C.gold) + "22" }}><Trophy size={28} color={overall >= 80 ? C.green : C.gold} /></div>
        <div className="text-xl font-bold">Roleplay complete</div><div className="text-sm" style={{ color: C.sub }}>{config.env} · {config.persona} · {config.diff}</div>
        <div className="mt-2 text-4xl font-extrabold osp-pop" style={{ color: C.gold }}>{overall}%</div>
        <div className="mt-1 text-sm font-semibold" style={{ color: C.green }}>+{xp} XP earned</div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4"><div className="mb-2 font-semibold">Scorecard</div>
          <ResponsiveContainer width="100%" height={230}><RadarChart data={radar}><PolarGrid stroke={C.border} /><PolarAngleAxis dataKey="k" tick={{ fill: C.sub, fontSize: 10 }} /><Radar dataKey="v" stroke={C.gold} fill={C.gold} fillOpacity={0.4} /></RadarChart></ResponsiveContainer>
        </Card>
        <Card className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><Bot size={16} color={C.blueSoft} /> AI feedback</div>
          <div className="space-y-2 text-sm" style={{ color: C.sub }}>
            <p><b style={{ color: C.green }}>What you did well:</b> Strong, confident opener and a professional tone — you kept your composure with a {config.persona} customer.</p>
            <p><b style={{ color: C.gold }}>What needs work:</b> Your <b>{weakest}</b> was your lowest score. Slow down there and earn the next step before pitching.</p>
            <div className="mt-2 rounded-lg p-2" style={{ background: C.blue + "12" }}>
              <div className="text-xs font-semibold" style={{ color: C.text }}>Recommended next drill</div>
              <div className="mt-1 flex items-center justify-between"><span style={{ color: C.text }}>{nextDrill.title}</span><Pill color={C.blue}>{nextDrill.cat}</Pill></div>
            </div>
            <div className="mt-1 text-xs" style={{ color: C.sub }}>Badge progress: <b style={{ color: C.purple }}>Objection Crusher</b> — 3/5 high scores</div>
          </div>
        </Card>
      </div>
      <div className="flex gap-2">
        <Btn kind="soft" className="flex-1" onClick={() => { setStage("chat"); setMsgs([{ r: "ai", t: personaOpen(config) }]); setTurns(0); }}>Run again</Btn>
        <Btn kind="gold" className="flex-1" onClick={onClose}>Done</Btn>
      </div>
    </div>
  );
}

function RoleplayArena() {
  const [cfg, setCfg] = useState({ env: "Door-to-Door", diff: "Intermediate", persona: "skeptical", goal: "make sale" });
  const [live, setLive] = useState(false);
  if (live) return <RoleplaySession config={cfg} onClose={() => setLive(false)} />;
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2 text-lg font-bold"><Target size={20} color={C.gold} /> Configure your roleplay</div>
        <div className="grid gap-3 md:grid-cols-2">
          <Select label="Sales environment" value={cfg.env} onChange={(e) => setCfg({ ...cfg, env: e.target.value })} options={ENVS} />
          <Select label="Difficulty" value={cfg.diff} onChange={(e) => setCfg({ ...cfg, diff: e.target.value })} options={DIFFS} />
          <Select label="Customer personality" value={cfg.persona} onChange={(e) => setCfg({ ...cfg, persona: e.target.value })} options={PERSONAS} />
          <Select label="Objective" value={cfg.goal} onChange={(e) => setCfg({ ...cfg, goal: e.target.value })} options={RP_GOALS} />
        </div>
        <Btn kind="gold" className="mt-5 w-full py-3" onClick={() => setLive(true)}><Play size={16} /> Enter the arena</Btn>
      </Card>
      <Card className="p-4" style={{ background: C.blue + "10" }}><div className="flex items-center gap-2 text-sm"><Sparkles size={15} color={C.blueSoft} /><span style={{ color: C.sub }}>Tip: you can also launch a roleplay directly from any of the 100 Sales Drills — it pre-loads the perfect scenario.</span></div></Card>
    </div>
  );
}

function TestsView({ store }) {
  const [course, setCourse] = useState(null);
  if (course) return <TestExperience course={course} store={store} onClose={() => setCourse(null)} />;
  return (
    <div className="space-y-4">
      <Card className="p-4" style={{ background: C.gold + "0d" }}><div className="flex items-center gap-2 text-sm"><ClipboardList size={16} color={C.gold} /><span style={{ color: C.sub }}>Pass a course test at 80%+ to earn its certification. Tests are timed — answer with confidence.</span></div></Card>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((c) => (
          <Card key={c.id} className="osp-hover p-4">
            <div className="mb-2 flex items-center gap-2"><c.icon size={18} color={c.color} /><span className="font-semibold">{c.title}</span></div>
            <div className="text-xs" style={{ color: C.sub }}>{QUIZ.length} questions · 80% to pass · timed</div>
            <div className="mt-3 flex items-center justify-between"><Pill color={c.progress === 100 ? C.green : C.gold}>{c.progress === 100 ? "Passed" : "Not taken"}</Pill>
              <Btn kind={c.progress === 100 ? "soft" : "gold"} onClick={() => setCourse(c)}>{c.progress === 100 ? "Retake" : "Start test"}</Btn></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const JOKES = [
  "Why did the salesperson bring a ladder to the pitch? Because they heard the close rate was through the roof.",
  "I told a customer our product sells itself. Then I realized — that's why I'm not getting commission.",
  "Why don't salespeople play hide and seek? Because good luck hiding when they always follow up.",
  "What's a closer's favorite kind of music? Anything with a strong finish.",
  "Why did the rep bring a pencil to the door? In case they had to draw out the conversation.",
];
const Q_TIMES = [45, 60, 75, 90, 60];

function TestExperience({ course, store, onClose }) {
  const [stage, setStage] = useState("intro"); // intro | joke | quiz | results
  const [joke] = useState(() => JOKES[Math.floor(rnd() * JOKES.length)]);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sel, setSel] = useState(null);
  const [time, setTime] = useState(Q_TIMES[0]);

  const total = QUIZ.length;
  const estMin = Math.ceil(Q_TIMES.reduce((a, b) => a + b, 0) / 60);

  // per-question countdown
  useEffect(() => {
    if (stage !== "quiz") return;
    setTime(Q_TIMES[qi] || 60);
    const id = setInterval(() => setTime((t) => {
      if (t <= 1) { clearInterval(id); advance(null); return 0; }
      return t - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [stage, qi]);

  const advance = (choice) => {
    setAnswers((a) => ({ ...a, [qi]: choice }));
    setSel(null);
    if (qi + 1 >= total) setStage("results");
    else setQi((i) => i + 1);
  };

  const correctCount = QUIZ.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0);
  const pct = Math.round((correctCount / total) * 100);
  const passed = pct >= 80;
  useEffect(() => { if (stage === "results" && store) store.notify(passed ? `Passed ${course.title}! Certificate earned` : "Test scored — review & retake"); }, [stage]);

  if (stage === "intro") return (
    <div className="mx-auto max-w-2xl space-y-4">
      <button onClick={onClose} className="text-sm" style={{ color: C.sub }}>← Back to tests</button>
      <Card glow className="p-6 text-center">
        <div className="mx-auto mb-3 inline-flex rounded-2xl p-3 osp-float" style={{ background: course.color + "22", border: `1px solid ${course.color}55` }}><course.icon size={30} color={course.color} /></div>
        <div className="text-2xl font-extrabold">{course.title}</div>
        <div className="mt-1 text-sm" style={{ color: C.gold }}>Certification Test</div>
        <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3">
          {[[total, "Questions"], ["80%", "To pass"], [`~${estMin} min`, "Est. time"]].map(([v, l]) => (
            <div key={l} className="rounded-xl py-3" style={{ background: C.panel2 }}><div className="font-bold" style={{ color: C.text }}>{v}</div><div className="text-xs" style={{ color: C.sub }}>{l}</div></div>
          ))}
        </div>
        <div className="mx-auto mt-4 max-w-md rounded-xl p-3 text-left text-sm" style={{ background: C.panel2 }}>
          <div className="mb-1 font-semibold" style={{ color: C.text }}>Rules</div>
          <ul className="space-y-1" style={{ color: C.sub }}>
            <li className="flex gap-2"><Timer size={14} className="mt-0.5 shrink-0" color={C.gold} /> Each question is timed — answer before the clock runs out.</li>
            <li className="flex gap-2"><Crosshair size={14} className="mt-0.5 shrink-0" color={C.blueSoft} /> No going back — trust your gut.</li>
            <li className="flex gap-2"><Bot size={14} className="mt-0.5 shrink-0" color={C.purple} /> Wrong answers get an AI explanation at the end.</li>
          </ul>
        </div>
        <p className="mt-4 text-sm font-semibold" style={{ color: C.text }}>You've trained for this. Walk in like you've already passed. 💪</p>
        <Btn kind="gold" className="mt-4 px-8 py-3" onClick={() => setStage("joke")}>I'm ready <ArrowRight size={16} /></Btn>
      </Card>
    </div>
  );

  if (stage === "joke") return (
    <div className="mx-auto max-w-xl">
      <Card glow className="p-8 text-center osp-pop">
        <Smile size={40} color={C.gold} className="mx-auto osp-float" />
        <div className="mt-3 text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>One quick laugh before we start</div>
        <p className="mx-auto mt-3 max-w-md text-lg font-semibold" style={{ color: C.text }}>{joke}</p>
        <Btn kind="gold" className="mt-6 px-8 py-3" onClick={() => { setQi(0); setStage("quiz"); }}>Okay, start the test <Play size={16} /></Btn>
      </Card>
    </div>
  );

  if (stage === "quiz") {
    const q = QUIZ[qi];
    const low = time <= 10;
    const pctTime = (time / (Q_TIMES[qi] || 60)) * 100;
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <Pill color={C.blue}>Question {qi + 1} / {total}</Pill>
          <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold" style={{ background: low ? C.red + "22" : C.panel2, color: low ? C.red : C.text, border: `1px solid ${low ? C.red : C.border}`, animation: low ? "ospSpinGlow 1s infinite" : "none" }}>
            <Timer size={15} color={low ? C.red : C.gold} /> {time}s
          </div>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: C.panel2 }}><div className="h-1.5 rounded-full" style={{ width: `${pctTime}%`, background: low ? C.red : C.gold, transition: "width 1s linear" }} /></div>
        <Card className="p-5">
          <div className="mb-4 text-lg font-semibold">{q.q}</div>
          <div className="space-y-2">{q.a.map((opt, oi) => (
            <button key={oi} onClick={() => setSel(oi)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm osp-hover"
              style={{ background: sel === oi ? C.blue + "22" : C.panel2, border: `1px solid ${sel === oi ? C.blue : C.border}`, color: C.text }}>
              <div className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ border: `1px solid ${C.border}` }}>{String.fromCharCode(65 + oi)}</div>{opt}
            </button>
          ))}</div>
          <Btn kind="gold" className="mt-4 w-full py-3" style={{ opacity: sel == null ? 0.5 : 1 }} onClick={() => sel != null && advance(sel)}>
            {qi + 1 >= total ? "Finish test" : "Next question"} <ArrowRight size={15} />
          </Btn>
        </Card>
      </div>
    );
  }

  // results
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Card glow className="p-6 text-center">
        <Ring value={pct} size={130} color={passed ? C.green : C.gold} />
        <div className="mt-4 text-2xl font-extrabold">{passed ? "You passed! 🎉" : "Not quite — retake to pass"}</div>
        <div className="mt-1 text-sm" style={{ color: C.sub }}>You scored {correctCount}/{total} ({pct}%). {passed ? "Your certificate is unlocked." : "You need 80%. Review the AI notes and try again."}</div>
        {passed && <Pill color={C.green}><Award size={12} /> {course.title} Certified</Pill>}
      </Card>
      <Card className="p-4"><div className="mb-3 font-semibold">Review & AI coaching</div>
        <div className="space-y-3">{QUIZ.map((q, i) => {
          const right = answers[i] === q.correct;
          return (
            <div key={i} className="rounded-xl p-3" style={{ background: C.panel2, border: `1px solid ${right ? C.green + "44" : C.red + "44"}` }}>
              <div className="flex items-start gap-2 text-sm">
                {right ? <CheckCircle2 size={16} color={C.green} className="mt-0.5 shrink-0" /> : <X size={16} color={C.red} className="mt-0.5 shrink-0" />}
                <div><div className="font-semibold" style={{ color: C.text }}>{q.q}</div>
                  <div className="mt-1 text-xs" style={{ color: C.green }}>Correct: {q.a[q.correct]}</div>
                  {!right && <div className="text-xs" style={{ color: C.red }}>You: {answers[i] == null ? "(ran out of time)" : q.a[answers[i]]}</div>}
                  <div className="mt-1 flex gap-1.5 text-xs" style={{ color: C.sub }}><Bot size={12} color={C.blueSoft} className="mt-0.5 shrink-0" /> {q.why}</div>
                </div>
              </div>
            </div>
          );
        })}</div>
      </Card>
      <div className="flex gap-2">
        <Btn kind="soft" className="flex-1" onClick={() => { setAnswers({}); setQi(0); setSel(null); setStage("intro"); }}>Retake test</Btn>
        <Btn kind="gold" className="flex-1" onClick={onClose}>{passed ? "View certificate" : "Back to tests"}</Btn>
      </div>
    </div>
  );
}

function BadgeMedal({ b, size = 64 }) {
  const r = RARITY[b.rarity];
  const Icon = b.icon;
  return (
    <div className="relative mx-auto flex items-center justify-center rounded-full" style={{ width: size, height: size }}>
      {b.earned && <div className="absolute inset-0 rounded-full osp-shine" style={{ background: `linear-gradient(110deg, transparent 30%, ${r.c}66 50%, transparent 70%)` }} />}
      <div className="flex items-center justify-center rounded-full" style={{
        width: size, height: size,
        background: b.earned ? `radial-gradient(circle at 30% 25%, ${r.c}55, ${C.card})` : C.panel2,
        border: `2px solid ${b.earned ? r.c : C.border}`,
        boxShadow: b.earned ? `0 0 18px ${r.glow}` : "none", opacity: b.earned ? 1 : 0.5,
      }}>
        {b.earned ? <Icon size={size / 2.4} color={r.c} /> : <Lock size={size / 2.8} color={C.sub} />}
      </div>
    </div>
  );
}

function BadgesView() {
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);
  const earned = BADGE_VAULT.filter((b) => b.earned).length;
  const list = BADGE_VAULT.filter((b) => cat === "All" || b.cat === cat);
  return (
    <div className="space-y-5">
      <Card glow className="overflow-hidden p-0">
        <div className="flex flex-col items-center gap-4 p-5 text-center md:flex-row md:text-left" style={grad(C.purple + "1f", C.gold + "0d")}>
          <Trophy size={40} color={C.gold} className="osp-float" />
          <div className="flex-1"><div className="text-xl font-extrabold">Achievement Vault</div><div className="text-sm" style={{ color: C.sub }}>{earned} of {BADGE_VAULT.length} badges unlocked · keep grinding to hit Mythic</div></div>
          <Ring value={Math.round((earned / BADGE_VAULT.length) * 100)} size={76} color={C.gold} />
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">{BADGE_CATS.map((c) => (
        <button key={c} onClick={() => setCat(c)} className="rounded-full px-3 py-1.5 text-xs font-semibold"
          style={{ background: cat === c ? C.blue + "22" : C.panel2, color: cat === c ? C.text : C.sub, border: `1px solid ${cat === c ? C.blue : C.border}` }}>{c}</button>
      ))}</div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{list.map((b) => {
        const r = RARITY[b.rarity];
        return (
          <Card key={b.name} className="osp-hover cursor-pointer p-4 text-center" onClick={() => setSel(b)} style={{ borderColor: b.earned ? r.c + "55" : C.border }}>
            <BadgeMedal b={b} />
            <div className="mt-3 text-sm font-bold" style={{ color: C.text }}>{b.name}</div>
            <div className="mt-0.5 text-xs font-semibold" style={{ color: r.c }}>{b.rarity}</div>
            {!b.earned && b.prog && (
              <div className="mt-2"><div className="h-1.5 rounded-full" style={{ background: C.panel2 }}><div className="h-1.5 rounded-full" style={{ width: `${Math.min(100, (b.prog[0] / b.prog[1]) * 100)}%`, background: r.c }} /></div>
                <div className="mt-1 text-xs" style={{ color: C.sub }}>{b.prog[0]}/{b.prog[1]}</div></div>
            )}
            {b.earned && <div className="mt-1 text-xs" style={{ color: C.green }}>+{b.xp} XP</div>}
          </Card>
        );
      })}</div>

      <Modal open={!!sel} onClose={() => setSel(null)} title="Badge detail">
        {sel && (() => { const r = RARITY[sel.rarity]; return (
          <div className="text-center">
            <BadgeMedal b={sel} size={96} />
            <div className="mt-4 text-xl font-extrabold">{sel.name}</div>
            <div className="mt-1 flex items-center justify-center gap-2"><Pill color={r.c}>{sel.rarity}</Pill><Pill color={C.blue}>{sel.cat}</Pill></div>
            <p className="mx-auto mt-3 max-w-sm text-sm" style={{ color: C.sub }}>{sel.desc}</p>
            <div className="mx-auto mt-4 grid max-w-xs grid-cols-2 gap-2">
              <div className="rounded-xl py-2" style={{ background: C.panel2 }}><div className="font-bold" style={{ color: C.gold }}>+{sel.xp}</div><div className="text-xs" style={{ color: C.sub }}>XP reward</div></div>
              <div className="rounded-xl py-2" style={{ background: C.panel2 }}><div className="font-bold" style={{ color: sel.earned ? C.green : C.sub }}>{sel.earned ? "Earned" : "Locked"}</div><div className="text-xs" style={{ color: C.sub }}>{sel.earned ? sel.date : sel.prog ? `${sel.prog[0]}/${sel.prog[1]}` : "Keep going"}</div></div>
            </div>
            {sel.earned
              ? <div className="mt-4 flex gap-2"><Btn kind="soft" className="flex-1"><Share2 size={14} /> Share</Btn><Btn kind="gold" className="flex-1"><Download size={14} /> Download</Btn></div>
              : sel.prog && <div className="mt-4"><div className="mb-1 text-xs" style={{ color: C.sub }}>Progress to unlock</div><div className="h-2 rounded-full" style={{ background: C.panel2 }}><div className="h-2 rounded-full" style={{ width: `${Math.min(100, (sel.prog[0] / sel.prog[1]) * 100)}%`, background: r.c }} /></div></div>}
          </div>
        ); })()}
      </Modal>
    </div>
  );
}

function TasksView({ store }) {
  const { tasks, setTasks, notify } = store;
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: "", cat: "personal", priority: "medium", due: 1, notes: "" });
  const toggle = (id) => setTasks((ts) => ts.map((t) => t.id === id ? { ...t, status: t.status === "done" ? "open" : "done" } : t));
  const del = (id) => { setTasks((ts) => ts.filter((t) => t.id !== id)); notify("Task deleted"); };
  const add = () => {
    if (!draft.title.trim()) return;
    setTasks((ts) => [{ id: "t" + Date.now(), ...draft, due: Number(draft.due), status: "open", auto: false }, ...ts]);
    setDraft({ title: "", cat: "personal", priority: "medium", due: 1, notes: "" }); setAdding(false); notify("Task created");
  };
  const open = tasks.filter((t) => t.status !== "done");
  const sections = [
    ["Past Due", open.filter((t) => t.due < 0), C.red],
    ["Due Today", open.filter((t) => t.due === 0), C.gold],
    ["Coming Up · Next 14 Days", open.filter((t) => t.due > 0 && t.due <= 14), C.blue],
    ["Completed", tasks.filter((t) => t.status === "done"), C.green],
  ];
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const weekPct = Math.round((doneCount / tasks.length) * 100);
  const overdue = open.filter((t) => t.due < 0).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="p-4"><div className="flex items-center justify-between"><div><div className="text-xs" style={{ color: C.sub }}>Weekly completion</div><div className="text-2xl font-bold">{weekPct}%</div></div><Ring value={weekPct} size={60} color={C.green} /></div></Card>
        <Card className="p-4"><div className="text-xs" style={{ color: C.sub }}>Graduation pace</div><div className="mt-1 flex items-center gap-2 text-2xl font-bold" style={{ color: overdue ? C.gold : C.green }}>{overdue ? "Catch up" : "On track"} {overdue ? <AlertTriangle size={20} color={C.gold} /> : <CheckCircle2 size={20} color={C.green} />}</div><div className="mt-1 text-xs" style={{ color: C.sub }}>Auto-paced to graduate on time</div></Card>
        <Card className="p-4"><div className="text-xs" style={{ color: C.sub }}>Overdue warnings</div><div className="mt-1 text-2xl font-bold" style={{ color: overdue ? C.red : C.text }}>{overdue}</div><div className="mt-1 flex items-center gap-1 text-xs" style={{ color: C.sub }}><Flame size={12} color={C.red} /> 9-day streak protecting your pace</div></Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: C.sub }}>Auto-generated graduation tasks keep you on track. Add your own anytime.</div>
        <Btn kind="gold" onClick={() => setAdding(true)}><Plus size={15} /> New task</Btn>
      </div>

      {sections.map(([label, items, color]) => items.length > 0 && (
        <div key={label}>
          <div className="mb-2 flex items-center gap-2 text-sm font-bold"><span className="h-2 w-2 rounded-full" style={{ background: color }} /> {label} <span style={{ color: C.sub }}>· {items.length}</span></div>
          <div className="space-y-2">{items.map((t) => (
            <Card key={t.id} className="flex items-center gap-3 p-3">
              <button onClick={() => toggle(t.id)}>{t.status === "done" ? <CheckCircle2 size={20} color={C.green} /> : <Circle size={20} color={C.sub} />}</button>
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="text-sm font-semibold" style={{ color: t.status === "done" ? C.sub : C.text, textDecoration: t.status === "done" ? "line-through" : "none" }}>{t.title}</span>{t.auto && <Pill color={C.purple}>auto</Pill>}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs" style={{ color: C.sub }}>
                  <Pill color={PRIORITY[t.priority]}>{t.priority}</Pill><Pill color={C.blueSoft}>{t.cat}</Pill>
                  <span>{t.due < 0 ? `${Math.abs(t.due)}d overdue` : t.due === 0 ? "today" : `in ${t.due}d`}</span>
                  {t.notes && <span>· {t.notes}</span>}
                </div>
              </div>
              <button onClick={() => del(t.id)} className="rounded-lg p-1.5" style={{ background: C.panel2 }}><Trash2 size={15} color={C.sub} /></button>
            </Card>
          ))}</div>
        </div>
      ))}

      <Modal open={adding} onClose={() => setAdding(false)} title="New task">
        <div className="space-y-3">
          <Field label="Task" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Run 3 door-to-door roleplays" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" value={draft.cat} onChange={(e) => setDraft({ ...draft, cat: e.target.value })} options={TASK_CATS} />
            <Select label="Priority" value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value })} options={["low", "medium", "high", "urgent"]} />
          </div>
          <Field label="Due in (days)" type="number" value={draft.due} onChange={(e) => setDraft({ ...draft, due: e.target.value })} />
          <Field label="Notes (optional)" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
          <Btn kind="gold" className="w-full py-3" onClick={add}>Create task</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Resources({ store }) {
  const notify = store?.notify || (() => {});
  const [tab, setTab] = useState("Scripts");
  const [fav, setFav] = useState({});
  const [detail, setDetail] = useState(null);
  const [tv, setTv] = useState(null);
  const tabs = [
    ["Scripts", FileText], ["Objection Flashcards", ShieldCheck], ["Pitch Templates", Megaphone],
    ["Follow-Up Templates", Mail], ["OSP TV", Headphones], ["Downloads", Download],
  ];
  const copy = (text) => { try { navigator.clipboard?.writeText(text); } catch (e) {} notify("Copied to clipboard"); };
  const toggleFav = (k) => { setFav((f) => ({ ...f, [k]: !f[k] })); notify(fav[k] ? "Removed from saved" : "Saved to favorites"); };

  const cardList = (items, getBody) => (
    <div className="grid gap-3 md:grid-cols-2">{items.map((it) => (
      <Card key={it.name} className="osp-hover p-4">
        <div className="flex items-center justify-between"><div className="font-semibold">{it.name}</div>
          <button onClick={() => toggleFav(it.name)}><Bookmark size={16} color={fav[it.name] ? C.gold : C.sub} fill={fav[it.name] ? C.gold : "none"} /></button></div>
        <p className="mt-2 line-clamp-3 text-sm" style={{ color: C.sub }}>{getBody(it)}</p>
        <div className="mt-3 flex gap-2"><Btn kind="soft" className="flex-1" onClick={() => setDetail({ ...it, body: getBody(it) })}>Open</Btn><Btn kind="ghost" onClick={() => copy(getBody(it))}><Copy size={14} /></Btn></div>
      </Card>
    ))}</div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">{tabs.map(([t, Icon]) => (
        <button key={t} onClick={() => setTab(t)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold"
          style={{ background: tab === t ? C.blue + "22" : C.panel2, color: tab === t ? C.text : C.sub, border: `1px solid ${tab === t ? C.blue : C.border}` }}>
          <Icon size={15} /> {t}
        </button>
      ))}</div>

      {tab === "Scripts" && cardList(RES_SCRIPTS, (i) => i.body)}
      {tab === "Pitch Templates" && cardList(RES_PITCHES, (i) => i.body)}
      {tab === "Follow-Up Templates" && cardList(RES_FOLLOWUPS, (i) => i.body)}
      {tab === "Objection Flashcards" && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{RES_OBJECTIONS.map((o) => <Flashcard key={o.name} o={o} />)}</div>
      )}
      {tab === "OSP TV" && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{OSP_TV.map((v) => (
          <Card key={v.name} className="osp-hover overflow-hidden p-0 cursor-pointer" onClick={() => setTv(v)}>
            <div className="relative flex h-32 items-center justify-center" style={grad(C.blue + "33", C.purple + "22")}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "#000000aa" }}><Play size={20} color="#fff" /></div>
              <span className="absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-xs" style={{ background: "#000000aa", color: "#fff" }}>{v.len}</span>
              <span className="absolute left-2 top-2"><Pill color={C.gold}>{v.tag}</Pill></span>
            </div>
            <div className="p-3"><div className="text-sm font-semibold">{v.name}</div><div className="text-xs" style={{ color: C.sub }}>{v.desc}</div></div>
          </Card>
        ))}</div>
      )}
      {tab === "Downloads" && (
        <div className="grid gap-3 md:grid-cols-2">{["OSP Brand Guidelines.pdf", "Daily Activity Tracker.xlsx", "Objection Cheat Sheet.pdf", "Door Approach Map.pdf", "90-Day Game Plan.pdf"].map((f) => (
          <Card key={f} className="flex items-center gap-3 p-4">
            <div className="rounded-xl p-2.5" style={{ background: C.blue + "1f", border: `1px solid ${C.blue}33` }}><FileText size={18} color={C.blueSoft} /></div>
            <span className="flex-1 text-sm font-semibold">{f}</span>
            <Btn kind="soft" onClick={() => notify("Download started (mock)")}><Download size={14} /> Download</Btn>
          </Card>
        ))}</div>
      )}

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name} wide>
        {detail && <div>
          <pre className="whitespace-pre-wrap rounded-xl p-4 text-sm" style={{ background: C.panel2, color: C.text, fontFamily: "inherit", lineHeight: 1.6 }}>{detail.body}</pre>
          <div className="mt-3 flex gap-2"><Btn kind="soft" className="flex-1" onClick={() => copy(detail.body)}><Copy size={14} /> Copy</Btn><Btn kind="gold" className="flex-1" onClick={() => { toggleFav(detail.name); }}><Bookmark size={14} /> Save</Btn></div>
        </div>}
      </Modal>

      <Modal open={!!tv} onClose={() => setTv(null)} title={tv?.name} wide>
        {tv && <div>
          <div className="relative flex h-56 items-center justify-center rounded-xl" style={grad(C.blue + "33", C.purple + "22")}>
            <div className="flex h-16 w-16 items-center justify-center rounded-full osp-float" style={{ background: "#000000aa" }}><Play size={26} color="#fff" /></div>
          </div>
          <div className="mt-3 flex items-center gap-2"><Pill color={C.gold}>{tv.tag}</Pill><span className="text-xs" style={{ color: C.sub }}>{tv.len}</span></div>
          <p className="mt-2 text-sm" style={{ color: C.sub }}>{tv.desc} — OSP TV is your in-house channel for motivation, training breakdowns, and top-performer stories. (Video playback is mocked in this demo.)</p>
        </div>}
      </Modal>
    </div>
  );
}
function Flashcard({ o }) {
  const [flip, setFlip] = useState(false);
  return (
    <button onClick={() => setFlip(!flip)} className="osp-hover w-full rounded-2xl p-5 text-left" style={{ minHeight: 150, background: flip ? C.green + "12" : C.card, border: `1px solid ${flip ? C.green + "55" : C.border}` }}>
      <div className="mb-2 flex items-center justify-between"><Pill color={flip ? C.green : C.red}>{flip ? "Response" : "Objection"}</Pill><span className="text-xs" style={{ color: C.sub }}>tap to flip</span></div>
      <div className="text-sm" style={{ color: C.text }}>{flip ? o.back : o.front}</div>
    </button>
  );
}

function Profile({ store }) {
  const { profile, setProfile, notify } = store;
  const [p, setP] = useState(profile);
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value });
  const setQ = (k) => (e) => setP({ ...p, q: { ...p.q, [k]: e.target.value } });
  const save = () => { setProfile(p); notify("Profile saved"); };
  const s = CURRENT_STUDENT;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card glow className="p-5 text-center lg:col-span-1">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-extrabold osp-float" style={{ ...grad(C.blue, C.purple), color: "#fff", boxShadow: `0 0 24px ${C.blue}55` }}>MR</div>
          <div className="mt-3 text-lg font-bold">{p.name}</div><div className="text-sm" style={{ color: C.gold }}>{s.rank}</div>
          <div className="mt-1 text-xs" style={{ color: C.sub }}>{p.city} · joined Mar 2026</div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">{[[s.xp.toLocaleString(), "XP"], [s.streak, "Streak"], [s.certs, "Certs"]].map(([v, l]) => (
            <div key={l} className="rounded-xl py-2" style={{ background: C.panel2 }}><div className="font-bold" style={{ color: C.text }}>{v}</div><div className="text-xs" style={{ color: C.sub }}>{l}</div></div>
          ))}</div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">{BADGE_VAULT.filter((b) => b.earned).slice(0, 6).map((b) => { const r = RARITY[b.rarity]; return <div key={b.name} title={b.name} className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: r.c + "22", border: `1px solid ${r.c}55` }}><b.icon size={15} color={r.c} /></div>; })}</div>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card className="p-4"><div className="mb-3 font-semibold">Basics</div>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Full name" value={p.name} onChange={set("name")} /><Field label="Email" value={p.email} onChange={set("email")} />
              <Field label="Phone" value={p.phone} onChange={set("phone")} /><Field label="Current city" value={p.city} onChange={set("city")} />
            </div>
            <label className="mt-3 block"><span className="mb-1 block text-xs font-semibold" style={{ color: C.sub }}>Bio</span>
              <textarea rows={2} value={p.bio} onChange={set("bio")} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} /></label>
          </Card>
          <Card className="p-4"><div className="mb-3 font-semibold">Development</div>
            <div className="grid gap-3 md:grid-cols-2">
              <Select label="Favorite sales style" value={p.favStyle} onChange={set("favStyle")} options={ENVS} />
              <Field label="Strongest skill" value={p.strongest} onChange={set("strongest")} />
              <Field label="Skill to improve" value={p.improve} onChange={set("improve")} />
              <Field label="Dream income goal" value={p.income} onChange={set("income")} />
              <Field label="Preferred schedule" value={p.schedule} onChange={set("schedule")} />
              <Select label="Experience level" value={p.experience} onChange={set("experience")} options={["None", "Some", "Experienced"]} />
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-4"><div className="mb-1 font-semibold">Student questionnaire</div>
        <div className="mb-3 text-xs" style={{ color: C.sub }}>Helps your manager coach you better. Be honest — this is for you.</div>
        <div className="grid gap-3 md:grid-cols-2">{PROFILE_QS.map(([k, q]) => (
          <Field key={k} label={q} value={p.q[k] || ""} onChange={setQ(k)} />
        ))}</div>
      </Card>

      <div className="flex justify-end"><Btn kind="gold" className="px-8 py-3" onClick={save}><CheckCircle2 size={16} /> Save profile</Btn></div>
    </div>
  );
}

function StudentProfileModal({ s, open, onClose }) {
  if (!s) return null;
  return (
    <Modal open={open} onClose={onClose} title="Student profile" wide>
      <div className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-extrabold osp-float" style={{ ...grad(C.blue, C.purple), color: "#fff", boxShadow: `0 0 22px ${C.blue}55` }}>{s.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
        <div className="flex-1">
          <div className="text-xl font-extrabold">{s.name}</div>
          <div className="text-sm" style={{ color: C.gold }}>{s.rank} · Level {s.level}</div>
          <div className="mt-1 flex flex-wrap justify-center gap-1.5 md:justify-start">
            <Pill color={C.gold}>{s.xp.toLocaleString()} XP</Pill><Pill color={C.red}><Flame size={11} /> {s.streak}d</Pill><Pill color={C.green}>RP avg {s.rpAvg}%</Pill><Pill color={C.blue}>{s.team}</Pill>
          </div>
        </div>
        <Btn kind="gold" onClick={onClose}><Crosshair size={14} /> Challenge</Btn>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Card className="p-3" style={{ background: C.panel2 }}><Row label="Hometown" v={s.hometown} /></Card>
        <Card className="p-3" style={{ background: C.panel2 }}><Row label="Favorite environment" v={s.favEnv} /></Card>
        <Card className="p-3" style={{ background: C.panel2 }}><Row label="Strongest skill" v={s.strongest} /></Card>
        <Card className="p-3" style={{ background: C.panel2 }}><Row label="Current goal" v={s.goal} /></Card>
      </div>
      <Card className="mt-3 p-3" style={{ background: C.panel2 }}><Row label="Bio" v={s.bio} /></Card>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[[s.badgeCount, "Badges"], [s.certs ?? 3, "Certs"], [s.courses ?? 6, "Courses"]].map(([v, l]) => (
          <div key={l} className="rounded-xl py-2" style={{ background: C.panel2 }}><div className="font-bold">{v}</div><div className="text-xs" style={{ color: C.sub }}>{l}</div></div>
        ))}
      </div>
      <div className="mt-3"><div className="mb-1 text-xs font-semibold" style={{ color: C.gold }}>Recent wins</div>
        <div className="flex flex-wrap gap-2">{s.recentWins.map((w) => <Pill key={w} color={C.green}><Trophy size={11} /> {w}</Pill>)}</div>
      </div>
    </Modal>
  );
}

function BoardRoom({ store, admin }) {
  const { posts, setPosts, notify } = store;
  const [type, setType] = useState("Win");
  const [text, setText] = useState("");
  const [commentOn, setCommentOn] = useState(null);
  const [comment, setComment] = useState("");

  const me = admin ? "OSP Admin" : "Marcus Reyes";
  const myAvatar = admin ? "OS" : "MR";
  const post = () => {
    if (!text.trim()) return;
    const p = { id: "p" + Date.now(), author: me, avatar: myAvatar, type: admin && type === "Announcement" ? "Announcement" : type, time: "Just now", text, likes: 0, liked: false, comments: [], pinned: false, rank: admin ? "Super Admin" : "Conversation Builder" };
    setPosts((ps) => [p, ...ps]); setText(""); notify("Posted to the Board Room");
  };
  const like = (id) => setPosts((ps) => ps.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p));
  const addComment = (id) => {
    if (!comment.trim()) return;
    setPosts((ps) => ps.map((p) => p.id === id ? { ...p, comments: [...p.comments, { author: me, text: comment }] } : p));
    setComment(""); setCommentOn(null); notify("Comment added");
  };

  const pinned = posts.filter((p) => p.pinned);
  const feed = posts.filter((p) => !p.pinned);
  const trending = ["#ObjectionHandling", "#FirstClose", "#DoorApproach", "#30DayStreak", "#MorningMeeting"];
  const contributors = [["Aaliyah Coleman", 58], ["Devin Brooks", 41], ["Jamal Carter", 47]].sort((a, b) => b[1] - a[1]);
  const types = admin ? ["Announcement", "Win", "Tip", "Motivation"] : ["Win", "Question", "Tip", "Motivation", "Badge Earned", "Course Completed"];

  const renderPost = (p) => {
    const meta = POST_TYPES[p.type] || POST_TYPES.Win; const Icon = meta.icon;
    return (
      <Card key={p.id} className="p-4 osp-slide" glow={p.pinned} style={p.pinned ? { borderColor: C.gold + "66" } : {}}>
        {p.pinned && <div className="mb-2 flex items-center gap-1 text-xs font-bold" style={{ color: C.gold }}><Pin size={12} /> Pinned announcement</div>}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{p.avatar}</div>
          <div className="flex-1"><div className="flex items-center gap-2"><span className="text-sm font-bold">{p.author}</span><Pill color={meta.c}><Icon size={11} /> {p.type}</Pill></div>
            <div className="text-xs" style={{ color: C.sub }}>{p.rank || "Sales Student"} · {p.time}</div></div>
        </div>
        <p className="mt-3 text-sm" style={{ color: C.text }}>{p.text}</p>
        <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: C.sub }}>
          <button onClick={() => like(p.id)} className="flex items-center gap-1.5"><Heart size={15} color={p.liked ? C.red : C.sub} fill={p.liked ? C.red : "none"} /> {p.likes}</button>
          <button onClick={() => setCommentOn(commentOn === p.id ? null : p.id)} className="flex items-center gap-1.5"><MessageCircle size={15} /> {p.comments.length}</button>
          <button className="flex items-center gap-1.5"><Share2 size={15} /> Share</button>
        </div>
        {p.comments.length > 0 && <div className="mt-3 space-y-2 border-t pt-3" style={{ borderColor: C.border }}>{p.comments.map((c, i) => (
          <div key={i} className="flex gap-2 text-sm"><div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: C.panel2, color: C.sub }}>{c.author[0]}</div>
            <div><span className="font-semibold" style={{ color: C.text }}>{c.author}</span> <span style={{ color: C.sub }}>{c.text}</span></div></div>
        ))}</div>}
        {commentOn === p.id && (
          <div className="mt-3 flex gap-2">
            <input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addComment(p.id)} placeholder="Write a comment…" className="flex-1 rounded-xl px-3 py-2 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
            <Btn kind="primary" onClick={() => addComment(p.id)}><Send size={14} /></Btn>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Card className="p-4">
          <div className="mb-2 flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold" style={{ ...grad(C.blue, C.purple), color: "#fff" }}>{myAvatar}</div><span className="text-sm font-semibold">Share something with the team</span></div>
          <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={admin ? "Post an announcement, shoutout, or tip…" : "Share a win, ask a question, or shout out a teammate…"} className="w-full rounded-xl px-3 py-2.5 text-sm outline-none" style={{ background: C.panel2, border: `1px solid ${C.border}`, color: C.text }} />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {types.map((t) => { const m = POST_TYPES[t]; const I = m.icon; return (
              <button key={t} onClick={() => setType(t)} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: type === t ? m.c + "22" : C.panel2, color: type === t ? m.c : C.sub, border: `1px solid ${type === t ? m.c : C.border}` }}><I size={11} /> {t}</button>
            ); })}
            <Btn kind="gold" className="ml-auto" onClick={post}><Send size={14} /> Post</Btn>
          </div>
        </Card>
        {pinned.map((p) => renderPost(p))}
        {feed.map((p) => renderPost(p))}
      </div>

      <div className="space-y-4">
        <Card className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><TrendingUp size={16} color={C.gold} /> Trending</div>
          <div className="flex flex-wrap gap-2">{trending.map((t) => <Pill key={t} color={C.blue}>{t}</Pill>)}</div>
        </Card>
        <Card className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><Crown size={16} color={C.gold} /> Top contributors</div>
          <div className="space-y-2">{contributors.map(([n, v], i) => (
            <div key={n} className="flex items-center gap-2 text-sm"><span className="font-bold" style={{ color: C.gold }}>{i + 1}</span><span className="flex-1" style={{ color: C.text }}>{n}</span><Pill color={C.green}><Heart size={11} /> {v}</Pill></div>
          ))}</div>
        </Card>
        <Card className="p-4"><div className="mb-2 flex items-center gap-2 font-semibold"><Award size={16} color={C.purple} /> Recent badges</div>
          <div className="space-y-2">{BADGE_VAULT.filter((b) => b.earned).slice(0, 4).map((b) => { const r = RARITY[b.rarity]; return (
            <div key={b.name} className="flex items-center gap-2 text-sm"><div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: r.c + "22", border: `1px solid ${r.c}55` }}><b.icon size={13} color={r.c} /></div><span style={{ color: C.text }}>{b.name}</span></div>
          ); })}</div>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  const [role, setRole] = useState(null);
  return (
    <>
      <GlobalStyles />
      {screen === "landing" && <Landing onLogin={() => setScreen("login")} onSignup={() => {}} />}
      {screen === "login" && <Login onAuth={(r) => { setRole(r); setScreen("app"); }} onBack={() => setScreen("landing")} />}
      {screen === "app" && <Shell role={role} onLogout={() => { setRole(null); setScreen("landing"); }} />}
    </>
  );
}
