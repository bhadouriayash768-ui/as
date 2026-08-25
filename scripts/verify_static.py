from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1] / "vercel-dist"
EXPECTED = [
    "/", "/hvac-crm-software", "/hvac-scheduling-software", "/hvac-lead-management-software",
    "/pricing", "/faq", "/blog", "/blog/reduce-no-shows-hvac-service-calls",
    "/blog/choose-right-crm-growing-hvac-business", "/blog/hvac-lead-follow-up-workflow", "/contact",
]

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.text = []
        self.attrs = {}
        self.jsonld = []
        self.in_jsonld = False
        self.json_text = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append(tag)
        self.attrs.setdefault(tag, []).append(attrs)
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.in_jsonld = True
            self.json_text = []
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
    def handle_endtag(self, tag):
        if tag == "script" and self.in_jsonld:
            self.jsonld.append(json.loads("".join(self.json_text)))
            self.in_jsonld = False
    def handle_data(self, data):
        self.text.append(data)
        if self.in_jsonld:
            self.json_text.append(data)

errors = []
titles = {}
for route in EXPECTED:
    file = ROOT / "index.html" if route == "/" else ROOT / route[1:] / "index.html"
    if not file.exists():
        errors.append(f"missing route file: {route}")
        continue
    parser = Parser()
    parser.feed(file.read_text())
    title = parser.attrs.get("title", [{}])[0].get("data-title")
    title_match = re.search(r"<title>(.*?)</title>", file.read_text(), re.S)
    title = title_match.group(1) if title_match else ""
    titles[route] = title
    if len(parser.attrs.get("h1", [])) != 1:
        errors.append(f"{route}: expected one h1, found {len(parser.attrs.get('h1', []))}")
    if file.read_text().count('rel="canonical"') != 1:
        errors.append(f"{route}: expected one canonical")
    if file.read_text().count('<meta name="description"') != 1:
        errors.append(f"{route}: expected one description")
    if 'data-ssr="true"' not in file.read_text():
        errors.append(f"{route}: missing SSR marker")
    for href in parser.links:
        if "synthaairlabs-dev.vercel.app" in href:
            errors.append(f"{route}: links to development deployment")

if len(set(titles.values())) != len(titles):
    errors.append("duplicate titles detected")

sitemap = (ROOT / "sitemap.xml").read_text()
for route in EXPECTED:
    url = f"https://synthaairlabs.vercel.app{route if route != '/' else '/'}"
    if url not in sitemap:
        errors.append(f"sitemap missing: {url}")
robots = (ROOT / "robots.txt").read_text()
if "Allow: /" not in robots or "Sitemap: https://synthaairlabs.vercel.app/sitemap.xml" not in robots:
    errors.append("robots.txt missing allow or sitemap")

faq = Parser()
faq.feed((ROOT / "faq/index.html").read_text())
if not any(item.get("@type") == "FAQPage" for item in faq.jsonld):
    errors.append("FAQPage JSON-LD missing")
home = Parser()
home.feed((ROOT / "index.html").read_text())
types = {item.get("@type") for item in home.jsonld}
if not {"Organization", "SoftwareApplication"}.issubset(types):
    errors.append("homepage Organization or SoftwareApplication JSON-LD missing")

if errors:
    print("FAIL")
    print("\n".join(errors))
    raise SystemExit(1)
print(f"PASS: {len(EXPECTED)} routes checked; unique titles, one h1, canonical, description, SSR marker, sitemap, robots, and JSON-LD validated")
