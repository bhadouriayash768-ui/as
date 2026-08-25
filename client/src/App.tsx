import React from "react";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import { BlogIndex, BlogPost } from "./pages/Blog";
import NotFound from "./pages/NotFound";

function BlogPostRoute({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />;
}

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><Router ssrPath={ssrPath}><SiteLayout><Switch><Route path="/" component={Home} /><Route path="/hvac-crm-software" component={() => <LandingPage path="/hvac-crm-software" />} /><Route path="/hvac-scheduling-software" component={() => <LandingPage path="/hvac-scheduling-software" />} /><Route path="/hvac-lead-management-software" component={() => <LandingPage path="/hvac-lead-management-software" />} /><Route path="/pricing" component={Pricing} /><Route path="/faq" component={Faq} /><Route path="/blog" component={BlogIndex} /><Route path="/blog/:slug" component={BlogPostRoute} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></SiteLayout></Router></ThemeProvider></ErrorBoundary>;
}
