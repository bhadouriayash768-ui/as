import React from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { landingPages, SITE } from "@shared/siteData";

export default function LandingPage({ path }: { path: string }) {
  const page = landingPages.find((item) => item.path === path) ?? landingPages[0];
  return <div className="page-shell">
    <section className="page-hero page-hero--product">
      <div className="container page-hero__grid">
        <div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="page-hero__lead">{page.intro}</p><div className="hero-actions"><Link href="/contact" className="button button--primary">Book a demo <ArrowRight size={17} /></Link><Link href="/pricing" className="button button--secondary">See pricing</Link></div></div>
        <div className="signal-card" aria-label="HVAC workflow overview"><div className="signal-card__orb" /><span className="signal-card__label">{SITE.name} / workflow signal</span><div className="signal-card__metric"><strong>Next action</strong><span>Visible</span></div><div className="signal-card__rows"><span>New inquiry <b>Captured</b></span><span>Appointment <b>Coordinated</b></span><span>Follow-up <b>On track</b></span></div></div>
      </div>
    </section>
    <section className="content-section"><div className="container"><div className="section-heading"><p className="eyebrow">Why contractors choose clarity</p><h2>Less chasing. More control over the work that matters.</h2></div><div className="benefit-grid">{page.benefits.map((benefit, index) => <article className="benefit-card" key={benefit.title}><span className="card-index">0{index + 1}</span><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}</div></div></section>
    <section className="content-section content-section--tint"><div className="container workflow-grid"><div><p className="eyebrow">A practical operating rhythm</p><h2>Make the next step clear for everyone.</h2><p className="section-copy">Syntha Airlabs is designed to connect the information your team already depends on with the actions that keep a service business moving. Start with the workflow, then improve it as your team learns.</p><Link href="/faq" className="inline-link">Read common questions <ChevronRight size={17} /></Link></div><ol className="step-list">{page.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><div><strong>{step}</strong><p>One visible step, owned by the right person.</p></div><Check size={18} /></li>)}</ol></div></section>
    <section className="cta-band"><div className="container cta-band__inner"><div><p className="eyebrow">Ready when you are</p><h2>{page.cta}</h2></div><Link href="/contact" className="button button--light">Start the conversation <ArrowRight size={17} /></Link></div></section>
  </div>;
}
