import React, { useState } from "react";
import { createShortUrl, createCustomShortUrl } from "../Apis/shorturl.api.js";
import { useSelector } from "react-redux";

const Url_form = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!url) {
        setError("Please enter a valid URL.");
        return;
      }

      let result;
      if (isAuthenticated && slug) {
        result = await createCustomShortUrl(url, slug);
      } else {
        result = await createShortUrl(url);
      }
      setShortUrl(result);
    } catch (err) {
      setError("Something went wrong. Please try again.",err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Paste a long URL to shorten</h2>
        <input
          type="url"
          placeholder="https://example.com"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      {isAuthenticated && (
        <div>
          <label className="block text-sm text-gray-600 mb-1">Custom Path (optional)</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md text-gray-500 text-sm">
              {window.location.origin}/
            </span>
            <input
              type="text"
              placeholder="custom-path"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Only letters, numbers, and hyphens are allowed.</p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 font-medium mb-2">Your shortened URL:</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 px-3 py-2 bg-white border rounded-md text-sm"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 rounded-md text-white text-sm transition ${
                copied ? "bg-green-500" : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Url_form;
