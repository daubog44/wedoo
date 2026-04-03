import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const exportsRoot = path.join(repoRoot, "artifacts", "figma-exports");

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(entryPath);
    }

    return entryPath;
  });
}

function isSectionAsset(relativePath) {
  const loweredPath = relativePath.toLowerCase();
  const loweredName = path.basename(relativePath).toLowerCase();

  return (
    loweredName.endsWith(".png") &&
    (loweredName.startsWith("sezione ") ||
      loweredPath.split(path.sep).some((part) => part.startsWith("sezione ")))
  );
}

if (!existsSync(exportsRoot)) {
  console.log("No figma exports directory found.");
  process.exit(0);
}

const sectionAssets = walk(exportsRoot)
  .map((filePath) => path.relative(repoRoot, filePath))
  .filter(isSectionAsset)
  .sort((left, right) => left.localeCompare(right));

console.log(`Section PNG exports: ${sectionAssets.length}`);
for (const assetPath of sectionAssets) {
  console.log(`- ${assetPath}`);
}
