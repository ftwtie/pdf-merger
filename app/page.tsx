'use client';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { LogoFull, ShieldIcon } from './components/Logo';

const features = [
  { icon: '🛡️', title: '100% Secure', desc: 'Your files are processed entirely in your browser. Nothing is uploaded to any server — ever.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'Merge PDFs instantly with client-side processing. No waiting for uploads or downloads.' },
  { icon: '🔒', title: 'Complete Privacy', desc: 'Zero data collection. Your documents never leave your device. We can\'t see them even if we wanted to.' },
  { icon: '♾️', title: 'No Limits', desc: 'Merge unlimited files with no size restrictions. No premium paywalls or daily caps.' },
  { icon: '💎', title: 'Free Forever', desc: 'No subscriptions, no hidden fees, no trials. Full functionality, completely free.' },
  { icon: '🌐', title: 'Works Offline', desc: 'Once loaded, works without internet. Your PDFs stay on your machine, always.' },
];

const steps = [
  { num: '01', title: 'Select Your PDFs', desc: 'Drag and drop or browse to select the PDF files you want to combine.' },
  { num: '02', title: 'Arrange & Reorder', desc: 'Organize your files in the exact order you want them in the final document.' },
  { num: '03', title: 'Merge & Download', desc: 'One click to merge. Your combined PDF downloads instantly to your device.' },
];

const testimonials = [
  { name: 'Sarah K.', role: 'Freelance Designer', text: 'Finally a PDF tool that respects my privacy. No uploads, no accounts — just works. This is how all tools should be.', stars: 5 },
  { name: 'Marcus T.', role: 'Law Student', text: 'I handle sensitive case documents daily. Knowing they never leave my laptop gives me peace of mind.', stars: 5 },
  { name: 'Priya R.', role: 'Project Manager', text: 'Our compliance team approved this instantly — client-side processing means zero data risk. Brilliant.', stars: 5 },
  { name: 'Jake W.', role: 'Small Business Owner', text: 'Switched from Adobe. Faster, simpler, and I don\'t have to pay $20/month for basic merging.', stars: 4 },
];

const stats = [
  { number: '100%', label: 'Client-Side Processing' },
  { number: '0', label: 'Files Uploaded to Servers' },
  { number: '∞', label: 'Merges Per Day' },
  { number: '0', label: 'Data Collected' },
];

export default function LandingPage() {
  return (
    <>
      {/* Header */}
      <header className="site-header sticky-top">
        <Container className="py-3">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <ShieldIcon size={36} />
              <div>
                <span className="fw-bold fs-5" style={{ color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>PDF <span style={{ color: '#1a56db' }}>Merger</span></span>
              </div>
            </a>
            <div className="d-flex align-items-center gap-3">
              <a href="/merge" className="text-decoration-none fw-semibold" style={{ color: '#6B7280' }}>Merge</a>
              <a href="/split" className="text-decoration-none fw-semibold" style={{ color: '#6B7280' }}>Split</a>
              <span className="security-badge d-none d-md-flex">
                🛡️ 100% Secure
              </span>
              <Button href="/merge" style={{ background: 'linear-gradient(135deg, #1a56db, #3b82f6)', border: 'none', borderRadius: 10, fontFamily: 'Outfit, sans-serif', fontWeight: 700, padding: '10px 24px' }}>
                Open Tools →
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <Container className="text-center position-relative" style={{ zIndex: 2 }}>
          <div className="hero-badge">
            🛡️ This service is 100% secure — your files never leave your browser
          </div>
          <h1 className="hero-title">
            Merge PDFs in Seconds<br />
            <span className="gradient-text">100% Secure & Private</span>
          </h1>
          <p className="hero-subtitle">
            This service is 100% secure. Combine multiple PDF files into one — entirely in your browser.
            No uploads, no servers, no risk. Your documents stay on your device, always.
          </p>
          <a href="/merge" className="hero-cta">
            Start Merging — It&apos;s Free →
          </a>
          <div className="hero-trust">
            <span>🔒 Zero uploads</span>
            <span>⚡ Instant processing</span>
            <span>🚫 No account needed</span>
            <span>💻 Works offline</span>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <Container>
        <div className="stats-bar">
          <Row className="g-4">
            {stats.map((s, i) => (
              <Col xs={6} md={3} key={i} className="stat-item">
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Features */}
      <section className="py-5 mt-4">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title mb-2">Why Choose PDF Merger?</h2>
            <p className="section-subtitle">Security and simplicity — no compromises.</p>
          </div>
          <Row className="g-4">
            {features.map((f, i) => (
              <Col md={4} key={i}>
                <Card className="tool-card h-100 border-0 p-4">
                  <div className="feature-icon">{f.icon}</div>
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p className="mb-0" style={{ color: '#6B7280', fontSize: '0.95rem' }}>{f.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-5" style={{ background: 'var(--bg-section)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title mb-2">How It Works</h2>
            <p className="section-subtitle">Three simple steps. No signup required.</p>
          </div>
          <Row className="g-4 justify-content-center">
            {steps.map((s, i) => (
              <Col md={4} key={i} className="text-center">
                <div className="step-number">{s.num}</div>
                <h5 className="fw-bold mb-2">{s.title}</h5>
                <p style={{ color: '#6B7280', fontSize: '0.95rem' }}>{s.desc}</p>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Button href="/merge" className="btn-primary-custom px-5 py-3">
              Try It Now — Free & Secure →
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title mb-2">Trusted by Thousands</h2>
            <p className="section-subtitle">See why people choose privacy-first PDF merging.</p>
          </div>
          <Row className="g-4">
            {testimonials.map((t, i) => (
              <Col md={6} lg={3} key={i}>
                <div className="testimonial-card">
                  <div className="testimonial-stars mb-3">
                    {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
                  </div>
                  <p className="testimonial-text mb-3">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-auto">
                    <div className="testimonial-author">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="cta-section py-5">
        <Container className="text-center text-white position-relative" style={{ zIndex: 2 }}>
          <h2 className="fw-bold mb-3" style={{ fontSize: '2.2rem', letterSpacing: '-0.02em' }}>
            Ready to Merge Your PDFs Securely?
          </h2>
          <p className="mb-4" style={{ opacity: 0.85, fontSize: '1.1rem' }}>
            No signup. No uploads. No limits. 100% secure, 100% free.
          </p>
          <Button href="/merge" size="lg" variant="light" className="fw-bold px-5 py-3" style={{ color: '#6C5CE7', borderRadius: 12, fontSize: '1.1rem' }}>
            🔗 Merge PDFs Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="site-footer py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start">
                <ShieldIcon size={28} />
                <span className="fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>PDF <span style={{ color: '#60a5fa' }}>Merger</span></span>
              </div>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <small style={{ opacity: 0.7 }}>
                100% client-side processing · Your files never leave your device
              </small>
            </Col>
            <Col md={4} className="text-center text-md-end">
              <a href="https://github.com/ftwtie/pdf-merger" target="_blank" rel="noopener noreferrer" className="small">
                GitHub
              </a>
              <span className="mx-2" style={{ opacity: 0.3 }}>•</span>
              <a href="/merge" className="small">
                Merge Tool
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
