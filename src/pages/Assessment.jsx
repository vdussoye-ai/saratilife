import { useState, useEffect, useRef, useCallback } from "react";
import { SaratiLogo, SaratiMark, LOGO_SRC } from "../components/Logo";



// ── Constants ──────────────────────────────────────────────────────────
const STEPS = [
  { id: "welcome", title: "Welcome", icon: "◎" },
  { id: "role", title: "Your Role", icon: "◉" },
  { id: "skills", title: "Skills", icon: "◈" },
  { id: "financial", title: "Financial", icon: "◇" },
  { id: "values", title: "Values & Life", icon: "◆" },
  { id: "aspirations", title: "Aspirations", icon: "△" },
  { id: "report", title: "Your Report", icon: "◎" },
];

const INDUSTRIES = [
  "Technology / Software", "Finance / Banking", "Healthcare", "Manufacturing",
  "Consulting", "Education", "Government / Public Sector", "Retail / E-commerce",
  "Media / Entertainment", "Real Estate", "Legal", "Energy / Utilities",
  "Telecommunications", "Transportation / Logistics", "Other"
];

const ROLE_CATEGORIES = [
  "Executive / C-Suite", "Senior Management", "Middle Management",
  "Individual Contributor (Senior)", "Individual Contributor (Mid)",
  "Individual Contributor (Junior)", "Freelancer / Consultant", "Business Owner"
];

const SKILL_CATEGORIES = {
  "Technical": [
    "Data Analysis / SQL", "Programming / Software Dev", "Cloud / Infrastructure",
    "AI / Machine Learning", "Project Management Tools", "ERP Systems (SAP, Oracle)",
    "Financial Modeling", "Cybersecurity", "UX / UI Design", "DevOps / Automation"
  ],
  "Strategic": [
    "Strategic Planning", "Business Development", "Change Management",
    "Stakeholder Management", "P&L Ownership", "M&A / Due Diligence",
    "Market Analysis", "Product Strategy", "Vendor Management", "Risk Assessment"
  ],
  "Human": [
    "Team Leadership", "Mentoring / Coaching", "Public Speaking",
    "Cross-cultural Communication", "Negotiation", "Conflict Resolution",
    "Client Relationships", "Executive Presence", "Teaching / Training", "Empathy / Active Listening"
  ]
};

const AI_RISK_FACTORS = {
  "Data Analysis / SQL": 0.7, "Programming / Software Dev": 0.5,
  "Cloud / Infrastructure": 0.3, "AI / Machine Learning": 0.2,
  "Project Management Tools": 0.6, "ERP Systems (SAP, Oracle)": 0.4,
  "Financial Modeling": 0.65, "Cybersecurity": 0.25, "UX / UI Design": 0.45,
  "DevOps / Automation": 0.35, "Strategic Planning": 0.2,
  "Business Development": 0.25, "Change Management": 0.15,
  "Stakeholder Management": 0.1, "P&L Ownership": 0.15,
  "M&A / Due Diligence": 0.3, "Market Analysis": 0.55,
  "Product Strategy": 0.2, "Vendor Management": 0.3, "Risk Assessment": 0.4,
  "Team Leadership": 0.05, "Mentoring / Coaching": 0.05,
  "Public Speaking": 0.05, "Cross-cultural Communication": 0.05,
  "Negotiation": 0.1, "Conflict Resolution": 0.05,
  "Client Relationships": 0.1, "Executive Presence": 0.05,
  "Teaching / Training": 0.15, "Empathy / Active Listening": 0.02
};

const ROLE_RISK_BASE = {
  "Executive / C-Suite": 0.15, "Senior Management": 0.2,
  "Middle Management": 0.35, "Individual Contributor (Senior)": 0.4,
  "Individual Contributor (Mid)": 0.55, "Individual Contributor (Junior)": 0.7,
  "Freelancer / Consultant": 0.3, "Business Owner": 0.2
};

const INDUSTRY_RISK = {
  "Technology / Software": 0.4, "Finance / Banking": 0.5,
  "Healthcare": 0.3, "Manufacturing": 0.45, "Consulting": 0.35,
  "Education": 0.25, "Government / Public Sector": 0.2,
  "Retail / E-commerce": 0.5, "Media / Entertainment": 0.55,
  "Real Estate": 0.35, "Legal": 0.45, "Energy / Utilities": 0.3,
  "Telecommunications": 0.4, "Transportation / Logistics": 0.45, "Other": 0.35
};

// ── Utility Functions ──────────────────────────────────────────────────
function calculateAIRiskScore(data) {
  const roleBase = ROLE_RISK_BASE[data.roleCategory] || 0.35;
  const industryRisk = INDUSTRY_RISK[data.industry] || 0.35;

  let skillProtection = 0;
  let skillCount = 0;
  const allSkills = Object.values(data.skills || {}).flat();
  allSkills.forEach(skill => {
    const risk = AI_RISK_FACTORS[skill];
    if (risk !== undefined) {
      skillProtection += (1 - risk);
      skillCount++;
    }
  });
  const avgProtection = skillCount > 0 ? skillProtection / skillCount : 0.5;

  const humanSkills = (data.skills?.["Human"] || []).length;
  const humanBonus = Math.min(humanSkills * 0.04, 0.2);

  const yearsBonus = Math.min((data.yearsExperience || 0) * 0.008, 0.15);

  const rawRisk = (roleBase * 0.3) + (industryRisk * 0.25) + ((1 - avgProtection) * 0.3) - humanBonus - yearsBonus;
  return Math.max(5, Math.min(95, Math.round(rawRisk * 100)));
}

