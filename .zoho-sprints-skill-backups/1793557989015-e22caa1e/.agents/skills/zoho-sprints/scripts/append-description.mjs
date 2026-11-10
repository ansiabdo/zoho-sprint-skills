#!/usr/bin/env node
/**
 * Append a new actual-delivery section to an existing Zoho description.
 * Usage: node append-description.mjs <old.txt> <new-section.md> <out.txt>
 * - Preserves old bytes exactly.
 * - Adds the exact separator on its own line.
 * - Does not add a separator when old text is empty.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const [, , oldPath, newPath, outPath] = process.argv;
if (!oldPath || !newPath || !outPath) {
  console.error("Usage: node append-description.mjs <old.txt> <new-section.md> <out.txt>");
  process.exit(2);
}

const SEPARATOR = "##+=================================================##";
const oldText = fs.readFileSync(oldPath, "utf8");
const newText = fs.readFileSync(newPath, "utf8").replace(/^\uFEFF/, "");

const combined = oldText.trim().length === 0
  ? newText
  : `${oldText.replace(/\s+$/, "")}\n${SEPARATOR}\n${newText}`;

fs.writeFileSync(outPath, combined, "utf8");

const hash = (s) => crypto.createHash("sha256").update(s, "utf8").digest("hex");
console.log(JSON.stringify({
  oldPath,
  newPath,
  outPath,
  separator: oldText.trim().length === 0 ? null : SEPARATOR,
  oldHash: hash(oldText),
  newHash: hash(combined),
  oldLength: oldText.length,
  newLength: combined.length,
  oldPreserved: combined.startsWith(oldText.replace(/\s+$/, "")),
}, null, 2));
