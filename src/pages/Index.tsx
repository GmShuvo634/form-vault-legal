
import PDFFormContainer from "@/components/PDFFormContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            PDF Filler and Submission Portal
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below to create, store, and share your legal documents with ease
          </p>
        </div>

        <PDFFormContainer />

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 PDF Filler and Submission Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