function calculateFiveCapitals(data) {
  const financial = Math.min(100, Math.round(
    (data.savingsMonths || 0) * 4 +
    (data.passiveIncome ? 20 : 0) +
    (data.debtLevel === "none" ? 30 : data.debtLevel === "low" ? 20 : data.debtLevel === "moderate" ? 10 : 0) +
    (data.emergencyFund ? 15 : 0)
  ));

  const allSkills = Object.values(data.skills || {}).flat();
  const human = Math.min(100, Math.round(
    allSkills.length * 5 +
    (data.yearsExperience || 0) * 1.5 +
    (data.continuousLearning ? 15 : 0)
  ));

  const social = Math.min(100, Math.round(
    (data.networkStrength || 3) * 12 +
    (data.mentorAccess ? 15 : 0) +
    (data.communityInvolvement ? 15 : 0) +
    (data.familySupport || 3) * 5
  ));

  const health = Math.min(100, Math.round(
    (data.energyLevel || 3) * 12 +
    (data.exerciseRegular ? 15 : 0) +
    (data.stressManaged ? 15 : 0) +
    (data.sleepQuality || 3) * 5
  ));

  const spiritual = Math.min(100, Math.round(
    (data.purposeClarity || 3) * 12 +
    (data.dailyPractice ? 20 : 0) +
    (data.serviceOrientation || 3) * 8 +
    (data.innerPeace || 3) * 5
  ));

  return { financial, human, social, health, spiritual };
}

function generateRecommendations(data, riskScore, capitals) {
  const recs = [];
  const allSkills = Object.values(data.skills || {}).flat();
  const humanSkills = data.skills?.["Human"] || [];
  const techSkills = data.skills?.["Technical"] || [];

  // AI Risk recommendations
  if (riskScore > 60) {
    recs.push({
      type: "urgent",
      capital: "Human",
      title: "High AI Displacement Risk — Act Now",
      detail: "Your current role has significant automation exposure. Prioritize building skills that AI cannot replicate: leadership, relationship management, and strategic judgment.",
      actions: ["Start one AI tool integration project this month", "Identify 3 'AI-proof' responsibilities in your current role", "Begin documenting your unique institutional knowledge"]
    });
  } else if (riskScore > 40) {
    recs.push({
      type: "moderate",
      capital: "Human",
      title: "Moderate AI Exposure — Strategic Upskilling Needed",
      detail: "Your role has some automation risk, but your experience provides a buffer. Focus on becoming the person who directs AI, not competes with it.",
      actions: ["Learn to use AI tools that augment your specific role", "Position yourself as the AI integration leader on your team", "Develop one new strategic skill this quarter"]
    });
  } else {
    recs.push({
      type: "positive",
      capital: "Human",
      title: "Low AI Risk — Strong Position",
      detail: "Your skill mix emphasizes areas where AI adds minimal threat. Your focus should be on leveraging AI to amplify your existing strengths.",
      actions: ["Use AI to 10x your current output quality", "Mentor others on navigating AI disruption", "Explore entrepreneurial opportunities using AI as infrastructure"]
    });
  }

  // Financial Capital
  if (capitals.financial < 50) {
    recs.push({
      type: "urgent",
      capital: "Financial",
      title: "Build Your Financial Runway",
      detail: "Career transitions require financial breathing room. Without adequate runway, you'll make fear-based decisions instead of strategic ones.",
      actions: ["Target 12 months of expenses in liquid savings", "Reduce fixed costs by 15-20% to extend runway", "Start one income stream outside your primary job"]
    });
  } else if (capitals.financial < 75) {
    recs.push({
      type: "moderate",
      capital: "Financial",
      title: "Strengthen Your Freedom Fund",
      detail: "You have a foundation, but more runway gives you more options. The goal is to make career decisions from abundance, not scarcity.",
      actions: ["Increase savings rate by 5% this quarter", "Explore passive income through your expertise", "Model your 'freedom number' — what monthly income replaces your salary?"]
    });
  }

  // Social Capital
  if (capitals.social < 50) {
    recs.push({
      type: "moderate",
      capital: "Social",
      title: "Invest in Your Network Before You Need It",
      detail: "The time to build relationships is before you need them. Your network is your safety net and opportunity pipeline.",
      actions: ["Reconnect with 5 former colleagues this month", "Join one professional community or mastermind group", "Offer to mentor someone — giving accelerates receiving"]
    });
  }

  // Health Capital
  if (capitals.health < 50) {
    recs.push({
      type: "urgent",
      capital: "Health",
      title: "Address Energy Deficits",
      detail: "Career transitions demand high energy and resilience. If you're running on fumes, every decision suffers.",
      actions: ["Establish one non-negotiable health habit this week", "Audit your energy: what drains you vs. what restores you?", "Prioritize sleep quality — it's the foundation of everything"]
    });
  }

  // Spiritual Capital
  if (capitals.spiritual < 50) {
    recs.push({
      type: "moderate",
      capital: "Spiritual",
      title: "Reconnect with Purpose",
      detail: "Without clarity on what matters, every career option looks equally attractive or equally terrifying. Purpose is your compass.",
      actions: ["Spend 15 minutes daily in reflection or meditation", "Write your 'regret minimization' list — what will you regret NOT doing?", "Identify how your work can serve others, not just yourself"]
    });
  }

  // Skill gap recommendations
  if (humanSkills.length < 3) {
    recs.push({
      type: "moderate",
      capital: "Human",
      title: "Develop Your AI-Proof Skills",
      detail: "Human skills — leadership, empathy, coaching, negotiation — are the most durable assets in an AI-augmented world.",
      actions: ["Take on a mentoring or coaching role", "Practice public speaking (Toastmasters, team presentations)", "Lead a cross-functional initiative to build stakeholder skills"]
    });
  }

  if (techSkills.length > 0 && !allSkills.includes("AI / Machine Learning")) {
    recs.push({
      type: "moderate",
      capital: "Human",
      title: "Add AI Literacy to Your Technical Stack",
      detail: "You have technical depth — adding AI fluency transforms you from 'at risk' to 'indispensable'. You don't need to build AI, but you need to direct it.",
      actions: ["Complete one AI fundamentals course (Coursera, fast.ai)", "Experiment with AI tools in your daily workflow for 30 days", "Propose an AI pilot project at work"]
    });
  }

  return recs;
}

