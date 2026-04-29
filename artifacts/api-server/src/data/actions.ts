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
  {
    id: 28,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "UMANG App – 1500+ Govt Services in One Place",
    description:
      "Single mobile app to access EPFO, PAN, gas booking, Passport, Aadhaar, scholarship, pension and 1500+ central and state government services.",
    documents: ["Aadhaar", "Mobile Number"],
    link: "https://web.umang.gov.in/",
    priority: "medium",
    tags: ["umang", "app", "services", "digital"],
    eligibility: "Any Indian citizen with a mobile number.",
    benefit: "One-stop app for hundreds of govt services.",
    ministry: "MeitY",
    condition: () => true,
  },
  {
    id: 29,
    category: "health",
    categoryLabel: "Health",
    title: "ABHA – Ayushman Bharat Health Account",
    description:
      "Create your free 14-digit Ayushman Bharat Health Account (ABHA) ID to securely store and share your medical records with hospitals across India.",
    documents: ["Aadhaar", "Mobile Number"],
    link: "https://abha.abdm.gov.in/abha/v3/register",
    priority: "medium",
    tags: ["abha", "health id", "abdm"],
    eligibility: "Any Indian resident.",
    benefit: "Portable digital health records across hospitals.",
    ministry: "Ministry of Health & Family Welfare",
    condition: (u) => u.hasAadhaar === "yes",
  },
  {
    id: 30,
    category: "youth",
    categoryLabel: "Youth",
    title: "PM Vishwakarma Scheme",
    description:
      "Toolkit incentive of ₹15,000, skill training stipend of ₹500/day and collateral-free loans up to ₹3 lakh at 5% interest for traditional artisans and craftspeople.",
    documents: ["Aadhaar", "Bank Account", "Caste/Community Proof (if applicable)"],
    link: "https://pmvishwakarma.gov.in/",
    priority: "high",
    tags: ["vishwakarma", "artisan", "craft", "loan"],
    eligibility: "Artisans in 18 traditional trades (carpenter, tailor, potter, etc.).",
    benefit: "₹15k toolkit + ₹3 lakh loan + skill training stipend.",
    ministry: "Ministry of MSME",
    condition: (u) =>
      (u.occupation === "self_employed" ||
        u.occupation === "daily_wage" ||
        u.occupation === "unemployed") &&
      u.age >= 18,
  },
  {
    id: 31,
    category: "youth",
    categoryLabel: "Youth",
    title: "Stand-Up India Scheme",
    description:
      "Bank loans between ₹10 lakh and ₹1 crore for women, SC and ST entrepreneurs to set up greenfield enterprises in manufacturing, services or trading.",
    documents: ["Aadhaar", "PAN", "Business Plan", "Bank Account", "SC/ST Certificate (if applicable)"],
    link: "https://www.standupmitra.in/",
    priority: "medium",
    tags: ["standup", "entrepreneur", "women", "loan", "sc", "st"],
    eligibility: "Women / SC / ST entrepreneurs aged 18+.",
    benefit: "Loan of ₹10 lakh to ₹1 crore for greenfield ventures.",
    ministry: "Ministry of Finance",
    condition: (u) =>
      u.age >= 18 &&
      (u.gender === "female" || u.occupation === "self_employed" || u.occupation === "unemployed"),
  },
  {
    id: 32,
    category: "youth",
    categoryLabel: "Youth",
    title: "PMEGP – Subsidised Self-Employment Loan",
    description:
      "Margin money subsidy of 15-35% on bank loans up to ₹50 lakh (manufacturing) or ₹20 lakh (services) for new micro-enterprises.",
    documents: ["Aadhaar", "PAN", "Project Report", "Educational Certificates"],
    link: "https://www.kviconline.gov.in/pmegpeportal/",
    priority: "medium",
    tags: ["pmegp", "kvic", "self employment", "loan"],
    eligibility: "Individuals aged 18+ with at least Class 8 education for higher loans.",
    benefit: "Up to 35% subsidy on project cost.",
    ministry: "Ministry of MSME",
    condition: (u) =>
      u.age >= 18 &&
      u.age <= 60 &&
      (u.occupation === "unemployed" ||
        u.occupation === "self_employed" ||
        u.occupation === "daily_wage"),
  },
  {
    id: 33,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "PM SVANidhi (Street Vendor Loan)",
    description:
      "Collateral-free working-capital loan of ₹10,000 (then ₹20,000 and ₹50,000 on timely repayment) with 7% interest subsidy for street vendors.",
    documents: ["Aadhaar", "Vendor Certificate / LoR", "Bank Account"],
    link: "https://pmsvanidhi.mohua.gov.in/",
    priority: "high",
    tags: ["svanidhi", "street vendor", "loan"],
    eligibility: "Urban street vendors (with vending certificate or LoR).",
    benefit: "₹10k → ₹50k loan at subsidised interest + cashback.",
    ministry: "Ministry of Housing & Urban Affairs",
    condition: (u) =>
      (u.occupation === "self_employed" || u.occupation === "daily_wage") &&
      u.income < 300000,
  },
  {
    id: 34,
    category: "women",
    categoryLabel: "Women",
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    description:
      "Cash benefit of ₹5,000 in instalments to pregnant and lactating mothers for the first living child to support nutrition and wage loss compensation.",
    documents: ["Aadhaar", "Bank Account", "MCP Card"],
    link: "https://wcd.gov.in/schemes/pradhan-mantri-matru-vandana-yojana",
    priority: "high",
    tags: ["pmmvy", "pregnancy", "maternity", "women"],
    eligibility: "Pregnant women aged 19+ for first living child (₹6,000 for second girl child).",
    benefit: "₹5,000 maternity benefit (+ ₹6,000 JSY at hospital).",
    ministry: "Ministry of Women & Child Development",
    condition: (u) => u.gender === "female" && u.age >= 19 && u.age <= 45,
  },
  {
    id: 35,
    category: "women",
    categoryLabel: "Women",
    title: "Janani Suraksha Yojana (JSY)",
    description:
      "Cash assistance of ₹600-₹1,400 to promote institutional delivery among pregnant women from low-income households, with free transport and post-natal care.",
    documents: ["Aadhaar", "BPL Card / Income Proof", "Bank Account"],
    link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
    priority: "high",
    tags: ["jsy", "pregnancy", "delivery", "women"],
    eligibility: "Pregnant women, esp. from low-income / BPL households.",
    benefit: "Cash assistance + free institutional delivery.",
    ministry: "Ministry of Health & Family Welfare",
    condition: (u) =>
      u.gender === "female" && u.age >= 18 && u.age <= 45 && u.income < 300000,
  },
  {
    id: 36,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description:
      "Crop insurance covering pre-sowing to post-harvest losses against natural calamities, pests and diseases at heavily subsidised premiums.",
    documents: ["Aadhaar", "Land Records", "Bank Account", "Sowing Declaration"],
    link: "https://pmfby.gov.in/",
    priority: "high",
    tags: ["fasal bima", "crop insurance", "pmfby", "farmer"],
    eligibility: "All farmers (loanee and non-loanee) growing notified crops.",
    benefit: "Up to full sum-insured for crop loss at 1.5–5% premium.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    condition: (u) => u.occupation === "farmer",
  },
  {
    id: 37,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "Soil Health Card Scheme",
    description:
      "Get a free soil health card every 3 years with crop-wise nutrient recommendations to improve yield and reduce input costs.",
    documents: ["Aadhaar", "Land Records"],
    link: "https://soilhealth.dac.gov.in/",
    priority: "low",
    tags: ["soil health", "farmer"],
    eligibility: "All farmers with cultivable land.",
    benefit: "Free soil testing + crop-wise fertiliser advisory.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    condition: (u) => u.occupation === "farmer",
  },
  {
    id: 38,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "e-NAM – National Agriculture Market",
    description:
      "Sell your produce online to traders across India through the unified electronic mandi platform and get better price discovery.",
    documents: ["Aadhaar", "Land Records", "Bank Account"],
    link: "https://enam.gov.in/web/",
    priority: "medium",
    tags: ["enam", "mandi", "farmer", "market"],
    eligibility: "Farmers, FPOs and traders in linked APMCs.",
    benefit: "Pan-India online mandi access + transparent pricing.",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    condition: (u) => u.occupation === "farmer",
  },
  {
    id: 39,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "EPFO – Activate UAN & Track PF",
    description:
      "Activate your Universal Account Number (UAN) on the EPFO portal to track PF contributions, transfer balance on job changes and submit online withdrawal claims.",
    documents: ["Aadhaar", "PAN", "Bank Account", "UAN from Employer"],
    link: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/",
    priority: "high",
    tags: ["epfo", "pf", "uan", "salaried"],
    eligibility: "All salaried employees with EPF deductions.",
    benefit: "Online PF tracking, transfer and withdrawal.",
    ministry: "Ministry of Labour & Employment",
    condition: (u) => u.occupation === "salaried",
  },
  {
    id: 40,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "ESIC Registration (Health & Maternity Cover)",
    description:
      "If your monthly wage is up to ₹21,000, you and your dependants get free medical care, sickness benefit, maternity benefit and disability cover under ESIC.",
    documents: ["Aadhaar", "Salary Slip / Employer Letter", "Bank Account"],
    link: "https://www.esic.gov.in/",
    priority: "high",
    tags: ["esic", "salaried", "health", "insurance"],
    eligibility: "Salaried employees earning up to ₹21,000/month (₹25,000 for differently abled).",
    benefit: "Free hospital care + sickness/maternity/disability benefits.",
    ministry: "Ministry of Labour & Employment",
    condition: (u) =>
      u.occupation === "salaried" && u.income > 0 && u.income <= 252000,
  },
  {
    id: 41,
    category: "finance",
    categoryLabel: "Banking & Finance",
    title: "File Income Tax Return (ITR)",
    description:
      "If your annual income exceeds the basic exemption limit (₹2.5L old / ₹3L new regime), file your ITR online to claim refunds, build credit history and avoid notices.",
    documents: ["PAN", "Aadhaar", "Form 16 / Salary Slips", "Bank Statement"],
    link: "https://www.incometax.gov.in/iec/foportal/",
    priority: "medium",
    tags: ["itr", "tax", "income tax"],
    eligibility: "Income above basic exemption limit; mandatory if certain conditions met.",
    benefit: "Refunds, credit history, easier loan/visa processing.",
    ministry: "Income Tax Department",
    condition: (u) =>
      u.hasPAN === "yes" &&
      (u.income >= 250000 || u.occupation === "salaried" || u.occupation === "self_employed"),
  },
  {
    id: 42,
    category: "finance",
    categoryLabel: "Banking & Finance",
    title: "National Pension System (NPS)",
    description:
      "Voluntary, low-cost retirement savings with extra ₹50,000 tax deduction under 80CCD(1B) over and above the ₹1.5 lakh 80C limit.",
    documents: ["Aadhaar", "PAN", "Bank Account"],
    link: "https://enps.nsdl.com/",
    priority: "low",
    tags: ["nps", "retirement", "pension", "tax"],
    eligibility: "Indian citizens aged 18-70.",
    benefit: "Market-linked pension + extra ₹50k tax deduction.",
    ministry: "PFRDA",
    condition: (u) =>
      u.age >= 18 &&
      u.age <= 70 &&
      (u.occupation === "salaried" || u.occupation === "self_employed"),
  },
  {
    id: 43,
    category: "senior",
    categoryLabel: "Senior Citizens",
    title: "PM Vaya Vandana Yojana (PMVVY)",
    description:
      "LIC-operated pension scheme for senior citizens guaranteeing 7.4% return for 10 years on a lump-sum investment up to ₹15 lakh.",
    documents: ["Aadhaar", "PAN", "Age Proof", "Bank Account"],
    link: "https://licindia.in/web/guest/pradhan-mantri-vaya-vandana-yojana",
    priority: "medium",
    tags: ["pmvvy", "lic", "senior", "pension"],
    eligibility: "Citizens aged 60+.",
    benefit: "7.4% guaranteed pension for 10 years.",
    ministry: "Ministry of Finance",
    condition: (u) => u.age >= 60,
  },
  {
    id: 44,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "UDID – Unique Disability ID",
    description:
      "Single nationwide ID card for persons with disabilities that simplifies access to all disability benefits, scholarships, reservations and concessions.",
    documents: ["Aadhaar", "Disability Certificate / Medical Records", "Photograph"],
    link: "https://www.swavlambancard.gov.in/",
    priority: "high",
    tags: ["udid", "disability", "divyang"],
    eligibility: "Persons with any recognised disability.",
    benefit: "Single ID for all disability schemes pan-India.",
    ministry: "Ministry of Social Justice & Empowerment",
    condition: (u) => u.differentlyAbled === true,
  },
  {
    id: 45,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "AICTE Saksham Scholarship for Differently Abled",
    description:
      "Tuition fee waiver up to ₹50,000/year and ₹3,000/month allowance for differently abled students pursuing AICTE-approved technical courses.",
    documents: ["Disability Certificate", "Admission Letter", "Aadhaar", "Bank Account", "Income Proof"],
    link: "https://scholarships.gov.in/",
    priority: "high",
    tags: ["aicte", "saksham", "disability", "scholarship"],
    eligibility: "Differently abled students in AICTE technical courses, family income < ₹8 lakh.",
    benefit: "₹50k tuition + ₹3k/month allowance.",
    ministry: "AICTE",
    condition: (u) =>
      u.differentlyAbled === true &&
      u.occupation === "student" &&
      u.income < 800000,
  },
  {
    id: 46,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "AICTE Pragati Scholarship for Girls",
    description:
      "Tuition fee waiver up to ₹50,000/year and ₹3,000/month for girl students in AICTE-approved technical/professional courses (one girl per family).",
    documents: ["Admission Letter", "Aadhaar", "Income Certificate", "Bank Account"],
    link: "https://scholarships.gov.in/",
    priority: "high",
    tags: ["aicte", "pragati", "girl", "scholarship"],
    eligibility: "Girl students in AICTE technical courses, family income < ₹8 lakh.",
    benefit: "₹50k tuition + ₹3k/month allowance.",
    ministry: "AICTE",
    condition: (u) =>
      u.gender === "female" &&
      u.occupation === "student" &&
      u.income < 800000,
  },
  {
    id: 47,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "PM-YASASVI Scholarship (OBC / EBC / DNT)",
    description:
      "Pre-matric and post-matric scholarships for OBC, EBC and DNT students covering tuition fees, hostel and books.",
    documents: ["Caste Certificate", "Income Certificate", "Aadhaar", "Mark Sheets", "Bank Account"],
    link: "https://yet.nta.ac.in/",
    priority: "medium",
    tags: ["yasasvi", "obc", "scholarship", "student"],
    eligibility: "OBC/EBC/DNT students, family income < ₹2.5 lakh.",
    benefit: "Tuition + maintenance allowance up to ₹1.25 lakh/year.",
    ministry: "Ministry of Social Justice & Empowerment",
    condition: (u) => u.occupation === "student" && u.income < 250000,
  },
  {
    id: 48,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "INSPIRE Scholarship (Science Students)",
    description:
      "₹80,000/year for top 1% Class 12 science students pursuing BSc/Integrated MSc in natural and basic sciences.",
    documents: ["Class 12 Mark Sheet", "College Admission Letter", "Aadhaar", "Bank Account"],
    link: "https://online-inspire.gov.in/",
    priority: "medium",
    tags: ["inspire", "science", "scholarship"],
    eligibility: "Top 1% in Class 12 boards pursuing natural sciences in UG.",
    benefit: "₹80,000/year for 5 years.",
    ministry: "Department of Science & Technology",
    condition: (u) =>
      u.occupation === "student" &&
      (u.education === "higher_secondary" || u.education === "graduate") &&
      u.age >= 17 &&
      u.age <= 22,
  },
  {
    id: 49,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "PMGKAY – Free Foodgrains",
    description:
      "Free 5 kg foodgrain per person per month under the National Food Security Act, automatically applicable if you have a priority/Antyodaya ration card.",
    documents: ["Ration Card (Priority/AAY)", "Aadhaar"],
    link: "https://nfsa.gov.in/",
    priority: "high",
    tags: ["pmgkay", "ration", "food", "nfsa"],
    eligibility: "Priority household / Antyodaya ration card holders.",
    benefit: "Free 5 kg foodgrain per person per month.",
    ministry: "Department of Food & Public Distribution",
    condition: (u) => u.hasRationCard === "yes" && u.income < 300000,
  },
  {
    id: 50,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Apply for Birth Certificate",
    description:
      "Birth certificate is mandatory for school admissions, passport, government jobs and many welfare schemes — apply online via the CRS portal of your state.",
    documents: ["Hospital Discharge / Affidavit", "Parents' ID Proof"],
    link: "https://crsorgi.gov.in/",
    priority: "medium",
    tags: ["birth", "certificate", "crs"],
    eligibility: "Anyone whose birth was not previously registered.",
    benefit: "Foundational legal proof of date and place of birth.",
    ministry: "Office of the Registrar General",
    condition: (u) => u.age <= 25,
  },
  {
    id: 51,
    category: "documents",
    categoryLabel: "Identity & Documents",
    title: "Apply for Income / Caste / Domicile Certificate",
    description:
      "Income, caste and domicile certificates issued by your state are pre-requisites for most state and central scholarships, reservations and welfare schemes.",
    documents: ["Aadhaar", "Address Proof", "Income/Salary Proof", "Caste Proof (if applicable)"],
    link: "https://services.india.gov.in/",
    priority: "high",
    tags: ["income certificate", "caste certificate", "domicile"],
    eligibility: "Any state resident.",
    benefit: "Unlocks state scholarships and reservations.",
    ministry: "Respective State Government",
    condition: (u) =>
      u.income < 800000 || u.occupation === "student" || u.occupation === "unemployed",
  },
  {
    id: 52,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "PM Daksh Yojana (SC/OBC/Safai Karmachari Skilling)",
    description:
      "Free short-term and long-term skilling programmes with stipend for SC, OBC, EBC and Safai Karmachari communities.",
    documents: ["Aadhaar", "Caste Certificate", "Bank Account"],
    link: "https://pmdaksh.dosje.gov.in/",
    priority: "medium",
    tags: ["pmdaksh", "skill", "sc", "obc"],
    eligibility: "SC/OBC/EBC/Safai Karmachari aged 18-45.",
    benefit: "Free skill training + stipend + placement.",
    ministry: "Ministry of Social Justice & Empowerment",
    condition: (u) =>
      u.age >= 18 &&
      u.age <= 45 &&
      (u.occupation === "unemployed" || u.occupation === "daily_wage" || u.occupation === "homemaker"),
  },
  {
    id: 53,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "National Apprenticeship Promotion Scheme (NAPS)",
    description:
      "Earn ₹5,000-₹15,000/month as a paid apprentice with a recognised establishment while you train, with 25% of stipend reimbursed by the government.",
    documents: ["Aadhaar", "Educational Certificates", "Bank Account"],
    link: "https://www.apprenticeshipindia.gov.in/",
    priority: "medium",
    tags: ["naps", "apprentice", "youth", "training"],
    eligibility: "Indian youth aged 14+ with relevant minimum qualification.",
    benefit: "Paid on-the-job training + recognised certificate.",
    ministry: "Ministry of Skill Development",
    condition: (u) =>
      u.age >= 16 &&
      u.age <= 35 &&
      (u.occupation === "unemployed" || u.occupation === "student"),
  },

  // ============================================================
  // STATE-SPECIFIC SCHEMES
  // ============================================================

  // BIHAR
  {
    id: 100,
    category: "women",
    categoryLabel: "Women",
    title: "Mukhyamantri Kanya Utthan Yojana (Bihar)",
    description:
      "Cash assistance up to ₹54,100 across stages from birth to graduation for girls in Bihar to encourage education and reduce drop-out.",
    documents: ["Aadhaar", "Birth Certificate", "School/College ID", "Bank Account"],
    link: "https://medhasoft.bih.nic.in/",
    priority: "high",
    tags: ["bihar", "girl", "kanya utthan", "state"],
    eligibility: "Girls residing in Bihar (age varies by stage).",
    benefit: "Up to ₹54,100 across life stages.",
    ministry: "Government of Bihar",
    condition: (u) => u.state === "Bihar" && u.gender === "female" && u.age <= 25,
  },
  {
    id: 101,
    category: "youth",
    categoryLabel: "Youth",
    title: "Mukhyamantri Udyami Yojana (Bihar)",
    description:
      "Loan up to ₹10 lakh (50% as grant) for setting up new enterprises by youth, women, SC/ST and minority entrepreneurs in Bihar.",
    documents: ["Aadhaar", "Domicile of Bihar", "Project Report", "Bank Account"],
    link: "https://udyami.bihar.gov.in/",
    priority: "high",
    tags: ["bihar", "udyami", "loan", "state"],
    eligibility: "Bihar residents aged 18-50 with at least Class 12 / ITI / Diploma.",
    benefit: "₹10 lakh loan, half as grant.",
    ministry: "Government of Bihar",
    condition: (u) =>
      u.state === "Bihar" &&
      u.age >= 18 &&
      u.age <= 50 &&
      (u.occupation === "self_employed" || u.occupation === "unemployed"),
  },

  // UTTAR PRADESH
  {
    id: 102,
    category: "women",
    categoryLabel: "Women",
    title: "Mukhyamantri Kanya Sumangala Yojana (UP)",
    description:
      "₹25,000 in 6 instalments from birth to graduation for girls in Uttar Pradesh to support nutrition, schooling and higher education.",
    documents: ["Aadhaar", "Birth Certificate", "School/College ID", "Bank Account", "Income Proof"],
    link: "https://mksy.up.gov.in/",
    priority: "high",
    tags: ["up", "kanya sumangala", "girl", "state"],
    eligibility: "Girls in UP, family income < ₹3 lakh.",
    benefit: "₹25,000 across 6 stages.",
    ministry: "Government of Uttar Pradesh",
    condition: (u) =>
      u.state === "Uttar Pradesh" &&
      u.gender === "female" &&
      u.age <= 21 &&
      u.income < 300000,
  },
  {
    id: 103,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "UPBOCW – Construction Worker Registration (UP)",
    description:
      "Register with the UP Building & Other Construction Workers Welfare Board to access pension, accident cover, scholarship for children and tool kits.",
    documents: ["Aadhaar", "90-day Work Certificate", "Bank Account"],
    link: "https://upbocw.in/",
    priority: "medium",
    tags: ["up", "construction", "labour", "state"],
    eligibility: "Construction workers aged 18-60 in UP with 90+ days work.",
    benefit: "Pension, accident cover, kid scholarships, tool kits.",
    ministry: "Government of Uttar Pradesh",
    condition: (u) =>
      u.state === "Uttar Pradesh" &&
      u.occupation === "daily_wage" &&
      u.age >= 18 &&
      u.age <= 60,
  },

  // MADHYA PRADESH
  {
    id: 104,
    category: "women",
    categoryLabel: "Women",
    title: "Ladli Behna Yojana (Madhya Pradesh)",
    description:
      "₹1,250 per month direct transfer to eligible women in Madhya Pradesh for financial empowerment and decision-making power within the household.",
    documents: ["Aadhaar", "Samagra ID", "Bank Account (Aadhaar-linked)"],
    link: "https://cmladlibahna.mp.gov.in/",
    priority: "high",
    tags: ["mp", "ladli behna", "women", "state"],
    eligibility: "Women aged 21-60 resident in MP, family income < ₹2.5 lakh.",
    benefit: "₹1,250/month (₹15,000/year).",
    ministry: "Government of Madhya Pradesh",
    condition: (u) =>
      u.state === "Madhya Pradesh" &&
      u.gender === "female" &&
      u.age >= 21 &&
      u.age <= 60 &&
      u.income < 250000,
  },
  {
    id: 105,
    category: "women",
    categoryLabel: "Women",
    title: "Ladli Lakshmi Yojana (Madhya Pradesh)",
    description:
      "₹1,18,000 corpus matures over time for girls born in MP, with milestone payouts at school and college admissions.",
    documents: ["Birth Certificate", "Aadhaar", "Samagra ID", "Bank Account"],
    link: "https://ladlilaxmi.mp.gov.in/",
    priority: "medium",
    tags: ["mp", "ladli lakshmi", "girl", "state"],
    eligibility: "Girls born in MP to BPL/income-eligible families.",
    benefit: "₹1.18 lakh corpus + milestone payouts.",
    ministry: "Government of Madhya Pradesh",
    condition: (u) =>
      u.state === "Madhya Pradesh" && u.gender === "female" && u.age <= 25,
  },

  // MAHARASHTRA
  {
    id: 106,
    category: "women",
    categoryLabel: "Women",
    title: "Mukhyamantri Majhi Ladki Bahin Yojana (Maharashtra)",
    description:
      "₹1,500 per month direct benefit transfer to eligible women in Maharashtra to support household expenses and economic independence.",
    documents: ["Aadhaar", "Domicile of Maharashtra", "Ration Card", "Bank Account"],
    link: "https://ladakibahin.maharashtra.gov.in/",
    priority: "high",
    tags: ["maharashtra", "ladki bahin", "women", "state"],
    eligibility: "Women aged 21-65 resident in Maharashtra, family income < ₹2.5 lakh.",
    benefit: "₹1,500/month.",
    ministry: "Government of Maharashtra",
    condition: (u) =>
      u.state === "Maharashtra" &&
      u.gender === "female" &&
      u.age >= 21 &&
      u.age <= 65 &&
      u.income < 250000,
  },
  {
    id: 107,
    category: "health",
    categoryLabel: "Health",
    title: "Mahatma Jyotiba Phule Jan Arogya Yojana (Maharashtra)",
    description:
      "Cashless health cover up to ₹5 lakh per family per year at empanelled hospitals across Maharashtra, in addition to Ayushman Bharat.",
    documents: ["Aadhaar", "Yellow/Orange Ration Card / Income Certificate"],
    link: "https://www.jeevandayee.gov.in/",
    priority: "high",
    tags: ["maharashtra", "mjpjay", "health", "state"],
    eligibility: "Maharashtra residents (now extended to all post 2023).",
    benefit: "₹5 lakh/year cashless treatment.",
    ministry: "Government of Maharashtra",
    condition: (u) => u.state === "Maharashtra",
  },

  // RAJASTHAN
  {
    id: 108,
    category: "health",
    categoryLabel: "Health",
    title: "Mukhyamantri Chiranjeevi Health Insurance (Rajasthan)",
    description:
      "Health insurance cover up to ₹25 lakh for accidents and ₹10 lakh per family per year for serious illnesses for residents of Rajasthan.",
    documents: ["Aadhaar", "Jan Aadhaar", "Bank Account"],
    link: "https://chiranjeevi.rajasthan.gov.in/",
    priority: "high",
    tags: ["rajasthan", "chiranjeevi", "health", "state"],
    eligibility: "Rajasthan residents (free for low-income, ₹850/year for others).",
    benefit: "₹10 lakh health + ₹25 lakh accident cover.",
    ministry: "Government of Rajasthan",
    condition: (u) => u.state === "Rajasthan",
  },
  {
    id: 109,
    category: "employment",
    categoryLabel: "Jobs & Skills",
    title: "Indira Gandhi Shahari Rozgar Guarantee (Rajasthan)",
    description:
      "Urban version of MGNREGA – 125 days of guaranteed wage employment per year per family in urban Rajasthan.",
    documents: ["Aadhaar", "Jan Aadhaar", "Bank Account"],
    link: "https://lsg.urban.rajasthan.gov.in/",
    priority: "high",
    tags: ["rajasthan", "urban employment", "state"],
    eligibility: "Urban Rajasthan households with adult members willing to work.",
    benefit: "125 days guaranteed wage work per year.",
    ministry: "Government of Rajasthan",
    condition: (u) =>
      u.state === "Rajasthan" &&
      (u.occupation === "unemployed" || u.occupation === "daily_wage") &&
      u.income < 250000,
  },

  // KARNATAKA
  {
    id: 110,
    category: "women",
    categoryLabel: "Women",
    title: "Gruha Lakshmi Scheme (Karnataka)",
    description:
      "₹2,000 per month direct transfer to woman head-of-family in Karnataka, with no income or caste restriction beyond ration card eligibility.",
    documents: ["Aadhaar", "Ration Card", "Bank Account (Aadhaar-linked)"],
    link: "https://sevasindhuservices.karnataka.gov.in/",
    priority: "high",
    tags: ["karnataka", "gruha lakshmi", "women", "state"],
    eligibility: "Woman head-of-family in Karnataka with eligible ration card.",
    benefit: "₹2,000/month direct transfer.",
    ministry: "Government of Karnataka",
    condition: (u) =>
      u.state === "Karnataka" && u.gender === "female" && u.age >= 18 && u.hasRationCard === "yes",
  },
  {
    id: 111,
    category: "youth",
    categoryLabel: "Youth",
    title: "Yuva Nidhi Scheme (Karnataka)",
    description:
      "₹3,000/month for unemployed graduates and ₹1,500/month for diploma holders for up to 2 years in Karnataka.",
    documents: ["Aadhaar", "Domicile of Karnataka", "Degree/Diploma", "Bank Account"],
    link: "https://sevasindhuservices.karnataka.gov.in/",
    priority: "high",
    tags: ["karnataka", "yuva nidhi", "unemployed", "state"],
    eligibility: "Karnataka graduates/diploma holders unemployed for 6+ months after passing.",
    benefit: "₹1,500-₹3,000/month for up to 24 months.",
    ministry: "Government of Karnataka",
    condition: (u) =>
      u.state === "Karnataka" &&
      u.occupation === "unemployed" &&
      (u.education === "graduate" || u.education === "postgraduate" || u.education === "higher_secondary") &&
      u.age >= 18 &&
      u.age <= 35,
  },

  // TAMIL NADU
  {
    id: 112,
    category: "women",
    categoryLabel: "Women",
    title: "Kalaignar Magalir Urimai Thogai (Tamil Nadu)",
    description:
      "₹1,000 per month direct transfer to eligible women heads-of-family in Tamil Nadu under the entitlement scheme.",
    documents: ["Aadhaar", "Family Card", "Bank Account"],
    link: "https://kmut.tn.gov.in/",
    priority: "high",
    tags: ["tamil nadu", "magalir", "women", "state"],
    eligibility: "Women heads-of-family in TN, family income < ₹2.5 lakh, no 4-wheeler.",
    benefit: "₹1,000/month.",
    ministry: "Government of Tamil Nadu",
    condition: (u) =>
      u.state === "Tamil Nadu" &&
      u.gender === "female" &&
      u.age >= 21 &&
      u.income < 250000,
  },
  {
    id: 113,
    category: "women",
    categoryLabel: "Women",
    title: "Free Bus Travel for Women (Tamil Nadu)",
    description:
      "Zero-fare travel for all women on regular government buses across Tamil Nadu to reduce daily commute costs.",
    documents: ["Photo ID"],
    link: "https://www.tn.gov.in/",
    priority: "low",
    tags: ["tamil nadu", "transport", "women", "state"],
    eligibility: "All women travelling in TN govt buses.",
    benefit: "Free bus travel.",
    ministry: "Government of Tamil Nadu",
    condition: (u) => u.state === "Tamil Nadu" && u.gender === "female",
  },

  // ANDHRA PRADESH
  {
    id: 114,
    category: "senior",
    categoryLabel: "Senior Citizens",
    title: "YSR Pension Kanuka (Andhra Pradesh)",
    description:
      "₹3,000-₹10,000 per month pension for senior citizens, widows, differently abled and other vulnerable groups in Andhra Pradesh.",
    documents: ["Aadhaar", "Age Proof", "BPL/Income Certificate", "Bank Account"],
    link: "https://gsws-nbm.ap.gov.in/",
    priority: "high",
    tags: ["andhra", "pension", "senior", "state"],
    eligibility: "AP residents 60+ (45+ widows, all ages for divyang) from low-income families.",
    benefit: "₹3,000-₹10,000/month.",
    ministry: "Government of Andhra Pradesh",
    condition: (u) =>
      u.state === "Andhra Pradesh" &&
      u.income < 300000 &&
      (u.age >= 60 ||
        u.maritalStatus === "widowed" ||
        u.differentlyAbled === true),
  },

  // TELANGANA
  {
    id: 115,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "Rythu Bandhu (Telangana)",
    description:
      "₹5,000 per acre per season investment support paid directly to farmers in Telangana, twice a year.",
    documents: ["Aadhaar", "Pattadar Passbook", "Bank Account"],
    link: "https://rythubandhu.telangana.gov.in/",
    priority: "high",
    tags: ["telangana", "rythu bandhu", "farmer", "state"],
    eligibility: "Pattadars (landholding farmers) in Telangana.",
    benefit: "₹10,000/acre/year (₹5,000 x 2 seasons).",
    ministry: "Government of Telangana",
    condition: (u) => u.state === "Telangana" && u.occupation === "farmer",
  },
  {
    id: 116,
    category: "senior",
    categoryLabel: "Senior Citizens",
    title: "Aasara Pension (Telangana)",
    description:
      "Monthly pension of ₹2,016-₹3,016 for old age, widows, single women, weavers, toddy tappers, AIDS patients and PwDs in Telangana.",
    documents: ["Aadhaar", "Age Proof", "Income Certificate", "Bank Account"],
    link: "https://aasara.telangana.gov.in/",
    priority: "high",
    tags: ["telangana", "aasara", "pension", "state"],
    eligibility: "Telangana residents in eligible categories.",
    benefit: "₹2,016-₹3,016/month.",
    ministry: "Government of Telangana",
    condition: (u) =>
      u.state === "Telangana" &&
      u.income < 200000 &&
      (u.age >= 57 || u.maritalStatus === "widowed" || u.differentlyAbled === true),
  },

  // WEST BENGAL
  {
    id: 117,
    category: "women",
    categoryLabel: "Women",
    title: "Lakshmir Bhandar (West Bengal)",
    description:
      "₹1,000-₹1,200 per month direct transfer to women aged 25-60 in West Bengal (₹1,000 for general, ₹1,200 for SC/ST).",
    documents: ["Aadhaar", "Swasthya Sathi Card / Voter ID", "Bank Account"],
    link: "https://socialsecurity.wb.gov.in/",
    priority: "high",
    tags: ["west bengal", "lakshmir bhandar", "women", "state"],
    eligibility: "Women aged 25-60 resident in West Bengal.",
    benefit: "₹1,000-₹1,200/month.",
    ministry: "Government of West Bengal",
    condition: (u) =>
      u.state === "West Bengal" && u.gender === "female" && u.age >= 25 && u.age <= 60,
  },
  {
    id: 118,
    category: "women",
    categoryLabel: "Women",
    title: "Kanyashree Prakalpa (West Bengal)",
    description:
      "Annual scholarship of ₹1,000 (K1) for girls aged 13-18 in school + one-time ₹25,000 (K2) at age 18 if unmarried and studying.",
    documents: ["Aadhaar", "School ID", "Bank Account", "Birth Certificate"],
    link: "https://wbkanyashree.gov.in/",
    priority: "high",
    tags: ["west bengal", "kanyashree", "girl", "state"],
    eligibility: "Unmarried girls aged 13-18 (K1) / 18-19 (K2) in WB schools/colleges.",
    benefit: "₹1,000/year + ₹25,000 lump-sum at 18.",
    ministry: "Government of West Bengal",
    condition: (u) =>
      u.state === "West Bengal" &&
      u.gender === "female" &&
      u.age >= 13 &&
      u.age <= 19 &&
      u.maritalStatus === "single",
  },

  // PUNJAB
  {
    id: 119,
    category: "women",
    categoryLabel: "Women",
    title: "Ashirwad Scheme (Punjab)",
    description:
      "One-time grant of ₹51,000 for marriage of girls from SC, OBC, EBC, Christian and other low-income communities in Punjab.",
    documents: ["Aadhaar", "Caste Certificate", "Income Proof", "Marriage Card", "Bank Account"],
    link: "https://welfarepunjab.gov.in/",
    priority: "medium",
    tags: ["punjab", "ashirwad", "marriage", "state"],
    eligibility: "Punjab girls from eligible communities, family income < ₹32,790/year.",
    benefit: "₹51,000 one-time grant.",
    ministry: "Government of Punjab",
    condition: (u) =>
      u.state === "Punjab" &&
      u.gender === "female" &&
      u.age >= 18 &&
      u.income < 200000,
  },

  // HARYANA
  {
    id: 120,
    category: "women",
    categoryLabel: "Women",
    title: "Mukhya Mantri Vivah Shagun Yojana (Haryana)",
    description:
      "Up to ₹71,000 financial assistance for marriage of girls from SC, BPL, widow, sportswoman and divyang families in Haryana.",
    documents: ["Aadhaar", "Income/BPL Certificate", "Caste Certificate", "Marriage Card"],
    link: "https://saralharyana.gov.in/",
    priority: "medium",
    tags: ["haryana", "vivah shagun", "marriage", "state"],
    eligibility: "Haryana girls aged 18+ from eligible categories.",
    benefit: "₹31,000-₹71,000 marriage grant.",
    ministry: "Government of Haryana",
    condition: (u) =>
      u.state === "Haryana" &&
      u.gender === "female" &&
      u.age >= 18 &&
      u.income < 300000,
  },

  // DELHI
  {
    id: 121,
    category: "health",
    categoryLabel: "Health",
    title: "Mohalla Clinic – Free OPD (Delhi)",
    description:
      "Free consultation, lab tests and 100+ essential medicines at neighbourhood Mohalla Clinics across Delhi.",
    documents: ["Any Photo ID"],
    link: "https://health.delhi.gov.in/",
    priority: "medium",
    tags: ["delhi", "mohalla clinic", "health", "state"],
    eligibility: "Anyone in Delhi.",
    benefit: "Free OPD + medicines + tests.",
    ministry: "Government of NCT of Delhi",
    condition: (u) => u.state === "Delhi",
  },
  {
    id: 122,
    category: "schemes",
    categoryLabel: "Welfare Schemes",
    title: "Free Electricity up to 200 Units (Delhi)",
    description:
      "Zero electricity bill for households consuming up to 200 units per month, 50% subsidy for 201-400 units in Delhi.",
    documents: ["Electricity Connection in own/family name"],
    link: "https://power.delhi.gov.in/",
    priority: "medium",
    tags: ["delhi", "electricity", "subsidy", "state"],
    eligibility: "Delhi households with domestic electricity connections opted-in.",
    benefit: "Up to ₹800/month savings.",
    ministry: "Government of NCT of Delhi",
    condition: (u) => u.state === "Delhi",
  },

  // KERALA
  {
    id: 123,
    category: "health",
    categoryLabel: "Health",
    title: "Karunya Arogya Suraksha Padhathi (Kerala)",
    description:
      "Free secondary and tertiary care up to ₹5 lakh per family per year at empanelled hospitals in Kerala.",
    documents: ["Aadhaar", "Ration Card", "KASP Card"],
    link: "https://sha.kerala.gov.in/",
    priority: "high",
    tags: ["kerala", "kasp", "health", "state"],
    eligibility: "Kerala residents in eligible household lists.",
    benefit: "₹5 lakh/year hospital cover.",
    ministry: "Government of Kerala",
    condition: (u) => u.state === "Kerala" && u.income < 500000,
  },

  // ODISHA
  {
    id: 124,
    category: "farmer",
    categoryLabel: "Farmer Support",
    title: "KALIA Yojana (Odisha)",
    description:
      "₹4,000 x 5 instalments (₹20,000) over two years for small/marginal farmers and ₹12,500 for landless agricultural labourers in Odisha.",
    documents: ["Aadhaar", "Land Records / Labour Card", "Bank Account"],
    link: "https://kalia.odisha.gov.in/",
    priority: "high",
    tags: ["odisha", "kalia", "farmer", "state"],
    eligibility: "Small/marginal farmers and agri labourers in Odisha.",
    benefit: "Up to ₹20,000 in cash support.",
    ministry: "Government of Odisha",
    condition: (u) =>
      u.state === "Odisha" &&
      (u.occupation === "farmer" || u.occupation === "daily_wage"),
  },
  {
    id: 125,
    category: "health",
    categoryLabel: "Health",
    title: "Biju Swasthya Kalyan Yojana (Odisha)",
    description:
      "Cashless treatment up to ₹5 lakh (₹10 lakh for women) per family per year at empanelled hospitals in Odisha and partner states.",
    documents: ["Aadhaar", "BSKY Card / Ration Card"],
    link: "https://www.bsky.odisha.gov.in/",
    priority: "high",
    tags: ["odisha", "bsky", "health", "state"],
    eligibility: "Odisha resident families.",
    benefit: "₹5-10 lakh/year cashless treatment.",
    ministry: "Government of Odisha",
    condition: (u) => u.state === "Odisha",
  },

  // GUJARAT
  {
    id: 126,
    category: "student",
    categoryLabel: "Education & Scholarships",
    title: "Mukhyamantri Yuva Swavalamban Yojana (Gujarat)",
    description:
      "Up to 50% tuition fee waiver and ₹10,000/year hostel/book allowance for higher education students in Gujarat with family income < ₹6 lakh.",
    documents: ["Aadhaar", "Domicile of Gujarat", "Income Certificate", "Mark Sheets", "Bank Account"],
    link: "https://mysy.guj.nic.in/",
    priority: "high",
    tags: ["gujarat", "mysy", "scholarship", "state"],
    eligibility: "Gujarat students in higher education, family income < ₹6 lakh.",
    benefit: "Tuition waiver + ₹10k allowance.",
    ministry: "Government of Gujarat",
    condition: (u) =>
      u.state === "Gujarat" &&
      u.occupation === "student" &&
      u.income < 600000,
  },

  // JHARKHAND
  {
    id: 127,
    category: "women",
    categoryLabel: "Women",
    title: "Mukhyamantri Maiya Samman Yojana (Jharkhand)",
    description:
      "₹2,500 per month direct transfer to women aged 18-50 in Jharkhand for economic empowerment of households.",
    documents: ["Aadhaar", "Ration Card", "Bank Account (Aadhaar-linked)"],
    link: "https://mmmsy.jharkhand.gov.in/",
    priority: "high",
    tags: ["jharkhand", "maiya samman", "women", "state"],
    eligibility: "Women aged 18-50 in Jharkhand from non-income-tax-paying families.",
    benefit: "₹2,500/month.",
    ministry: "Government of Jharkhand",
    condition: (u) =>
      u.state === "Jharkhand" &&
      u.gender === "female" &&
      u.age >= 18 &&
      u.age <= 50 &&
      u.income < 800000,
  },

  // CHHATTISGARH
  {
    id: 128,
    category: "women",
    categoryLabel: "Women",
    title: "Mahtari Vandana Yojana (Chhattisgarh)",
    description:
      "₹1,000 per month direct benefit transfer to married women aged 21+ in Chhattisgarh.",
    documents: ["Aadhaar", "Marriage Proof", "Bank Account"],
    link: "https://mahtarivandan.cgstate.gov.in/",
    priority: "high",
    tags: ["chhattisgarh", "mahtari vandana", "women", "state"],
    eligibility: "Married women aged 21+ in Chhattisgarh, non-income-tax payers.",
    benefit: "₹1,000/month.",
    ministry: "Government of Chhattisgarh",
    condition: (u) =>
      u.state === "Chhattisgarh" &&
      u.gender === "female" &&
      u.age >= 21 &&
      (u.maritalStatus === "married" || u.maritalStatus === "widowed" || u.maritalStatus === "divorced") &&
      u.income < 800000,
  },

  // ASSAM
  {
    id: 129,
    category: "women",
    categoryLabel: "Women",
    title: "Orunodoi Scheme (Assam)",
    description:
      "₹1,250 per month direct transfer to woman head-of-family in Assam from low-income households.",
    documents: ["Aadhaar", "Ration Card", "Bank Account"],
    link: "https://orunodoi.assam.gov.in/",
    priority: "high",
    tags: ["assam", "orunodoi", "women", "state"],
    eligibility: "Woman head-of-family in Assam, family income < ₹2 lakh.",
    benefit: "₹1,250/month.",
    ministry: "Government of Assam",
    condition: (u) =>
      u.state === "Assam" &&
      u.gender === "female" &&
      u.age >= 18 &&
      u.income < 200000,
  },
  {
    id: 130,
    category: "women",
    categoryLabel: "Women",
    title: "Arundhati Gold Scheme (Assam)",
    description:
      "One-time grant of 1 tola (~₹40,000) of gold for first marriage of girls in Assam from families earning < ₹5 lakh.",
    documents: ["Aadhaar", "Marriage Card", "Income Certificate", "Bank Account"],
    link: "https://revenueassam.nic.in/",
    priority: "low",
    tags: ["assam", "arundhati", "marriage", "state"],
    eligibility: "Brides aged 18+ in Assam, family income < ₹5 lakh, registered marriage.",
    benefit: "Gold worth ~₹40,000.",
    ministry: "Government of Assam",
    condition: (u) =>
      u.state === "Assam" &&
      u.gender === "female" &&
      u.age >= 18 &&
      u.age <= 30 &&
      u.income < 500000,
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

function isStateSpecific(a: ActionRecord, user: UserProfileInput): boolean {
  if (!user.state) return false;
  const s = user.state.toLowerCase();
  return (
    a.tags.some((t) => t.toLowerCase() === s) ||
    (a.eligibility?.toLowerCase().includes(s) ?? false) ||
    (a.ministry?.toLowerCase().includes(s) ?? false)
  );
}

export function recommend(user: UserProfileInput): ActionRecord[] {
  return ACTIONS.filter((a) => {
    try {
      return a.condition(user);
    } catch {
      return false;
    }
  }).sort((a, b) => {
    const aState = isStateSpecific(a, user) ? 0 : 1;
    const bState = isStateSpecific(b, user) ? 0 : 1;
    if (aState !== bState) return aState - bState;
    return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  });
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
