import { useEffect, useState } from "react";
import "./IntroVideo.css";

export default function IntroVideo({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        onFinish();
      }, 500);

    }, 9000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <video
      autoPlay
      muted
      playsInline
      className={`intro-video ${fadeOut ? "fade-out" : ""}`}
    >
      <source src="/og22.MP4" type="video/mp4" />
    </video>
  );
}