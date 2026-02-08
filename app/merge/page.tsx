'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

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
      <header className="bg-white shadow-sm">
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="h4 mb-0 fw-bold" style={{ color: '#1D9D58' }}>
              📄 PDF Merger
            </h1>
            <nav>
              <a
                href="https://github.com/ftwtie/pdf-merger"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <small className="text-muted">View on GitHub →</small>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-3">Merge PDF files</h1>
          <p className="lead mb-0">
            Combine two PDF documents into one file. Fast, free, and secure.
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
      <footer className="bg-white border-top mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <small className="text-muted">
                Built with Next.js, TypeScript & pdf-lib
              </small>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <small className="text-muted">
                Open source on{' '}
                <a
                  href="https://github.com/ftwtie/pdf-merger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  GitHub
                </a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
