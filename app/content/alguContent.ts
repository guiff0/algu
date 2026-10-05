export type ContentCard = { title: string; body: string }
export type ContentSection = {
  heading: string
  layout: "cards" | "list"
  items: ContentCard[]
}
export type ContentPage = {
  key: string
  kicker: string
  title: string
  intro: string
  sections: ContentSection[]
  /** Optional call-to-action button shown under the intro (e.g. capabilities statement download). */
  cta?: { label: string; url: string }
}

export const TOP_NAV = [
  { label: "Home", route: "alguHome" as const },
  { label: "Government", route: "alguGovernment" as const },
  { label: "Products", route: "alguProducts" as const },
  { label: "Services", route: "alguServices" as const },
  { label: "Learn", route: "alguLearn" as const },
  { label: "Technologies", route: "alguTechnologies" as const },
  { label: "Industries", route: "alguIndustries" as const },
  { label: "Departments", route: "alguDepartments" as const },
  { label: "About Us", route: "alguAbout" as const },
  { label: "Careers", route: "alguCareers" as const },
  { label: "Contact Us", route: "alguContact" as const },
]

export const LEFT_MENU = [
  { label: "Quantum Machine Learning", pageKey: "services", anchor: "Quantum Machine Learning (QML)" },
  { label: "Quantum Optimization", pageKey: "services", anchor: "Quantum Optimization" },
  { label: "Quantum Simulation", pageKey: "services", anchor: "Quantum Simulation" },
  { label: "Quantum Security", pageKey: "services", anchor: "Quantum Security" },
  { label: "QPU Design", pageKey: "products", anchor: "algu QPU Series" },
  { label: "QPU Manufacturing", pageKey: "services", anchor: "QPU Custom Engineering" },
  { label: "Cryogenic Systems", pageKey: "products", anchor: "algu Cryogenic Control Systems" },
  { label: "Quantum Cloud Integration", pageKey: "services", anchor: "Quantum Cloud Integration" },
  { label: "Micro-Nuclear Reactor Data Centers", pageKey: "products", anchor: "algu Micro-Nuclear Reactor (MMR) Power Module" },
  { label: "Enterprise Architecture", pageKey: "departments", anchor: "Enterprise Solutions Division" },
  { label: "Compliance & Security", pageKey: "departments", anchor: "Corporate Administration" },
]

export const HOME_CONTENT = {
  eyebrow: "GOVERNMENT • QUANTUM • AI • CYBERSECURITY",
  headline: "Quantum, AI, and cybersecurity engineering for government missions.",
  body: "ALGU Co. (DBA algu) delivers quantum systems, artificial intelligence, cybersecurity, software engineering, and advanced hardware integration to federal, state, and local government customers, as a prime contractor and as a specialty teaming partner. This website, our one-page capabilities statement, and our company profile are built to give contracting officers what they need to screen a vendor quickly.",
  subBody:
    "From post-quantum cryptography readiness and AI-enabled analytics to mobile and cloud modernization, every engagement is scoped by Enterprise Solutions against a signed statement of work and the compliance requirements of the contract.",
  contactEmail: "algu@algu.net",
  highlights: [
    { title: "7", label: "Core Divisions" },
    { title: "9", label: "Target NAICS Codes" },
    { title: "6", label: "Industries Served" },
  ],
}

/**
 * Public contracting profile. Values below are shown on the Government page,
 * the home page, and should match your SAM.gov entity record exactly.
 * Empty strings / arrays are hidden automatically, so nothing is ever
 * displayed that you have not filled in. Fill these from SAM.gov:
 */
export const GOV_PROFILE = {
  legalName: "ALGU Co.",
  dba: "algu",
  stateEntity: "North Carolina Business Corporation (Domestic), No. 1617133, Current Active",
  address: "2321 Dundeen St., Charlotte, NC 28216, United States",
  email: "algu@algu.net",
  website: "https://algu.net",
  capabilitiesStatementUrl: "https://algu.net/algu-capabilities-statement.pdf",
  phone: "",
  uei: "",
  cageCode: "",
  samStatus: "",
  businessSize: "",
  socioeconomicStatus: [] as string[],
  certifications: [] as string[],
}

export const NAICS_CODES = [
  { code: "541511", title: "Custom Computer Programming Services", note: "Custom software, mobile, and AI application development" },
  { code: "541512", title: "Computer Systems Design Services", note: "Systems architecture, integration, and cybersecurity design" },
  { code: "541513", title: "Computer Facilities Management Services", note: "Operations support for data centers and HPC environments" },
  { code: "541519", title: "Other Computer Related Services", note: "Post-quantum cryptography assessment and migration support" },
  { code: "518210", title: "Computing Infrastructure Providers, Data Processing, Web Hosting, and Related Services", note: "Cloud, data, and hybrid HPC platforms" },
  { code: "541715", title: "R&D in the Physical, Engineering, and Life Sciences (except Nanotechnology and Biotechnology)", note: "Quantum algorithms, materials, and photonics research" },
  { code: "541330", title: "Engineering Services", note: "QPU, cryogenic, and control-system engineering" },
  { code: "541690", title: "Other Scientific and Technical Consulting Services", note: "Quantum readiness and technology assessments" },
  { code: "541618", title: "Other Management Consulting Services", note: "Technology strategy and program support" },
]

