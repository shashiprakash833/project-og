export default function ChatHeader({ onClear, onMinimize, onClose }) {
  return (
    <header className="kai-header">
      <div>
        <div className="kai-title">
          <span aria-hidden="true">
            <img src="/images/brand/og-logo.png" alt="" />
          </span>
          <div>
            <strong>OG</strong>
            <small>Streetwear Concierge</small>
          </div>
        </div>
        <p><i /> Online</p>
      </div>

      <div className="kai-window-actions">
        <button type="button" onClick={onClear}>Clear</button>
        <button type="button" onClick={onMinimize} aria-label="Minimize chat">_</button>
        <button type="button" onClick={onClose} aria-label="Close chat">x</button>
      </div>
    </header>
  );
}
