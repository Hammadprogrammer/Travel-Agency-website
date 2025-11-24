"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import style from "./pdf.module.scss";

interface KnowledgeItem {
  id: number;
  title: string;
  description: string;
  fileUrl: string | null;
  publicId: string | null;
  isActive: boolean;
}

const App = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_ENDPOINT = "https://dashboard-rho-lake.vercel.app/api/knowledge";

  const fetchItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINT);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch knowledge items.");
      }

      const data: KnowledgeItem[] = await res.json();
      setItems(data.filter((item) => item.isActive));
    } catch (err) {
      const fetchError = err as Error;
      console.error("Fetch Error:", fetchError.message);
      setError(`Failed to load data: ${fetchError.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const isUrdu = (text: string | null) => {
    if (!text) return false;
    const urduRegex = /[\u0600-\u06FF]/;
    return urduRegex.test(text);
  };

  const handleDownload = async (url: string, title: string, id: number) => {
    if (!url) return;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch file (Status: ${res.status})`);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      const safeTitle = (title.trim() || `knowledge_file_${id}`)
        .replace(/[^a-z0-9\s]/gi, "_")
        .toLowerCase();

      link.download = safeTitle.endsWith(".pdf") ? safeTitle : `${safeTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      const error = err as Error;
      console.error("Download failed:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <header className={style.header}>
          <h1 className={style.title}>Knowledge Base Material</h1>
        </header>

        {isLoading && (
          <div className={style.loading}>
            <div className={style.spinner}></div>
            <p>Loading knowledge items...</p>
          </div>
        )}

        {error && (
          <div className={style.errorBox}>
            <p className={style.errorTitle}>Error Loading Data</p>
            <p className={style.errorText}>{error}</p>
            <button onClick={fetchItems} className={style.retryBtn}>
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && items.length === 0 && (
          <div className={style.emptyBox}>
            <p>No active knowledge documents found.</p>
          </div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className={style.grid}>
            {items.map((item) => {
              const urduTitle = isUrdu(item.title);
              const urduDesc = isUrdu(item.description);
              return (
                <div
                  key={item.id}
                  className={`${style.card} ${
                    urduTitle || urduDesc ? style.rtl : style.ltr
                  }`}
                >
                  <h2 className={style.cardTitle}>
                    {item.title || `Document #${item.id}`}
                  </h2>
                  <p className={style.cardDesc}>
                    {item.description ||
                      "No detailed description available for this document."}
                  </p>
                  <div className={style.cardFooter}>
                    {item.fileUrl ? (
                      <button
                        onClick={() =>
                          handleDownload(item.fileUrl!, item.title!, item.id)
                        }
                        className={style.downloadBtn}
                        disabled={isLoading}
                      >
                        <ArrowDownTrayIcon className={style.downloadIcon} /> Download PDF
                      </button>
                    ) : (
                      <div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
