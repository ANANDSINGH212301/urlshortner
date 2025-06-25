import React, { useState } from "react";
import { createCustomShortUrl } from "../Apis/shorturl.api.js";

const CustomUrlForm = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (!url) {
        throw new Error("URL is required");
      }
      
      if (!slug) {
        throw new Error("Custom path is required");
      }
      
      // Validate slug format (alphanumeric and hyphens only)
      if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
        throw new Error("Custom path can only contain letters, numbers, and hyphens");
      }
      
      const data = await createCustomShortUrl(url, slug);
      setShortUrl(data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to create custom URL");
      console.error("Custom URL creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Custom URL</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Path
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
              http://localhost:3000/
            </span>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-custom-url"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Only letters, numbers, and hyphens allowed
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm py-2 px-3 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating..." : "Create Custom URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Your custom URL:</h2>
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
              className={`px-4 py-2 rounded-r-md border border-gray-300 transition-colors duration-300 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomUrlForm;