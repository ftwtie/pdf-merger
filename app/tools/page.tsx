'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { ShieldIcon } from '../components/Logo';

const tools = [
  {
    icon: '🔗',
    title: 'Merge PDF',
    desc: 'Combine multiple PDF files into one document. Fast, free, and 100% secure.',
    href: '/merge',
    color: '#1a56db',
  },
  {
    icon: '✂️',
    title: 'Split PDF',
    desc: 'Extract specific pages, a range, or split into individual files. All in your browser.',
    href: '/split',
    color: '#10b981',
  },
];

export default function ToolsPage() {
  return (
    <>
      {/* Header */}
      <header className="site-header sticky-top">
        <Container className="py-3">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <ShieldIcon size={36} />
              <span className="fw-bold fs-5" style={{ color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>PDF <span style={{ color: '#1a56db' }}>Merger</span></span>
            </a>
            <div className="d-flex align-items-center gap-3">
              <a href="/tools" className="text-decoration-none nav-link-custom" style={{ color: '#1a56db' }}>Tools</a>
              <a href="/merge" className="text-decoration-none nav-link-custom" style={{ color: '#64748b' }}>Merge</a>
              <a href="/split" className="text-decoration-none nav-link-custom" style={{ color: '#64748b' }}>Split</a>
              <span className="security-badge d-none d-md-flex">🛡️ 100% Secure</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="hero-section" style={{ padding: '4rem 0 3.5rem' }}>
        <Container className="text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            All PDF Tools<br />
            <span className="gradient-text">Secure & Free</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.05rem' }}>
            Everything you need to work with PDFs — entirely in your browser. No uploads, no servers, no risk.
          </p>
        </Container>
      </section>

      {/* Tools Grid */}
      <Container style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }} className="pb-5">
        <Row className="g-4 justify-content-center">
          {tools.map((tool, i) => (
            <Col md={6} lg={5} key={i}>
              <a href={tool.href} className="text-decoration-none">
                <Card className="tool-card h-100 border-0 p-4 p-md-5">
                  <div className="feature-icon" style={{ background: `${tool.color}15` }}>
                    <span style={{ fontSize: 28 }}>{tool.icon}</span>
                  </div>
                  <h3 className="fw-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>{tool.title}</h3>
                  <p className="mb-3" style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7 }}>{tool.desc}</p>
                  <div className="mt-auto">
                    <span className="fw-bold" style={{ color: tool.color, fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem' }}>
                      Use Tool →
                    </span>
                  </div>
                </Card>
              </a>
            </Col>
          ))}
        </Row>

        {/* Security note */}
        <div className="text-center mt-5">
          <div className="d-inline-flex align-items-center gap-3 p-3 px-4" style={{ background: 'rgba(26,86,219,0.04)', borderRadius: 12, border: '1px solid rgba(26,86,219,0.08)' }}>
            <ShieldIcon size={32} />
            <div className="text-start">
              <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#0f172a' }}>All tools are 100% secure</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Your files are processed in your browser and never uploaded to any server.</div>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <footer className="site-footer py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <a href="/" className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start text-decoration-none">
                <ShieldIcon size={28} />
                <span className="fw-bold" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'Outfit, sans-serif' }}>PDF <span style={{ color: '#60a5fa' }}>Merger</span></span>
              </a>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <small style={{ opacity: 0.7 }}>100% client-side · Files never leave your device</small>
            </Col>
            <Col md={4} className="text-center text-md-end">
              <a href="/tools" className="small">Tools</a>
              <span className="mx-2" style={{ opacity: 0.3 }}>•</span>
              <a href="/merge" className="small">Merge</a>
              <span className="mx-2" style={{ opacity: 0.3 }}>•</span>
              <a href="/split" className="small">Split</a>
              <span className="mx-2" style={{ opacity: 0.3 }}>•</span>
              <a href="https://github.com/ftwtie/pdf-merger" target="_blank" rel="noopener noreferrer" className="small">GitHub</a>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
