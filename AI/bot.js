// ============ AI CHATBOT ============
// (Replace YOUR_API_KEY_HERE with your real API key)
const AI_API_KEY = "YOUR_API_KEY_HERE"; 

const aiChatContainer = document.getElementById("aiChatContainer");
const aiHeader = document.getElementById("aiHeader");
const aiMessages = document.getElementById("aiMessages");
const aiInput = document.getElementById("aiInput");
const aiSend = document.getElementById("aiSend");

// Toggle collapse
aiHeader.addEventListener("click", () => {
  aiChatContainer.classList.toggle("collapsed");
});

// Send message on button click
aiSend.addEventListener("click", sendMessage);
aiInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `ai-message ${sender}`;
  div.textContent = text;
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

async function sendMessage() {
  const userText = aiInput.value.trim();
  if (!userText) return;

  appendMessage("ai-user", userText);
  aiInput.value = "";

  // Restrict bot’s domain knowledge
  const systemPrompt = `
  You are a virtual assistant for a Finance Management web app.
  Only help users with:
  - navigating between pages (Upload, New Entry, Home)
  - explaining how to use buttons, forms, and features
  - giving short, helpful messages (no code, no unrelated info)
  If someone asks about anything else, say: "Sorry, I can only help with this website's features."
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userText }
        ]
      })
    });

    const data = await response.json();
    const botText = data.choices?.[0]?.message?.content || "Sorry, I couldn’t understand that.";
    appendMessage("ai-bot", botText);

  } catch (error) {
    appendMessage("ai-bot", "⚠️ Error connecting to AI service.");
    console.error(error);
  }
}