function getTimelineProjection(riskScore, capitals) {
  const avgCapital = (capitals.financial + capitals.human + capitals.social + capitals.health + capitals.spiritual) / 5;

  if (riskScore > 60 && avgCapital < 50) return { years: "2-3", urgency: "high", message: "Significant changes needed. Start building your pivot foundation immediately." };
  if (riskScore > 60 && avgCapital >= 50) return { years: "1-2", urgency: "high", message: "You have strong foundations. Focus on redirecting your career trajectory now." };
  if (riskScore > 40 && avgCapital < 50) return { years: "3-5", urgency: "moderate", message: "Build your capitals while strategically repositioning. You have time but shouldn't delay." };
  if (riskScore > 40 && avgCapital >= 50) return { years: "1-3", urgency: "moderate", message: "Good position. Strategic moves now will compound significantly over 2-3 years." };
  if (avgCapital < 50) return { years: "3-5", urgency: "low", message: "Low AI risk gives you time. Focus on building life capital foundations." };
  return { years: "1-2", urgency: "low", message: "Strong across the board. You're well-positioned to make bold moves on your timeline." };
}

// ── Components ─────────────────────────────────────────────────────────

function RadarChart({ capitals, size = 280 }) {
  const center = size / 2;
  const radius = size * 0.38;
  const labels = [
    { key: "financial", label: "Financial", angle: -90 },
    { key: "human", label: "Human", angle: -18 },
    { key: "social", label: "Social", angle: 54 },
    { key: "health", label: "Health", angle: 126 },
    { key: "spiritual", label: "Spiritual", angle: 198 },
  ];

  const getPoint = (angle, value) => {
    const rad = (angle * Math.PI) / 180;
    const r = (value / 100) * radius;
    return { x: center + r * Math.cos(rad), y: center + r * Math.sin(rad) };
  };

  const dataPoints = labels.map(l => getPoint(l.angle, capitals[l.key]));
  const pathD = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {[20, 40, 60, 80, 100].map(level => {
        const pts = labels.map(l => getPoint(l.angle, level));
        return <polygon key={level} points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke={level === 100 ? "rgba(200,138,42,0.3)" : "rgba(200,138,42,0.1)"} strokeWidth={level === 100 ? 1.5 : 1} />;
      })}
      {labels.map(l => {
        const end = getPoint(l.angle, 100);
        return <line key={l.key} x1={center} y1={center} x2={end.x} y2={end.y} stroke="rgba(200,138,42,0.15)" strokeWidth={1} />;
      })}
      <polygon points={dataPoints.map(p => `${p.x},${p.y}`).join(' ')} fill="rgba(232,137,12,0.15)" stroke="#e8890c" strokeWidth={2} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#e8890c" stroke="#f8f6f3" strokeWidth={2} />
      ))}
      {labels.map(l => {
        const labelPt = getPoint(l.angle, 118);
        return (
          <text key={l.key} x={labelPt.x} y={labelPt.y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", fill: "#6b5c4c", fontWeight: 500 }}>
            {l.label}
          </text>
        );
      })}
      {labels.map(l => {
        const valPt = getPoint(l.angle, capitals[l.key] > 30 ? capitals[l.key] - 12 : capitals[l.key] + 15);
        return (
          <text key={`v-${l.key}`} x={valPt.x} y={valPt.y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", fill: "#e8890c", fontWeight: 700 }}>
            {capitals[l.key]}
          </text>
        );
      })}
    </svg>
  );
}

function RiskGauge({ score, size = 220 }) {
  const color = score > 60 ? "#c0392b" : score > 40 ? "#e8890c" : "#27ae60";
  const label = score > 60 ? "High Risk" : score > 40 ? "Moderate" : "Low Risk";
  const circumference = Math.PI * 80;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size * 0.65} viewBox="0 0 200 130">
        <path d="M 20 120 A 80 80 0 0 1 180 120" fill="none" stroke="rgba(200,138,42,0.12)" strokeWidth={14} strokeLinecap="round" />
        <path d="M 20 120 A 80 80 0 0 1 180 120" fill="none" stroke={color} strokeWidth={14} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }} />
        <text x="100" y="90" textAnchor="middle" style={{ fontSize: "36px", fontFamily: "'Lora', serif", fill: color, fontWeight: 700 }}>{score}%</text>
        <text x="100" y="118" textAnchor="middle" style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fill: "#6b5c4c", fontWeight: 500 }}>{label}</text>
      </svg>
    </div>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center", padding: "0 20px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: "3px", borderRadius: "2px",
          background: i <= current ? "#e8890c" : "rgba(200,138,42,0.15)",
          transition: "background 0.4s ease"
        }} />
      ))}
    </div>
  );
}

function SliderInput({ label, value, onChange, min = 1, max = 5, labels: sliderLabels }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#3d3429" }}>{label}</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#e8890c" }}>{value}/{max}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(parseInt(e.target.value))}
        style={{ width: "100%", accentColor: "#e8890c" }} />
      {sliderLabels && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={{ fontSize: "11px", color: "#9a8b7a" }}>{sliderLabels[0]}</span>
          <span style={{ fontSize: "11px", color: "#9a8b7a" }}>{sliderLabels[1]}</span>
        </div>
      )}
    </div>
  );
}

function Toggle({ label, value, onChange, description }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px", cursor: "pointer" }}
      onClick={() => onChange(!value)}>
      <div style={{
        width: "44px", minWidth: "44px", height: "24px", borderRadius: "12px",
        background: value ? "#e8890c" : "rgba(200,138,42,0.2)",
        position: "relative", transition: "background 0.3s ease", marginTop: "2px"
      }}>
        <div style={{
          width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
          position: "absolute", top: "3px", left: value ? "23px" : "3px",
          transition: "left 0.3s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
        }} />
      </div>
      <div>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "#3d3429" }}>{label}</div>
        {description && <div style={{ fontSize: "12px", color: "#9a8b7a", marginTop: "2px" }}>{description}</div>}
      </div>
    </div>
  );
}

