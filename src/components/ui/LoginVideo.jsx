import { useEffect, useRef } from "react";

export default function LoginVideo({ onFinish }) {
  const videoRef = useRef(null);
  const finishedRef = useRef(false);

  const handleFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish();
  };

  useEffect(() => {
    // Ensure video is played when component mounts
    videoRef.current?.play().catch(() => {
      // Fallback for browsers that block autoplay
      handleFinish();
    });
  }, [onFinish]);

  return (
    <div className="login-video-overlay" onClick={handleFinish}>
      <video ref={videoRef} onEnded={handleFinish} muted playsInline preload="auto">
        <source src="/og22.MP4" type="video/mp4" />
      </video>
    </div>
  );
}