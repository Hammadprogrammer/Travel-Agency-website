"use client";

import { useEffect, useState } from "react";

interface KnowledgeItem {
  id: number;
  title: string;
  description: string;
  fileUrl: string | null;
}

// Helper to determine file type for display/logic
const getFileExtension = (url: string | null): string | null => {
  if (!url) return null;
  const cleanUrl = url.split('?')[0];
  const extensionMatch = cleanUrl.match(/\.([^.]+)$/);
  return extensionMatch ? extensionMatch[1].toLowerCase() : null;
};

export default function KnowledgeList() {
  const [data, setData] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // NOTE: Adjusted the fetch URL to a relative path for typical Next.js setup
        const res = await fetch("/api/knowledge"); 
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

  if (loading) return (
    <div className="max-w-3xl mx-auto p-6 flex justify-center">
        <p className="text-lg text-gray-500">Loading knowledge items...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 border-b pb-2">
        📚 Knowledge Library
      </h1>
      
      {data.length === 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <p className="text-gray-600">No knowledge items found.</p>
        </div>
      )}
      
      <div className="space-y-6">
        {data.map((item) => {
          const fileExt = getFileExtension(item.fileUrl);
          const isPdf = fileExt === 'pdf';

          return (
            <div
              key={item.id}
              // Tailwind styles for a modern card design
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-bold text-indigo-700 mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4 border-l-4 border-indigo-200 pl-3">
                {item.description}
              </p>

              {item.fileUrl && (
                <div className="mt-5 border-t pt-4">
                  {isPdf ? (
                    // Inline PDF viewer
                    <iframe
                      src={item.fileUrl}
                      className="w-full h-96 border border-gray-300 rounded-lg mb-4"
                      title={`Preview of ${item.title}`}
                    />
                  ) : (
                    // Alert for non-embeddable files
                    <div className="p-3 mb-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded">
                      <p className="text-sm font-medium">
                        File Type: **{fileExt ? fileExt.toUpperCase() : 'Unknown'}**. No inline preview available.
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    {/* Download Button - Primary Action */}
                    <a
                      href={item.fileUrl}
                      download
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10 3a1 1 0 011 1v7a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      Download {fileExt?.toUpperCase() || 'File'}
                    </a>
                    
                    {/* Open in New Tab Button - Secondary Action */}
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      Open in New Tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}