/** Government technology demand areas mapped to ALGU capability. Also feeds the home page. */
export const GOV_OPPORTUNITIES: ContentCard[] = [
  { title: "Artificial Intelligence & Machine Learning", body: "Agencies are scaling AI for analytics, document processing, decision support, and defense applications, and FY2027 budget requests carry large AI lines. ALGU builds and secures ML pipelines, anomaly-detection models, and data-readiness programs, including quantum-enhanced ML research." },
  { title: "Cybersecurity & Zero Trust", body: "Zero trust, continuous monitoring, and security automation remain among the most consistently funded federal IT categories, and defense cybersecurity certification (CMMC) requirements keep expanding. ALGU supports threat detection, identity and access architecture, secure-by-design software, and readiness assessments." },
  { title: "Post-Quantum Cryptography Migration", body: "Federal policy now directs agencies to move high-value systems to quantum-resistant cryptography, with key-establishment and digital-signature milestones in 2030 and 2031, and procurement language is starting to follow. ALGU provides cryptographic inventory, crypto-agility design, migration planning, and PQC-ready software engineering." },
  { title: "Quantum Computing R&D & Applications", body: "DOE, DARPA, NSF, and DoD research programs fund quantum algorithms, simulation, and hybrid quantum-classical workflows, often through SBIR/STTR and broad agency announcements. ALGU contributes QML, optimization, and simulation research plus QPU and control-system engineering." },
  { title: "Custom Software, Mobile & DevSecOps", body: "Agencies continue to replace legacy systems with modular, agile-delivered applications and digital-first public services. ALGU delivers custom web and mobile applications, APIs, and secure CI/CD pipelines." },
  { title: "Cloud, Data & HPC Modernization", body: "Cloud optimization is moving toward AI-ready, cloud-native architectures with data platforms as the foundation. ALGU designs cloud and hybrid HPC environments across Azure, AWS, and IBM Quantum, and builds the data pipelines beneath analytics and AI." },
  { title: "IT Infrastructure & Resilient Data Centers", body: "Mission compute needs dense, resilient power, cooling, and long-term operations support. ALGU engineers data-center and HPC architecture, cryogenic and power systems, and sustainment through Operations & Infrastructure." },
  { title: "Advanced Hardware & Systems Engineering", body: "Defense and science customers need prototype hardware, control electronics, and integration expertise. ALGU designs, tests, and integrates custom quantum processors, RF/microwave control, and cryogenic systems." },
  { title: "Technology Consulting & Program Support", body: "Agencies buy roadmaps, readiness assessments, and program-management support alongside delivery. ALGU's Enterprise Solutions division provides architecture design, proofs of concept, and technical program support." },
]

export const WHY_US = [
  { title: "Full-stack ownership", body: "Software, custom silicon, cryogenics, and power infrastructure engineered as one system, not assembled from unrelated vendors." },
  { title: "Power independence", body: "The MMR Power Module removes grid dependency as a scaling constraint — a problem most quantum providers don't own the solution to." },
  { title: "Five QPU architectures", body: "Superconducting, photonic, trapped-ion, spin, and topological — hardware matched to the workload, not the other way around." },
  { title: "Engagement-scoped delivery", body: "Every service runs against a signed statement of work through Enterprise Solutions, not generic self-serve access." },
  { title: "Quantum-safe by default", body: "Quantum-resistant cryptography applied across client engagements and algu's own infrastructure alike." },
  { title: "Seven specialized divisions", body: "From algorithm research to nuclear-powered facility operations — the right team owns each part of an engagement." },
]

export const TRUST_SIGNALS = [
  { title: "Registered entity", body: "ALGU Co., Company Number 1617133 — Business Corporation, North Carolina, Status: Current Active." },
  { title: "NRC-compliant partners", body: "MMR reactor cores, shielding, and safety systems delivered through NRC-compliant nuclear engineering partners." },
  { title: "Governance oversight", body: "Export-control and data-handling compliance review on every client engagement — see Corporate Governance." },
  { title: "Quantum-safe security", body: "Quantum-resistant cryptography and access controls applied to client data and internal systems." },
]


