param(
  [string]$Slug = "session",
  [int]$Rounds = 25,
  [switch]$UseGlobalHome,
  [switch]$WithPreflight,
  [switch]$PreflightOnly,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$CodexHome = Join-Path $RepoRoot ".codex-potter-home"
$ConfigPath = Join-Path $CodexHome "config.toml"
$GlobalCodexHome = Join-Path $HOME ".codex"
$LocalAppUrl = "http://127.0.0.1:4173"
$ViteLog = Join-Path $RepoRoot "vite-potter.log"
$ViteErrLog = Join-Path $RepoRoot "vite-potter.err.log"
$VitePidPath = Join-Path $RepoRoot ".codexpotter\vite-potter.pid"
$CodexWrapper = Join-Path $RepoRoot "scripts\codex-wrapper.cmd"

Set-Location $RepoRoot

if (-not $env:GITHUB_PAT_TOKEN) {
  throw "GITHUB_PAT_TOKEN non impostata nella sessione corrente."
}

function Initialize-IsolatedCodexHome {
  if (Test-Path $CodexHome -PathType Leaf) {
    throw ".codex-potter-home esiste come file, non come cartella."
  }

  if (Test-Path $CodexHome -PathType Container) {
    Remove-Item -Recurse -Force $CodexHome -ErrorAction SilentlyContinue
  }

  New-Item -ItemType Directory -Force -Path $CodexHome | Out-Null

  foreach ($fileName in @("auth.json", "cap_sid")) {
    $source = Join-Path $GlobalCodexHome $fileName
    $destination = Join-Path $CodexHome $fileName
    if (Test-Path $source -PathType Leaf) {
      Copy-Item -Force $source $destination
    }
  }

  $configToml = @'
model = "gpt-5.4"
model_reasoning_effort = "medium"
personality = "pragmatic"
service_tier = "fast"
sandbox_mode = "danger-full-access"

[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]

[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"

[mcp_servers.github]
url = "https://api.githubcopilot.com/mcp/"
bearer_token_env_var = "GITHUB_PAT_TOKEN"

[plugins."github@openai-curated"]
enabled = true

[plugins."figma@openai-curated"]
enabled = true
'@

  [System.IO.File]::WriteAllText($ConfigPath, $configToml, [System.Text.Encoding]::UTF8)

  $env:CODEX_HOME = $CodexHome
}

function Test-LocalAppUrl {
  try {
    $response = Invoke-WebRequest -Uri $LocalAppUrl -UseBasicParsing -TimeoutSec 5
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  } catch {
    return $false
  }
}

function Ensure-LocalAppServer {
  if (Test-LocalAppUrl) {
    Write-Host "Local app server already responding on $LocalAppUrl"
    return
  }

  if (Test-Path $VitePidPath -PathType Leaf) {
    $previousPid = Get-Content $VitePidPath -ErrorAction SilentlyContinue
    if ($previousPid) {
      Stop-Process -Id $previousPid -Force -ErrorAction SilentlyContinue
    }
  }

  Write-Host "Starting local app server on $LocalAppUrl ..."
  New-Item -ItemType Directory -Force -Path (Split-Path $VitePidPath -Parent) | Out-Null

  $process = Start-Process -FilePath "powershell" `
    -ArgumentList @(
      "-NoProfile",
      "-Command",
      "Set-Location '$RepoRoot'; npm run dev:potter"
    ) `
    -RedirectStandardOutput $ViteLog `
    -RedirectStandardError $ViteErrLog `
    -PassThru

  Set-Content -Encoding UTF8 $VitePidPath $process.Id

  for ($index = 0; $index -lt 60; $index++) {
    Start-Sleep -Seconds 1
    if (Test-LocalAppUrl) {
      Write-Host "Local app server is ready."
      return
    }
  }

  throw "Il server locale su $LocalAppUrl non risponde dopo l'avvio."
}

function Test-GitHubToken {
  try {
    $headers = @{
      Authorization = "Bearer $($env:GITHUB_PAT_TOKEN)"
      "User-Agent"  = "wedoo-potter-bootstrap"
      Accept        = "application/vnd.github+json"
    }
    $response = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers -Method Get
    if (-not $response.login) {
      throw "GitHub API response missing login."
    }
    Write-Host "GitHub token ok for user $($response.login)"
  } catch {
    throw "GitHub preflight fallito: $($_.Exception.Message)"
  }
}

function Test-PlaywrightLocalBrowser {
  Write-Host "Checking local app with Playwright browser ..."
  $playwrightCheck = @'
import { chromium } from "@playwright/test";

const url = process.argv[2];
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
  });
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  if (!response || !response.ok()) {
    throw new Error(`HTTP response not ok for ${url}`);
  }

  await page.waitForTimeout(1000);
  const bodyText = await page.locator("body").innerText();

  if (!bodyText || !bodyText.trim()) {
    throw new Error("Page body is empty.");
  }
} finally {
  await browser.close();
}
'@

  $output = $playwrightCheck | node --input-type=module - $LocalAppUrl 2>&1 | Out-String

  if ($LASTEXITCODE -ne 0) {
    throw "Playwright preflight fallito: $output"
  }

  Write-Host "Playwright local browser ok."
}

