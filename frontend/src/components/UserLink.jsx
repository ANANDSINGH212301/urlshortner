import React, { useState} from "react";
import { getUserUrls } from "../Apis/shorturl.api.js";
import {useQuery} from "@tanstack/react-query"

const UserLinks = () => {
  const {
    data: links,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getUserUrls,
    refetchInterval: 30000, //30 sec
    staleTime: 0,
  });
  console.log(links)
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-[19.7rem] w-[25rem]">
        <h2 className="text-xl font-semibold mb-4">Your Links</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md h-[19.7rem] w-[25rem]">
        <h2 className="text-xl font-semibold mb-4">Your Links</h2>
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[19.7rem] w-[25rem] overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Your Links</h2>

      {links.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          You haven't created any links yet.
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link._id}
              className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="truncate max-w-[70%]">
                  <p className="text-sm font-medium text-blue-600 truncate">
                    {link.short_url}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {link.full_url}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(link.short_url, link._id)}
                  className={`text-xs px-2 py-1 rounded ${
                    copiedId === link._id
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {copiedId === link._id ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Clicks: {link.clicks || 0}</span>
                <span>{new Date(link.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLinks;
