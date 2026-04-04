import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const worklogsRoot = path.join(repoRoot, "docs", "worklogs");
const now = new Date();
const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
  2,
  "0",
)}-${String(now.getDate()).padStart(2, "0")}`;
const time = `${String(now.getHours()).padStart(2, "0")}${String(
  now.getMinutes(),
).padStart(2, "0")}`;
const slug = process.argv[2] ?? "session";
const dayDir = path.join(worklogsRoot, date);
const worklogPath = path.join(dayDir, `${time}-${slug}.md`);

mkdirSync(dayDir, { recursive: true });

if (!existsSync(worklogPath)) {
  writeFileSync(
    worklogPath,
    `# ${date} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")} - ${slug}\n\n- task: n/a\n- node: n/a\n- files: n/a\n- action: session created\n- tests: n/a\n- note: n/a\n`,
    "utf8",
  );
}

console.log(path.relative(repoRoot, worklogPath));
