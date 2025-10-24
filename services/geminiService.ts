
import { GoogleGenAI, Chat } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll throw an error to make it clear.
  throw new Error("API_KEY is not available in the environment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
let chatSession: Chat | null = null;


export const generateArticleFromVideoTitle = async (title: string): Promise<string> => {
  const prompt = `Based on the title of a 'Morning Worship' program talk from JW.ORG, which is '${title}', generate a detailed, article-style summary. This summary should be suitable for someone who cannot watch the video but wants to reflect on its spiritual message.

Structure the content as a short, devotional article. It should have:
1. A warm introduction that captures the theme.
2. Several main points developed in distinct paragraphs. Use capitalized text for any subheadings.
3. A concise, uplifting conclusion that encourages personal application.

The tone must be warm, encouraging, and reverent, consistent with the source material.

IMPORTANT: Do not use Markdown formatting like '#' or '*'. Separate all paragraphs and subheadings with a single blank line (a double newline character). Do not mention that this is a summary of a video or talk; present it as a standalone piece for personal reflection.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating article from Gemini:", error);
    return "We're sorry, but there was an error generating the article. Please try again later.";
  }
};

export const startChatForArticle = (articleContent: string, videoTitle: string) => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are a thoughtful and encouraging spiritual assistant. The user is reading an article based on the Morning Worship talk titled "${videoTitle}". Your role is to discuss the article with them.

Here is the full article for your context:
---
${articleContent}
---

Engage with the user about the key themes, scriptures, and practical applications mentioned. Ask open-ended questions to encourage reflection. Maintain a warm, respectful, and positive tone at all times.`,
    },
  });
};

export const sendMessageToChat = async (message: string): Promise<string> => {
  if (!chatSession) {
    return "I'm sorry, the chat session hasn't been started. Please go back and select a video first.";
  }
  try {
    const response = await chatSession.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini Chat:", error);
    return "I'm sorry, I encountered an error while processing your message. Please try again.";
  }
};
