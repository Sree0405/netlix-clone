import { useRef } from "react";
import { motion } from "framer-motion";
import Portal from "@mui/material/Portal";

import VideoCardPortal from "./VideoCardPortal";
import MotionContainer from "./animate/MotionContainer";
import {
  varZoomIn,
  varZoomInLeft,
  varZoomInRight,
} from "./animate/variants/zoom/ZoomIn";
import { usePortalData } from "src/providers/PortalProvider";

export default function VideoPortalContainer() {
  const { miniModalMediaData, anchorElement } = usePortalData();
  const container = useRef(null);
  const rect = anchorElement?.getBoundingClientRect();

  const hasToRender = !!miniModalMediaData && !!anchorElement;
  let isFirstElement = false;
  let isLastElement = false;
  let variant = varZoomIn;
  if (hasToRender) {
    const parentElement = anchorElement.closest(".slick-active");
    const nextSiblingOfParentElement = parentElement?.nextElementSibling;
    const previousSiblingOfParentElement =
      parentElement?.previousElementSibling;
    if (!previousSiblingOfParentElement?.classList.contains("slick-active")) {
      isFirstElement = true;
      variant = varZoomInLeft;
    } else if (
      !nextSiblingOfParentElement?.classList.contains("slick-active")
    ) {
      isLastElement = true;
      variant = varZoomInRight;
    }
  }

  return (
    <>
      <motion.div
        ref={container}
        variants={variant}
        style={{
          zIndex: 9999,
          position: "fixed", // Use fixed to escape stacking context better if portaled
          pointerEvents: "none", // Container should not block events
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {hasToRender && rect && (
          <div
            style={{
              position: "absolute",
              pointerEvents: "auto",
              top: rect.top - 0.75 * rect.height,
              width: rect.width * 1.5,
              ...(isLastElement
                ? {
                  right: document.documentElement.clientWidth - rect.right,
                }
                : {
                  left: isFirstElement
                    ? rect.left
                    : rect.left - 0.25 * rect.width,
                }),
            }}
          >
            <VideoCardPortal
              video={miniModalMediaData}
              anchorElement={anchorElement}
            />
          </div>
        )}
      </motion.div>
    </>
  );
}
