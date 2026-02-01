import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

function MainLoadingScreen() {
  const audioRef = useRef(null);

  // useEffect(() => {
  //   // Play sound once
  //   if (audioRef.current) {
  //     audioRef.current.volume = 0.8;
  //     audioRef.current.play().catch(() => {});
  //   }

  //   // Hide loader after animation
  //   const timer = setTimeout(() => {
  //     onFinish?.();
  //   }, 2800);

  //   return () => clearTimeout(timer);
  // }, [onFinish]);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflow: "hidden"
      }}
    >
      {/* Sound */}
      {/* <audio ref={audioRef} src="/assets/netflix-intro.mp3" /> */}

      {/* Logo */}
      <Box
        component="img"
        src="/assets/netflix-logo.png"
        sx={{
          width: 180,
          animation: "netflixIntro 2.8s ease-in-out forwards",
          filter: "drop-shadow(0 0 20px rgba(229,9,20,0.6))",

          "@keyframes netflixIntro": {
            "0%": {
              opacity: 0,
              transform: "scale(0.6)"
            },
            "20%": {
              opacity: 1,
              transform: "scale(1.05)"
            },
            "50%": {
              transform: "scale(1)",
              filter: "drop-shadow(0 0 40px rgba(229,9,20,0.9))"
            },
            "80%": {
              opacity: 1
            },
            "100%": {
              opacity: 0,
              transform: "scale(1.4)"
            }
          }
        }}
      />
    </Box>
  );
}

export default MainLoadingScreen;
