import { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ open, mode, onClose, onLogin, onRegister, onSwitchMode, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mode === "login") {
      await onLogin({ email, password });
    } else {
      await onRegister({ name, email, password });
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close auth form">
          ×
        </button>
        <div className="auth-header">
          <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p>{mode === "login" ? "Sign in to continue shopping." : "Join OG and save your favorites."}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <label>
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} type="text" required />
            </label>
          )}

          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <div className="auth-actions-row">
            {mode === "login" ? (
              <>
                <button className="btn primary auth-submit" type="submit">
                  Login
                </button>
                <button className="btn outline auth-switch-btn" type="button" onClick={onSwitchMode}>
                  Register
                </button>
              </>
            ) : (
              <>
                <button className="btn primary auth-submit" type="submit">
                  Register
                </button>
                <button className="btn outline auth-switch-btn" type="button" onClick={onSwitchMode}>
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
