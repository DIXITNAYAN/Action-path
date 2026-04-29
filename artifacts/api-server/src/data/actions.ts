export type ActionPriority = "high" | "medium" | "low";

export interface UserProfileInput {
  name?: string;
  age: number;
  gender: "male" | "female" | "other";
  occupation:
    | "student"
    | "salaried"
    | "self_employed"
    | "farmer"
    | "unemployed"
    | "homemaker"
    | "retired"
    | "daily_wage";
  income: number;
  state: string;
  education:
    | "none"
    | "primary"
    | "secondary"
    | "higher_secondary"
    | "graduate"
    | "postgraduate";
  maritalStatus: "single" | "married" | "divorced" | "widowed";
  differentlyAbled?: boolean;
  hasAadhaar: "yes" | "no";
  hasPAN: "yes" | "no";
  hasVoterId: "yes" | "no";
  hasRationCard: "yes" | "no";
  hasDrivingLicense: "yes" | "no";
  hasBankAccount: "yes" | "no";
}

export interface ActionRecord {
  id: number;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  documents: string[];
  link: string;
  priority: ActionPriority;
  tags: string[];
  eligibility?: string;
  benefit?: string;
  ministry?: string;
  featured?: boolean;
  condition: (user: UserProfileInput) => boolean;
}

export const CATEGORIES: Array<{ slug: string; label: string }> = [
  { slug: "documents", label: "Identity & Documents" },
  { slug: "finance", label: "Banking & Finance" },
  { slug: "schemes", label: "Welfare Schemes" },
  { slug: "health", label: "Health" },
  { slug: "housing", label: "Housing" },
  { slug: "student", label: "Education & Scholarships" },
  { slug: "employment", label: "Jobs & Skills" },
  { slug: "farmer", label: "Farmer Support" },
  { slug: "women", label: "Women" },
  { slug: "youth", label: "Youth" },
  { slug: "senior", label: "Senior Citizens" },
];

