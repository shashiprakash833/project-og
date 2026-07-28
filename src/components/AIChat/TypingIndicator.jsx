import LoadingAnimation from "./LoadingAnimation.jsx";

export default function TypingIndicator() {
  return (
    <div className="kai-message kai-assistant kai-typing" aria-live="polite">
      <div className="kai-avatar">
        <img src="/images/brand/og-logo.png" alt="" />
      </div>
      <div className="kai-bubble">
        <strong>Curating a fit</strong>
        <LoadingAnimation />
      </div>
    </div>
  );
}
