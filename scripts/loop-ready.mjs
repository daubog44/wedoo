import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const requiredFiles = [
  "AGENTS.md",
  "prd.md",
  "package.json",
  "playwright.config.ts",
  "vitest.config.ts",
  "tsconfig.test.json",
  "docs/codex-potter-prompts.md",
  "docs/ralph-loop-prompt.md",
  ".github/workflows/ci.yml",
];

const requiredDirs = [
  "tests/e2e/public",
  "tests/e2e/portal",
  "tests/e2e/wizards",
  "tests/e2e/parity",
  "tests/integration",
];

function checkPaths(paths, label) {
  const missing = paths.filter((target) => !existsSync(resolve(process.cwd(), target)));

  if (missing.length === 0) {
    console.log(`[ok] ${label} present`);
    return true;
  }

  console.error(`[error] Missing ${label.toLowerCase()}:`);
  for (const target of missing) {
    console.error(`  - ${target}`);
  }
  return false;
}

function checkGitHubMcpConfig() {
  const bootstrapConfigFiles = [
    resolve(process.cwd(), "scripts/codex-wrapper.ps1"),
    resolve(process.cwd(), "scripts/potter-yolo.ps1"),
  ];
  const bootstrapWillConfigureGitHub =
    Boolean(process.env.GITHUB_PAT_TOKEN) && bootstrapConfigFiles.every((target) => existsSync(target));

  if (bootstrapWillConfigureGitHub) {
    console.log("[ok] GitHub MCP will be configured by local bootstrap scripts");
    return true;
  }

  const configPath = resolve(
    process.env.CODEX_HOME ?? resolve(process.env.USERPROFILE ?? process.env.HOME ?? "", ".codex"),
    "config.toml",
  );

  if (!existsSync(configPath)) {
    console.warn("[warn] Codex config.toml not found");
    return true;
  }

  const config = readFileSync(configPath, "utf8");
  const hasGitHubServer = config.includes("[mcp_servers.github]");
  const hasInlinePat = config.includes('bearer_token_env_var = "github_pat_');
  const hasEnvVarReference = config.includes('bearer_token_env_var = "GITHUB_');

  if (hasGitHubServer && (hasInlinePat || hasEnvVarReference)) {
    console.log("[ok] GitHub MCP appears configured");
    return true;
  }

  console.warn("[warn] GitHub MCP is not fully configured");
  return true;
}

console.log("Wedoo loop bootstrap check");

const filesOk = checkPaths(requiredFiles, "required files");
const dirsOk = checkPaths(requiredDirs, "required directories");
const githubConfigOk = checkGitHubMcpConfig();
const prdNodeReport = spawnSync(process.execPath, ["scripts/prd-node-report.mjs"], {
  cwd: process.cwd(),
  stdio: "inherit",
});

if (filesOk && dirsOk && prdNodeReport.status === 0) {
  console.log("[ok] Loop prerequisites are in place");
} else {
  process.exitCode = 1;
}

if (!githubConfigOk) {
  console.warn("[warn] GitHub MCP can stay unavailable locally, but CI/PR checks won't be inspectable through MCP until it is configured");
}
