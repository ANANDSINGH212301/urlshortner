import Url_form from "../components/Url_form";
import UserLinks from "../components/UserLink";

const DashboardPage = () => {
  return (
    <div className="min-h-[90vh] bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">📊 Your Dashboard</h1>
        <p className="text-sm text-center text-gray-500 mb-10">
          Manage and track your shortened links.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Create a New Short URL</h2>
            <Url_form />
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Your Latest Links</h2>
            <UserLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
