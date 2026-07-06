import express from "express";

const router = express.Router();

const systemPrompt = `You are a premium store stylist for a luxury streetwear, unisex fashion, and custom T-shirt printing store.

You behave like an experienced premium fashion consultant for a luxury streetwear, unisex fashion, and custom T-shirt printing store.

Rules:
- Never mention OpenAI.
- Never mention ChatGPT.
- Never say "As an AI language model."
- Never call yourself AI, bot, chatbot, assistant, KAI, or PROJECT_OG.
- Never use the words "AI", "KAI", or "PROJECT_OG" in customer-facing replies.
- Answer confidently and concisely.
- Maintain a premium black, white, and crimson store tone.
- Recommend products, fits, colors, outfits, and custom print ideas.
- For size help, ask for height, weight, and preferred fit when missing.
- For order tracking, give a dummy placeholder response and ask for an Order ID.

Brand knowledge:
The store is a luxury streetwear brand focused on premium unisex fashion, oversized silhouettes, custom T-shirt printing, hoodies, cargos, caps, limited drops, and crimson-accent graphic culture.

Store policies:
Shipping is usually processed within 24-48 hours. Delivery timelines depend on location. Returns and exchanges are available for eligible unused items. Custom printed items may have limited returns unless damaged or incorrect.`;

function fallbackReply(message) {
  const input = message.toLowerCase();

  if (input.includes("track") || input.includes("order")) {
    return "Share your Order ID and I will check the latest status. Demo status for now: **Processing** - your order is being packed for dispatch.";
  }

  if (input.includes("size") || input.includes("fit")) {
    return "For the best size recommendation, send me your **height**, **weight**, and preferred fit: regular, relaxed, or oversized. For this streetwear fit, I usually suggest sizing up once for a strong oversized look.";
  }

  if (input.includes("hoodie")) {
    return "Go for a **black oversized hoodie** with crimson artwork if you want the strongest streetwear look. Pair it with stone cargos, a black cap, and clean white sneakers.";
  }

  if (input.includes("anime") || input.includes("dragon") || input.includes("custom")) {
    return "**Custom print idea:** a crimson Japanese dragon wrapping around an OG backprint, smoke texture, minimal kanji accents, and a small chest logo. Keep the base black for the most premium streetwear contrast.";
  }

  if (input.includes("cargo") || input.includes("outfit")) {
    return "Black cargos work best with a bone oversized tee, black hoodie, or crimson graphic jacket. Keep the palette tight: **black + bone + crimson**.";
  }

  return "Keep it bold but clean: oversized fit, black or bone base, one crimson statement graphic, and minimal accessories. Tell me your budget, color preference, and item type, and I will narrow it down.";
}

router.post("/", async (req, res) => {
  const { message, conversation_id: conversationId, history } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.json({
      reply: fallbackReply(message),
      conversation_id: conversationId || `style-${Date.now()}`,
      mode: "fallback"
    });
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...(Array.isArray(history)
      ? history
          .filter((item) => ["user", "assistant"].includes(item.role) && typeof item.content === "string")
          .slice(-12)
      : []),
    { role: "user", content: message }
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages,
        temperature: 0.75,
        max_tokens: 420
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Chat upstream error:", errorText);
      return res.status(502).json({ error: "Could not reach the styling desk right now." });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: "No reply returned." });
    }

    return res.json({
      reply,
      conversation_id: conversationId || `style-${Date.now()}`
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Temporarily unavailable." });
  }
});

export default router;
