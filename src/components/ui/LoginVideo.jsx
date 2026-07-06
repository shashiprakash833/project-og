import { useEffect, useRef } from "react";

export default function LoginVideo({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video is played when component mounts
    videoRef.current?.play().catch(() => {
      // Fallback for browsers that block autoplay
      onFinish();
    });
  }, [onFinish]);

  return (
    <div className="login-video-overlay" onClick={onFinish}>
      <video ref={videoRef} onEnded={onFinish} muted playsInline preload="auto">
        <source src="/og22.MP4" type="video/mp4" />
      </video>
    </div>
  );
}