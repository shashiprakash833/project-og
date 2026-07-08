import { useState } from "react";
import "./NewsletterSection.css";

export default function NewsletterSection({ onToast }) {
  const [email, setEmail] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      onToast("Enter a valid email.");
      return;
    }
    onToast("You are first in line for the next drop.");
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div>
        <h2>Be The First. Get The Drop.</h2>
        <p>Join OG insider list and get early access to limited drops.</p>
      </div>
      <form onSubmit={submit}>
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />
        <button type="submit">Join</button>
      </form>
    </section>
  );
}