function Invoke-PotterMcpPreflight {
  Write-Host "Running MCP preflight via Codex Potter ..."
  $prompt = @"
Non modificare file. Non eseguire test. Non implementare task.
Esegui solo un preflight tecnico e poi fermati.

Verifica due cose:
1. Figma MCP: leggi almeno metadata o design context del frame 143:1822 nel file N33nOmzNxMuVBWz3HwPGhC.
2. GitHub MCP: recupera almeno l'utente autenticato o una lista minima di repo.

Se tutto passa, stampa una sola riga che inizi con PREFLIGHT_OK:
Se qualcosa fallisce, stampa una sola riga che inizi con PREFLIGHT_FAIL:
Non aggiungere altro oltre alla riga finale.
"@
  $output = $prompt | & codex-potter exec --codex-bin $CodexWrapper --json -m gpt-5.4 -c 'model_reasoning_effort="medium"' --rounds 1 --sandbox danger-full-access --yolo 2>&1 | Out-String

  if ($output -match "PREFLIGHT_OK:") {
    Write-Host "MCP preflight ok."
    return
  }

  if ($LASTEXITCODE -ne 0) {
    throw "Potter MCP preflight non riuscito. Output: $output"
  }

  if ($output -notmatch "PREFLIGHT_OK:") {
    throw "Potter MCP preflight non valido. Output: $output"
  }
}

function Append-WorklogNote {
  param(
    [string]$WorklogPath,
    [string]$Action,
    [string]$Note
  )

  Add-Content -Encoding UTF8 $WorklogPath @"

- action: $Action
- note: $Note
"@
}

if ($UseGlobalHome) {
  Write-Host "Using existing Codex configuration from current session."
} else {
  Initialize-IsolatedCodexHome
  Write-Host "Using isolated CODEX_HOME with copied Codex auth: $CodexHome"
}

Ensure-LocalAppServer

Write-Host "Running readiness checks..."
& npm run loop:ready
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "Creating worklog session..."
$worklogPath = & node .\scripts\loop-worklog-path.mjs $Slug
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "Worklog: $worklogPath"
$absoluteWorklogPath = Join-Path $RepoRoot $worklogPath

if ($WithPreflight -or $PreflightOnly) {
  Test-GitHubToken
  Test-PlaywrightLocalBrowser

  try {
    Invoke-PotterMcpPreflight
    Append-WorklogNote -WorklogPath $absoluteWorklogPath -Action "preflight ok" -Note "Figma MCP e GitHub MCP rispondono; Playwright locale apre correttamente $LocalAppUrl."
  } catch {
    Append-WorklogNote -WorklogPath $absoluteWorklogPath -Action "preflight failed" -Note $_.Exception.Message
    throw
  }
}

if ($PreflightOnly) {
  Write-Host "Preflight only completed."
  exit 0
}

Write-Host "Starting Codex Potter in yolo mode..."

if ($DryRun) {
  Write-Host "DRY RUN"
  Write-Host "Get-Content -Raw .\docs\ralph-loop-prompt.md | codex-potter exec -m gpt-5.4 -c 'model_reasoning_effort=""medium""' --rounds $Rounds --sandbox danger-full-access --yolo"
  exit 0
}

Get-Content -Raw .\docs\ralph-loop-prompt.md |
  & codex-potter exec --codex-bin $CodexWrapper -m gpt-5.4 -c 'model_reasoning_effort="medium"' --rounds $Rounds --sandbox danger-full-access --yolo

exit $LASTEXITCODE