export const ACTIONS: ActionRecord[] = [
  {
    id: 1,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Apply for Aadhaar Card",
    description:
      "Aadhaar is the foundational 12-digit identity number required for almost every government service, bank account and SIM card in India.",
    documents: ["Identity Proof", "Address Proof", "Date of Birth Proof"],
    link: "https://uidai.gov.in/",
    priority: "high",
    tags: ["aadhaar", "uidai", "id", "identity"],
    eligibility: "All Indian residents.",
    benefit: "Universal ID required for most services.",
    ministry: "UIDAI",
    featured: true,
    condition: (u) => u.hasAadhaar === "no",
  },
  {
    id: 2,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Apply for PAN Card",
    description:
      "PAN is required for opening a bank account, filing income tax returns, large purchases and any salaried employment.",
    documents: ["Aadhaar / Identity Proof", "Date of Birth Proof", "Photograph"],
    link: "https://www.incometax.gov.in/iec/foportal/",
    priority: "high",
    tags: ["pan", "tax", "income tax", "id"],
    eligibility: "Any individual aged 18+ (and minors via guardian).",
    benefit: "Mandatory for tax and high-value transactions.",
    ministry: "Income Tax Department",
    featured: true,
    condition: (u) => u.hasPAN === "no" && u.age >= 18,
  },
  {
    id: 3,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Register as a Voter (EPIC / Voter ID)",
    description:
      "Register on the Election Commission portal to get your Voter ID and exercise your right to vote.",
    documents: ["Aadhaar", "Address Proof", "Photograph"],
    link: "https://voters.eci.gov.in/",
    priority: "medium",
    tags: ["voter id", "epic", "election"],
    eligibility: "Indian citizens aged 18+.",
    benefit: "Right to vote and recognised photo ID.",
    ministry: "Election Commission of India",
    condition: (u) => u.hasVoterId === "no" && u.age >= 18,
  },
  {
    id: 4,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Apply for Ration Card",
    description:
      "A ration card gives access to subsidised food grains under the Public Distribution System (PDS) and is widely accepted as proof of identity.",
    documents: ["Aadhaar", "Address Proof", "Income Certificate"],
    link: "https://nfsa.gov.in/",
    priority: "medium",
    tags: ["ration", "pds", "food", "nfsa"],
    eligibility: "Households (priority for low-income).",
    benefit: "Subsidised food grains every month.",
    ministry: "Department of Food & Public Distribution",
    condition: (u) => u.hasRationCard === "no" && u.income < 500000,
  },
  {
    id: 5,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Apply for Driving Licence",
    description:
      "Get a learner's licence followed by a permanent driving licence through the Parivahan Sarathi portal.",
    documents: ["Aadhaar", "Address Proof", "Age Proof", "Medical Form (if applicable)"],
    link: "https://sarathi.parivahan.gov.in/",
    priority: "low",
    tags: ["driving", "licence", "parivahan"],
    eligibility: "Age 18+ for car / two-wheeler with gear.",
    benefit: "Legal authorisation to drive on Indian roads.",
    ministry: "Ministry of Road Transport & Highways",
    condition: (u) => u.hasDrivingLicense === "no" && u.age >= 18,
  },
  {
    id: 6,
    category: "finance",
    categoryLabel: "Banking & Finance",
    title: "Open a PM Jan Dhan Bank Account",
    description:
      "A zero-balance savings account that comes with a free RuPay card, accident insurance cover and easy access to government direct benefit transfers.",
    documents: ["Aadhaar", "PAN (optional)"],
    link: "https://www.pmjdy.gov.in/",
    priority: "high",
    tags: ["bank", "jan dhan", "pmjdy", "dbt"],
    eligibility: "Any Indian resident without a bank account.",
    benefit: "Zero balance + ₹2 lakh accident cover.",
    ministry: "Ministry of Finance",
    featured: true,
    condition: (u) => u.hasBankAccount === "no",
  },
  {
    id: 7,
    category: "finance",
    categoryLabel: "Banking & Finance",
    title: "Atal Pension Yojana (APY)",
    description:
      "A guaranteed monthly pension between ₹1,000 and ₹5,000 after age 60, designed for workers in the unorganised sector.",
    documents: ["Aadhaar", "Bank Account", "Mobile Number"],
    link: "https://www.npscra.nsdl.co.in/scheme-details.php",
    priority: "medium",
    tags: ["pension", "apy", "retirement"],
    eligibility: "Indian citizens aged 18–40 with a bank account.",
    benefit: "₹1,000–₹5,000 monthly pension after 60.",
    ministry: "PFRDA",
    condition: (u) => u.age >= 18 && u.age <= 40 && u.hasBankAccount === "yes",
  },
  {
    id: 8,
    category: "finance",
    categoryLabel: "Banking & Finance",
    title: "PM Jeevan Jyoti Bima Yojana (PMJJBY)",
    description:
      "Renewable one-year term life insurance cover of ₹2 lakh at a premium of just ₹436 per year.",
    documents: ["Aadhaar", "Bank Account"],
    link: "https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx",
    priority: "medium",
    tags: ["insurance", "life", "pmjjby"],
    eligibility: "Bank account holders aged 18–50.",
    benefit: "₹2 lakh life cover for ₹436/year.",
    ministry: "Ministry of Finance",
    condition: (u) => u.age >= 18 && u.age <= 50 && u.hasBankAccount === "yes",
  },
  {
    id: 9,
    category: "finance",
    categoryLabel: "Banking & Finance",
    title: "PM Suraksha Bima Yojana (PMSBY)",
    description:
      "Accidental death and disability insurance cover of ₹2 lakh at just ₹20 per year.",
    documents: ["Aadhaar", "Bank Account"],
    link: "https://www.jansuraksha.gov.in/Forms-PMSBY.aspx",
    priority: "medium",
    tags: ["insurance", "accident", "pmsby"],
    eligibility: "Bank account holders aged 18–70.",
    benefit: "₹2 lakh accident cover for ₹20/year.",
    ministry: "Ministry of Finance",
    condition: (u) => u.age >= 18 && u.age <= 70 && u.hasBankAccount === "yes",
  },
  {
    id: 10,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "PM Ujjwala Yojana (Free LPG Connection)",
    description:
      "Provides a free LPG connection to women from below-poverty-line households so they don't have to cook on smoky chulhas.",
    documents: ["Aadhaar", "BPL / Ration Card", "Bank Account"],
    link: "https://www.pmuy.gov.in/",
    priority: "high",
    tags: ["lpg", "ujjwala", "women", "cooking gas"],
    eligibility: "Adult women from BPL households.",
    benefit: "Free LPG connection + first refill subsidy.",
    ministry: "Ministry of Petroleum & Natural Gas",
    condition: (u) => u.gender === "female" && u.income < 300000,
  },
  {
    id: 11,
    category: "health",
    categoryLabel: "Health",
    title: "Ayushman Bharat – PM-JAY",
    description:
      "Free health insurance cover up to ₹5 lakh per family per year for secondary and tertiary care hospitalisation.",
    documents: ["Aadhaar", "Ration Card / SECC verification"],
    link: "https://pmjay.gov.in/",
    priority: "high",
    tags: ["health", "insurance", "ayushman", "pmjay"],
    eligibility: "Families listed in SECC 2011 / low-income households.",
    benefit: "₹5 lakh/year hospital cover per family.",
    ministry: "Ministry of Health & Family Welfare",
    featured: true,
    condition: (u) => u.income < 300000,
  },
  {
    id: 12,
    category: "housing",
    categoryLabel: "Housing",
    title: "PM Awas Yojana (Affordable Housing)",
    description:
      "Interest subsidy and construction assistance for first-time home buyers from EWS, LIG and MIG categories.",
    documents: ["Aadhaar", "Income Certificate", "Bank Account"],
    link: "https://pmaymis.gov.in/",
    priority: "medium",
    tags: ["housing", "pmay", "home loan", "subsidy"],
    eligibility: "Households without a pucca house, income up to ₹18 lakh.",
    benefit: "Interest subsidy up to ₹2.67 lakh on home loan.",
    ministry: "Ministry of Housing & Urban Affairs",
    condition: (u) => u.income < 1800000 && u.maritalStatus !== "single",
  },
  {
    id: 13,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "National Scholarship Portal (NSP)",
    description:
      "One-stop portal for central and state government scholarships covering school, college and post-matric students.",
    documents: ["Aadhaar", "Income Certificate", "Mark Sheets", "Bank Account"],
    link: "https://scholarships.gov.in/",
    priority: "high",
    tags: ["scholarship", "student", "education", "nsp"],
    eligibility: "Students from low/middle income families.",
    benefit: "Scholarships for tuition, hostel and books.",
    ministry: "Ministry of Education",
    condition: (u) => u.occupation === "student",
  },
  {
    id: 14,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "Vidyalakshmi Education Loan Portal",
    description:
      "Apply to multiple banks for an education loan from a single window, with options for moratorium and interest subsidy.",
    documents: ["Admission Letter", "Mark Sheets", "Income Proof", "Aadhaar", "PAN"],
    link: "https://www.vidyalakshmi.co.in/",
    priority: "medium",
    tags: ["education loan", "student", "vidyalakshmi"],
    eligibility: "Students admitted to recognised courses.",
    benefit: "Single-window education loan applications.",
    ministry: "Ministry of Finance",
    condition: (u) =>
      u.occupation === "student" &&
      (u.education === "higher_secondary" ||
        u.education === "graduate" ||
        u.education === "postgraduate"),
  },
  {
    id: 15,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "Register on National Career Service (NCS)",
    description:
      "Free job portal by the Ministry of Labour with lakhs of jobs, career counselling and skill training listings.",
    documents: ["Aadhaar", "Resume", "Educational Certificates"],
    link: "https://www.ncs.gov.in/",
    priority: "high",
    tags: ["jobs", "career", "ncs", "employment"],
    eligibility: "All job seekers.",
    benefit: "Free access to verified job listings.",
    ministry: "Ministry of Labour & Employment",
    condition: (u) => u.occupation === "unemployed" || u.occupation === "student",
  },
  {
    id: 16,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "Skill India – PMKVY Training",
    description:
      "Short-term industry-aligned skill training with certification and placement support, free for eligible candidates.",
    documents: ["Aadhaar", "Educational Certificates"],
    link: "https://www.pmkvyofficial.org/",
    priority: "high",
    tags: ["skill", "training", "pmkvy", "youth"],
    eligibility: "Indian youth aged 15–45.",
    benefit: "Free certified skill training + placement support.",
    ministry: "Ministry of Skill Development",
    condition: (u) => u.age >= 15 && u.age <= 45,
  },
  {
    id: 17,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "MGNREGA – 100 Days of Guaranteed Work",
    description:
      "Guarantees at least 100 days of wage employment per year to every rural household whose adult members volunteer to do unskilled manual work.",
    documents: ["Aadhaar", "Job Card Application", "Bank Account"],
    link: "https://nrega.nic.in/",
    priority: "medium",
    tags: ["mgnrega", "rural", "employment", "wages"],
    eligibility: "Rural households with adult members willing to do manual work.",
    benefit: "Up to 100 days of guaranteed wage work.",
    ministry: "Ministry of Rural Development",
    condition: (u) =>
      (u.occupation === "unemployed" || u.occupation === "daily_wage") &&
      u.income < 200000,
  },
  {
    id: 18,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "PM Kisan Samman Nidhi",
    description:
      "Direct income support of ₹6,000 per year to all eligible landholding farmer families, paid in three equal instalments.",
    documents: ["Aadhaar", "Land Records", "Bank Account"],
    link: "https://pmkisan.gov.in/",
    priority: "high",
    tags: ["pm kisan", "farmer", "income support"],
    eligibility: "Small and marginal landholding farmers.",
    benefit: "₹6,000/year in 3 instalments.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    featured: true,
    condition: (u) => u.occupation === "farmer",
  },
  {
    id: 19,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "Kisan Credit Card (KCC)",
    description:
      "Short-term institutional credit for farmers at concessional interest rates for cultivation, post-harvest expenses and allied activities.",
    documents: ["Aadhaar", "Land Records", "Bank Account"],
    link: "https://www.myscheme.gov.in/schemes/kcc",
    priority: "medium",
    tags: ["kcc", "credit", "farmer", "loan"],
    eligibility: "Farmers, tenants, sharecroppers and SHGs.",
    benefit: "Crop loans up to ₹3 lakh at 4% effective interest.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    condition: (u) => u.occupation === "farmer",
  },
  {
    id: 20,
    category: "women",
    categoryLabel: "Women",
    title: "Sukanya Samriddhi Yojana",
    description:
      "A small-deposit scheme for the girl child with one of the highest interest rates among small savings, fully tax-free under 80C.",
    documents: ["Birth Certificate of Girl", "Parent's Aadhaar", "Address Proof"],
    link: "https://www.indiapost.gov.in/Financial/pages/content/sukanya-samriddhi-account.aspx",
    priority: "medium",
    tags: ["sukanya", "girl child", "savings", "ssy"],
    eligibility: "Parents/guardians of a girl child below age 10.",
    benefit: "High interest, tax-free maturity for the girl child.",
    ministry: "Ministry of Finance",
    condition: (u) =>
      u.gender === "female" ||
      (u.maritalStatus === "married" && (u.gender === "male" || u.gender === "female")),
  },
  {
    id: 21,
    category: "women",
    categoryLabel: "Women",
    title: "Mahila Samman Savings Certificate",
    description:
      "A two-year deposit for women and girls offering 7.5% annual interest with partial withdrawal allowed.",
    documents: ["Aadhaar", "PAN", "Bank/Post Office Account"],
    link: "https://www.indiapost.gov.in/",
    priority: "low",
    tags: ["mahila", "savings", "women"],
    eligibility: "Women and girls of any age.",
    benefit: "7.5% interest on deposits up to ₹2 lakh.",
    ministry: "Ministry of Finance",
    condition: (u) => u.gender === "female" && u.age >= 18,
  },
  {
    id: 22,
    category: "senior",
    categoryLabel: "Senior Citizens",
    title: "Senior Citizen Savings Scheme (SCSS)",
    description:
      "Government-backed quarterly-paying savings scheme exclusively for seniors with one of the highest interest rates available.",
    documents: ["Aadhaar", "PAN", "Age Proof", "Bank Account"],
    link: "https://www.indiapost.gov.in/Financial/pages/content/senior-citizen-savings-scheme.aspx",
    priority: "high",
    tags: ["scss", "senior", "savings", "retirement"],
    eligibility: "Citizens aged 60+ (55+ for VRS retirees).",
    benefit: "8.2% interest paid quarterly.",
    ministry: "Ministry of Finance",
    condition: (u) => u.age >= 60,
  },
  {
    id: 23,
    category: "senior",
    categoryLabel: "Senior Citizens",
    title: "Indira Gandhi National Old Age Pension (IGNOAPS)",
    description:
      "Monthly pension for senior citizens from below-poverty-line households under the National Social Assistance Programme.",
    documents: ["Aadhaar", "Age Proof", "BPL Certificate", "Bank Account"],
    link: "https://nsap.nic.in/",
    priority: "high",
    tags: ["pension", "senior", "ignoaps", "nsap"],
    eligibility: "BPL citizens aged 60+.",
    benefit: "Monthly pension of ₹200–₹500+ (state-topped).",
    ministry: "Ministry of Rural Development",
    condition: (u) => u.age >= 60 && u.income < 200000,
  },
  {
    id: 24,
    category: "youth",
    categoryLabel: "Youth",
    title: "PM Mudra Yojana (Business Loans)",
    description:
      "Collateral-free loans up to ₹10 lakh for non-farm micro and small enterprises through Shishu, Kishor and Tarun categories.",
    documents: ["Aadhaar", "PAN", "Business Plan", "Bank Account"],
    link: "https://www.mudra.org.in/",
    priority: "medium",
    tags: ["mudra", "business", "loan", "msme"],
    eligibility: "Non-corporate, non-farm micro/small entrepreneurs.",
    benefit: "Collateral-free loans up to ₹10 lakh.",
    ministry: "Ministry of Finance",
    condition: (u) =>
      u.occupation === "self_employed" ||
      (u.age >= 18 && u.age <= 45 && u.occupation !== "student"),
  },
  {
    id: 25,
    category: "youth",
    categoryLabel: "Youth",
    title: "Startup India Recognition",
    description:
      "Get DPIIT recognition for your startup to unlock tax benefits, easier compliance, IPR fast-tracking and access to the Startup India Seed Fund.",
    documents: ["Incorporation Certificate", "PAN", "Pitch Deck / Brief"],
    link: "https://www.startupindia.gov.in/",
    priority: "low",
    tags: ["startup", "dpiit", "entrepreneur"],
    eligibility: "Companies/LLPs younger than 10 years with turnover < ₹100 cr.",
    benefit: "Tax holiday, easier compliance, fund access.",
    ministry: "DPIIT",
    condition: (u) =>
      u.occupation === "self_employed" && u.age >= 18 && u.age <= 50,
  },
  {
    id: 26,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "e-Shram Card for Unorganised Workers",
    description:
      "A national database of unorganised workers that unlocks accident insurance and future welfare schemes targeted at gig and informal workers.",
    documents: ["Aadhaar", "Bank Account", "Mobile Number"],
    link: "https://eshram.gov.in/",
    priority: "high",
    tags: ["eshram", "unorganised", "gig", "labour"],
    eligibility: "Unorganised workers aged 16–59.",
    benefit: "₹2 lakh accident cover + scheme eligibility.",
    ministry: "Ministry of Labour & Employment",
    condition: (u) =>
      (u.occupation === "daily_wage" ||
        u.occupation === "self_employed" ||
        u.occupation === "homemaker" ||
        u.occupation === "unemployed") &&
      u.age >= 16 &&
      u.age <= 59,
  },
  {
    id: 27,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "DigiLocker Account",
    description:
      "A free, secure cloud locker linked to your Aadhaar to store and share verified copies of important documents like driving licence, PAN, mark sheets and more.",
    documents: ["Aadhaar", "Mobile Number"],
    link: "https://www.digilocker.gov.in/",
    priority: "medium",
    tags: ["digilocker", "documents", "digital"],
    eligibility: "Anyone with an Aadhaar-linked mobile number.",
    benefit: "Paperless, verifiable copies of govt. documents.",
    ministry: "MeitY",
    condition: (u) => u.hasAadhaar === "yes",
  },
];

