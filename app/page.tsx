'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarClock, ChevronDown, Mail, MapPin, Menu, Phone, ShieldCheck, X } from 'lucide-react'
import BorderGlow from '@/components/border-glow'
import AeroShards from '@/components/aero-shards'
import FoldText from '@/components/fold-text'

const navItems = [
  ['Group', '#overview'],
  ['Pillars', '#pillars'],
  ['Mauritius Platform', '#governance'],
  ['Footprint', '#footprint'],
  ['Investor Portal', '#investors'],
]

const pillars = [
  { key: 'credit', label: 'Credit', name: 'GeoPesa Credit', role: 'Lending', color: 'teal', desc: 'Structured MSME and corporate lending, trade finance, project finance and supply chain credit for African businesses excluded from formal banking.', metrics: [['Target book', '$180M'], ['Primary revenue', 'Net interest margin'], ['Margin target', '8–12% NIM'], ['Clients', 'SMEs, agri, trade, logistics, real estate & mining']] },
  { key: 'wealth', label: 'Wealth', name: 'GeoPesa Wealth', role: 'Wealth Management', color: 'gold', desc: 'Portfolio management, family office and estate planning for high-net-worth African individuals, diaspora capital and institutional clients.', metrics: [['Target AUM', '$80M'], ['Primary revenue', 'Management + performance fee'], ['Fee structure', '1.5–2% + 15% performance'], ['Clients', 'HNW families, diaspora, foundations, corporates']] },
  { key: 'protect', label: 'Protect', name: 'GeoPesa Protect', role: 'Insurance & Bonds', color: 'coral', desc: 'Trade credit insurance, political risk cover and bond guarantee products that secure the economic interests of businesses and individuals across Africa.', metrics: [['Target premiums', '$40M'], ['Primary revenue', 'Premium income less claims'], ['Target combined ratio', '20–30%'], ['Clients', 'Businesses, exporters, investors, developers']] },
]

