import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Player from "video.js/dist/types/player";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { MEDIA_TYPE } from "src/types/Common";
import { useGetGenresQuery } from "src/store/slices/genre";
import { MAIN_PATH } from "src/constant";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store";
import { addToMyList, removeFromMyList } from "src/store/slices/myList";
import CheckIcon from "@mui/icons-material/Check";
import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { useGetAppendedVideosQuery } from "src/store/slices/discover";
import VideoJSPlayer from "./watch/VideoJSPlayer";

interface VideoCardModalProps {
  video: Movie;
  anchorElement: HTMLElement;
}

export default function VideoCardModal({
  video,
  anchorElement,
}: VideoCardModalProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myList = useSelector((state: RootState) => state.myList.items);
  const isInMyList = myList.some((item) => item.id === video.id);

  const { data: configuration } = useGetConfigurationQuery(undefined);
  const { data: genres } = useGetGenresQuery(MEDIA_TYPE.Movie);
  const setPortal = usePortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setDetailType } = useDetailModal();
  const [showVideo, setShowVideo] = useState(false);
  const videoTimerRef = useRef<any>(null);

  const { data: detail } = useGetAppendedVideosQuery({
    mediaType: video.media_type || MEDIA_TYPE.Movie,
    id: video.id,
  });

  const handleReady = useCallback((player: Player) => {
    // Sync with muted/unmuted if needed
  }, []);

  useEffect(() => {
    videoTimerRef.current = setTimeout(() => {
      setShowVideo(true);
    }, 800);

    return () => {
      if (videoTimerRef.current) clearTimeout(videoTimerRef.current);
    };
  }, []);

  const videoJsOptions = useMemo(() => {
    if (!detail?.videos?.results?.[0]) return null;
    return {
      autoplay: true,
      muted: true,
      loop: true,
      controls: false,
      responsive: true,
      fluid: true,
      techOrder: ["youtube"],
      sources: [
        {
          type: "video/youtube",
          src: `https://www.youtube.com/watch?v=${detail.videos.results[0].key}`,
        },
      ],
    };
  }, [detail]);

  const handleMyListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInMyList) {
      dispatch(removeFromMyList(video.id));
    } else {
      dispatch(addToMyList(video));
    }
  };

  return (
    <Card
      onPointerLeave={() => {
        setPortal(null, null);
      }}
      sx={{
        width: rect.width * 1.5,
        height: "100%",
        bgcolor: "#181818",
        color: "white",
        boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        {!showVideo || !videoJsOptions ? (
          <img
            src={video.backdrop_path ? `${configuration?.images.base_url}w780${video.backdrop_path}` : "/assets/placeholder.jpg"}
            style={{
              top: 0,
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
            }}
          />
        ) : (
          <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            <VideoJSPlayer options={videoJsOptions} onReady={handleReady} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            left: 0,
            right: 0,
            bottom: 0,
            px: 2,
            pb: 1,
            position: "absolute",
            background: "linear-gradient(to top, rgba(24,24,24,1), transparent)",
            zIndex: 1,
          }}
        >
          <MaxLineTypography
            maxLine={1}
            sx={{ width: "80%", fontWeight: 700, fontSize: "1.2rem" }}
          >
            {video.title || video.name}
          </MaxLineTypography>
        </Box>
      </Box>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <NetflixIconButton
              sx={{ p: 0, bgcolor: "white", color: "black", "&:hover": { bgcolor: "#e6e6e6" } }}
              onClick={() => navigate(`/${MAIN_PATH.watch}/${video.media_type || MEDIA_TYPE.Movie}/${video.id}`)}
            >
              <PlayCircleIcon sx={{ width: 35, height: 35 }} />
            </NetflixIconButton>
            <NetflixIconButton
              onClick={handleMyListToggle}
              sx={{ border: "2px solid rgba(255,255,255,0.5)", "&:hover": { borderColor: "white" } }}
            >
              {isInMyList ? <CheckIcon sx={{ fontSize: 20 }} /> : <AddIcon sx={{ fontSize: 20 }} />}
            </NetflixIconButton>
            <NetflixIconButton sx={{ border: "2px solid rgba(255,255,255,0.5)", "&:hover": { borderColor: "white" } }}>
              <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
            </NetflixIconButton>
            <Box sx={{ flexGrow: 1 }} />
            <NetflixIconButton
              onClick={() => {
                setDetailType({ mediaType: video.media_type || MEDIA_TYPE.Movie, id: video.id });
              }}
              sx={{ border: "2px solid rgba(255,255,255,0.5)", "&:hover": { borderColor: "white" } }}
            >
              <ExpandMoreIcon sx={{ fontSize: 20 }} />
            </NetflixIconButton>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ color: "#46d369", fontWeight: 700 }}
            >{`${getRandomNumber(100)}% Match`}</Typography>
            <AgeLimitChip label={`${getRandomNumber(20)}+`} />
            <Typography variant="body2" sx={{ color: "white" }}>
              {(video.release_date || video.first_air_date || "").substring(0, 4)}
            </Typography>
            <QualityChip label="HD" />
          </Stack>

          <MaxLineTypography maxLine={3} variant="body2" sx={{ color: "#d2d2d2", fontSize: "0.85rem" }}>
            {video.overview}
          </MaxLineTypography>

          {genres && (
            <GenreBreadcrumbs
              genres={genres
                .filter((genre) => video.genre_ids?.includes(genre.id))
                .map((genre) => genre.name)}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
