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
  ".codex/hooks.json",
  ".codex/skills/visual-audit/SKILL.md",
  ".codex/skills/design-drift-audit/SKILL.md",
  ".codex/skills/route-acceptance/SKILL.md",
  ".codex/skills/sidecar-subagents/SKILL.md",
  "docs/codex-potter-prompts.md",
  "docs/visual-backlog.md",
  "docs/route-acceptance.md",
  "docs/playwright-visual-audit.md",
  "docs/loop-subagents.md",
  "docs/ralph-loop-worklog.md",
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
const loopCheckMode = process.env.WEDOO_LOOP_CHECK_MODE === "global" ? "global" : "bootstrap";

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
  const usingGlobalCodexHome = loopCheckMode === "global";
  const bootstrapWillConfigureGitHub =
    Boolean(process.env.GITHUB_PAT_TOKEN) && bootstrapConfigFiles.every((target) => existsSync(target));

  if (!usingGlobalCodexHome && bootstrapWillConfigureGitHub) {
    console.log("[ok] GitHub MCP will be configured by local bootstrap scripts");
    return true;
  }

  const codexHome = process.env.CODEX_HOME ?? resolve(process.env.USERPROFILE ?? process.env.HOME ?? "", ".codex");
  const configPath = resolve(codexHome, "config.toml");

  if (!existsSync(configPath)) {
    console.warn(
      usingGlobalCodexHome
        ? `[warn] Current Codex config.toml not found in ${codexHome}`
        : "[warn] Codex config.toml not found",
    );
    return false;
  }

  const config = readFileSync(configPath, "utf8");
  const hasGitHubServer = config.includes("[mcp_servers.github]");
  const hasInlinePat = config.includes('bearer_token_env_var = "github_pat_');
  const hasEnvVarReference = config.includes('bearer_token_env_var = "GITHUB_');

  if (hasGitHubServer && (hasInlinePat || hasEnvVarReference)) {
    console.log(
      usingGlobalCodexHome ? "[ok] GitHub MCP appears configured in current Codex home" : "[ok] GitHub MCP appears configured",
    );
    return true;
  }

  console.warn(
    usingGlobalCodexHome
      ? "[warn] GitHub MCP is not fully configured in current Codex home"
      : "[warn] GitHub MCP is not fully configured",
  );
  return false;
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
  console.warn(
    loopCheckMode === "global"
      ? "[warn] `potter:yolo:global` relies on the current/global Codex config; configure GitHub MCP there before using checked preflight or CI/PR inspection"
      : "[warn] GitHub MCP can stay unavailable locally, but CI/PR checks won't be inspectable through MCP until it is configured",
  );
}
