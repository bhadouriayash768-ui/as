import React from "react";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Head from "./components/Head";
import SiteLayout from "./components/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import { BlogIndex, BlogPost } from "./pages/Blog";
import NotFound from "./pages/NotFound";

function SecondaryLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}

function BlogPostRoute({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />;
}

function HomeRoute() {
  return <><Head pathname="/" /><Home /></>;
}

export default function App({ ssrPath }: { ssrPath?: string } = {}) {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><Router ssrPath={ssrPath}><Switch><Route path="/" component={HomeRoute} /><Route path="/website-design-services" component={() => <SecondaryLayout><LandingPage path="/website-design-services" /></SecondaryLayout>} /><Route path="/business-website-design" component={() => <SecondaryLayout><LandingPage path="/business-website-design" /></SecondaryLayout>} /><Route path="/landing-page-design-services" component={() => <SecondaryLayout><LandingPage path="/landing-page-design-services" /></SecondaryLayout>} /><Route path="/pricing" component={() => <SecondaryLayout><Pricing /></SecondaryLayout>} /><Route path="/faq" component={() => <SecondaryLayout><Faq /></SecondaryLayout>} /><Route path="/blog" component={() => <SecondaryLayout><BlogIndex /></SecondaryLayout>} /><Route path="/blog/:slug" component={({ params }: { params: { slug: string } }) => <SecondaryLayout><BlogPostRoute params={params} /></SecondaryLayout>} /><Route path="/contact" component={() => <SecondaryLayout><Contact /></SecondaryLayout>} /><Route component={() => <SecondaryLayout><NotFound /></SecondaryLayout>} /></Switch></Router></ThemeProvider></ErrorBoundary>;
}
