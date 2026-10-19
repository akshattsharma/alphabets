import React, { useEffect, useState } from "react";

// Every visible string lives here so it can be matched to the design images in one place.
const TEXT = {
  title: "Alphabet Buttons",
  subtitle: "Click the buttons to type",
  backspace: "Backspace",
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [text, setText] = useState("");

  const add = (letter) => setText((t) => t + letter);
  const remove = () => setText((t) => t.slice(0, -1));

  // The physical keyboard works too.
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace") {
        remove();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        add(e.key.toUpperCase());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="app">
      <h1>{TEXT.title}</h1>
      <p className="subtitle">{TEXT.subtitle}</p>

      <div className="output">{text}</div>

      <div className="keys">
        {LETTERS.map((l) => (
          <button type="button" key={l} className="key" onClick={() => add(l)}>
            {l}
          </button>
        ))}
        <button type="button" className="backspace" onClick={remove}>
          {TEXT.backspace}
        </button>
      </div>
    </main>
  );
}