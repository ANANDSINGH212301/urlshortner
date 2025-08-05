import Url_form from "../components/Url_form";

const HomePage = () => {
  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">🔗 Shortify</h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Paste a long link and create a short, easy-to-share URL.
        </p>
        <Url_form />
      </div>
    </div>
  );
};

export default HomePage;
