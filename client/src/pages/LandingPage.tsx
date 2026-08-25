import React from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { landingPages, SITE } from "@shared/siteData";

export default function LandingPage({ path }: { path: string }) {
  const page = landingPages.find((item) => item.path === path) ?? landingPages[0];
  return <div className="page-shell">
    <section className="page-hero page-hero--product">
      <div className="container page-hero__grid">
        <div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="page-hero__lead">{page.intro}</p><div className="hero-actions"><Link href="/contact" className="button button--primary">Start a project <ArrowRight size={17} /></Link><Link href="/pricing" className="button button--secondary">See pricing</Link></div></div>
        <div className="signal-card" aria-label="Website project workflow overview"><div className="signal-card__orb" /><span className="signal-card__label">{SITE.name} / workflow signal</span><div className="signal-card__metric"><strong>Next action</strong><span>Visible</span></div><div className="signal-card__rows"><span>Offer <b>Clear</b></span><span>Structure <b>Focused</b></span><span>Next step <b>Visible</b></span></div></div>
      </div>
    </section>
    <section className="content-section"><div className="container"><div className="section-heading"><p className="eyebrow">Why clear structure matters</p><h2>Less confusion. More confidence to move forward.</h2></div><div className="benefit-grid">{page.benefits.map((benefit, index) => <article className="benefit-card" key={benefit.title}><span className="card-index">0{index + 1}</span><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}</div></div></section>
    <section className="content-section content-section--tint"><div className="container workflow-grid"><div><p className="eyebrow">A practical operating rhythm</p><h2>Make the next step clear for everyone.</h2><p className="section-copy">Syntha Airlabs connects your offer, audience, message, and next action in a website experience people can understand. Start with the useful path, then refine it as the business grows.</p><Link href="/faq" className="inline-link">Read common questions <ChevronRight size={17} /></Link></div><ol className="step-list">{page.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><div><strong>{step}</strong><p>One visible step, owned by the right person.</p></div><Check size={18} /></li>)}</ol></div></section>
    <section className="cta-band"><div className="container cta-band__inner"><div><p className="eyebrow">Ready when you are</p><h2>{page.cta}</h2></div><Link href="/contact" className="button button--light">Talk through your project <ArrowRight size={17} /></Link></div></section>
  </div>;
}
