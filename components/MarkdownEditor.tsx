"use client";

import useMarkdown from "@/hooks/useMarkdown";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkdownEditor() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  async function publish() {
    // Record<string, string> tells TypeScript that entities is an object where both the keys and the values are strings
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };

    const sanitizedTitle = title.replace(/[&<>\"\']/g, function (m) {
      return entities[m];
    });
    const sanitizedBody = text.replace(/[&<>\"\']/g, function (m) {
      return entities[m];
    });

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/new`, {
      method: "POST",
      body: JSON.stringify({ title: sanitizedTitle, body: sanitizedBody }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  }

  const previewText = useMarkdown(text);

  return (
    <div className="columns">
      <div className="column">
        <article className="message h-full has-background-dark">
          <div className="message-header">
            <p>Prévisualisation de l&apos;article</p>
          </div>
          <div className="message-body has-text-white">
            <div className="content">
              {previewText}
            </div>
          </div>
        </article>
      </div>
      <div className="column">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Titre de l&apos;article</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Le titre"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <textarea
          className="textarea h-[60vh]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="button mt-4 is-fullwidth"
          style={{
            backgroundColor: "var(--orange-primary)",
          }}
          onClick={publish}
          disabled={!text.length || !title.length}
        >
          <strong>Publier</strong>
        </button>
      </div>
    </div>
  );
}
