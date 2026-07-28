const suggestions = [
  "Find oversized hoodies",
  "Best anime t-shirts",
  "Recommend an outfit",
  "Help me choose size",
  "Track my order",
  "Customize a hoodie",
  "Show new arrivals"
];

export default function QuickSuggestions({ onSelect, disabled }) {
  return (
    <div className="kai-suggestions" aria-label="Suggested questions">
      {suggestions.map((item) => (
        <button key={item} type="button" disabled={disabled} onClick={() => onSelect(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}
