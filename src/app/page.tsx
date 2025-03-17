"use client";

import { retrieveChatCompletion } from "@/features/openai/actions/retrieveChatCompletion";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [completionResult, setCompletionResult] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const completion = await retrieveChatCompletion(message);
    setCompletionResult(completion ?? "");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{completionResult}</p>
    </>
  );
}
