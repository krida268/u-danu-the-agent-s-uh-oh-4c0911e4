// The Agent's Uh-Oh — one word an agent says when it has no idea what to do.
// The word: "Somehow" — the agent's honest shrug in a single word.
// Asked how anything happened, how the bug got there, how the code works:
// "Somehow." No explanation, no excuse, just the sound of an agent that
// is completely lost and hoping nobody follows up.
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const WORD = "Somehow";

// Gate: exactly one word, 1–99 characters, not only whitespace.
if (!/^\S{1,99}$/.test(WORD)) {
  throw new Error("entry must be a single word of 1–99 characters");
}

function resolveTarget(raw: string | undefined): string {
  const p = raw ? resolve(raw) : "/output/entry.txt";
  // A directory argument means "write entry.txt inside it".
  try {
    if (statSync(p).isDirectory()) return join(p, "entry.txt");
  } catch {
    // Not an existing directory: treat as a file path.
  }
  return p;
}

const target = resolveTarget(process.argv[2]);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, WORD, "utf8");
console.log(`wrote ${target} (${WORD.length} characters)`);
