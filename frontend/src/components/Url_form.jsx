import React, { useState } from "react";
import { createShortUrl, createCustomShortUrl } from "../Apis/shorturl.api.js";
import { useSelector } from "react-redux";

const Url_form = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      let data;
      if (isAuthenticated && slug) {
        data = await createCustomShortUrl(url, slug);
      } else {
        data = await createShortUrl(url);
      }
      setShortUrl(data);
    } catch (err) {
      console.error("Shortening failed:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-gray-300"
        />
      </div>

      {/* Custom Slug */}
      {isAuthenticated && (
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Path
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
              {window.location.origin}/
            </span>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-custom-url"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Only letters, numbers, and hyphens allowed</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition"
      >
        Shorten URL
      </button>

      {/* Output */}
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md border border-gray-300 transition ${
                copied ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
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
