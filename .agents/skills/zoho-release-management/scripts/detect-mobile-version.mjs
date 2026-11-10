#!/usr/bin/env node
/**
 * Detect release versions from a project folder.
 * Usage: node detect-mobile-version.mjs <project-root>
 * Output: JSON. Read-only; never edits the project.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const out = { root, mobile: null, web: null, dotnet: null, sources: [], warnings: [] };

function read(rel) {
  const p = path.join(root, rel);
  try {
    return { path: p, text: fs.readFileSync(p, "utf8") };
  } catch {
    return null;
  }
}

function firstMatch(text, re, group = 1) {
  const m = text.match(re);
  return m ? m[group] : null;
}

function addSource(kind, rel, value) {
  if (value) out.sources.push({ kind, file: rel, value });
}

// Flutter
const pubspec = read("pubspec.yaml");
if (pubspec) {
  const v = firstMatch(pubspec.text, /^\s*version:\s*([^\s#]+)/m);
  if (v) {
    const [version, build] = v.split("+");
    out.mobile = { ecosystem: "flutter", version, build: build || null, source: "pubspec.yaml" };
    addSource("mobile", "pubspec.yaml", v);
  }
}

// Android native
for (const rel of ["android/app/build.gradle", "android/app/build.gradle.kts"]) {
  const f = read(rel);
  if (!f) continue;
  const versionName = firstMatch(f.text, /versionName\s*[=:]\s*["']([^"']+)["']/);
  const versionCode = firstMatch(f.text, /versionCode\s*[=:]\s*["']?(\d+)["']?/);
  if (versionName || versionCode) {
    out.mobile = out.mobile || { ecosystem: "android", version: null, build: null, source: rel };
    out.mobile.version = out.mobile.version || versionName;
    out.mobile.build = out.mobile.build || versionCode;
    addSource("mobile", rel, versionName || versionCode);
    break;
  }
}

// iOS
const plist = read("ios/Runner/Info.plist");
if (plist) {
  const short = firstMatch(plist.text, /<key>CFBundleShortVersionString<\/key>\s*<string>([^<]+)<\/string>/s);
  const build = firstMatch(plist.text, /<key>CFBundleVersion<\/key>\s*<string>([^<]+)<\/string>/s);
  if (short || build) {
    out.mobile = out.mobile || { ecosystem: "ios", version: null, build: null, source: "ios/Runner/Info.plist" };
    out.mobile.version = out.mobile.version || short;
    out.mobile.build = out.mobile.build || build;
    addSource("mobile", "ios/Runner/Info.plist", short || build);
  }
}

// Web / JS: root plus one level of app folders (Angular/React monorepos).
const pkgCandidates = [];
for (const rel of ["package.json", "angular/package.json", "wc-app/package.json", "web/package.json", "admin/package.json", "app/package.json"]) {
  const f = read(rel);
  if (f) pkgCandidates.push({ rel, text: f.text });
}
for (const pkg of pkgCandidates) {
  try {
    const j = JSON.parse(pkg.text);
    if (j.version && j.version !== "0.0.0") {
      out.web = { ecosystem: "node", version: j.version, source: pkg.rel };
      addSource("web", pkg.rel, j.version);
      break;
    }
    if (j.version === "0.0.0") out.warnings.push(`${pkg.rel}: version is 0.0.0 (placeholder); ignored`);
  } catch {
    out.warnings.push(`${pkg.rel} could not be parsed`);
  }
}

// .NET: common props first, then csproj.
for (const rel of ["common.props", "Directory.Build.props", "src/Directory.Build.props"]) {
  const f = read(rel);
  if (!f) continue;
  const v = firstMatch(f.text, /<Version>([^<]+)<\/Version>/);
  if (v) {
    out.dotnet = { version: v, source: rel };
    addSource("dotnet", rel, v);
    break;
  }
}

const csprojCandidates = [];
(function walk(dir, depth) {
  if (depth > 3) return;
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name === "bin" || e.name === "obj" || e.name === "node_modules" || e.name === ".git") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, depth + 1);
    else if (e.name.endsWith(".csproj")) csprojCandidates.push(full);
  }
})(root, 0);
for (const full of csprojCandidates.slice(0, 8)) {
  const text = fs.readFileSync(full, "utf8");
  const v = firstMatch(text, /<Version>([^<]+)<\/Version>/);
  if (v && !out.dotnet) {
    out.dotnet = { version: v, source: path.relative(root, full) };
    addSource("dotnet", path.relative(root, full), v);
    break;
  }
}

// Choose a mobile version: native/Flutter wins over a generic package.json.
if (out.mobile?.version) {
  out.recommended = {
    kind: "mobile",
    version: out.mobile.version,
    build: out.mobile.build || null,
    source: out.mobile.source,
  };
} else if (out.web?.version) {
  out.recommended = { kind: "web", version: out.web.version, build: null, source: out.web.source };
  out.warnings.push("No native mobile version found; package.json is the only version source.");
} else {
  out.recommended = null;
  out.warnings.push(
    out.dotnet
      ? `No mobile/web version found; only .NET ${out.dotnet.version} (${out.dotnet.source}). For a mobile release, continue from the last mobile release in Zoho and record that source.`
      : "No version found. Continue from the last release in Zoho and record that source."
  );
}

console.log(JSON.stringify(out, null, 2));
