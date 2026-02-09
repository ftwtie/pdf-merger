'use client';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const features = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Merge PDFs instantly — everything runs in your browser, no uploading needed.' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your files never leave your device. Zero server uploads, zero risk.' },
  { icon: '♾️', title: 'No Size Limits', desc: 'Merge files of any size without restrictions or premium paywalls.' },
  { icon: '🎯', title: 'Drag & Drop', desc: 'Simple interface — just pick your files and hit merge.' },
  { icon: '💸', title: '100% Free', desc: 'No subscriptions, no hidden fees, no "upgrade to unlock" tricks.' },
  { icon: '🚫', title: 'No Signup', desc: 'Start merging immediately. No account, no email, no nonsense.' },
];

const steps = [
  { num: '1', title: 'Upload Your PDFs', desc: 'Select the PDF files you want to combine using our simple file picker.' },
  { num: '2', title: 'Arrange Order', desc: 'Choose which PDF comes first — your merged file follows your order.' },
  { num: '3', title: 'Merge & Download', desc: 'Click merge and your combined PDF downloads instantly. Done!' },
];

const testimonials = [
  { name: 'Sarah K.', role: 'Freelance Designer', text: 'Finally a PDF tool that doesn\'t try to charge me $12/month for something this simple. Love it!', stars: 5 },
  { name: 'Marcus T.', role: 'Law Student', text: 'I merge case documents daily. This is faster than any desktop app I\'ve tried, and it\'s free.', stars: 5 },
  { name: 'Priya R.', role: 'Project Manager', text: 'The fact that files stay on my computer is a huge deal for our compliance team. Bookmarked!', stars: 5 },
  { name: 'Jake W.', role: 'Small Business Owner', text: 'Used to use Adobe for this. Switched here and never looked back. Simple and just works.', stars: 4 },
];

export default function LandingPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky-top">
        <Container className="py-3">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="h4 mb-0 fw-bold" style={{ color: '#1D9D58' }}>
              📄 PDF Merger
            </h1>
            <Button href="/merge" variant="outline-success" size="sm" className="fw-semibold">
              Open Tool →
            </Button>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="hero-section" style={{ padding: '5rem 0' }}>
        <Container className="text-center">
          <h1 className="display-4 fw-bold mb-3">Merge PDFs in Seconds — 100% Secure</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: 600, opacity: 0.9 }}>
            This service is 100% secure. Combine multiple PDF files into one document — right in your browser. 
            No uploads, no signups, no limits. Your files never leave your device.
          </p>
          <Button href="/merge" size="lg" className="btn-primary-custom px-5 py-3 fs-5">
            🔗 Start Merging — It&apos;s Free
          </Button>
          <p className="mt-3 mb-0" style={{ opacity: 0.7 }}>
            <small>No account required • Works offline • Files stay on your device</small>
          </p>
        </Container>
      </section>

      {/* Features */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-2">Why PDF Merger?</h2>
          <p className="text-center text-muted mb-5">Everything you need, nothing you don&apos;t.</p>
          <Row className="g-4">
            {features.map((f, i) => (
              <Col md={4} key={i}>
                <Card className="tool-card h-100 border-0 p-4 text-center">
                  <div className="feature-icon mx-auto">{f.icon}</div>
                  <h5 className="fw-bold mb-2">{f.title}</h5>
                  <p className="text-muted mb-0 small">{f.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-5" style={{ background: 'white' }}>
        <Container>
          <h2 className="text-center fw-bold mb-2">How It Works</h2>
          <p className="text-center text-muted mb-5">Three steps. That&apos;s it.</p>
          <Row className="g-4 justify-content-center">
            {steps.map((s, i) => (
              <Col md={4} key={i} className="text-center">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #1D9D58, #16a34a)', color: 'white', fontSize: 24, fontWeight: 700 }}
                >
                  {s.num}
                </div>
                <h5 className="fw-bold mb-2">{s.title}</h5>
                <p className="text-muted small">{s.desc}</p>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button href="/merge" className="btn-primary-custom px-5">
              Try It Now →
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-2">What People Are Saying</h2>
          <p className="text-center text-muted mb-5">Join thousands who merge smarter.</p>
          <Row className="g-4">
            {testimonials.map((t, i) => (
              <Col md={6} lg={3} key={i}>
                <Card className="tool-card h-100 border-0 p-4">
                  <div className="mb-2" style={{ color: '#f59e0b' }}>
                    {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
                  </div>
                  <p className="small mb-3">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-auto">
                    <strong className="small">{t.name}</strong>
                    <br />
                    <small className="text-muted">{t.role}</small>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #1D9D58 0%, #16a34a 100%)' }}>
        <Container className="text-center text-white">
          <h2 className="fw-bold mb-3">Ready to Merge Your PDFs?</h2>
          <p className="mb-4" style={{ opacity: 0.9 }}>No signup. No limits. Just results.</p>
          <Button href="/merge" size="lg" variant="light" className="fw-bold px-5 py-3" style={{ color: '#1D9D58' }}>
            🔗 Merge PDFs Now
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-white border-top py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
              <strong style={{ color: '#1D9D58' }}>📄 PDF Merger</strong>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <small className="text-muted">
                Built with Next.js &bull; 100% client-side &bull; Open source
              </small>
            </Col>
            <Col md={4} className="text-center text-md-end">
              <a href="https://github.com/ftwtie/pdf-merger" target="_blank" rel="noopener noreferrer" className="text-muted small">
                GitHub
              </a>
              <span className="text-muted mx-2">•</span>
              <a href="/merge" className="text-muted small">
                Merge Tool
              </a>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