export function getActions(filters?: {
  category?: string;
  search?: string;
}): ActionRecord[] {
  let result = ACTIONS.slice();
  if (filters?.category) {
    const c = filters.category.toLowerCase();
    result = result.filter((a) => a.category.toLowerCase() === c);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase().trim();
    if (q.length > 0) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.categoryLabel.toLowerCase().includes(q),
      );
    }
  }
  return result;
}

export function getActionById(id: number): ActionRecord | undefined {
  return ACTIONS.find((a) => a.id === id);
}

export function getFeatured(): ActionRecord[] {
  return ACTIONS.filter((a) => a.featured);
}

const PRIORITY_RANK: Record<ActionPriority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function recommend(user: UserProfileInput): ActionRecord[] {
  return ACTIONS.filter((a) => {
    try {
      return a.condition(user);
    } catch {
      return false;
    }
  }).sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
}

export function getCategorySummaries(): Array<{
  slug: string;
  label: string;
  count: number;
}> {
  return CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label,
    count: ACTIONS.filter((a) => a.category === c.slug).length,
  })).filter((c) => c.count > 0);
}

export function getStats(): {
  totalActions: number;
  totalCategories: number;
  highPriorityCount: number;
} {
  return {
    totalActions: ACTIONS.length,
    totalCategories: getCategorySummaries().length,
    highPriorityCount: ACTIONS.filter((a) => a.priority === "high").length,
  };
}

export function stripCondition(a: ActionRecord) {
  const { condition: _condition, featured: _featured, ...rest } = a;
  return rest;
}
