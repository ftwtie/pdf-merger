# PDF Merger

A simple and user-friendly web application built with Next.js that allows you to merge two PDF files into a single document.

## Features

- **Easy to Use**: Simple interface to upload and merge two PDF files
- **Client-Side Processing**: All PDF processing happens in your browser - no data is uploaded to any server
- **Bootstrap UI**: Clean and responsive design using Bootstrap
- **Instant Download**: Merged PDF is automatically downloaded after processing
- **TypeScript**: Built with TypeScript for type safety

## Technologies Used

- **Next.js 16**: React framework for production
- **TypeScript**: For type-safe code
- **pdf-lib**: PDF manipulation library
- **Bootstrap 5**: For responsive UI components
- **React Bootstrap**: Bootstrap components for React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pdf-merger
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Select the first PDF file using the "First PDF File" input
2. Select the second PDF file using the "Second PDF File" input
3. Click the "Merge PDFs" button
4. The merged PDF will be automatically downloaded as `merged.pdf`

## Build for Production

```bash
npm run build
npm start
```

## Privacy

All PDF processing is done entirely in your browser using the pdf-lib library. No files are uploaded to any server, ensuring your documents remain private and secure.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
