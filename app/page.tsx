'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function Home() {
  const [pdf1, setPdf1] = useState<File | null>(null);
  const [pdf2, setPdf2] = useState<File | null>(null);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPdf: (file: File | null) => void) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdf(file);
      setError(null);
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

    setMerging(true);
    setError(null);

    try {
      // Read the PDF files as ArrayBuffers
      const pdf1Bytes = await pdf1.arrayBuffer();
      const pdf2Bytes = await pdf2.arrayBuffer();

      // Load the PDFs
      const pdfDoc1 = await PDFDocument.load(pdf1Bytes);
      const pdfDoc2 = await PDFDocument.load(pdf2Bytes);

      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Copy pages from the first PDF
      const pages1 = await mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
      pages1.forEach((page) => mergedPdf.addPage(page));

      // Copy pages from the second PDF
      const pages2 = await mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
      pages2.forEach((page) => mergedPdf.addPage(page));

      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();

      // Create a blob and download
      const blob = new Blob([mergedPdfBytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Reset the form
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">PDF Merger</h1>
              <p className="text-center text-muted mb-4">
                Upload two PDF files and merge them into a single document
              </p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="pdf1" className="form-label">
                  First PDF File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="pdf1"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, setPdf1)}
                  disabled={merging}
                />
                {pdf1 && (
                  <small className="text-success d-block mt-1">
                    Selected: {pdf1.name}
                  </small>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="pdf2" className="form-label">
                  Second PDF File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="pdf2"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, setPdf2)}
                  disabled={merging}
                />
                {pdf2 && (
                  <small className="text-success d-block mt-1">
                    Selected: {pdf2.name}
                  </small>
                )}
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={mergePDFs}
                disabled={!pdf1 || !pdf2 || merging}
              >
                {merging ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Merging...
                  </>
                ) : (
                  'Merge PDFs'
                )}
              </button>

              <div className="mt-4 text-center">
                <small className="text-muted">
                  Your files are processed locally in your browser. No data is uploaded to any server.
                </small>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5>How to use:</h5>
            <ol className="text-muted">
              <li>Select the first PDF file</li>
              <li>Select the second PDF file</li>
              <li>Click "Merge PDFs" to combine them</li>
              <li>The merged PDF will be automatically downloaded</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