export const PAGES: Record<string, ContentPage> = {
  products: {
    key: "products",
    kicker: "PRODUCTS",
    title: "Quantum Products Portfolio",
    intro:
      "A full product line spanning software, custom silicon, cryogenic hardware, and the power infrastructure to run it all on-site — designed so a client can adopt one product or the entire stack without re-platforming later. Every product below is built to interoperate: the QML Suite runs on QPU Series hardware, which is controlled through the Cryogenic Control Systems, which are powered and housed inside the Quantum Data Center Platform.",
    sections: [
      {
        heading: "Portfolio",
        layout: "cards",
        items: [
          {
            title: "algu QML Suite",
            body: "Quantum-enhanced machine learning platform for predictive analytics, anomaly detection, and high-dimensional modeling. Ships as a hybrid pipeline: classical preprocessing and orchestration on standard infrastructure, with quantum kernels and variational circuits handling the parts of the workload where they outperform classical methods — pattern recognition in very high-dimensional or highly correlated data.",
          },
          {
            title: "algu QPU Series",
            body: "Custom-engineered Quantum Processing Units across five architectures — Superconducting QPU-X, Photonic QPU-P, Trapped-Ion QPU-I, Spin-Qubit QPU-S, and the fault-tolerant Topological QPU-T — so the underlying hardware can be matched to the workload's coherence, connectivity, and scale requirements instead of forcing every client onto one modality.",
          },
          {
            title: "algu Cryogenic Control Systems",
            body: "Pulse-level control electronics, RF/microwave systems, and cryogenic infrastructure that keep QPUs at operating temperature and drive gate operations with the timing precision quantum algorithms depend on. Sold standalone for clients integrating third-party QPUs, or bundled with the QPU Series.",
          },
          {
            title: "algu Micro-Nuclear Reactor (MMR) Power Module",
            body: "A 20–50 MW modular reactor built specifically to power quantum campuses, decoupling mission-critical compute from grid instability. Removes the single largest constraint on scaling a quantum data center: continuous, zero-interruption power at the density cryogenic systems require.",
          },
          {
            title: "algu Quantum Data Center Platform",
            body: "The facility layer that ties everything together — quantum-ready power distribution, cryogenic plant, and high-density compute racks engineered as one integrated system rather than retrofit into a conventional data center.",
          },
        ],
      },
      {
        heading: "How the portfolio fits together",
        layout: "list",
        items: [
          {
            title: "Start anywhere",
            body: "Clients typically start with the QML Suite (software-only) or a QPU Series engagement, then expand into Cryogenic Control Systems and the Data Center Platform as workloads scale past what a shared cloud QPU allocation can support.",
          },
          {
            title: "Own the full stack, or just a layer",
            body: "Every product is available standalone. A client running third-party QPUs can still adopt algu's Cryogenic Control Systems or MMR power module without buying into the full portfolio.",
          },
        ],
      },
    ],
  },
  services: {
    key: "services",
    kicker: "SERVICES",
    title: "Enterprise Quantum Services",
    intro:
      "From algorithm design through deployed, compliant infrastructure — algu's services exist to de-risk the gap between 'quantum computing could help here' and a workload actually running in production. Every engagement is scoped by Enterprise Solutions, staffed from the relevant division, and delivered against a signed statement of work.",
    sections: [
      {
        heading: "What we run for clients",
        layout: "cards",
        items: [
          {
            title: "Quantum Machine Learning (QML)",
            body: "Hybrid quantum-classical pipelines using quantum kernels, variational circuits, and QNNs — built where classical ML plateaus on very high-dimensional or densely correlated data, such as multi-factor risk models or genomic pattern recognition.",
          },
          {
            title: "Quantum Optimization",
            body: "QAOA-based optimization for finance, logistics, manufacturing, and energy — applied to combinatorial problems (routing, scheduling, portfolio allocation) where the solution space grows too fast for classical solvers to search exhaustively.",
          },
          {
            title: "Quantum Simulation",
            body: "Molecular modeling, materials science, climate systems, and physics simulations — used where the system being modeled is itself quantum mechanical, so a quantum simulator represents it more directly than a classical approximation.",
          },
          {
            title: "Quantum Security",
            body: "Quantum-resistant cryptography, QKD, and quantum threat detection — built for organizations that need to start migrating before quantum computers capable of breaking current public-key cryptography exist, not after.",
          },
          {
            title: "Quantum Cloud Integration",
            body: "Azure Quantum, AWS Braket, IBM Quantum, and hybrid HPC + QPU orchestration — for clients who want quantum capability without owning QPU hardware, or who need to burst from an on-prem algu QPU to cloud capacity during peak load.",
          },
          {
            title: "QPU Custom Engineering",
            body: "Design, fabrication, testing, and deployment of custom quantum processors — for clients whose workload characteristics justify hardware built to their exact coherence, connectivity, or form-factor requirements rather than an off-the-shelf QPU.",
          },
          {
            title: "Nuclear-Powered Data Center Deployment",
            body: "MMR integration, safety systems, compliance, and facility architecture — the full path from site assessment through a commissioned, NRC-compliant, quantum-ready campus.",
          },
        ],
      },
      {
        heading: "How an engagement runs",
        layout: "list",
        items: [
          { title: "1. Readiness assessment", body: "Enterprise Solutions evaluates whether the workload has a genuine quantum advantage before recommending a build." },
          { title: "2. Proof of concept", body: "A scoped PoC validates the approach against real (or representative) client data before committing to production build-out." },
          { title: "3. Production deployment", body: "The relevant division — Quantum Engineering, Quantum Software, or Advanced Energy Systems — delivers and hands off to Operations & Infrastructure." },
        ],
      },
    ],
  },
  technologies: {
    key: "technologies",
    kicker: "TECHNOLOGIES",
    title: "Core Technology Stack",
    intro:
      "The layers underneath every algu engagement, from algorithm to reactor. Each layer is chosen for a specific job in the stack — algorithmic techniques for extracting quantum advantage, cloud integrations for reaching third-party QPUs, and physical infrastructure for running owned hardware at scale.",
    sections: [
      {
        heading: "Algorithms & models",
        layout: "list",
        items: [
          { title: "Quantum Kernels & SVMs", body: "Classical support-vector methods with a quantum-computed kernel, used where the feature space is too high-dimensional for classical kernels to separate efficiently." },
          { title: "Variational Quantum Circuits (VQC)", body: "Parameterized circuits trained with classical optimizers — the workhorse architecture behind most near-term QML and optimization work." },
          { title: "Quantum Neural Networks (QNN)", body: "Circuit-based analogues to classical neural network layers, composed into hybrid quantum-classical models." },
          { title: "Quantum Approximate Optimization Algorithms (QAOA)", body: "The core algorithm behind algu's optimization service line, mapping combinatorial problems onto near-term hardware." },
          { title: "Hybrid Quantum-Classical Transformers", body: "Transformer architectures with quantum-computed attention or embedding layers, used in select QML Suite deployments." },
        ],
      },
      {
        heading: "Cloud & integration",
        layout: "list",
        items: [
          { title: "Azure Quantum Integration", body: "Direct orchestration against Azure Quantum's hardware partners for clients standardized on Microsoft's cloud." },
          { title: "Quantum cloud orchestration", body: "A common orchestration layer across Azure Quantum, AWS Braket, and IBM Quantum, so workloads aren't locked to one cloud QPU provider." },
          { title: "High-performance classical compute", body: "The classical HPC layer every hybrid workload runs alongside — pre/post-processing, orchestration, and the parts of a pipeline that don't benefit from quantum execution." },
        ],
      },
      {
        heading: "Hardware & infrastructure",
        layout: "list",
        items: [
          { title: "Cryogenic systems (10–20 mK)", body: "The operating temperature range algu's superconducting and spin-qubit QPUs require, maintained by dilution refrigeration." },
          { title: "Micro-Nuclear Reactor Systems", body: "20–50 MW modular reactors purpose-built to power cryogenic HPC facilities without grid dependency." },
          { title: "Quantum-safe cryptography", body: "Post-quantum cryptographic standards implemented across both client-facing security services and algu's own infrastructure." },
        ],
      },
    ],
  },
  industries: {
    key: "industries",
    kicker: "INDUSTRIES",
    title: "Industry Solutions",
    intro:
      "Domain-specific applications of the same underlying quantum stack. algu doesn't build separate technology per industry — the QML, optimization, simulation, and security service lines are applied to whichever combinatorial, high-dimensional, or cryptographic problem a given industry actually has.",
    sections: [
      {
        heading: "Where algu operates",
        layout: "cards",
        items: [
          {
            title: "Financial Services & Trading",
            body: "Risk analytics, pricing models, fraud detection, and portfolio optimization — typically QAOA-based portfolio allocation and QML-based fraud pattern detection, where the combinatorial search space or feature dimensionality exceeds what classical solvers handle in the time a trading desk has.",
          },
          {
            title: "Healthcare & Life Sciences",
            body: "Diagnostics, drug discovery, genomic pattern recognition, and medical imaging — quantum simulation for molecular modeling in drug discovery, and QML for genomic and imaging pattern recognition at a resolution classical ML struggles to match.",
          },
          {
            title: "Cybersecurity & Threat Intelligence",
            body: "Quantum-resistant encryption, anomaly detection, and threat modeling — migrating cryptographic infrastructure ahead of quantum-capable adversaries, paired with QML-based anomaly detection across network telemetry.",
          },
          {
            title: "Manufacturing & Logistics",
            body: "Routing, scheduling, predictive maintenance, and supply-chain forecasting — QAOA-based routing and scheduling across multi-site operations, where the number of feasible configurations grows combinatorially with fleet or facility count.",
          },
          {
            title: "Energy & Climate Science",
            body: "Materials modeling, grid optimization, and climate simulation — quantum simulation of materials for next-generation energy storage, and optimization applied to grid load-balancing.",
          },
          {
            title: "Government & Defense",
            body: "Secure communications, advanced simulation, and strategic analytics — quantum-safe communications infrastructure and simulation-driven strategic modeling, delivered under the compliance framework in Corporate Governance.",
          },
        ],
      },
    ],
  },
  departments: {
    key: "departments",
    kicker: "DEPARTMENTS",
    title: "Corporate Structure",
    intro:
      "Seven divisions covering hardware, software, energy, and delivery — structured so a client engagement flows through exactly the divisions its scope requires, from Enterprise Solutions' initial assessment through to Operations & Infrastructure's long-term facility support.",
    sections: [
      {
        heading: "Divisions",
        layout: "cards",
        items: [
          { title: "Quantum Engineering Division", body: "QPU design, fabrication, cryogenic systems, and quantum control electronics — owns everything in the QPU Series and Cryogenic Control Systems products." },
          { title: "Quantum Software Division", body: "QML, optimization, simulation, security, and cloud integration — owns the QML Suite and every service line built on top of it." },
          { title: "Advanced Energy Systems Division", body: "Micro-nuclear reactor engineering, safety systems, and facility integration — owns the MMR Power Module and its NRC-compliant deployment." },
          { title: "Enterprise Solutions Division", body: "Architecture design, consulting, PoCs, deployment, and compliance — the client-facing division that scopes engagements and coordinates the others." },
          { title: "Research & Innovation Lab", body: "Quantum algorithms, materials science, photonics, and superconducting research — the division that feeds new capability into the product portfolio." },
          { title: "Operations & Infrastructure", body: "Data centers, HPC clusters, and nuclear-powered quantum campuses — owns long-term operation once Engineering and Energy Systems hand off a completed build." },
          { title: "Corporate Administration", body: "Legal, finance, HR, compliance, and governance — see Corporate Governance for how this division oversees engagements involving export control and nuclear-adjacent work." },
        ],
      },
      {
        heading: "How an engagement moves through the divisions",
        layout: "list",
        items: [
          { title: "Enterprise Solutions", body: "Scopes the engagement and determines which divisions it needs." },
          { title: "Quantum Engineering / Quantum Software / Advanced Energy Systems", body: "Deliver the hardware, software, or power infrastructure the engagement requires." },
          { title: "Operations & Infrastructure", body: "Takes over long-term operation once a build is commissioned." },
        ],
      },
    ],
  },
  about: {
    key: "about",
    kicker: "ABOUT US",
    title: "ALGU Co. (DBA algu)",
    intro:
      "Mission: to engineer and deliver next-generation technology solutions for government and enterprise customers, with specialization in quantum systems, artificial intelligence, cybersecurity, IT infrastructure, software engineering, and advanced hardware integration. ALGU Co. operates under the algu trade name across every product and service line described on this site, and the public website is designed to give contracting officers, procurement teams, and partners a clear view of the company, capabilities statement, and leadership profile.",
    sections: [
      {
        heading: "Corporate identity",
        layout: "list",
        items: [
          { title: "Company Name", body: "ALGU Co." },
          { title: "Doing Business As", body: "algu" },
          { title: "Company Number", body: "1617133" },
          { title: "Status", body: "Current Active" },
          { title: "Company Type", body: "Business Corporation – Domestic" },
          { title: "Jurisdiction", body: "North Carolina, United States" },
          { title: "Registered Address", body: "2321 Dundeen St., Charlotte, NC 28216, United States" },
          { title: "Registered Agent", body: "Guiffo, Alex — 2321 Dundeen St., Charlotte, NC 28216, United States" },
          { title: "Directors / Officers", body: "4 officers on file" },
          { title: "Public website", body: "https://algu.net — the public-facing company profile for government buyers, contracting officers, and technology partners." },
          { title: "Capabilities statement", body: "Available on request for procurement, bid review, and partnership conversations; contact algu@algu.net to request the current capabilities brief, core competencies, and supporting documentation." },
          { title: "Government contracting focus", body: "algu is positioned to support federal, state, and local government opportunities in quantum technologies, AI, cybersecurity, software engineering, enterprise IT, and hardware integration." },
          { title: "SAM / vendor profile readiness", body: "ALGU Co. maintains a clear company profile with legal identity, leadership, and operating information that supports procurement review and vendor due diligence." },
        ],
      },
      {
        heading: "What sets algu apart",
        layout: "list",
        items: [
          { title: "Full-stack ownership", body: "Software, custom silicon, cryogenics, and power infrastructure engineered as one system rather than assembled from unrelated vendors." },
          { title: "Power independence", body: "The MMR Power Module removes grid dependency as a scaling constraint — a problem most quantum computing providers don't own the solution to." },
          { title: "Engagement-scoped delivery", body: "Every service is delivered against a signed statement of work through Enterprise Solutions, not sold as generic self-serve access." },
        ],
      },
      {
        heading: "Vision",
        layout: "list",
        items: [
          {
            title: "Vision",
            body: "A world where quantum computing, advanced energy systems, and AI converge to solve humanity's most complex challenges.",
          },
        ],
      },
    ],
  },
  government: {
    key: "government",
    kicker: "GOVERNMENT CONTRACTING",
    title: "Government Contracting Profile",
    intro:
      "ALGU Co. (DBA algu) supplies quantum, AI, cybersecurity, software, and advanced-systems engineering to federal, state, and local government customers, as a prime contractor and as a specialty subcontractor to larger integrators. This page gives contracting officers and capture teams the facts they screen first: who we are, what we do, which NAICS codes we operate under, and how to reach us. The one-page capabilities statement is available to download below.",
    cta: { label: "Download Capabilities Statement (PDF)", url: GOV_PROFILE.capabilitiesStatementUrl },
    sections: [
      {
        heading: "Company data",
        layout: "list",
        items: [
          { title: "Legal name", body: GOV_PROFILE.legalName },
          { title: "Doing business as", body: GOV_PROFILE.dba },
          { title: "State registration", body: GOV_PROFILE.stateEntity },
          { title: "Address", body: GOV_PROFILE.address },
          { title: "Website", body: GOV_PROFILE.website },
          { title: "Email", body: GOV_PROFILE.email },
          ...(GOV_PROFILE.phone ? [{ title: "Phone", body: GOV_PROFILE.phone }] : []),
          ...(GOV_PROFILE.uei ? [{ title: "Unique Entity ID (UEI)", body: GOV_PROFILE.uei }] : []),
          ...(GOV_PROFILE.cageCode ? [{ title: "CAGE code", body: GOV_PROFILE.cageCode }] : []),
          ...(GOV_PROFILE.samStatus ? [{ title: "SAM.gov status", body: GOV_PROFILE.samStatus }] : []),
          ...(GOV_PROFILE.businessSize ? [{ title: "Business size", body: GOV_PROFILE.businessSize }] : []),
          ...(GOV_PROFILE.socioeconomicStatus.length ? [{ title: "Socioeconomic status", body: GOV_PROFILE.socioeconomicStatus.join(", ") }] : []),
          ...(GOV_PROFILE.certifications.length ? [{ title: "Certifications", body: GOV_PROFILE.certifications.join(", ") }] : []),
        ],
      },
      {
        heading: "Technology contract opportunity areas",
        layout: "cards",
        items: GOV_OPPORTUNITIES,
      },
      {
        heading: "NAICS codes",
        layout: "list",
        items: NAICS_CODES.map((n) => ({ title: `${n.code} · ${n.title}`, body: n.note })),
      },
      {
        heading: "Contract pathways",
        layout: "list",
        items: [
          { title: "Prime contracts", body: "Open solicitations on SAM.gov, simplified acquisitions, and agency small-purchase and challenge-based buys." },
          { title: "Subcontracting and teaming", body: "Specialty quantum, AI, and cybersecurity work under larger integrators. ALGU welcomes teaming inquiries from prime contractors." },
          { title: "Research and development programs", body: "SBIR/STTR, broad agency announcements, and agency research solicitations in quantum, AI, and cybersecurity, when open." },
          { title: "Schedules and governmentwide vehicles", body: "Pursued directly or through teaming, for example GSA Multiple Award Schedule IT categories (including SIN 54151S IT professional services and 54151HACS cybersecurity) and small-business GWACs. Any vehicle ALGU holds is listed on the capabilities statement." },
          { title: "State and local government", body: "State and municipal procurement portals and cooperative-purchasing contracts, starting with North Carolina." },
        ],
      },
      {
        heading: "Compliance and readiness",
        layout: "list",
        items: [
          { title: "Registration", body: "Federal vendors must be registered in SAM.gov. UEI, CAGE code, and registration status are listed under Company data when published, and are available on request at algu@algu.net." },
          { title: "Cybersecurity requirements", body: "Engagements are planned against NIST SP 800-171 and CMMC expectations where a contract flows them down. Any certification status is stated on the capabilities statement and never implied." },
          { title: "Export control", body: "Quantum and nuclear-adjacent work receives export-control review before engagement. See Corporate Governance." },
          { title: "Ethics and conflicts of interest", body: "Conflict-of-interest disclosure is required for all government and defense engagements. See Corporate Governance." },
        ],
      },
      {
        heading: "How to engage",
        layout: "list",
        items: [
          { title: "Request a capability briefing", body: "Email algu@algu.net with the solicitation number or program area and we will respond with a tailored capability summary." },
          { title: "Teaming and subcontracting inquiries", body: "Prime contractors can contact Enterprise Solutions at algu@algu.net to discuss teaming agreements and specialty subcontract scope." },
        ],
      },
    ],
  },
  contact: {
    key: "contact",
    kicker: "CONTACT US",
    title: "Corporate Contact",
    intro:
      "algu@algu.net · https://algu.net · 2321 Dundeen St., Charlotte, NC 28216, USA — for federal, state, and local government opportunities, prime contractor collaboration, and new business inquiries, contact Enterprise Solutions directly. A current capabilities statement is available on request for procurement review, proposal qualification, and contracting conversations.",
    sections: [],
  },
  leadership: {
    key: "leadership",
    kicker: "COMPANY",
    title: "Leadership",
    intro:
      "ALGU Co. is led by its founder alongside division heads across engineering, software, energy, and enterprise delivery. Full officer and director disclosures are on file with the North Carolina Secretary of State.",
    sections: [
      {
        heading: "Executive",
        layout: "list",
        items: [
          { title: "Alex Guiffo", body: "Founder & Managing Director; Registered Agent" },
        ],
      },
      {
        heading: "Division leadership",
        layout: "list",
        items: [
          { title: "Quantum Engineering Division", body: "QPU design, fabrication, cryogenic systems" },
          { title: "Quantum Software Division", body: "QML, optimization, simulation, security" },
          { title: "Advanced Energy Systems Division", body: "Micro-nuclear reactor engineering" },
          { title: "Enterprise Solutions Division", body: "Architecture, consulting, deployment" },
          { title: "Research & Innovation Lab", body: "Quantum algorithms, materials science, photonics" },
          { title: "Operations & Infrastructure", body: "Data centers, HPC clusters, quantum campuses" },
          { title: "Corporate Administration", body: "Legal, finance, HR, compliance, governance" },
        ],
      },
    ],
  },
  legal: {
    key: "legal",
    kicker: "COMPANY",
    title: "Legal Information",
    intro:
      "ALGU Co. is a registered Business Corporation operating under the trade name algu. This page summarizes the entity's registration status and standard legal terms; contact algu@algu.net for formal documentation requests.",
    sections: [
      {
        heading: "Registered entity",
        layout: "list",
        items: [
          { title: "Company Name", body: "ALGU Co." },
          { title: "Doing Business As", body: "algu" },
          { title: "Company Number", body: "1617133" },
          { title: "Status", body: "Current Active" },
          { title: "Company Type", body: "Business Corporation – Domestic" },
          { title: "Jurisdiction", body: "North Carolina, United States" },
          { title: "Registered Address", body: "2321 Dundeen St., Charlotte, NC 28216, United States" },
          { title: "Registered Agent", body: "Guiffo, Alex" },
        ],
      },
      {
        heading: "Terms summary",
        layout: "list",
        items: [
          {
            title: "Use of services",
            body: "Engagements with ALGU Co./algu are governed by a signed statement of work or master services agreement; no work is performed outside an agreed contract.",
          },
          {
            title: "Confidentiality",
            body: "Client data, designs, and deployment details are treated as confidential and are not disclosed to third parties without written consent.",
          },
          {
            title: "Intellectual property",
            body: "Custom QPU designs and software delivered under contract are licensed or assigned per the terms of the specific engagement agreement.",
          },
        ],
      },
    ],
  },
  governance: {
    key: "governance",
    kicker: "COMPANY",
    title: "Corporate Governance",
    intro:
      "Governance at ALGU Co. spans regulatory compliance for both quantum technology exports and nuclear-adjacent engineering work, overseen by Corporate Administration.",
    sections: [
      {
        heading: "Governance framework",
        layout: "list",
        items: [
          { title: "Compliance oversight", body: "Corporate Administration division; export control and data-handling compliance review on all client engagements." },
          { title: "Safety review", body: "Independent safety review of MMR (micro-modular reactor) integration work, coordinated with NRC-compliant engineering partners." },
          { title: "Security practices", body: "Quantum-safe cryptography and access controls applied to client data and internal systems." },
          { title: "Ethics", body: "Conflict-of-interest disclosure required for all engagements involving government or defense clients." },
        ],
      },
    ],
  },
  documentation: {
    key: "documentation",
    kicker: "RESOURCES",
    title: "Documentation",
    intro:
      "Technical documentation for algu platforms and APIs. Full developer docs are provided under active client engagements — reach out at algu@algu.net for access.",
    sections: [
      {
        heading: "Documentation areas",
        layout: "cards",
        items: [
          { title: "algu QML Suite", body: "Pipeline configuration, model deployment, and integration guides." },
          { title: "QPU Series", body: "Device specifications, control electronics interfaces, and calibration procedures." },
          { title: "Quantum Cloud Integration", body: "Setup guides for Azure Quantum, AWS Braket, and IBM Quantum connectivity." },
          { title: "Security & Compliance", body: "Quantum-safe cryptography implementation and compliance documentation." },
        ],
      },
    ],
  },
  "api-access": {
    key: "api-access",
    kicker: "RESOURCES",
    title: "API Access",
    intro:
      "API access to algu's QML and cloud orchestration platforms is provisioned per client engagement, not self-serve — this keeps access scoped to contracted workloads and compliance requirements.",
    sections: [
      {
        heading: "Requesting access",
        layout: "list",
        items: [
          { title: "1. Engagement setup", body: "API access is scoped during onboarding as part of your statement of work." },
          { title: "2. Credential issuance", body: "Enterprise Solutions issues scoped API keys and connection details for your environment." },
          { title: "3. Integration support", body: "Documentation and direct support are provided through the engagement's assigned technical contact." },
        ],
      },
    ],
  },
  whitepapers: {
    key: "whitepapers",
    kicker: "RESOURCES",
    title: "Whitepapers",
    intro: "Technical perspectives from algu's engineering and research teams.",
    sections: [
      {
        heading: "Available whitepapers",
        layout: "cards",
        items: [
          { title: "Hybrid Quantum-Classical Pipelines for Enterprise QML", body: "Architecture patterns for combining variational circuits with classical ML at production scale." },
          { title: "Powering Quantum Campuses with Micro-Modular Reactors", body: "Engineering considerations for pairing MMR power modules with cryogenic HPC facilities." },
          { title: "Quantum-Resistant Cryptography: A Migration Framework", body: "A practical path for enterprises moving from classical to quantum-safe cryptographic standards." },
          { title: "Benchmarking QPU Architectures for Financial Risk Modeling", body: "Comparative performance considerations across superconducting, photonic, and trapped-ion QPUs." },
        ],
      },
    ],
  },
  "case-studies": {
    key: "case-studies",
    kicker: "RESOURCES",
    title: "Case Studies",
    intro:
      "Illustrative engagement profiles showing how algu's stack applies across industries. These are representative scenarios based on our service lines, not disclosures of specific client identities or results.",
    sections: [
      {
        heading: "Representative engagements",
        layout: "cards",
        items: [
          { title: "Financial Services — Portfolio Optimization", body: "QAOA-based optimization applied to a multi-asset portfolio rebalancing workflow, illustrating typical scope for a trading-desk engagement." },
          { title: "Healthcare — Genomic Pattern Recognition", body: "QML-assisted pattern recognition integrated into an existing genomic analysis pipeline as a proof-of-concept engagement." },
          { title: "Manufacturing — Predictive Maintenance", body: "Quantum-enhanced scheduling and predictive maintenance modeling for a multi-site production network." },
          { title: "Energy — Grid Optimization", body: "Quantum simulation applied to grid load-balancing scenarios for a regional energy provider engagement." },
        ],
      },
    ],
  },
  newsroom: {
    key: "newsroom",
    kicker: "RESOURCES",
    title: "Newsroom",
    intro:
      "Company announcements and press coverage will be posted here as they're published. Media inquiries: algu@algu.net.",
    sections: [],
  },
  learn: {
    key: "learn",
    kicker: "LEARN",
    title: "Quantum ML & Research",
    intro:
      "A working map of the quantum machine learning techniques algu applies in client engagements — from foundational tutorials through the finance-specific models our Quantum Engagement research group builds on most often.",
    sections: [
      {
        heading: "Applied Quantum ML",
        layout: "cards",
        items: [
          { title: "Quantum ML for Anomaly Detection", body: "Quantum kernel methods applied to flagging outliers in network telemetry, transaction streams, and sensor data at a resolution classical models miss." },
          { title: "Quantum Optimization", body: "QAOA-based approaches to combinatorial problems — routing, scheduling, allocation — where the feasible-solution space grows too fast for classical solvers." },
          { title: "Practical QML Tutorials", body: "Hands-on walkthroughs for engineering teams onboarding onto algu's QML Suite, from first circuit to a deployed hybrid pipeline." },
          { title: "Finance-Oriented Quantum ML Examples", body: "Worked examples applying QML to pricing, fraud detection, and portfolio problems — the same techniques used in algu's Financial Services engagements." },
          { title: "Quantum ML for Complex Systems", body: "Modeling systems with many interacting variables — supply chains, grids, biological networks — where classical simulation struggles to scale." },
        ],
      },
      {
        heading: "Quantum Finance & Risk",
        layout: "cards",
        items: [
          { title: "Quantum Bayesian Networks", body: "Quantum-enhanced probabilistic graphical models for dependency-heavy risk and causal inference problems." },
          { title: "Quantum Algorithms for Derivatives Pricing", body: "Quantum amplitude estimation and related techniques applied to pricing path-dependent and multi-asset derivatives." },
          { title: "Quantum ML for Time-Series Forecasting", body: "Hybrid quantum-classical models for forecasting problems with long-range dependencies classical time-series models undersample." },
          { title: "Quantum Portfolio Optimization", body: "QAOA-based portfolio allocation under real-world constraints — transaction costs, sector limits, turnover — not just the unconstrained textbook case." },
          { title: "Quantum Monte Carlo", body: "Quantum-accelerated Monte Carlo methods for risk simulation, offering quadratic speedups over classical sampling in select problem classes." },
          { title: "Quantum Risk Modeling", body: "Applying the above techniques together for enterprise risk models — VaR, stress testing, and scenario analysis at higher fidelity." },
          { title: "Quantum-Enhanced Reinforcement Learning", body: "Reinforcement learning with quantum-computed value functions or policies, explored for dynamic trading and control problems." },
        ],
      },
    ],
  },
}

