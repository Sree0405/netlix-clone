import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        bgcolor: "#0b0b0b",
        color: "grey.400",
        px: { xs: 3, md: 10 },
        py: 8,
        overflow: "hidden",
      }}
    >
      {/* subtle red glow */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(229,9,20,0.25), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Divider sx={{ mb: 6, borderColor: "grey.800" }} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={8}
        justifyContent="space-between"
      >
        {/* ABOUT YOU */}
        <Box maxWidth={480}>
          <Typography
            variant="h5"
            sx={{ color: "grey.100", fontWeight: 600, mb: 2 }}
          >
            Sreekanth — Full-Stack Developer
          </Typography>

          <Typography variant="body2" lineHeight={1.8}>
            I build modern, scalable web applications with a strong focus on
            performance, clean architecture, and polished user experience.
            Passionate about React ecosystems, backend systems, automation, and
            real-world product engineering.
          </Typography>

          <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
            {[
              "React",
              "TypeScript",
              "VITE",
              "Backend APIs",
              "Material UI",
            ].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "grey.300",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* LINKS */}
        <Box minWidth={220}>
          <Typography
            variant="h6"
            sx={{ color: "grey.100", fontWeight: 500, mb: 2 }}
          >
            Connect with me
          </Typography>

          <Stack spacing={2}>
            {[
              {
                label: "Portfolio",
                url: "https://sreefolio.vercel.app/",
              },
              {
                label: "GitHub",
                url: "https://github.com/crazy-man22",
              },
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com",
              },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.url}
                target="_blank"
                underline="none"
                sx={{
                  color: "grey.400",
                  fontSize: 15,
                  position: "relative",
                  width: "fit-content",
                  transition: "color 0.3s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -3,
                    width: "0%",
                    height: 2,
                    bgcolor: "#e50914",
                    transition: "width 0.3s ease",
                  },
                  "&:hover": {
                    color: "grey.100",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* FOOTER BOTTOM */}
      <Divider sx={{ my: 6, borderColor: "grey.800" }} />

      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: "grey.600",
          letterSpacing: 0.4,
        }}
      >
        © {new Date().getFullYear()} Sreekanth • Built with React • Designed for
        performance & scalability
      </Typography>
    </Box>
  );
}
