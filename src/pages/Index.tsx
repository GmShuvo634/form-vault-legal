import PDFFormContainer from "@/components/PDFFormContainer";

const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};
const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <PDFFormContainer />

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>`© {getCurrentYear()} All rights reserved oustKotek.com`</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
