import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { faqs } from "@shared/siteData";

export default function Faq() {
  return <div className="page-shell"><section className="page-hero"><div className="container narrow"><p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p><h1>Answers for HVAC teams looking for a clearer workflow.</h1><p className="page-hero__lead">Learn how Syntha Airlabs approaches CRM, scheduling, lead management, and getting started.</p></div></section><section className="content-section"><div className="container faq-layout"><div><p className="eyebrow">Before the demo</p><h2>Good questions lead to better systems.</h2><p className="section-copy">If you do not see your question here, <Link href="/contact" className="inline-link">start a conversation <ArrowRight size={16} /></Link> and tell us how your business works today.</p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={18} /></summary><p>{faq.answer}</p></details>)}</div></div></section><section className="cta-band"><div className="container cta-band__inner"><div><p className="eyebrow">Still deciding?</p><h2>See the workflow in context.</h2></div><Link href="/contact" className="button button--light">Book a demo <ArrowRight size={17} /></Link></div></section></div>;
}
