import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { RootState } from "src/store";
import VideoItemWithHover from "src/components/VideoItemWithHover";

export function Component() {
    const myList = useSelector((state: RootState) => state.myList.items);

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
            <Typography variant="h4" sx={{ color: "white", mb: 4, fontWeight: 700 }}>
                My List
            </Typography>

            {myList.length === 0 ? (
                <Box sx={{ mt: 10, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ color: "#999" }}>
                        You haven't added anything to your list yet.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={1}>
                    {myList.map((video, idx) => (
                        <Grid
                            item
                            key={`${video.id}-${idx}`}
                            xs={6}
                            sm={4}
                            md={3}
                            lg={2}
                            sx={{ mb: 4 }}
                        >
                            <VideoItemWithHover video={video} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

Component.displayName = "MyListPage";
