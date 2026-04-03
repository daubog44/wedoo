import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const prdPath = resolve(process.cwd(), "prd.md");
const content = readFileSync(prdPath, "utf8");
const lines = content.split(/\r?\n/);

const taskRegex =
  /^- \[(?<status>[ x])\] \[(?<type>[A-Z]+)\]\[node=(?<node>[^\]]+)\]\[route=(?<route>[^\]]+)\]\[test=(?<test>[^\]]+)\] (?<title>.+)$/;
const nodeRegex = /^\d+:\d+$/;

const tasks = [];
const malformed = [];

for (const [index, line] of lines.entries()) {
  if (!line.startsWith("- [")) {
    continue;
  }

  const match = line.match(taskRegex);
  if (!match?.groups) {
    malformed.push({ lineNumber: index + 1, line });
    continue;
  }

  tasks.push({
    lineNumber: index + 1,
    status: match.groups.status === "x" ? "done" : "todo",
    type: match.groups.type,
    node: match.groups.node,
    route: match.groups.route,
    test: match.groups.test,
    title: match.groups.title,
  });
}

const withRealNode = tasks.filter((task) => task.node !== "n/a");
const invalidNodes = withRealNode.filter((task) => !nodeRegex.test(task.node));

const byNode = new Map();
for (const task of withRealNode) {
  const bucket = byNode.get(task.node) ?? [];
  bucket.push(task);
  byNode.set(task.node, bucket);
}

const multiTaskNodes = [...byNode.entries()].filter(([, bucket]) => bucket.length > 1);
const uniqueNodes = byNode.size;
const completedTasks = tasks.filter((task) => task.status === "done").length;
const pendingTasks = tasks.filter((task) => task.status === "todo").length;
const frameTasks = tasks.filter((task) => task.type === "FRAME").length;
const visualTasks = tasks.filter(
  (task) => task.test.includes(".visual.spec.ts") || task.test.includes("/parity/"),
).length;

console.log("PRD node coverage report");
console.log(`- tasks: ${tasks.length}`);
console.log(`- completed: ${completedTasks}`);
console.log(`- pending: ${pendingTasks}`);
console.log(`- unique real node ids: ${uniqueNodes}`);
console.log(`- frame tasks: ${frameTasks}`);
console.log(`- visual/parity tasks: ${visualTasks}`);

if (multiTaskNodes.length > 0) {
  console.log("- multi-task node ids:");
  for (const [node, bucket] of multiTaskNodes) {
    console.log(`  - ${node}: ${bucket.length} tasks`);
  }
}

if (malformed.length > 0) {
  console.error("- malformed PRD task lines:");
  for (const entry of malformed) {
    console.error(`  - line ${entry.lineNumber}: ${entry.line}`);
  }
}

if (invalidNodes.length > 0) {
  console.error("- invalid node ids:");
  for (const task of invalidNodes) {
    console.error(`  - line ${task.lineNumber}: ${task.node}`);
  }
}

if (malformed.length > 0 || invalidNodes.length > 0) {
  process.exitCode = 1;
}
