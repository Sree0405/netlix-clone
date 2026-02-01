import { useEffect, useState, useRef } from "react";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import VideoItemWithHoverPure from "./VideoItemWithHoverPure";
import useWindowSize from "src/hooks/useWindowSize";

interface VideoItemWithHoverProps {
  video: Movie;
}

export default function VideoItemWithHover({ video }: VideoItemWithHoverProps) {
  const setPortal = usePortal();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { width } = useWindowSize();

  const { data: configuration } = useGetConfigurationQuery(undefined);

  useEffect(() => {
    // Disable hover portal for mobile/small screens (width < 900)
    if (isHovered && width && width >= 900) {
      setPortal(elementRef.current, video);
    }
  }, [isHovered, width, setPortal, video]);

  return (
    <VideoItemWithHoverPure
      ref={elementRef}
      handleHover={setIsHovered}
      src={`${configuration?.images.base_url}w300${video.backdrop_path}`}
    />
  );
}
