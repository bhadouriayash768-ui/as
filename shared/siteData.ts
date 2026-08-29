export const SITE = {
  name: "Syntha Airlabs",
  origin: "https://synthaairlabs.vercel.app",
  email: "synthaairlabs@gmail.com",
  description:
    "Syntha Airlabs designs clear, high-performing websites and digital foundations that help growing businesses look credible and make the next step easier.",
  ogImage: "/guardian.webp",
  // TODO: replace with real social profile URLs once available, e.g. LinkedIn/Instagram/X.
  sameAs: [] as string[],
};

export type LandingPage = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  benefits: Array<{ title: string; body: string }>;
  steps: string[];
  cta: string;
};

export const landingPages: LandingPage[] = [
  {
    path: "/website-design-services",
    eyebrow: "WEBSITE DESIGN SERVICES",
    title: "A business website that makes the right next step clear.",
    description:
      "Website design services for growing businesses that need a clear offer, credible presence, and easier path to enquiry.",
    intro:
      "A useful website does more than look polished. It explains what you do, gives the right people confidence, and makes it easy to start a conversation. Syntha Airlabs shapes the structure, language, and responsive experience around the people you want to reach.",
    benefits: [
      { title: "Clarity before decoration", body: "Organize your offer, audience, and next action so visitors understand why you are relevant before they have to work for it." },
      { title: "A credible digital home", body: "Bring your message, visual identity, and proof together in a considered experience that feels dependable on every screen." },
      { title: "A path built for enquiry", body: "Use clear calls to action, useful page structure, and focused contact moments to make a good conversation easier to begin." },
    ],
    steps: ["Understand the offer and the people it needs to reach.", "Shape the pages, message, and visual direction around the useful path.", "Build, refine, and launch a responsive website ready to grow with the business."],
    cta: "Make your business website easier to choose",
  },
  {
    path: "/business-website-design",
    eyebrow: "BUSINESS WEBSITE DESIGN",
    title: "Turn your online presence into a clearer business asset.",
    description:
      "Business website design for ambitious small businesses that want stronger trust, clearer messaging, and more qualified enquiries.",
    intro:
      "Your website is often the first serious interaction someone has with your business. Syntha Airlabs helps turn that moment into a clear, confident explanation of what you offer, who it is for, and what a useful next step looks like.",
    benefits: [
      { title: "Make the offer easy to understand", body: "Replace vague language and scattered information with a page structure that answers the questions people bring with them." },
      { title: "Build trust without overclaiming", body: "Use thoughtful hierarchy, proof, process, and plain language to create confidence without making promises the business cannot support." },
      { title: "Create room for the next stage", body: "Start with a dependable foundation that can support new services, campaigns, content, and conversations as the business evolves." },
    ],
    steps: ["Map the questions a potential customer needs answered.", "Translate the business into a focused, editorial web experience.", "Measure the useful actions and improve the small details over time."],
    cta: "Give your business a digital presence with direction",
  },
  {
    path: "/landing-page-design-services",
    eyebrow: "LANDING PAGE DESIGN SERVICES",
    title: "A focused landing page for the campaign you want to move.",
    description:
      "Landing page design services that connect a campaign message to a focused, credible, and conversion-ready next step.",
    intro:
      "A landing page has one job: help a specific visitor understand the value of a specific offer and decide what to do next. Syntha Airlabs creates focused pages with a clear message, useful evidence, and a low-friction route to enquiry.",
    benefits: [
      { title: "One audience, one useful promise", body: "Align the headline, supporting evidence, and call to action with the intent that brought someone to the page." },
      { title: "Less distraction, more confidence", body: "Keep the page focused while answering practical objections around fit, process, timing, and the next conversation." },
      { title: "Ready for learning", body: "Build a page that can be measured, tested, and refined rather than treated as a finished poster that never changes." },
    ],
    steps: ["Define the campaign, audience, offer, and desired action.", "Build a focused page around message, proof, and a clear CTA.", "Review behaviour and improve the page as real responses arrive."],
    cta: "Give your next campaign a clearer destination",
  },
];