const governance = [
  ['Board of Directors', 'Minimum two independent Mauritius-resident directors alongside executive directors; independent directors chair the Audit and Risk Committees.'],
  ['Audit Committee', 'Three members, majority independent. Reviews quarterly management accounts and audit findings, and approves the external auditor engagement.'],
  ['Risk Committee', 'Reviews credit, currency, concentration and country risk across all subsidiaries and reports to the full Board quarterly.'],
  ['Compliance Officer', 'Mauritius-licensed officer filing FSC reports and managing AML/KYC obligations.'],
  ['Investment Committee', 'Reviews all credit decisions above $500K, with a majority independent vote and a written investment policy statement.'],
  ['External Auditor', 'A Big Four firm audits the consolidated group and each subsidiary annually for FSC and investor reporting.'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePillar, setActivePillar] = useState('credit')
  const [expandedGov, setExpandedGov] = useState(0)
  const [governanceFocus, setGovernanceFocus] = useState(0)
  const active = pillars.find((pillar) => pillar.key === activePillar) ?? pillars[0]
  const governanceHighlights = [
    { label: 'FSC Mauritius', value: '100%', detail: 'Regulatory visibility across the Mauritius platform.' },
    { label: 'Mauritius GBC', value: '2+', detail: 'Independent Mauritius-resident directors at the apex.' },
    { label: 'Big Four Audit', value: '1×', detail: 'Annual consolidated and subsidiary audit cycle.' },
    { label: 'DFI-Aligned', value: 'QTR', detail: 'Quarterly risk and management reporting cadence.' },
  ]
  const activeGovernanceHighlight = governanceHighlights[governanceFocus]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'GeoPesa Financial Services Group',
    url: 'https://geopesa.com',
    email: 'geopesa2015@gmail.com',
    telephone: ['+254 20 2100366', '+254 716 080871'],
    address: { '@type': 'PostalAddress', postOfficeBoxNumber: '8846 - 00200', addressLocality: 'Nairobi', addressCountry: 'KE' },
    openingHours: ['Mo-Fr 08:00-16:00', 'Sa 08:00-12:00'],
    areaServed: 'Africa',
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <header className="site-header">
        <div className="wrap nav">
          <a href="#top" className="brand" aria-label="GeoPesa home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jw2E1ccfqz0dgKbDWBi3Njfw1OcuEa.png" alt="GeoPesa Financial Services Group" /></a>
          <nav className={menuOpen ? 'nav-links mobile-open' : 'nav-links'} aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-cta" href="#investors" onClick={() => setMenuOpen(false)}>Contact Investment Team <ArrowUpRight size={15} /></a>
          </nav>
          <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid wrap">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><span className="pulse-dot" /> Mauritius GBC · FSC Regulated</div>
            <h1>Powering Africa&apos;s <em>next</em> financial frontier.</h1>
            <p>GeoPesa channels affordable international capital into Africa&apos;s most productive, underfinanced businesses — through structured lending, wealth management and insurance, under one Mauritius-regulated holding group.</p>
            <div className="hero-actions"><a className="button button-light" href="#investors">Contact Investment Team <ArrowUpRight size={17} /></a><a className="text-link" href="#overview">Read the strategic overview <span>↓</span></a></div>
          </div>
          <div className="hero-visual reveal is-visible">
            <AeroShards className="hero-shards" backgroundColor="#0B1626" shardColor="#A9813F" accentColor="#C9A868" />
            <div className="signal-card"><span>GEOPESA / 01</span><strong>Deploying capital<br />with conviction.</strong><div className="signal-line"><i /> <small>Pan-African platform</small></div></div>
            <div className="hero-stamp"><ShieldCheck size={18} /> Investor-grade<br />governance</div>
          </div>
        </div>
        <div className="hero-ticker"><div className="wrap ticker-grid"><div><FoldText text="$300M" splitBy="char" hinge="top" /><span>Target financing capacity</span></div><div><FoldText text="14–17%" splitBy="char" hinge="top" /><span>Target net yield to investors</span></div><div><FoldText text="3" splitBy="char" hinge="top" /><span>Core business pillars</span></div><div><FoldText text="6+" splitBy="char" hinge="top" /><span>Countries of deployment</span></div></div></div>
      </section>

      <section className="section overview" id="overview"><div className="wrap two-col"><Reveal><p className="kicker">Strategic fit</p><h2>A structure built for the gap it&apos;s filling.</h2></Reveal><Reveal className="section-lede"><p>Africa&apos;s MSME sector faces an estimated <strong>$416B annual credit gap.</strong> GeoPesa is not seeking a banking licence — it operates as a non-bank financial institution licensed under FSC Mauritius, avoiding the capital-intensive requirements of full banking regulation while meeting the governance bar international investors expect.</p><p>The Mauritius holding structure gives the group tax efficiency, DFI credibility and investor-grade oversight, with three pillars designed to cross-sell into the same client base.</p></Reveal></div></section>

      <section className="section pillars-section" id="pillars"><div className="wrap pillars-content"><Reveal><p className="kicker">The three-pillar model</p><div className="section-title-row"><h2>One group. Three ways<br />to serve the same client.</h2><p>Each pillar operates as its own regulated entity under the Mauritius GBC, connected by shared governance and a common pipeline of African businesses.</p></div></Reveal><div className="pillar-tabs" role="tablist">{pillars.map((pillar, index) => <button key={pillar.key} className={activePillar === pillar.key ? `active ${pillar.color}` : ''} onClick={() => setActivePillar(pillar.key)} role="tab" aria-selected={activePillar === pillar.key}><span>0{index + 1}</span>{pillar.label}<ChevronDown size={15} /></button>)}</div><BorderGlow className={`pillar-panel-glow ${active.color}`} backgroundColor="#10233B" colors={['#A9813F', '#C9A868', active.color === 'credit' ? '#6E8B6B' : active.color === 'protect' ? '#6B7A93' : '#A9813F']}><div className={`pillar-panel ${active.color}`}><div className="panel-main"><p className="panel-role">{active.role}</p><h3>{active.name}</h3><p>{active.desc}</p><a className="text-link" href="#investors">Explore this pillar <ArrowUpRight size={15} /></a></div><div className="metric-list">{active.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></BorderGlow></div></section>

      <section className="section governance" id="governance"><div className="wrap"><Reveal><p className="kicker">Institutional governance</p><div className="section-title-row"><h2>Oversight built to the standard DFIs scrutinise.</h2><p>The Mauritius GBC sits at the apex of the group: legal counterparty for investor agreements, seat of group-wide risk oversight, audited annually by a Big Four firm and reporting quarterly to the FSC.</p></div></Reveal><div className="gov-layout"><div className="gov-list">{governance.map(([title, desc], index) => <div className={expandedGov === index ? 'gov-item open' : 'gov-item'} key={title}><button onClick={() => setExpandedGov(expandedGov === index ? -1 : index)}><span>{title}</span><span className="gov-number">0{index + 1}</span><ChevronDown size={17} /></button>{expandedGov === index && <p>{desc}</p>}</div>)}</div><div className="governance-aside"><div className="ring" aria-live="polite"><div><b>{activeGovernanceHighlight.value}</b><small>{activeGovernanceHighlight.label}<br />{activeGovernanceHighlight.detail}</small></div></div><div className="badges" role="tablist" aria-label="Governance credentials">{governanceHighlights.map((highlight, index) => <button key={highlight.label} className={governanceFocus === index ? 'active' : ''} onClick={() => setGovernanceFocus(index)} role="tab" aria-selected={governanceFocus === index}>{highlight.label}</button>)}</div><p className="governance-hint">Select a credential to inspect the group&apos;s oversight model.</p></div></div></div></section>

      <section className="section footprint" id="footprint"><div className="wrap"><Reveal><p className="kicker">Pan-African footprint</p><div className="section-title-row"><h2>Deployed where the<br /><em>credit gap is widest.</em></h2><p>GeoPesa Credit launches first in Nigeria and Kenya, drawing on an existing pipeline of portfolio companies for Day 1 revenue, then expands alongside GeoPesa Wealth and GeoPesa Protect as capital is raised.</p></div></Reveal><div className="footprint-card"><div className="map-lines" /><div className="footprint-stats"><div><b>6+</b><span>Countries of deployment</span></div><div><b>3</b><span>Regional operating subsidiaries</span></div><div><b>$300M</b><span>Final close target, Year 3–4</span></div></div><div className="country-row">{['Kenya', 'Nigeria', 'Ghana', 'Tanzania', 'Rwanda', 'Uganda'].map((country) => <span key={country}><i />{country}</span>)}</div></div></div></section>

      <section className="investor-cta" id="investors"><div className="wrap cta-inner"><div><p className="kicker">Investor portal</p><h2>Capital that moves<br /><em>with purpose.</em></h2></div><div><p>This overview is prepared for qualified institutional investors and development finance institutions. Request the full memorandum and data room access from the investment team.</p><a className="button button-gold" href="mailto:geopesa2015@gmail.com">Request investor access <ArrowUpRight size={17} /></a><div className="contact-summary" aria-label="GeoPesa contact details"><span><Phone size={16} aria-hidden="true" /><b>Phone</b><a href="tel:+254202100366">+254 20 2100366</a><a href="tel:+254716080871">+254 716 080871</a></span><span><Mail size={16} aria-hidden="true" /><b>Email</b><a href="mailto:geopesa2015@gmail.com">geopesa2015@gmail.com</a></span><span><CalendarClock size={16} aria-hidden="true" /><b>Business hours</b>Monday–Friday 8am–4pm<br />Saturday 8am–12pm</span><span><MapPin size={16} aria-hidden="true" /><b>Postal address</b>P.O. Box 8846 - 00200<br />Nairobi, Kenya</span></div></div></div></section>

      <footer><div className="wrap footer-top"><a href="#top" className="brand" aria-label="GeoPesa home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jw2E1ccfqz0dgKbDWBi3Njfw1OcuEa.png" alt="GeoPesa Financial Services Group" /></a><p>A Mauritius-domiciled, FSC-regulated diversified financial conglomerate serving Africa&apos;s MSME, wealth and protection needs.</p><div className="footer-links">{['Group', 'Pillars', 'Investors'].map((title) => <div key={title}><b>{title}</b><a href={title === 'Group' ? '#overview' : title === 'Pillars' ? '#pillars' : '#investors'}>{title === 'Group' ? 'Executive Overview' : title === 'Pillars' ? 'Three-pillar model' : 'Investor Portal'}</a><a href="#governance">Mauritius Platform</a></div>)}</div></div><div className="wrap footer-bottom"><span>© 2026 GeoPesa Financial Services Group Ltd. All rights reserved.</span><span>Mauritius GBC · FSC Regulated</span></div></footer>
    </main>
  )
}
