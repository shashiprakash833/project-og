import { useEffect } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ duration = 3200, onFinish }) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <section className="splash" aria-label="OG intro animation">
      <div className="splash-tear" aria-hidden="true">
        <div className="splash-panel top" />
        <div className="splash-panel bottom" />
      </div>
      <div className="splash-mark">
        <img className="splash-logo" src="/images/brand/og-logo.png" alt="The OG" />
      </div>
    </section>
  );
}
