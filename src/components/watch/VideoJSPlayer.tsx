import { useEffect, useRef } from "react";
import Player from "video.js/dist/types/player";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

export default function VideoJSPlayer({
  options,
  onReady,
}: {
  options: any;
  onReady: (player: Player) => void;
}) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      if (!videoRef.current) return;

      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const playerOptions = {
        techOrder: ["html5", "youtube"],
        ...options,
      };

      const player = (playerRef.current = videojs(videoElement, playerOptions, () => {
        player.ready(() => {
          onReady && onReady(player);
        });
      }));
    } else {
      const player = playerRef.current as any;

      // Update existing player source if it changed
      const currentSrc = player.currentSrc?.() || player.src?.();
      const newSrc = options.sources?.[0]?.src;

      if (newSrc && currentSrc !== newSrc) {
        player.src(options.sources);
      }

      if (options.autoplay) {
        player.ready?.(() => {
          player.play?.().catch(() => {
            // Autoplay might be blocked by browser
            console.log("Autoplay blocked");
          });
        });
      }

      player.width?.(options.width);
      player.height?.(options.height);
    }
  }, [options, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