export const LEARN_MENU_ITEMS: string[] = PAGES.learn.sections.flatMap((section) =>
  section.items.map((item) => item.title),
)

export const FOOTER = {
  columns: [
    {
      heading: "Company",
      items: [
        { label: "About ALGU Co.", route: "alguAbout" },
        { label: "Government Contracting", route: "alguGovernment" },
        { label: "Leadership", route: "alguLeadership" },
        { label: "Careers", route: "alguCareers" },
        { label: "Legal Information", route: "alguLegal" },
        { label: "Corporate Governance", route: "alguGovernance" },
      ],
    },
    {
      heading: "Solutions",
      items: [
        { label: "Quantum Machine Learning", route: "alguServices" },
        { label: "Quantum Optimization", route: "alguServices" },
        { label: "QPU Engineering", route: "alguProducts" },
        { label: "Nuclear-Powered Data Centers", route: "alguProducts" },
        { label: "Quantum Security", route: "alguServices" },
      ],
    },
    {
      heading: "Resources",
      items: [
        { label: "Documentation", route: "alguDocumentation" },
        { label: "API Access", route: "alguApiAccess" },
        { label: "Whitepapers", route: "alguWhitepapers" },
        { label: "Case Studies", route: "alguCaseStudies" },
        { label: "Newsroom", route: "alguNewsroom" },
      ],
    },
    {
      heading: "Legal",
      items: [
        { label: "Company Number: 1617133", route: null },
        { label: "Status: Current Active", route: null },
        { label: "Jurisdiction: North Carolina (US)", route: null },
        { label: "Registered Address: 2321 Dundeen St., Charlotte, NC 28216", route: null },
        { label: "Agent: Guiffo, Alex", route: null },
      ],
    },
  ],
  contactEmail: "algu@algu.net",
}
