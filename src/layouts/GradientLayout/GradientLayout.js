import React, { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { colors, animations } from "theme/theme";

import { useBackgroundState } from "context/BackgroundContext";

import GradientBackground from "components/GradientBackground/GradientBackground";
import GradientBackgroundTop from "./GradientBackgroundTop";

const changeBackgroundWithDelay = (ref, gradient) => {
  gsap.set(ref, {
    backgroundImage: gradient,
    delay: animations.appRouteTransition,
  });
};

const GradientLayout = ({ children }) => {
  const theme = useBackgroundState();
  let backgroundRef = useRef(null);

  const gradientComponents = ["orange", "blue", "green", "purple"];

  useEffect(() => {
    switch (theme) {
      case "orange":
        return changeBackgroundWithDelay(backgroundRef, colors.orangeGradient);
      case "blue":
        return changeBackgroundWithDelay(backgroundRef, colors.blueGradient);
      case "green":
        return changeBackgroundWithDelay(backgroundRef, colors.greenGradient);
      case "purple":
        return changeBackgroundWithDelay(backgroundRef, colors.purpleGradient);
      default:
        return changeBackgroundWithDelay(backgroundRef, colors.purpleGradient);
    }
  }, [theme]);

  return (
    <>
      <div style={{ zIndex: 2 }}>{children}</div>

      {gradientComponents.map(
        (item) =>
          item === theme && (
            <GradientBackgroundTop key={item} index={1} color={theme} />
          )
      )}

      <GradientBackground
        index={0}
        color={theme}
        ref={(el) => (backgroundRef = el)}
      />
    </>
  );
};

export default GradientLayout;
