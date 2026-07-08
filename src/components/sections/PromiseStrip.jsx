import "./PromiseStrip.css";

const promises = ["Premium Quality", "Limited Drops", "Worldwide Shipping", "100% Authentic"];

export default function PromiseStrip() {
  return (
    <section className="promise-strip">
      {promises.map((item) => (
        <div key={item}>
          <b>{item}</b>
          <span>{item === "Limited Drops" ? "Do not miss out" : "Built for the streets"}</span>
        </div>
      ))}
    </section>
  );
}
