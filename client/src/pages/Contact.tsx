import React from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";
import { SITE } from "@shared/siteData";

const projectBriefHref = `mailto:${SITE.email}?subject=New%20website%20project%20enquiry&body=Hello%20Syntha%20Airlabs%2C%0A%0ABusiness%3A%20%0AWhat%20I%27m%20building%3A%20%0AWhat%20feels%20unclear%3A%20%0AWhat%20I%20need%20help%20with%3A%20%0ATiming%3A%20%0A%0AThank%20you`;

export default function Contact() {
  return <div className="page-shell"><section className="page-hero page-hero--contact"><div className="container contact-grid"><div><p className="eyebrow">START A PROJECT</p><h1>Tell us what you’re building.</h1><p className="page-hero__lead">Share what your business does, what feels unclear, and the kind of website or landing page you need. A short project brief gives the first conversation somewhere useful to begin.</p><a className="button button--light" href={projectBriefHref}>Email a project brief <ArrowUpRight size={17} /></a></div><div className="contact-details"><div><Mail size={19} /><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div><div><MapPin size={19} /><strong>Digital studio · India</strong><span>Thoughtful websites for growing businesses</span></div></div></div></section><section className="content-section"><div className="container contact-next"><div><p className="eyebrow">Before we talk</p><h2>Make the first step useful.</h2></div><div><p className="section-copy">Include your business, audience, current website if you have one, the page or problem you want to improve, and any timing you already have in mind. You do not need a polished brief—just the real context.</p><Link href="/faq" className="inline-link">Read project FAQs <ArrowUpRight size={16} /></Link></div></div></section></div>;
}
