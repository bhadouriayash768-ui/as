import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return <div className="page-shell"><section className="page-hero"><div className="container narrow"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>The page you are looking for has moved on.</h1><p className="page-hero__lead">Try the homepage, explore the HVAC CRM pages, or read the latest resources.</p><div className="hero-actions"><Link href="/" className="button button--primary">Go home <ArrowRight size={17} /></Link><Link href="/blog" className="button button--secondary">Browse resources</Link></div></div></section></div>;
}
