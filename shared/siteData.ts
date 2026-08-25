export const SITE = {
  name: "Syntha Airlabs",
  origin: "https://synthaairlabs.vercel.app",
  email: "synthaairlabs@gmail.com",
  description:
    "HVAC CRM and workflow automation software for contractors who want clearer operations, faster follow-up, and more booked work.",
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
    path: "/hvac-crm-software",
    eyebrow: "HVAC CRM SOFTWARE",
    title: "The HVAC CRM that keeps every customer and job moving.",
    description:
      "Give your HVAC team one clear place to manage customers, jobs, follow-up, and growth with Syntha Airlabs CRM software.",
    intro:
      "Syntha Airlabs gives HVAC contractors a clearer operating picture from the first inquiry to the final follow-up. Replace scattered notes, inbox searches, and disconnected spreadsheets with one practical CRM built around the way service businesses work. Your team can see who needs attention, what is happening next, and where opportunities are being lost before the day gets away from you.",
    benefits: [
      { title: "A complete customer view", body: "Keep customer details, conversations, service history, and next steps together so every handoff feels informed." },
      { title: "Follow-up without guesswork", body: "Create consistent follow-up workflows that help your office respond quickly and keep warm opportunities from going quiet." },
      { title: "Visibility for owners", body: "Understand pipeline movement, team activity, and the operational signals that matter as your HVAC business grows." },
    ],
    steps: ["Capture every new inquiry in one place.", "Assign the next action to the right person.", "Review progress and improve the workflow over time."],
    cta: "See how Syntha Airlabs can fit your team",
  },
  {
    path: "/hvac-scheduling-software",
    eyebrow: "HVAC SCHEDULING SOFTWARE",
    title: "Scheduling software for HVAC teams that need a calmer day.",
    description:
      "Coordinate HVAC appointments, dispatch priorities, and customer communication with scheduling workflows designed for busy contractors.",
    intro:
      "A full schedule is only useful when your team can trust it. Syntha Airlabs helps HVAC contractors organize appointments, coordinate office and field teams, and keep customers informed without adding more administrative friction. Build a dependable scheduling rhythm that makes the next job obvious and gives your team room to handle the unexpected.",
    benefits: [
      { title: "Fewer scheduling gaps", body: "Make upcoming work easier to see, assign, and confirm so valuable capacity does not disappear between calls." },
      { title: "Clearer dispatch coordination", body: "Give office teams a shared view of priorities, availability, and customer context before the technician is on the road." },
      { title: "Better customer communication", body: "Keep appointment updates and follow-up steps connected to the job rather than buried in separate conversations." },
    ],
    steps: ["Bring requests and appointments into a shared workflow.", "Coordinate the right technician and time window.", "Close the loop with consistent customer follow-up."],
    cta: "Build a more dependable HVAC schedule",
  },
  {
    path: "/hvac-lead-management-software",
    eyebrow: "HVAC LEAD MANAGEMENT SOFTWARE",
    title: "Turn more HVAC inquiries into confidently managed opportunities.",
    description:
      "Capture, qualify, and follow up with HVAC leads using a practical lead-management workflow from Syntha Airlabs.",
    intro:
      "HVAC growth often starts with a simple problem: good leads arrive while the team is busy serving customers. Syntha Airlabs helps contractors capture new opportunities, understand where each lead stands, and make follow-up a repeatable part of the workday. That means fewer forgotten inquiries, more useful conversations, and a pipeline your team can actually act on.",
    benefits: [
      { title: "Capture leads consistently", body: "Give every inquiry a clear starting point so phone, web, and referral opportunities do not vanish into personal inboxes." },
      { title: "Prioritize the next conversation", body: "Organize opportunities by stage, urgency, and next action so your team spends time where it can make a difference." },
      { title: "Learn what converts", body: "Use a clearer record of lead sources and outcomes to improve your marketing and sales process over time." },
    ],
    steps: ["Collect each inquiry with useful context.", "Move the lead through a simple, visible pipeline.", "Follow up, learn, and improve the process."],
    cta: "Make your HVAC follow-up easier to manage",
  },
];

