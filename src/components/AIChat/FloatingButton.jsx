export default function FloatingButton({ open, onClick }) {
  return (
    <button
      className="kai-floating-button"
      type="button"
      onClick={onClick}
      aria-label={open ? "Open style chat" : "Chat with stylist"}
    >
      <span>
        <img src="/images/brand/og-logo.png" alt="" aria-hidden="true" />
      </span>
    </button>
  );
}
