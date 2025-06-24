import Url_form from "../components/Url_form";

const HomePage = () => {
  return (
    <div className="h-[90vh] bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <Url_form />
      </div>
    </div>
  );
};

export default HomePage;
