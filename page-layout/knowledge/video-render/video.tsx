"use client";
import { useState, useEffect } from "react";
import style from "./video.module.scss";

interface VideoItem {
  id: number;
  title: string;
  description: string | null;
  videoUrl: string;
  isActive: boolean;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await fetch("https://dashboard-rho-lake.vercel.app/api/videos", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.spinner}></div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h1 className={style.heading}> Videos</h1>

      {videos.length === 0 ? (
        <p className={style.noVideos}>No videos available yet.</p>
      ) : (
        <div className={style.videoList}>
          {videos.map((video) => (
            <div key={video.id} className={style.videoCard}>
              <h2 className={style.title}>{video.title}</h2>
              <p className={style.description}>
                {video.description || "No description provided."}
              </p>

              <div className={style.videoWrapper}>
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className={style.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
