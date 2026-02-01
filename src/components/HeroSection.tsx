import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Player from "video.js/dist/types/player";

import { getRandomNumber } from "src/utils/common";
import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import MoreInfoButton from "./MoreInfoButton";
import NetflixIconButton from "./NetflixIconButton";
import MaturityRate from "./MaturityRate";
import useOffSetTop from "src/hooks/useOffSetTop";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { MEDIA_TYPE } from "src/types/Common";
import {
  useGetVideosByMediaTypeAndCustomGenreQuery,
  useLazyGetAppendedVideosQuery,
} from "src/store/slices/discover";
import { Movie } from "src/types/Movie";
import VideoJSPlayer from "./watch/VideoJSPlayer";

interface TopTrailerProps {
  mediaType: MEDIA_TYPE;
}

export default function TopTrailer({ mediaType }: TopTrailerProps) {
  const { data } = useGetVideosByMediaTypeAndCustomGenreQuery({
    mediaType,
    apiString: "popular",
    page: 1,
  });
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<Player | null>(null);
  const isOffset = useOffSetTop(window.innerWidth * 0.5625);
  const { setDetailType } = useDetailModal();
  const maturityRate = useMemo(() => {
    return getRandomNumber(20);
  }, []);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
  }, []);

  const videoJsOptions = useMemo(() => {
    if (!detail) return null;
    return {
      loop: true,
      muted: true,
      autoplay: true,
      controls: false,
      responsive: true,
      fluid: true,
      techOrder: ["youtube"],
      sources: [
        {
          type: "video/youtube",
          src: `https://www.youtube.com/watch?v=${detail.videos.results[0]?.key || "L3oOldViIgY"}`,
        },
      ],
    };
  }, [detail]);

  useEffect(() => {
    const player = playerRef.current as any;
    if (player) {
      player.ready?.(() => {
        if (isOffset) {
          player.pause?.();
        } else {
          if (player.paused?.()) {
            player.play?.().catch(() => { });
          }
        }
      });
    }
  }, [isOffset]);

  useEffect(() => {
    if (data && data.results) {
      const videos = data.results.filter((item) => !!item.backdrop_path);
      setVideo(videos[getRandomNumber(videos.length)]);
    }
  }, [data]);

  useEffect(() => {
    if (video) {
      getVideoDetail({ mediaType, id: video.id });
    }
  }, [video, getVideoDetail, mediaType]);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  return (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Box
        sx={{
          mb: 3,
          pb: "40%",
          top: 0,
          left: 0,
          right: 0,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "56.25vw",
            position: "absolute",
          }}
        >
          {video && (
            <>
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                }}
              >
                {detail && videoJsOptions && (
                  <VideoJSPlayer
                    options={videoJsOptions}
                    onReady={handleReady}
                  />
                )}
                <Box
                  sx={{
                    background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: "26.09%",
                    opacity: 1,
                    position: "absolute",
                    transition: "opacity .5s",
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    backgroundImage:
                      "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "0px top",
                    backgroundSize: "100% 100%",
                    bottom: 0,
                    position: "absolute",
                    height: "14.7vw",
                    opacity: 1,
                    top: "auto",
                    width: "100%",
                  }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    position: "absolute",
                    right: 0,
                    bottom: "35%",
                  }}
                >
                  <NetflixIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{
                      zIndex: 2,
                      bgcolor: "rgba(0,0,0,0.5)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
                    }}
                  >
                    {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </NetflixIconButton>
                  <MaturityRate sx={{
                    bgcolor: "rgba(51,51,51,0.6)",
                    borderLeft: "3px solid #dcdcdc",
                    width: "100px",
                    py: 0.5,
                    fontSize: "1.1vw"
                  }}>
                    {`${maturityRate}+`}
                  </MaturityRate>
                </Stack>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Stack
                  spacing={2}
                  sx={{
                    bottom: "35%",
                    position: "absolute",
                    left: { xs: "4%", md: "60px" },
                    top: 0,
                    width: { xs: "90%", sm: "60%", md: "40%" },
                    zIndex: 10,
                    justifyContent: "flex-end",
                  }}
                >
                  <MaxLineTypography
                    variant="h2"
                    maxLine={1}
                    sx={{
                      fontWeight: 700,
                      textShadow: "2px 2px 4px rgba(0,0,0,0.45)",
                      fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5vw" }
                    }}
                  >
                    {video.title || video.name}
                  </MaxLineTypography>
                  <MaxLineTypography
                    variant="h6"
                    maxLine={3}
                    sx={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.45)",
                      fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2vw" },
                      fontWeight: 400,
                      width: "100%"
                    }}
                  >
                    {video.overview}
                  </MaxLineTypography>
                  <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                    <PlayButton
                      size="large"
                      mediaType={mediaType}
                      videoId={video.id}
                      sx={{
                        px: { xs: 2, md: 4 },
                        py: { xs: 1, md: 1.5 },
                        fontSize: { xs: "0.9rem", md: "1.2rem" },
                        bgcolor: "white",
                        color: "black",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.75)" }
                      }}
                    />
                    <MoreInfoButton
                      size="large"
                      onClick={() => {
                        setDetailType({ mediaType, id: video.id });
                      }}
                      sx={{
                        px: { xs: 2, md: 4 },
                        py: { xs: 1, md: 1.5 },
                        fontSize: { xs: "0.9rem", md: "1.2rem" },
                        bgcolor: "rgba(109, 109, 110, 0.7)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(109, 109, 110, 0.4)" }
                      }}
                    />
                  </Stack>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
