import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSearchQuery } from "src/store/slices/discover";
import VideoItemWithHover from "src/components/VideoItemWithHover";
import Skeleton from "@mui/material/Skeleton";

export function Component() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = useSearchQuery(
        { query, page },
        { skip: !query }
    );

    const renderSkeletons = () => (
        <Grid container spacing={1.5}>
            {[...Array(12)].map((_, i) => (
                <Grid item key={i} xs={6} sm={4} md={3} lg={2.4} xl={2}>
                    <Skeleton variant="rectangular" height={150} sx={{ bgcolor: "grey.900", borderRadius: 1 }} />
                </Grid>
            ))}
        </Grid>
    );

    if (isLoading) {
        return (
            <Container maxWidth={false} sx={{ px: { xs: "4%", md: "60px" }, pt: "120px", minHeight: "100vh", bgcolor: "#141414" }}>
                <Typography variant="h5" sx={{ color: "white", mb: 4 }}><Skeleton width={200} /></Typography>
                {renderSkeletons()}
            </Container>
        );
    }

    return (
        <Container
            maxWidth={false}
            sx={{
                px: { xs: "4%", md: "60px" },
                pt: "120px",
                minHeight: "100vh",
                bgcolor: "#141414",
            }}
        >
            <Typography variant="h5" sx={{ color: "#999", mb: 3 }}>
                Explore titles related to: <span style={{ color: "white" }}>{query}</span>
            </Typography>

            {!data?.results?.length && !isFetching ? (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ color: "white" }}>
                        Your search for "{query}" did not have any matches.
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
                        Suggestions:
                        <ul style={{ marginTop: "10px" }}>
                            <li>Try different keywords</li>
                            <li>Looking for a movie or TV show?</li>
                            <li>Try using a movie, TV show title, or a genre</li>
                        </ul>
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={6}>
                    {/* Tamil & Telugu results first */}
                    {data?.results?.some(item => item.original_language === 'ta' || item.original_language === 'te') && (
                        <Box>
                            <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
                                Regional (Tamil & Telugu)
                            </Typography>
                            <Grid container spacing={1.5}>
                                {data.results
                                    .filter(item => item.original_language === 'ta' || item.original_language === 'te')
                                    .map((video, idx) => (
                                        <Grid item key={`${video.id}-${idx}`} xs={6} sm={4} md={3} lg={2.4} xl={2}>
                                            <VideoItemWithHover video={video} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Box>
                    )}

                    {/* Movies */}
                    {data?.results?.some(item => (item.media_type === 'movie' || !item.media_type) && item.original_language !== 'ta' && item.original_language !== 'te') && (
                        <Box>
                            <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
                                Movies
                            </Typography>
                            <Grid container spacing={1.5}>
                                {data.results
                                    .filter(item => (item.media_type === 'movie' || !item.media_type) && item.original_language !== 'ta' && item.original_language !== 'te')
                                    .map((video, idx) => (
                                        <Grid item key={`${video.id}-${idx}`} xs={6} sm={4} md={3} lg={2.4} xl={2}>
                                            <VideoItemWithHover video={video} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Box>
                    )}

                    {/* TV Shows */}
                    {data?.results?.some(item => item.media_type === 'tv' && item.original_language !== 'ta' && item.original_language !== 'te') && (
                        <Box>
                            <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 700 }}>
                                TV Shows
                            </Typography>
                            <Grid container spacing={1.5}>
                                {data.results
                                    .filter(item => item.media_type === 'tv' && item.original_language !== 'ta' && item.original_language !== 'te')
                                    .map((video, idx) => (
                                        <Grid item key={`${video.id}-${idx}`} xs={6} sm={4} md={3} lg={2.4} xl={2}>
                                            <VideoItemWithHover video={video} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Box>
                    )}
                </Stack>
            )}
        </Container>
    );
}

Component.displayName = "SearchPage";
