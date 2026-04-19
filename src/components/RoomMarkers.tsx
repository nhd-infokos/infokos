"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import type { KosRoom } from "@/types/kos";

/**
 * Convert social media video URLs into embeddable iframe URLs.
 * Supports: TikTok, Instagram Reels, YouTube Shorts / regular YouTube
 */
function getVideoEmbedUrl(url: string): { embedUrl: string; platform: string } | null {
  if (!url) return null;
  
  try {
    // TikTok: https://www.tiktok.com/@user/video/1234567890
    const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    if (tiktokMatch) {
      return {
        embedUrl: `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`,
        platform: "TikTok"
      };
    }

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

export default function RoomMarkers({ rooms }: { rooms: KosRoom[] }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const activeRoom = rooms.find((r) => r.id === activeModal);

  const videoEmbed = useMemo(() => {
    if (!activeRoom?.video_url) return null;
    return getVideoEmbedUrl(activeRoom.video_url);
  }, [activeRoom?.video_url]);

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
                <Image src={activeRoom.image_url} alt={activeRoom.name} fill className="object-cover" />
              </div>
            )}
            
            {/* Video Embed */}
            {videoEmbed && (
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
