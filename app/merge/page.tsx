'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ShieldIcon } from '../components/Logo';

// Declare analytics for TypeScript
declare global {
  interface Window {
    analytics: any;
  }
}

export default function Home() {
  const [pdf1, setPdf1] = useState<File | null>(null);
  const [pdf2, setPdf2] = useState<File | null>(null);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPdf: (file: File | null) => void, fileNumber: number) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdf(file);
      setError(null);
      setSuccess(false);

      // Track PDF file selection event
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('PDF File Selected', {
          file_name: file.name,
          file_size: file.size,
          file_number: fileNumber,
          timestamp: new Date().toISOString()
        });
      }
    } else if (file) {
      setError('Please select a valid PDF file');
      setPdf(null);
    }
  };

  const mergePDFs = async () => {
    if (!pdf1 || !pdf2) {
      setError('Please select both PDF files');
      return;
    }

    // Track merge button click event
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Merge PDF Button Clicked', {
        first_file_name: pdf1.name,
        second_file_name: pdf2.name,
        first_file_size: pdf1.size,
        second_file_size: pdf2.size,
        timestamp: new Date().toISOString()
      });
    }

    setMerging(true);
    setError(null);
    setSuccess(false);

    try {
      const pdf1Bytes = await pdf1.arrayBuffer();
      const pdf2Bytes = await pdf2.arrayBuffer();

      const pdfDoc1 = await PDFDocument.load(pdf1Bytes);
      const pdfDoc2 = await PDFDocument.load(pdf2Bytes);

      const mergedPdf = await PDFDocument.create();

      const pages1 = await mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
      pages1.forEach((page) => mergedPdf.addPage(page));

      const pages2 = await mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
      pages2.forEach((page) => mergedPdf.addPage(page));

      const mergedPdfBytes = await mergedPdf.save();

      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
      setPdf1(null);
      setPdf2(null);
      (document.getElementById('pdf1') as HTMLInputElement).value = '';
      (document.getElementById('pdf2') as HTMLInputElement).value = '';
    } catch (err) {
      setError('Failed to merge PDFs. Please make sure both files are valid PDF documents.');
      console.error(err);
    } finally {
      setMerging(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="site-header sticky-top">
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <a href="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <ShieldIcon size={36} />
              <span className="fw-bold fs-5" style={{ color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>PDF <span style={{ color: '#1a56db' }}>Merger</span></span>
            </a>
            <div className="d-flex align-items-center gap-3">
              <a href="/merge" className="text-decoration-none nav-link-custom" style={{ color: '#1a56db' }}>Merge</a>
              <a href="/split" className="text-decoration-none nav-link-custom" style={{ color: '#64748b' }}>Split</a>
              <span className="security-badge d-none d-md-flex">🛡️ 100% Secure</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '3.5rem 0' }}>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Merge PDF Files<br />
            <span className="gradient-text">Fast, Secure & Free</span>
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.05rem' }}>
            Combine two PDF documents into one — entirely in your browser. Your files never leave your device.
          </p>
        </div>
      </section>

      {/* Main Tool Section */}
      <div className="container pb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Main Card */}
            <div className="tool-card p-4 p-md-5 mb-4">
              {error && (
                <div className="alert alert-danger border-0 mb-4" role="alert">
                  <strong>⚠️ Error:</strong> {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success border-0 mb-4" role="alert">
                  <strong>✓ Success!</strong> Your PDF has been merged and downloaded.
                </div>
              )}

              <div className="row g-4 mb-4">
                {/* First PDF */}
                <div className="col-md-6">
                  <label htmlFor="pdf1" className="form-label fw-semibold text-secondary mb-2">
                    First PDF File
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg file-input-custom"
                    id="pdf1"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, setPdf1, 1)}
                    disabled={merging}
                  />
                  {pdf1 && (
                    <div className="mt-2 p-2 bg-light rounded">
                      <small className="text-success fw-semibold">
                        ✓ {pdf1.name}
                      </small>
                    </div>
                  )}
                </div>

                {/* Second PDF */}
                <div className="col-md-6">
                  <label htmlFor="pdf2" className="form-label fw-semibold text-secondary mb-2">
                    Second PDF File
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-lg file-input-custom"
                    id="pdf2"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, setPdf2, 2)}
                    disabled={merging}
                  />
                  {pdf2 && (
                    <div className="mt-2 p-2 bg-light rounded">
                      <small className="text-success fw-semibold">
                        ✓ {pdf2.name}
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-lg btn-primary-custom px-5"
                  onClick={mergePDFs}
                  disabled={!pdf1 || !pdf2 || merging}
                >
                  {merging ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Merging PDFs...
                    </>
                  ) : (
                    <>
                      <span className="me-2">🔗</span>
                      Merge PDFs
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="text-center">
                  <div className="feature-icon mx-auto">🔒</div>
                  <h6 className="fw-semibold mb-2">100% Secure</h6>
                  <small className="text-muted">
                    Files are processed locally in your browser
                  </small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <div className="feature-icon mx-auto">⚡</div>
                  <h6 className="fw-semibold mb-2">Fast & Free</h6>
                  <small className="text-muted">
                    No upload wait times or file size limits
                  </small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <div className="feature-icon mx-auto">🎯</div>
                  <h6 className="fw-semibold mb-2">Easy to Use</h6>
                  <small className="text-muted">
                    Simple interface, instant results
                  </small>
                </div>
              </div>
            </div>

            {/* How to use */}
            <div className="tool-card p-4">
              <h5 className="fw-bold mb-3">How to merge PDF files:</h5>
              <ol className="mb-0 ps-3">
                <li className="mb-2">
                  <strong>Select your first PDF</strong> using the first file picker
                </li>
                <li className="mb-2">
                  <strong>Select your second PDF</strong> using the second file picker
                </li>
                <li className="mb-2">
                  <strong>Click "Merge PDFs"</strong> to combine them into one document
                </li>
                <li>
                  <strong>Download begins automatically</strong> - your merged PDF will be saved as "merged.pdf"
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
              <a href="/" className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start text-decoration-none">
                <ShieldIcon size={28} />
                <span className="fw-bold" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'Outfit, sans-serif' }}>PDF <span style={{ color: '#60a5fa' }}>Merger</span></span>
              </a>
            </div>
            <div className="col-md-4 text-center mb-3 mb-md-0">
              <small style={{ opacity: 0.7 }}>100% client-side · Files never leave your device</small>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <a href="/merge" className="small">Merge</a>
              <span className="mx-2" style={{ opacity: 0.3 }}>•</span>
              <a href="/split" className="small">Split</a>
              <span className="mx-2" style={{ opacity: 0.3 }}>•</span>
              <a href="https://github.com/ftwtie/pdf-merger" target="_blank" rel="noopener noreferrer" className="small">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
