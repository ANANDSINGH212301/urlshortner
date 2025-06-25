import Url_form from "../components/Url_form";
import CustomUrlForm from "../components/CoustomUrlForm";
import UserLinks from "../components/UserLink";

const DashboardPage = () => {
  return (
    <>
      <div className="h-[90vh] bg-gray-100 p-4">
        <div className="w-full  bg-white rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 ">Dashboard</h1>
          <hr />
          <div className="flex items-center justify-center gap-40 mt-15 mb-37">
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md h-[21rem] w-[27rem]">
                <h2 className="text-xl font-semibold mb-4">Shorten URL</h2>
                <Url_form />
              </div>
            </div>
            <div>
              <UserLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
