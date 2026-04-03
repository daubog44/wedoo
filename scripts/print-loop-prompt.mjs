import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const promptPath = resolve(process.cwd(), "docs/ralph-loop-prompt.md");
const prompt = readFileSync(promptPath, "utf8");

console.log(prompt);
