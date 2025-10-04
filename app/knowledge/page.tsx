"use client";

import { useEffect, useState } from "react";

interface KnowledgeItem {
  id: number;
  title: string;
  description: string;
  fileUrl: string | null;
}

// ✅ Helper: get file extension
const getFileExtension = (url: string | null): string | null => {
  if (!url) return null;
  const cleanUrl = url.split("?")[0];
  const extMatch = cleanUrl.match(/\.([^.]+)$/);
  return extMatch ? extMatch[1].toLowerCase() : null;
};

export default function KnowledgeList() {
  const [data, setData] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dashboard-rho-lake.vercel.app/api/knowledge");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Loading UI
  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-6 flex justify-center">
        <p className="text-lg text-gray-500">Loading knowledge items...</p>
      </div>
    );

  // ✅ Main Content
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-2 text-center">
        📚 Knowledge Library
      </h1>

      {data.length === 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
          <p className="text-gray-600">No knowledge items found.</p>
        </div>
      )}

      <div className="space-y-6">
        {data.map((item) => {
          // ✅ Ensure .pdf extension
          let fileUrl = item.fileUrl;
          if (fileUrl && !fileUrl.endsWith(".pdf")) {
            fileUrl = `${fileUrl}.pdf`;
          }

          const fileExt = getFileExtension(fileUrl);
          const isPdf = fileExt === "pdf";

          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-2 text-center">
                {item.title}
              </h2>

              <p className="text-gray-600 mb-4 border-l-4 border-indigo-200 pl-3">
                {item.description}
              </p>

              {fileUrl ? (
                <div className="mt-5 border-t pt-4">
                  {isPdf ? (
                    <iframe
                      src={fileUrl}
                      className="w-full h-96 border border-gray-300 rounded-lg mb-4"
                      title={`Preview of ${item.title}`}
                    />
                  ) : (
                    <div className="p-3 mb-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded">
                      <p className="text-sm font-medium">
                        File Type:{" "}
                        <strong>{fileExt ? fileExt.toUpperCase() : "Unknown"}</strong>.
                        No inline preview available.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 justify-center">
                    {/* ✅ Download Button */}
                    <a
                      href={fileUrl}
                      download={`${item.title}.pdf`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v7a1 1 0 11-2 0V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Download PDF
                    </a>

                    {/* ✅ Open in New Tab */}
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                      Open in New Tab
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 italic">No file attached.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
