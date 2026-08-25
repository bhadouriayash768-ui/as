import React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import Head from "@/components/Head";
import { getSeo } from "@/lib/seo";
import { SITE } from "@shared/siteData";

const navItems = [
  ["/website-design-services", "Website design"],
  ["/business-website-design", "Business websites"],
  ["/landing-page-design-services", "Landing pages"],
  ["/pricing", "Project fit"],
  ["/blog", "Resources"],
] as const;

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const meta = getSeo(location);
  return (
    <div className="site-frame">
      <Head pathname={location} />
      <header className="site-header">
        <Link href="/" className="site-brand" onClick={() => setOpen(false)} aria-label="Syntha Airlabs home">
          <span className="site-brand__mark">S</span>
          <span><strong>SYNTHA</strong><b>/</b>AIRLABS</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([href, label]) => <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>)}
        </nav>
        <Link href="/contact" className="header-cta">Start a project <ArrowUpRight size={16} /></Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </header>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/faq" onClick={() => setOpen(false)}>FAQs</Link><Link href="/contact" className="mobile-nav__cta" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={16} /></Link></nav>}
      <main>{children}</main>
      <footer className="site-footer">
        <div><Link href="/" className="site-brand site-brand--footer"><span className="site-brand__mark">S</span><span><strong>SYNTHA</strong><b>/</b>AIRLABS</span></Link><p>{SITE.description}</p></div>
        <div className="footer-links"><div><strong>Services</strong>{navItems.slice(0, 3).map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div><div><strong>Explore</strong><Link href="/pricing">Pricing</Link><Link href="/faq">FAQs</Link><Link href="/blog">Resources</Link><Link href="/contact">Contact</Link></div></div>
        <div className="footer-bottom"><span>Digital studio for growing businesses and thoughtful next steps.</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
      </footer>
    </div>
  );
}
