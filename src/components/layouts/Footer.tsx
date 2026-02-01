import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#050505",
        color: "grey.400",
        px: { xs: 3, md: 12 },
        py: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient cinematic gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(229,9,20,0.08), transparent 40%)",
          pointerEvents: "none",
        }}
      />

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={10}
        justifyContent="space-between"
        position="relative"
        zIndex={1}
      >
        {/* CREATOR BLOCK */}
        <Box maxWidth={520}>
          <Typography
            variant="overline"
            sx={{
              color: "#e50914",
              letterSpacing: 2,
              mb: 1,
              display: "block",
            }}
          >
            CREATED BY
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "grey.100",
              mb: 2,
            }}
          >
            Sreekanth
          </Typography>

          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.9,
              maxWidth: 480,
            }}
          >
            Full-stack developer focused on crafting scalable, high-performance
            web experiences. Passionate about React ecosystems, clean
            architecture, and building production-ready products that feel
            polished, fast, and intuitive.
          </Typography>

          <Stack direction="row" spacing={1} mt={4} flexWrap="wrap">
            {[
              "React",
              "TypeScript",
              "Vite",
              "Material UI",
              "API Architecture",
              "Frontend Engineering",
            ].map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "grey.300",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 12,
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* ACTION LINKS */}
        <Box>
          <Typography
            variant="overline"
            sx={{
              color: "grey.500",
              letterSpacing: 2,
              mb: 3,
              display: "block",
            }}
          >
            EXPLORE MORE
          </Typography>

          <Stack spacing={3}>
            {[
              {
                label: "View Portfolio",
                url: "https://sreefolio.vercel.app/",
                accent: true,
              },
              {
                label: "GitHub Projects",
                url: "https://github.com/Sree0405",
              },
              {
                label: "LinkedIn Profile",
                url: "https://in.linkedin.com/in/sreekanth04052005",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.url}
                target="_blank"
                underline="none"
                sx={{
                  fontSize: 16,
                  fontWeight: item.accent ? 600 : 400,
                  color: item.accent ? "#e50914" : "grey.300",
                  width: "fit-content",
                  position: "relative",
                  transition: "transform 0.25s ease, color 0.25s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: "0%",
                    height: 2,
                    bgcolor: item.accent ? "#e50914" : "grey.500",
                    transition: "width 0.3s ease",
                  },
                  "&:hover": {
                    transform: "translateX(6px)",
                    color: "#fff",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                → {item.label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* BOTTOM */}
      <Divider sx={{ my: 8, borderColor: "grey.800" }} />

      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: "grey.600",
          letterSpacing: 0.5,
        }}
      >
        © {new Date().getFullYear()} Sreekanth · Netflix-inspired UI · Built for
        performance & real-world scale
      </Typography>
    </Box>
  );
}
