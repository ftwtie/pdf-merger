'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ShieldIcon } from '../components/Logo';

declare global {
  interface Window {
    analytics: any;
  }
}

type SplitMode = 'extract' | 'every' | 'range';

export default function SplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<SplitMode>('extract');
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [rangeFrom, setRangeFrom] = useState(1);
  const [rangeTo, setRangeTo] = useState(1);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || f.type !== 'application/pdf') {
      setError(f ? 'Please select a valid PDF file' : null);
      return;
    }
    setFile(f);
    setError(null);
    setSuccess(false);
    setSelectedPages(new Set());

    try {
      const bytes = await f.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPageCount();
      setTotalPages(pages);
      setRangeFrom(1);
      setRangeTo(pages);

      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('Split PDF File Selected', {
          file_name: f.name,
          file_size: f.size,
          page_count: pages,
        });
      }
    } catch {
      setError('Could not read PDF. Make sure it\'s a valid file.');
      setFile(null);
    }
  }, []);

  const togglePage = (page: number) => {
    setSelectedPages(prev => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  };

  const splitPDF = async () => {
    if (!file) return;
    setSplitting(true);
    setError(null);
    setSuccess(false);

    try {
      const bytes = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(bytes);

      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('Split PDF Button Clicked', {
          file_name: file.name,
          mode,
          page_count: totalPages,
        });
      }

      if (mode === 'every') {
        // Split into individual pages — download as separate files
        for (let i = 0; i < srcDoc.getPageCount(); i++) {
          const newDoc = await PDFDocument.create();
          const [page] = await newDoc.copyPages(srcDoc, [i]);
          newDoc.addPage(page);
          const pdfBytes = await newDoc.save();
          downloadPdf(pdfBytes, `${file.name.replace('.pdf', '')}_page_${i + 1}.pdf`);
        }
      } else {
        // Extract selected pages or range
        let pageIndices: number[];
        if (mode === 'extract') {
          pageIndices = Array.from(selectedPages).sort((a, b) => a - b);
        } else {
          pageIndices = [];
          for (let i = rangeFrom - 1; i < rangeTo && i < totalPages; i++) {
            pageIndices.push(i);
          }
        }

        if (pageIndices.length === 0) {
          setError('Please select at least one page.');
          setSplitting(false);
          return;
        }

        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(srcDoc, pageIndices);
        pages.forEach(p => newDoc.addPage(p));
        const pdfBytes = await newDoc.save();
        downloadPdf(pdfBytes, `${file.name.replace('.pdf', '')}_split.pdf`);
      }

      setSuccess(true);
    } catch (err) {
      setError('Failed to split PDF. Please make sure the file is valid.');
      console.error(err);
    } finally {
      setSplitting(false);
    }
  };

  const downloadPdf = (bytes: Uint8Array, filename: string) => {
    const blob = new Blob([new Uint8Array(bytes) as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
              <a href="/merge" className="text-decoration-none nav-link-custom" style={{ color: '#64748b' }}>Merge</a>
              <a href="/split" className="text-decoration-none nav-link-custom" style={{ color: '#1a56db' }}>Split</a>
              <span className="security-badge d-none d-md-flex">🛡️ 100% Secure</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="hero-section" style={{ padding: '3.5rem 0' }}>
        <Container className="text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Split PDF Files<br />
            <span className="gradient-text">Fast, Secure & Free</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.05rem' }}>
            Extract specific pages or split into individual files — entirely in your browser. Your files never leave your device.
          </p>
        </Container>
      </section>

      {/* Tool */}
      <Container className="pb-5" style={{ marginTop: '2rem', position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="tool-card p-4 p-md-5 mb-4">
              {error && (
                <div className="alert alert-danger border-0 mb-4" role="alert">
                  <strong>⚠️</strong> {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success border-0 mb-4" role="alert">
                  <strong>✓ Done!</strong> Your split PDF has been downloaded.
                </div>
              )}

              {/* File input */}
              <div className="mb-4">
                <label htmlFor="pdfFile" className="form-label fw-semibold" style={{ color: '#6B7280' }}>
                  Select PDF to Split
                </label>
                <input
                  type="file"
                  className="form-control form-control-lg file-input-custom"
                  id="pdfFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={splitting}
                />
                {file && (
                  <div className="mt-2 p-2 rounded" style={{ background: 'rgba(108,92,231,0.05)' }}>
                    <small className="fw-semibold" style={{ color: '#1a56db' }}>
                      ✓ {file.name} — {totalPages} page{totalPages !== 1 ? 's' : ''}
                    </small>
                  </div>
                )}
              </div>

              {/* Split mode selector */}
              {file && totalPages > 0 && (
                <>
                  <div className="mb-4">
                    <label className="form-label fw-semibold" style={{ color: '#6B7280' }}>Split Mode</label>
                    <div className="d-flex gap-2 flex-wrap">
                      {([
                        ['extract', '🎯 Extract Pages', 'Pick specific pages'],
                        ['range', '📏 Page Range', 'Select a range'],
                        ['every', '📄 Split All', 'One file per page'],
                      ] as const).map(([key, label, desc]) => (
                        <button
                          key={key}
                          className="btn flex-fill text-start p-3"
                          style={{
                            border: mode === key ? '2px solid #1a56db' : '2px solid #E5E7EB',
                            borderRadius: 12,
                            background: mode === key ? 'rgba(108,92,231,0.05)' : 'white',
                          }}
                          onClick={() => setMode(key)}
                        >
                          <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>{label}</div>
                          <small style={{ color: '#6B7280' }}>{desc}</small>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extract mode — page grid */}
                  {mode === 'extract' && (
                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: '#6B7280' }}>
                        Select pages to extract ({selectedPages.size} selected)
                      </label>
                      <div className="d-flex flex-wrap gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            className="btn btn-sm"
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 10,
                              fontWeight: 600,
                              border: selectedPages.has(i) ? '2px solid #1a56db' : '2px solid #E5E7EB',
                              background: selectedPages.has(i) ? 'linear-gradient(135deg, #1a56db, #3b82f6)' : 'white',
                              color: selectedPages.has(i) ? 'white' : '#4B5563',
                            }}
                            onClick={() => togglePage(i)}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Range mode */}
                  {mode === 'range' && (
                    <div className="mb-4">
                      <Row className="g-3">
                        <Col xs={6}>
                          <label className="form-label fw-semibold small" style={{ color: '#6B7280' }}>From page</label>
                          <input
                            type="number"
                            className="form-control"
                            min={1}
                            max={totalPages}
                            value={rangeFrom}
                            onChange={e => setRangeFrom(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                            style={{ borderRadius: 10 }}
                          />
                        </Col>
                        <Col xs={6}>
                          <label className="form-label fw-semibold small" style={{ color: '#6B7280' }}>To page</label>
                          <input
                            type="number"
                            className="form-control"
                            min={1}
                            max={totalPages}
                            value={rangeTo}
                            onChange={e => setRangeTo(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                            style={{ borderRadius: 10 }}
                          />
                        </Col>
                      </Row>
                    </div>
                  )}

                  {/* Every mode info */}
                  {mode === 'every' && (
                    <div className="mb-4 p-3 rounded" style={{ background: 'rgba(0,206,201,0.08)', border: '1px solid rgba(0,206,201,0.15)', borderRadius: 12 }}>
                      <small>
                        📄 This will create <strong>{totalPages} separate PDF files</strong>, one for each page. They&apos;ll download individually.
                      </small>
                    </div>
                  )}
                </>
              )}

              {/* Split button */}
              <div className="text-center">
                <button
                  className="btn btn-lg btn-primary-custom px-5"
                  onClick={splitPDF}
                  disabled={!file || splitting || (mode === 'extract' && selectedPages.size === 0)}
                >
                  {splitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Splitting...
                    </>
                  ) : (
                    <>✂️ Split PDF</>
                  )}
                </button>
              </div>
            </div>

            {/* Features */}
            <Row className="g-4 mb-4">
              <Col md={4} className="text-center">
                <div className="feature-icon mx-auto">🔒</div>
                <h6 className="fw-semibold mb-2">100% Secure</h6>
                <small style={{ color: '#6B7280' }}>Files never leave your browser</small>
              </Col>
              <Col md={4} className="text-center">
                <div className="feature-icon mx-auto">✂️</div>
                <h6 className="fw-semibold mb-2">Multiple Modes</h6>
                <small style={{ color: '#6B7280' }}>Extract, range, or split all pages</small>
              </Col>
              <Col md={4} className="text-center">
                <div className="feature-icon mx-auto">⚡</div>
                <h6 className="fw-semibold mb-2">Instant Results</h6>
                <small style={{ color: '#6B7280' }}>No upload wait — processed locally</small>
              </Col>
            </Row>

            {/* How to */}
            <div className="tool-card p-4">
              <h5 className="fw-bold mb-3">How to split PDF files:</h5>
              <ol className="mb-0 ps-3" style={{ color: '#4B5563' }}>
                <li className="mb-2"><strong>Upload your PDF</strong> — select the file you want to split</li>
                <li className="mb-2"><strong>Choose a split mode</strong> — extract specific pages, a range, or split all</li>
                <li className="mb-2"><strong>Select your pages</strong> — pick exactly which pages you need</li>
                <li><strong>Click Split</strong> — your new PDF downloads instantly</li>
              </ol>
            </div>
          </Col>
        </Row>
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
