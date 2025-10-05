"use client";

import { useEffect, useState } from "react";
import style from "./pdf.module.scss";

interface KnowledgeItem {
  id: number;
  title: string;
  description: string;
  fileUrl: string | null;
}

const getFileExtension = (url: string | null): string | null => {
  if (!url) return null;
  const cleanUrl = url.split("?")[0];
  const extMatch = cleanUrl.match(/\.([^.]+)$/);
  return extMatch ? extMatch[1].toLowerCase() : null;
};

export default function KnowledgeList() {
  const [data, setData] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <p className={style.loadingText}>Loading knowledge items...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h1 className={style.heading}>📚 Knowledge Library</h1>

      {data.length === 0 && (
        <div className={style.noItems}>
          <p>No knowledge items found.</p>
        </div>
      )}

      <div className={style.list}>
        {data.map((item) => {
          let fileUrl = item.fileUrl;
          if (fileUrl && !fileUrl.endsWith(".pdf")) {
            fileUrl = `${fileUrl}.pdf`;
          }

          const fileExt = getFileExtension(fileUrl);
          const isPdf = fileExt === "pdf";

          return (
            <div key={item.id} className={style.card}>
              <h2 className={style.title}>{item.title}</h2>
              <p className={style.description}>{item.description}</p>

              {fileUrl ? (
                <div className={style.fileSection}>
                  {isPdf ? (
                    <iframe
                      src={fileUrl}
                      className={style.preview}
                      title={`Preview of ${item.title}`}
                    />
                  ) : (
                    <div className={style.noPreview}>
                      <p>
                        File Type:{" "}
                        <strong>{fileExt ? fileExt.toUpperCase() : "Unknown"}</strong>. No inline
                        preview available.
                      </p>
                    </div>
                  )}

                  <div className={style.buttons}>
                    <a
                      href={fileUrl}
                      download={`${item.title}.pdf`}
                      className={style.downloadBtn}
                    >
                      <svg
                        className={style.icon}
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

                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={style.openBtn}
                    >
                      <svg
                        className={style.icon}
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
                <p className={style.noFile}>No file attached.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