function SkillPicker({ category, skills, selected, onToggle }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h4 style={{ fontFamily: "'Lora', serif", fontSize: "16px", color: "#3d3429", marginBottom: "10px", fontWeight: 600 }}>
        {category} Skills
      </h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {skills.map(skill => {
          const isSelected = selected.includes(skill);
          const risk = AI_RISK_FACTORS[skill];
          return (
            <button key={skill} onClick={() => onToggle(category, skill)}
              style={{
                padding: "7px 14px", borderRadius: "20px", border: "1.5px solid",
                borderColor: isSelected ? "#e8890c" : "rgba(200,138,42,0.2)",
                background: isSelected ? "rgba(232,137,12,0.08)" : "transparent",
                color: isSelected ? "#c48a2a" : "#6b5c4c",
                fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: isSelected ? 600 : 400,
                cursor: "pointer", transition: "all 0.2s ease", position: "relative"
              }}>
              {skill}
              {isSelected && risk !== undefined && (
                <span style={{
                  display: "inline-block", width: "6px", height: "6px", borderRadius: "50%",
                  background: risk > 0.5 ? "#c0392b" : risk > 0.3 ? "#e8890c" : "#27ae60",
                  marginLeft: "6px", verticalAlign: "middle"
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step Components ────────────────────────────────────────────────────

function WelcomeStep({ onNext }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px 0", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
      <img src={LOGO_SRC} alt="SaratiLife" width={56} height={56} style={{ marginBottom: "16px", objectFit: "contain" }} />
      <h1 style={{ fontFamily: "'Lora', serif", fontSize: "28px", fontWeight: 700, color: "#3d3429", marginBottom: "8px", lineHeight: 1.3 }}>
        AI Career Readiness<br />Assessment
      </h1>
      <p style={{ fontSize: "15px", color: "#6b5c4c", maxWidth: "420px", margin: "0 auto 32px", lineHeight: 1.65 }}>
        Discover your AI displacement risk, map your Five Capitals, and get a personalized strategy to future-proof your career — in 10 minutes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "360px", margin: "0 auto 36px", textAlign: "left" }}>
        {[
          ["◎", "AI Displacement Risk Score", "How exposed is your specific role?"],
          ["◈", "Five Capitals Portfolio Map", "Financial, Human, Social, Health & Spiritual"],
          ["△", "Personalized Pivot Strategy", "Concrete actions ranked by impact"],
        ].map(([icon, title, desc]) => (
          <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "18px", color: "#e8890c", marginTop: "2px" }}>{icon}</span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#3d3429" }}>{title}</div>
              <div style={{ fontSize: "12px", color: "#9a8b7a" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onNext} style={{
        background: "#3d3429", color: "#f8f6f3", border: "none", padding: "14px 48px",
        borderRadius: "8px", fontSize: "15px", fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600, cursor: "pointer", letterSpacing: "0.3px",
        transition: "all 0.3s ease", boxShadow: "0 2px 12px rgba(61,52,41,0.15)"
      }}
        onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
        onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
        Start Assessment →
      </button>
      <p style={{ fontSize: "12px", color: "#b3a698", marginTop: "16px" }}>
        Free · No account required · Results are private
      </p>
    </div>
  );
}

function RoleStep({ data, setData }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: "22px", color: "#3d3429", marginBottom: "4px" }}>Tell us about your role</h2>
      <p style={{ fontSize: "14px", color: "#9a8b7a", marginBottom: "28px" }}>This helps us assess your specific AI displacement risk.</p>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>Job Title</label>
        <input type="text" placeholder="e.g., Solution Architect, Product Manager..."
          value={data.jobTitle || ""} onChange={e => setData({ ...data, jobTitle: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", boxSizing: "border-box", color: "#3d3429" }} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>Industry</label>
        <select value={data.industry || ""} onChange={e => setData({ ...data, industry: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", color: "#3d3429", boxSizing: "border-box" }}>
          <option value="">Select your industry</option>
          {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>Role Level</label>
        <select value={data.roleCategory || ""} onChange={e => setData({ ...data, roleCategory: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", color: "#3d3429", boxSizing: "border-box" }}>
          <option value="">Select your level</option>
          {ROLE_CATEGORIES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>Years of Experience</label>
        <input type="number" min="0" max="50" placeholder="e.g., 15"
          value={data.yearsExperience || ""} onChange={e => setData({ ...data, yearsExperience: parseInt(e.target.value) || 0 })}
          style={{ width: "120px", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", color: "#3d3429", boxSizing: "border-box" }} />
      </div>

      <div>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>Age</label>
        <input type="number" min="18" max="80" placeholder="e.g., 45"
          value={data.age || ""} onChange={e => setData({ ...data, age: parseInt(e.target.value) || 0 })}
          style={{ width: "120px", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", color: "#3d3429", boxSizing: "border-box" }} />
      </div>
    </div>
  );
}

function SkillsStep({ data, setData }) {
  const toggleSkill = (category, skill) => {
    const current = data.skills || {};
    const catSkills = current[category] || [];
    const updated = catSkills.includes(skill)
      ? catSkills.filter(s => s !== skill)
      : [...catSkills, skill];
    setData({ ...data, skills: { ...current, [category]: updated } });
  };

  const allSelected = Object.values(data.skills || {}).flat();

  return (
    <div>
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: "22px", color: "#3d3429", marginBottom: "4px" }}>Map your skills</h2>
      <p style={{ fontSize: "14px", color: "#9a8b7a", marginBottom: "8px" }}>
        Select all skills you're proficient in. We'll analyze your AI exposure for each.
      </p>
      <p style={{ fontSize: "12px", color: "#b3a698", marginBottom: "24px" }}>
        <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#27ae60", marginRight: "4px", verticalAlign: "middle" }} />AI-resistant
        <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#e8890c", margin: "0 4px 0 12px", verticalAlign: "middle" }} />Moderate exposure
        <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#c0392b", margin: "0 4px 0 12px", verticalAlign: "middle" }} />High exposure
      </p>

      {Object.entries(SKILL_CATEGORIES).map(([cat, skills]) => (
        <SkillPicker key={cat} category={cat} skills={skills} selected={data.skills?.[cat] || []} onToggle={toggleSkill} />
      ))}

      <div style={{ padding: "12px 16px", background: "rgba(232,137,12,0.06)", borderRadius: "8px", marginTop: "8px" }}>
        <span style={{ fontSize: "13px", color: "#6b5c4c" }}>
          <strong style={{ color: "#e8890c" }}>{allSelected.length}</strong> skills selected
          {allSelected.length < 5 && " — select at least 5 for a meaningful assessment"}
        </span>
      </div>
    </div>
  );
}

function FinancialStep({ data, setData }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: "22px", color: "#3d3429", marginBottom: "4px" }}>Financial runway</h2>
      <p style={{ fontSize: "14px", color: "#9a8b7a", marginBottom: "28px" }}>Your financial position determines how bold you can afford to be. All data stays private.</p>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>
          Months of expenses in savings
        </label>
        <select value={data.savingsMonths ?? ""} onChange={e => setData({ ...data, savingsMonths: parseInt(e.target.value) })}
          style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", color: "#3d3429", boxSizing: "border-box" }}>
          <option value="">Select range</option>
          <option value="1">Less than 3 months</option>
          <option value="4">3-6 months</option>
          <option value="8">6-12 months</option>
          <option value="14">12-18 months</option>
          <option value="20">18+ months</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>
          Debt level
        </label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[["none", "No debt"], ["low", "Low (manageable)"], ["moderate", "Moderate"], ["high", "Significant"]].map(([val, label]) => (
            <button key={val} onClick={() => setData({ ...data, debtLevel: val })}
              style={{
                padding: "8px 16px", borderRadius: "20px", border: "1.5px solid",
                borderColor: data.debtLevel === val ? "#e8890c" : "rgba(200,138,42,0.2)",
                background: data.debtLevel === val ? "rgba(232,137,12,0.08)" : "transparent",
                color: data.debtLevel === val ? "#c48a2a" : "#6b5c4c",
                fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: data.debtLevel === val ? 600 : 400,
                cursor: "pointer"
              }}>{label}</button>
          ))}
        </div>
      </div>

      <Toggle label="Emergency fund established" description="3-6 months of expenses readily accessible"
        value={data.emergencyFund || false} onChange={v => setData({ ...data, emergencyFund: v })} />
      <Toggle label="Passive income streams" description="Investment income, rental, side business, etc."
        value={data.passiveIncome || false} onChange={v => setData({ ...data, passiveIncome: v })} />
      <Toggle label="Active learner" description="Regularly investing in courses, books, certifications"
        value={data.continuousLearning || false} onChange={v => setData({ ...data, continuousLearning: v })} />
    </div>
  );
}

function ValuesStep({ data, setData }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: "22px", color: "#3d3429", marginBottom: "4px" }}>Values & life context</h2>
      <p style={{ fontSize: "14px", color: "#9a8b7a", marginBottom: "28px" }}>
        Career decisions don't exist in isolation. Your whole life context matters.
      </p>

      <SliderInput label="Network strength" value={data.networkStrength || 3}
        onChange={v => setData({ ...data, networkStrength: v })}
        labels={["Isolated", "Well-connected"]} />

      <SliderInput label="Family support for change" value={data.familySupport || 3}
        onChange={v => setData({ ...data, familySupport: v })}
        labels={["Resistant", "Fully supportive"]} />

      <SliderInput label="Energy level" value={data.energyLevel || 3}
        onChange={v => setData({ ...data, energyLevel: v })}
        labels={["Depleted", "High energy"]} />

      <SliderInput label="Purpose clarity" value={data.purposeClarity || 3}
        onChange={v => setData({ ...data, purposeClarity: v })}
        labels={["Unclear", "Crystal clear"]} />

      <SliderInput label="Inner peace" value={data.innerPeace || 3}
        onChange={v => setData({ ...data, innerPeace: v })}
        labels={["Anxious", "Centered"]} />

      <SliderInput label="Service orientation" value={data.serviceOrientation || 3}
        onChange={v => setData({ ...data, serviceOrientation: v })}
        labels={["Self-focused", "Service-driven"]} />

      <div style={{ marginTop: "8px" }}>
        <Toggle label="Regular exercise" value={data.exerciseRegular || false}
          onChange={v => setData({ ...data, exerciseRegular: v })} />
        <Toggle label="Stress well-managed" value={data.stressManaged || false}
          onChange={v => setData({ ...data, stressManaged: v })} />
        <Toggle label="Mentor or coach access" value={data.mentorAccess || false}
          onChange={v => setData({ ...data, mentorAccess: v })} />
        <Toggle label="Active community involvement" value={data.communityInvolvement || false}
          onChange={v => setData({ ...data, communityInvolvement: v })} />
        <Toggle label="Daily spiritual or reflective practice" value={data.dailyPractice || false}
          onChange={v => setData({ ...data, dailyPractice: v })} />
      </div>
    </div>
  );
}

function AspirationsStep({ data, setData }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Lora', serif", fontSize: "22px", color: "#3d3429", marginBottom: "4px" }}>Your aspirations</h2>
      <p style={{ fontSize: "14px", color: "#9a8b7a", marginBottom: "28px" }}>
        What does "earned freedom" look like for you? This shapes your pivot strategy.
      </p>

      <SliderInput label="Sleep quality" value={data.sleepQuality || 3}
        onChange={v => setData({ ...data, sleepQuality: v })}
        labels={["Poor", "Excellent"]} />

      <div style={{ marginBottom: "24px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>
          Primary career aspiration
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            ["stay-advance", "Stay in my field and advance"],
            ["stay-secure", "Stay employed but increase security"],
            ["pivot-related", "Pivot to a related field"],
            ["pivot-new", "Complete career change"],
            ["entrepreneurship", "Build my own business"],
            ["portfolio", "Portfolio career (multiple income streams)"],
            ["freedom", "Financial independence / early retirement"],
          ].map(([val, label]) => (
            <button key={val} onClick={() => setData({ ...data, aspiration: val })}
              style={{
                padding: "10px 16px", borderRadius: "8px", border: "1.5px solid",
                borderColor: data.aspiration === val ? "#e8890c" : "rgba(200,138,42,0.2)",
                background: data.aspiration === val ? "rgba(232,137,12,0.08)" : "transparent",
                color: data.aspiration === val ? "#c48a2a" : "#6b5c4c",
                fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: data.aspiration === val ? 600 : 400,
                cursor: "pointer", textAlign: "left", transition: "all 0.2s ease"
              }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>
          Target timeline for change
        </label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[["6m", "6 months"], ["1y", "1 year"], ["2y", "2 years"], ["5y", "5 years"], ["no-rush", "No rush"]].map(([val, label]) => (
            <button key={val} onClick={() => setData({ ...data, timeline: val })}
              style={{
                padding: "8px 16px", borderRadius: "20px", border: "1.5px solid",
                borderColor: data.timeline === val ? "#e8890c" : "rgba(200,138,42,0.2)",
                background: data.timeline === val ? "rgba(232,137,12,0.08)" : "transparent",
                color: data.timeline === val ? "#c48a2a" : "#6b5c4c",
                fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: data.timeline === val ? 600 : 400,
                cursor: "pointer"
              }}>{label}</button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429", display: "block", marginBottom: "6px" }}>
          Biggest fear about AI and your career (optional)
        </label>
        <textarea placeholder="What keeps you up at night about AI's impact on your work?"
          value={data.biggestFear || ""} onChange={e => setData({ ...data, biggestFear: e.target.value })}
          rows={3}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", background: "rgba(248,246,243,0.5)",
            outline: "none", resize: "vertical", color: "#3d3429", boxSizing: "border-box"
          }} />
      </div>
    </div>
  );
}

function ReportStep({ data }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  useEffect(() => { setTimeout(() => setVisible(true), 300); }, []);

  const riskScore = calculateAIRiskScore(data);
  const capitals = calculateFiveCapitals(data);
  const recommendations = generateRecommendations(data, riskScore, capitals);
  const timeline = getTimelineProjection(riskScore, capitals);
  const allSkills = Object.values(data.skills || {}).flat();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "capitals", label: "Five Capitals" },
    { id: "actions", label: "Action Plan" },
  ];

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: "24px", color: "#3d3429", marginBottom: "4px" }}>
          Your Career Readiness Report
        </h2>
        <p style={{ fontSize: "14px", color: "#9a8b7a" }}>
          {data.jobTitle || "Professional"} · {data.industry || "Your Industry"} · {data.yearsExperience || 0} years experience
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "rgba(200,138,42,0.06)", borderRadius: "10px", padding: "4px" }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "10px 8px", borderRadius: "8px", border: "none",
              background: activeTab === tab.id ? "#fff" : "transparent",
              color: activeTab === tab.id ? "#3d3429" : "#9a8b7a",
              fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
            }}>{tab.label}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "16px", border: "1px solid rgba(200,138,42,0.1)" }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", color: "#3d3429", marginBottom: "16px", textAlign: "center" }}>
              AI Displacement Risk
            </h3>
            <RiskGauge score={riskScore} />
            <p style={{ fontSize: "13px", color: "#6b5c4c", textAlign: "center", marginTop: "12px", lineHeight: 1.6 }}>
              {riskScore > 60
                ? "Your role has significant automation exposure. The good news: awareness is the first step, and your experience gives you pivot options that junior professionals don't have."
                : riskScore > 40
                ? "Your role has moderate AI exposure. You're not in immediate danger, but strategic repositioning now will pay dividends for years."
                : "Your skill mix positions you well in an AI-augmented world. Focus on leveraging AI as a force multiplier for your existing strengths."
              }
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "16px", border: "1px solid rgba(200,138,42,0.1)" }}>
            <h3 style={{ fontFamily: "'Lora', serif", fontSize: "16px", color: "#3d3429", marginBottom: "16px", textAlign: "center" }}>
              Five Capitals Portfolio
            </h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart capitals={capitals} />
            </div>
          </div>

          <div style={{ background: "rgba(232,137,12,0.06)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(232,137,12,0.15)" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "20px" }}>⏱</span>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#3d3429", marginBottom: "4px" }}>
                  Projected Transition Window: {timeline.years} years
                </div>
                <div style={{ fontSize: "13px", color: "#6b5c4c", lineHeight: 1.5 }}>
                  {timeline.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Five Capitals Tab */}
      {activeTab === "capitals" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { key: "financial", label: "Financial Capital", icon: "◇", desc: "Savings runway, debt management, passive income", gap: "Build your financial runway with tax-optimized strategies and passive income pathways" },
            { key: "human", label: "Human Capital", icon: "◈", desc: "Skills, experience, learning velocity", gap: "Close your AI fluency gap — prompt engineering, tool mastery, and skill positioning" },
            { key: "social", label: "Social Capital", icon: "◉", desc: "Network, mentorship, community", gap: "Strategic networking, mentor mapping, and community leverage for career transitions" },
            { key: "health", label: "Health Capital", icon: "○", desc: "Energy, exercise, stress management", gap: "Energy management systems, stress protocols, and sustainable performance habits" },
            { key: "spiritual", label: "Spiritual Capital", icon: "☸", desc: "Purpose, practice, service, peace", gap: "Purpose alignment, contemplative practice, and service-oriented career design" },
          ].map(cap => {
            const score = capitals[cap.key];
            const color = score >= 70 ? "#27ae60" : score >= 40 ? "#e8890c" : "#c0392b";
            const needsAttention = score < 60;
            return (
            <div key={cap.key} style={{ background: "#fff", borderRadius: "12px", padding: "18px 20px", border: `1px solid ${needsAttention ? "rgba(232,137,12,0.2)" : "rgba(200,138,42,0.1)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px", color: "#e8890c" }}>{cap.icon}</span>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontWeight: 600, color: "#3d3429" }}>{cap.label}</span>
                </div>
                <span style={{
                  fontSize: "18px", fontWeight: 700, fontFamily: "'Lora', serif",
                  color
                }}>{score}</span>
              </div>
              <div style={{ height: "6px", background: "rgba(200,138,42,0.08)", borderRadius: "3px", marginBottom: "6px" }}>
                <div style={{
                  height: "100%", borderRadius: "3px", transition: "width 1s ease",
                  width: `${score}%`,
                  background: color
                }} />
              </div>
              <div style={{ fontSize: "12px", color: "#9a8b7a", marginBottom: needsAttention ? "12px" : "0" }}>{cap.desc}</div>
              {needsAttention && (
                <div style={{
                  marginTop: "4px", padding: "12px 14px",
                  background: score < 40 ? "rgba(192,57,43,0.04)" : "rgba(232,137,12,0.04)",
                  borderRadius: "8px", border: `1px solid ${score < 40 ? "rgba(192,57,43,0.1)" : "rgba(232,137,12,0.1)"}`,
                }}>
                  <div style={{ fontSize: "12px", color: "#6b5c4c", lineHeight: 1.5, marginBottom: "10px" }}>
                    {score < 40 ? "⚠ Critical gap — " : "↗ Room to grow — "}{cap.gap}
                  </div>
                  <a href={`/capital/${cap.key}`} style={{
                    display: "inline-block", padding: "8px 20px",
                    background: score < 40 ? "#c0392b" : "#e8890c",
                    color: "#fff", borderRadius: "6px", fontSize: "12px",
                    fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer", transition: "all 0.3s ease",
                    letterSpacing: "0.3px"
                  }}>
                    Go Deeper →
                  </a>
                </div>
              )}
            </div>
          );})}

          <div style={{ background: "rgba(248,246,243,0.8)", borderRadius: "12px", padding: "16px 20px", marginTop: "4px" }}>
            <div style={{ fontSize: "13px", color: "#6b5c4c", lineHeight: 1.6 }}>
              <strong style={{ color: "#3d3429" }}>Portfolio Balance: </strong>
              {(() => {
                const vals = Object.values(capitals);
                const max = Math.max(...vals);
                const min = Math.min(...vals);
                const gap = max - min;
                if (gap > 40) return "Significant imbalance detected. Your strongest and weakest capitals are far apart — focusing on your lowest capital will yield the highest returns.";
                if (gap > 25) return "Moderate imbalance. Some capitals are significantly stronger than others. Strategic rebalancing will improve your overall resilience.";
                return "Well-balanced portfolio. Your capitals are relatively aligned, giving you a strong foundation for any transition.";
              })()}
            </div>
          </div>

          {/* Choose Your Starting Point — all 5 capitals */}
          <div style={{
            background: "linear-gradient(135deg, rgba(61,52,41,0.95), rgba(61,52,41,0.88))",
            borderRadius: "14px", padding: "28px 24px", marginTop: "8px",
          }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#e8890c", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                What's next
              </div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "19px", fontWeight: 700, color: "#f8f6f3", lineHeight: 1.3 }}>
                Choose where to go deeper
              </div>
              <div style={{ fontSize: "13px", color: "rgba(248,246,243,0.55)", marginTop: "6px" }}>
                Each capital has a guided accelerator — start with the one that matters most to you.
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { key: "financial", label: "Financial", icon: "◇", brief: "Runway & passive income" },
                { key: "human", label: "Human", icon: "◈", brief: "AI fluency & skill positioning" },
                { key: "social", label: "Social", icon: "◉", brief: "Network & community leverage" },
                { key: "health", label: "Health", icon: "○", brief: "Energy & performance systems" },
                { key: "spiritual", label: "Spiritual", icon: "☸", brief: "Purpose & decision clarity" },
              ].map(cap => {
                const score = capitals[cap.key];
                const isWeak = score < 40;
                const isMid = score >= 40 && score < 60;
                return (
                  <a key={cap.key} href={`/capital/${cap.key}`} style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px 16px", borderRadius: "10px",
                    background: isWeak ? "rgba(192,57,43,0.12)" : isMid ? "rgba(232,137,12,0.08)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isWeak ? "rgba(192,57,43,0.25)" : isMid ? "rgba(232,137,12,0.15)" : "rgba(255,255,255,0.08)"}`,
                    textDecoration: "none", cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}>
                    <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{cap.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#f8f6f3" }}>{cap.label}</div>
                      <div style={{ fontSize: "11px", color: "rgba(248,246,243,0.5)" }}>{cap.brief}</div>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        fontSize: "15px", fontWeight: 700, fontFamily: "'Lora', serif",
                        color: isWeak ? "#e74c3c" : isMid ? "#e8890c" : "#27ae60",
                      }}>{score}</span>
                      {isWeak && (
                        <span style={{
                          padding: "2px 8px", borderRadius: "8px", fontSize: "9px",
                          fontWeight: 700, background: "rgba(192,57,43,0.2)", color: "#e74c3c",
                          letterSpacing: "0.5px", textTransform: "uppercase",
                        }}>Priority</span>
                      )}
                      <span style={{ color: "rgba(248,246,243,0.4)", fontSize: "14px" }}>→</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Action Plan Tab */}
      {activeTab === "actions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {recommendations.map((rec, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "12px", padding: "20px",
              border: `1.5px solid ${rec.type === "urgent" ? "rgba(192,57,43,0.2)" : rec.type === "positive" ? "rgba(39,174,96,0.2)" : "rgba(232,137,12,0.2)"}`,
            }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "10px" }}>
                <span style={{
                  padding: "2px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600,
                  background: rec.type === "urgent" ? "rgba(192,57,43,0.08)" : rec.type === "positive" ? "rgba(39,174,96,0.08)" : "rgba(232,137,12,0.08)",
                  color: rec.type === "urgent" ? "#c0392b" : rec.type === "positive" ? "#27ae60" : "#e8890c",
                  textTransform: "uppercase", letterSpacing: "0.5px"
                }}>
                  {rec.type === "urgent" ? "Priority" : rec.type === "positive" ? "Strength" : "Opportunity"}
                </span>
                <span style={{ fontSize: "11px", color: "#b3a698", fontWeight: 500 }}>{rec.capital}</span>
              </div>
              <h4 style={{ fontFamily: "'Lora', serif", fontSize: "15px", color: "#3d3429", marginBottom: "6px", fontWeight: 600 }}>
                {rec.title}
              </h4>
              <p style={{ fontSize: "13px", color: "#6b5c4c", lineHeight: 1.55, marginBottom: "12px" }}>
                {rec.detail}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {rec.actions.map((action, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "#e8890c", fontSize: "10px", marginTop: "5px" }}>●</span>
                    <span style={{ fontSize: "13px", color: "#3d3429", lineHeight: 1.45 }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            background: "linear-gradient(135deg, rgba(61,52,41,0.95), rgba(61,52,41,0.88))",
            borderRadius: "14px", padding: "28px 24px", marginTop: "8px"
          }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "14px", color: "rgba(248,246,243,0.7)", marginBottom: "6px" }}>Ready to take action?</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "18px", color: "#f8f6f3", fontWeight: 600, marginBottom: "4px" }}>
                Start with the capital that needs you most
              </div>
              <div style={{ fontSize: "12px", color: "rgba(248,246,243,0.45)" }}>
                Guided accelerators for each dimension of your life portfolio
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {(() => {
                const caps = [
                  { key: "financial", label: "Financial", icon: "◇" },
                  { key: "human", label: "Human", icon: "◈" },
                  { key: "social", label: "Social", icon: "◉" },
                  { key: "health", label: "Health", icon: "○" },
                  { key: "spiritual", label: "Spiritual", icon: "☸" },
                ];
                // Sort by score ascending so weakest is on top
                return [...caps].sort((a, b) => capitals[a.key] - capitals[b.key]).map(cap => {
                  const score = capitals[cap.key];
                  const isWeak = score < 40;
                  return (
                    <a key={cap.key} href={`/capital/${cap.key}`} style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "12px 14px", borderRadius: "8px",
                      background: isWeak ? "rgba(192,57,43,0.12)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isWeak ? "rgba(192,57,43,0.2)" : "rgba(255,255,255,0.06)"}`,
                      textDecoration: "none", transition: "all 0.3s ease",
                    }}>
                      <span style={{ fontSize: "14px", width: "20px", textAlign: "center" }}>{cap.icon}</span>
                      <span style={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#f8f6f3" }}>{cap.label}</span>
                      <span style={{
                        fontSize: "14px", fontWeight: 700, fontFamily: "'Lora', serif",
                        color: isWeak ? "#e74c3c" : score < 60 ? "#e8890c" : "#27ae60",
                      }}>{score}</span>
                      <span style={{ color: "rgba(248,246,243,0.35)", fontSize: "13px" }}>→</span>
                    </a>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────
export default function CareerPivotWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    skills: { Technical: [], Strategic: [], Human: [] }
  });
  const contentRef = useRef(null);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };
  const prev = () => {
    if (step > 0) {
      setStep(s => s - 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.industry && data.roleCategory;
      case 2: return Object.values(data.skills || {}).flat().length >= 3;
      case 3: return data.savingsMonths !== undefined;
      case 4: return true;
      case 5: return data.aspiration;
      default: return true;
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f8f6f3",
      fontFamily: "'DM Sans', sans-serif", color: "#3d3429",
      display: "flex", flexDirection: "column"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <header style={{
        padding: "16px 24px", borderBottom: "1px solid rgba(200,138,42,0.1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(248,246,243,0.95)", backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={LOGO_SRC} alt="" width={24} height={24} style={{ objectFit: "contain" }} />
          <span style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: "#3d3429" }}>
            SaratiLife
          </span>
        </div>
        {step > 0 && step < STEPS.length - 1 && (
          <span style={{ fontSize: "12px", color: "#9a8b7a" }}>
            Step {step} of {STEPS.length - 2}
          </span>
        )}
      </header>

      {/* Progress */}
      {step > 0 && step < STEPS.length - 1 && (
        <div style={{ padding: "12px 0 0" }}>
          <ProgressBar current={step - 1} total={STEPS.length - 2} />
        </div>
      )}

      {/* Content */}
      <main ref={contentRef} style={{
        flex: 1, maxWidth: "560px", width: "100%", margin: "0 auto",
        padding: "28px 24px 120px", boxSizing: "border-box", overflowY: "auto"
      }}>
        {step === 0 && <WelcomeStep onNext={next} />}
        {step === 1 && <RoleStep data={data} setData={setData} />}
        {step === 2 && <SkillsStep data={data} setData={setData} />}
        {step === 3 && <FinancialStep data={data} setData={setData} />}
        {step === 4 && <ValuesStep data={data} setData={setData} />}
        {step === 5 && <AspirationsStep data={data} setData={setData} />}
        {step === 6 && <ReportStep data={data} />}
      </main>

      {/* Navigation Footer */}
      {step > 0 && step < STEPS.length - 1 && (
        <footer style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "16px 24px", background: "rgba(248,246,243,0.95)",
          borderTop: "1px solid rgba(200,138,42,0.1)", backdropFilter: "blur(10px)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          maxWidth: "560px", margin: "0 auto", boxSizing: "border-box"
        }}>
          <button onClick={prev} style={{
            padding: "10px 20px", borderRadius: "8px", border: "1.5px solid rgba(200,138,42,0.2)",
            background: "transparent", color: "#6b5c4c", fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer"
          }}>← Back</button>
          <button onClick={next} disabled={!canProceed()} style={{
            padding: "10px 28px", borderRadius: "8px", border: "none",
            background: canProceed() ? "#3d3429" : "rgba(61,52,41,0.2)",
            color: canProceed() ? "#f8f6f3" : "rgba(61,52,41,0.4)",
            fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            cursor: canProceed() ? "pointer" : "not-allowed",
            transition: "all 0.3s ease"
          }}>
            {step === STEPS.length - 2 ? "Generate Report" : "Continue →"}
          </button>
        </footer>
      )}
    </div>
  );
}
