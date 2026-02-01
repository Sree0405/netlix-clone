import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { COMMON_TITLES, MAIN_PATH } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import MainLoadingScreen from "src/components/MainLoadingScreen";

export function Component() {
  const { pathname } = useLocation();

  const mediaType = pathname.includes(MAIN_PATH.tvShows)
    ? MEDIA_TYPE.Tv
    : MEDIA_TYPE.Movie;

  const { data: genres, isLoading, isSuccess } = useGetGenresQuery(mediaType);

  if (isLoading) return <MainLoadingScreen />;

    if (isSuccess && genres && genres.length > 0) {
      return (
        <Stack spacing={2} sx={{ bgcolor: "#141414", pb: 10 }}>
          <HeroSection mediaType={mediaType} />
          <Box style={{ marginTop: "10vw", position: "relative", zIndex: 2 }}>
            {[...COMMON_TITLES, ...genres].map((genre: Genre | CustomGenre) => (
              <SliderRowForGenre
                key={genre.id || genre.name}
                genre={genre}
                mediaType={mediaType}
              />
            ))}
          </Box>
        </Stack>
      );
    }
  return null;
}

Component.displayName = "HomePage";