export const faqs = [
  { question: "What is Syntha Airlabs?", answer: "Syntha Airlabs is CRM and workflow automation software designed for HVAC contractors. It helps teams organize customer information, scheduling, lead follow-up, and the next operational step in one clearer system." },
  { question: "Who is Syntha Airlabs for?", answer: "Syntha Airlabs is built for HVAC contractors and service businesses in the US, UK, Canada, and Australia, including owner-operators, growing teams, and established companies that need better visibility." },
  { question: "Can Syntha Airlabs help reduce missed follow-up?", answer: "Yes. The product is designed to make next actions visible and repeatable, helping teams create more consistent follow-up workflows instead of relying on memory, scattered notes, or inbox searches." },
  { question: "Does Syntha Airlabs include scheduling workflows?", answer: "Syntha Airlabs includes scheduling-focused workflows that help HVAC teams coordinate appointments, priorities, customer communication, and the handoff between office and field operations." },
  { question: "How do I get started?", answer: "Start by booking a conversation with Syntha Airlabs. We will learn how your HVAC business currently handles leads, customers, and scheduling, then show where a clearer workflow could help." },
];

export const blogPosts = [
  {
    slug: "reduce-no-shows-hvac-service-calls",
    title: "How to Reduce No-Shows for HVAC Service Calls",
    description: "Practical ways HVAC contractors can improve appointment reminders, customer context, and follow-up to reduce service-call no-shows.",
    date: "2026-08-18",
    readTime: "6 min read",
    category: "Operations",
    intro: "No-shows are rarely just a scheduling problem. They are usually a communication and workflow problem that becomes visible on the day of the appointment. A consistent process can help your team confirm intent, surface changes early, and make it easier for customers to keep the commitment.",
    sections: [
      ["Start with a clear appointment record", "Every appointment should have a reliable customer record, a service reason, a time window, and a next communication step. When that information is split across calendars, notes, and inboxes, small gaps become missed appointments."],
      ["Make reminders useful, not noisy", "A reminder works best when it answers the questions a customer is likely to have: when the technician is expected, what the visit is for, and how to contact the team if plans change. Keep the message concise and make the next action obvious."],
      ["Give your office team a recovery path", "Even a well-run process will see cancellations and changes. Build a workflow for rescheduling, waitlists, and same-day opportunities so a change does not automatically become an empty slot."],
    ],
  },
  {
    slug: "choose-right-crm-growing-hvac-business",
    title: "Choosing the Right CRM for a Growing HVAC Business",
    description: "A practical guide to evaluating HVAC CRM software around customer context, follow-up, scheduling, and team adoption.",
    date: "2026-08-11",
    readTime: "7 min read",
    category: "Growth",
    intro: "The right CRM should make the work clearer, not create another system your team avoids. For a growing HVAC business, the most useful evaluation starts with the customer journey and the daily handoffs that currently create friction.",
    sections: [
      ["Map the work before comparing features", "Write down what happens from first inquiry to completed job and post-service follow-up. The gaps in that journey will tell you more than a long feature checklist."],
      ["Look for shared context", "A CRM should help the office and field team see the information they need without asking customers to repeat themselves. Prioritize customer history, notes, appointment context, and ownership of the next step."],
      ["Choose adoption over complexity", "A smaller workflow that the team uses consistently is more valuable than a large platform that requires workarounds. Look for simple views, clear actions, and support for the habits your team already has."],
    ],
  },
  {
    slug: "hvac-lead-follow-up-workflow",
    title: "A Better Lead Follow-Up Workflow for HVAC Contractors",
    description: "Build a repeatable HVAC lead follow-up workflow that helps your team respond quickly and keep opportunities moving.",
    date: "2026-08-04",
    readTime: "5 min read",
    category: "Lead management",
    intro: "When an HVAC lead arrives during a busy service day, the difference between a booked opportunity and a forgotten message is often the next action. A simple workflow gives your team a dependable way to capture context, assign ownership, and follow up with purpose.",
    sections: [
      ["Capture context at the first touch", "Record the customer’s need, location, preferred timing, and source while the conversation is fresh. That context makes later follow-up more useful and saves the customer from starting over."],
      ["Set one owner and one next action", "Every open lead should have a person responsible for it and a clear next action. If the only status is ‘someone should call back,’ the lead is not really being managed."],
      ["Review outcomes weekly", "Look for patterns in response time, lead source, service type, and conversion. A short weekly review can turn follow-up from a reactive task into a useful growth signal."],
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
