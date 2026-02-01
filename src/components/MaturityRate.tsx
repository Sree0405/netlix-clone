import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

export default function MaturityRate({ children, sx, ...others }: { children: ReactNode } & BoxProps) {
  return (
    <Box
      {...others}
      sx={{
        py: 1,
        pl: 1.5,
        pr: 3,
        fontSize: 22,
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        border: "3px #dcdcdc",
        borderLeftStyle: "solid",
        bgcolor: "#33333399",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
