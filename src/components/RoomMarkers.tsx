"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import type { KosRoom } from "@/types/kos";

/**
 * Check if a URL is a TikTok link (shortened or full).
 * Handles: vt.tiktok.com, vm.tiktok.com, www.tiktok.com, tiktok.com
 */
function isTiktokUrl(url: string): boolean {
  return /^https?:\/\/(vt\.|vm\.|www\.)?tiktok\.com\//i.test(url);
}

/**
 * Convert social media video URLs into embeddable iframe URLs.
 * Supports: Instagram Reels, YouTube Shorts / regular YouTube
 * Note: TikTok uses oEmbed approach (not iframe), handled separately.
 */
function getVideoEmbedUrl(url: string): { embedUrl: string; platform: string } | null {
  if (!url) return null;
  
  try {
    // Instagram Reels: https://www.instagram.com/reel/ABC123/ or /reels/ABC123/
    const igReelMatch = url.match(/instagram\.com\/(?:reel|reels)\/([\w-]+)/);
    if (igReelMatch) {
      return {
        embedUrl: `https://www.instagram.com/reel/${igReelMatch[1]}/embed`,
        platform: "Instagram"
      };
    }

    // Instagram Post: https://www.instagram.com/p/ABC123/
    const igPostMatch = url.match(/instagram\.com\/p\/([\w-]+)/);
    if (igPostMatch) {
      return {
        embedUrl: `https://www.instagram.com/p/${igPostMatch[1]}/embed`,
        platform: "Instagram"
      };
    }

    // YouTube Shorts: https://youtube.com/shorts/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
    const ytShortsMatch = url.match(/youtube\.com\/shorts\/([\w-]+)/);
    if (ytShortsMatch) {
      return {
        embedUrl: `https://www.youtube.com/embed/${ytShortsMatch[1]}`,
        platform: "YouTube"
      };
    }

    // YouTube regular: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) {
      return {
        embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`,
        platform: "YouTube"
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * TikTok embed component using direct iframe approach.
 *
 * Strategy: resolve the TikTok URL (especially shortened vt./vm. links)
 * to extract the video ID, then embed via iframe at:
 *   https://www.tiktok.com/embed/v2/VIDEO_ID
 *
 * This is far more reliable in React SPAs than the blockquote + embed.js
 * approach, which has timing/caching/DOM lifecycle issues.
 */
function TikTokEmbed({ videoUrl }: { videoUrl: string }) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setVideoId(null);

    // Try to extract video ID from the URL directly first (avoids API call)
    const directMatch = videoUrl.match(/\/video\/(\d+)/);
    if (directMatch) {
      setVideoId(directMatch[1]);
      setLoading(false);
      return;
    }

    // For shortened URLs (vt.tiktok.com, vm.tiktok.com), resolve via API
    fetch('/api/resolve-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: videoUrl }),
    })
      .then(res => res.json())
      .then(data => {
        if (cancelled) return;
        if (data.videoId) {
          setVideoId(data.videoId);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [videoUrl]);

  if (loading) {
    return (
      <div className="mt-3 w-full rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
        <div className="relative w-full aspect-[9/16] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-[12px] text-zinc-400">Memuat video TikTok...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !videoId) {
    // Fallback: show a link to open in TikTok
    return (
      <div className="mt-3 w-full rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full aspect-[9/16] flex items-center justify-center group"
        >
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-[13px] text-zinc-300 font-medium">Tonton di TikTok</span>
            <span className="text-[11px] text-zinc-500">Tap untuk membuka video</span>
          </div>
        </a>
      </div>
    );
  }

  // Direct iframe embed — same approach as YouTube/Instagram
  return (
    <div className="mt-3 w-full rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
      <div className="relative w-full aspect-[9/16]">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          className="absolute inset-0 w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox allow-presentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="TikTok Video"
          style={{ border: 'none' }}
        />
      </div>
      <div className="px-3 py-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[11px] text-zinc-400">TikTok Video</span>
      </div>
    </div>
  );
}

export default function RoomMarkers({ rooms }: { rooms: KosRoom[] }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const activeRoom = rooms.find((r) => r.id === activeModal);

  // Determine video type
  const isTiktok = activeRoom?.video_url ? isTiktokUrl(activeRoom.video_url) : false;

  // For non-TikTok videos (YouTube, Instagram), use iframe approach
  const videoEmbed = useMemo(() => {
    if (!activeRoom?.video_url || isTiktok) return null;
    return getVideoEmbedUrl(activeRoom.video_url);
  }, [activeRoom?.video_url, isTiktok]);

  return (
    <>
      {/* Room Markers — Desktop */}
      {rooms.map((room, index) => (
        <div
          key={room.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-20 pointer-events-auto"
          style={{
            top: room.marker_top || "50%",
            left: room.marker_left || "50%",
            animation: `float ${[3, 4, 3.5, 3][index % 4]}s ease-in-out infinite ${index * 0.5}s`,
          }}
          onClick={() => setActiveModal(room.id)}
        >
          <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center group cursor-pointer">
            <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
              <div className="relative w-[119px] h-[42px]">
                <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                  <span className="text-white font-medium text-[13px]">{room.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Room Markers — Mobile */}
      {rooms.map((room, index) => (
        <div
          key={`mobile-${room.id}`}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex md:hidden flex-col items-center z-20 pointer-events-auto"
          style={{
            top: room.marker_mobile_top || room.marker_top || "50%",
            left: room.marker_mobile_left || room.marker_left || "50%",
            animation: `float ${[3, 4, 3.5, 3][index % 4]}s ease-in-out infinite ${index * 0.5}s`,
          }}
          onClick={() => setActiveModal(room.id)}
        >
          <div className="w-8 h-8 relative flex items-center justify-center group cursor-pointer">
            <Image src="/icon-markers.svg" alt="Marker" width={48} height={48} className="absolute inset-0 w-full h-full drop-shadow-lg transition-opacity duration-300 group-hover:opacity-0" />
            <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none flex items-center justify-center -translate-y-2 drop-shadow-xl">
              <div className="relative w-[119px] h-[42px]">
                <Image src="/icon-markers-hover.svg" alt="Hover bg" fill className="object-contain" />
                <div className="absolute inset-0 flex items-start justify-center pt-[6px] pointer-events-none">
                  <span className="text-white font-medium text-[13px]">{room.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Room Detail Modal */}
      {activeRoom && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
          <div className="relative w-[340px] md:w-[400px] max-h-[85vh] rounded-[24px] md:rounded-[32px] bg-black/40 backdrop-blur-2xl border border-white/20 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-y-auto flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-300 ease-out p-4 md:p-5">
            <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 z-10 p-1.5 bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {activeRoom.image_url && (
              <div className="relative w-full aspect-[3/4] rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
                <Image src={activeRoom.image_url} alt={activeRoom.name} fill className="object-cover" loading="lazy" />
              </div>
            )}
            
            {/* Video Embed — TikTok uses oEmbed approach */}
            {isTiktok && activeRoom.video_url && (
              <TikTokEmbed videoUrl={activeRoom.video_url} />
            )}

            {/* Video Embed — YouTube / Instagram uses iframe approach */}
            {!isTiktok && videoEmbed && (
              <div className="mt-3 w-full rounded-[16px] md:rounded-[20px] overflow-hidden bg-black/50 border border-white/10 shadow-inner">
                <div className="relative w-full aspect-[9/16]">
                  <iframe
                    src={videoEmbed.embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${activeRoom.name} - ${videoEmbed.platform} Video`}
                    style={{ border: 'none' }}
                  />
                </div>
                <div className="px-3 py-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-zinc-400">{videoEmbed.platform} Video</span>
                </div>
              </div>
            )}

            <div className="pt-4 pb-2 px-1">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{activeRoom.name}</h2>
              {activeRoom.description && (
                <p className="text-gray-200 text-xs md:text-[13px] leading-relaxed">{activeRoom.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
