import React, { useState, useEffect } from "react";
import { getUserUrls } from "../Apis/shorturl.api.js";

const UserLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getUserUrls();
        setLinks(data.urls);
      } catch {
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <p className="text-sm text-gray-400">Loading links...</p>;

  if (!links.length) return <p className="text-sm text-gray-400">No links created yet.</p>;

  return (
    <div className="space-y-4 max-h-[300px] overflow-auto">
      {links.map((link) => (
        <div key={link._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="w-3/4 overflow-hidden">
              <a
                href={link.short_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-medium hover:underline truncate block"
              >
                {link.short_url}
              </a>
              <p className="text-sm text-gray-500 truncate">{link.full_url}</p>
            </div>
            <button
              onClick={() => handleCopy(link.short_url, link._id)}
              className={`text-xs px-3 py-1 rounded-md ${
                copiedId === link._id
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {copiedId === link._id ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">Clicks: {link.clicks || 0}</div>
        </div>
      ))}
    </div>
  );
};

export default UserLinks;