export const faqs = [
  { question: "What does Syntha Airlabs design?", answer: "Syntha Airlabs designs business websites, online presences, and focused landing pages for growing businesses that need a clearer digital foundation." },
  { question: "Who is Syntha Airlabs for?", answer: "Syntha Airlabs is for founders, owner-led businesses, and ambitious teams that want their website to explain the offer clearly, build trust, and make the next conversation easier." },
  { question: "Can you improve an existing website?", answer: "Yes. A project can start with a new website or with a focused review of an existing presence, including its message, page structure, responsive experience, and enquiry path." },
  { question: "Do you design landing pages for campaigns?", answer: "Yes. Landing pages can be shaped around a specific audience, offer, campaign, or enquiry goal, with a focused message and a clear next action." },
  { question: "How do I get started?", answer: "Send Syntha Airlabs a short note about your business, what you are trying to improve, and the kind of website or page you need. The first conversation is used to understand the useful next step." },
  { question: "How much does a business website cost?", answer: "Pricing depends on the number of pages, the amount of original content needed, and whether the project is a new build or a focused improvement of an existing site. Syntha Airlabs shares a clear scope and price before any work begins." },
  { question: "How long does a website project take?", answer: "A focused business website or landing page typically moves from kickoff to launch in a few weeks once the offer, structure, and content are agreed. Timelines are confirmed during the first conversation based on scope." },
  { question: "Do you write the website copy or do I need to provide it?", answer: "Syntha Airlabs can shape and write the website copy, working from a short conversation about the business, or refine copy you already have. Either way, the goal is language that explains the offer clearly." },
  { question: "Will my website work well on mobile devices?", answer: "Yes. Every website and landing page Syntha Airlabs builds is designed responsively, so the layout, navigation, and calls to action work cleanly across phones, tablets, and desktop screens." },
];

export const blogPosts = [
  {
    slug: "what-makes-a-business-website-effective",
    title: "What Makes a Business Website Effective?",
    description: "A practical framework for making a business website clearer, more credible, and easier for the right visitors to act on.",
    date: "2026-08-18",
    readTime: "6 min read",
    category: "Website strategy",
    intro: "An effective business website is not defined by how many sections it has. It is defined by how quickly the right visitor can understand the offer, trust the business, and choose a useful next step.",
    sections: [
      ["Start with the decision the visitor is trying to make", "Before choosing layouts or writing headlines, identify what a potential customer needs to believe before they can enquire. The structure should answer those questions in a natural order."],
      ["Make the offer specific", "Clear language beats clever language. Explain what the business does, who it helps, and what changes for the customer when the work is done."],
      ["Give the next action a reason", "A call to action works better when it tells people what happens next. Replace vague buttons with a small promise about the conversation, review, or project brief."],
    ],
  },
  {
    slug: "how-to-improve-website-lead-generation",
    title: "How to Improve Website Lead Generation Without More Noise",
    description: "Practical ways to improve a small-business website’s enquiry path through clearer messaging, proof, and lower-friction calls to action.",
    date: "2026-08-11",
    readTime: "7 min read",
    category: "Lead generation",
    intro: "More traffic is not always the first answer to weak lead generation. Often the better opportunity is helping the visitors you already have understand the offer and feel confident taking the next step.",
    sections: [
      ["Match the page to the visitor’s intent", "A visitor arriving from a service search should not have to decode a broad homepage before finding the relevant offer. Create focused pages and link them from useful context."],
      ["Use proof where doubt appears", "Add relevant process details, examples, outcomes, or customer evidence near the questions that make people hesitate. Never add testimonials or numbers that cannot be verified."],
      ["Reduce the cost of saying hello", "A short, clearly labelled enquiry path gives people a safer first step than a vague request to get in touch. Explain what information is useful and what response they can expect."],
    ],
  },
  {
    slug: "website-redesign-vs-website-refresh",
    title: "Website Redesign vs. Website Refresh: Where Should You Start?",
    description: "How to decide whether a business needs a full website redesign or a focused refresh of its message, structure, and conversion path.",
    date: "2026-08-04",
    readTime: "5 min read",
    category: "Digital presence",
    intro: "Not every website problem requires a complete rebuild. A useful first step is separating problems of positioning and structure from problems of technology, accessibility, or visual consistency.",
    sections: [
      ["Find the friction before choosing the scope", "Review the first impression, key service pages, mobile experience, and enquiry path. The pattern of friction usually points to the right level of work."],
      ["Refresh the message when the business has changed", "If the offer has evolved but the website still speaks to an older version of the business, clearer positioning and page structure may create more value than a new visual treatment alone."],
      ["Redesign when the foundation is holding the work back", "A rebuild makes sense when the site cannot support responsive behaviour, accessible content, useful measurement, or the page structure the business now needs."],
    ],
  },
];

export const publicPaths = [
  "/",
  ...landingPages.map((page) => page.path),
  "/pricing",
  "/faq",
  "/blog",
  ...blogPosts.map((post) => `/blog/${post.slug}`),
  "/contact",
];
