import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SOURCE_ROOTS = ['PMO corporate', 'PMO', 'UTC', 'Corporate Website'];
const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 16000;

export function buildSvg(base64Png, width, height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="data:image/png;base64,${base64Png}"/></svg>`;
}

export function sourceToOutput(source) {
  return source.replaceAll(' ', '-').replace(/\.html$/, '.svg');
}

export function isDirectExecution(executedPath) {
  return typeof executedPath === 'string' && resolve(executedPath) === fileURLToPath(import.meta.url);
}

function walkHtml(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return walkHtml(fullPath);
    return entry.isFile() && entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

function pngDimensions(buffer) {
  if (buffer.toString('ascii', 1, 4) !== 'PNG') throw new Error('Chrome did not create a PNG capture');
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function capture(source) {
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'adobe-xd-export-'));
  const screenshot = join(temporaryDirectory, 'capture.png');
  try {
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      `--user-data-dir=${join(temporaryDirectory, 'profile')}`,
      `--window-size=${VIEWPORT_WIDTH},${VIEWPORT_HEIGHT}`,
      `--screenshot=${screenshot}`,
      pathToFileURL(source).href,
    ], { stdio: 'pipe', timeout: 120000 });
    return readFileSync(screenshot);
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

function writeCapture(source, outputRoot) {
  const relativeSource = relative(ROOT, source);
  const relativeOutput = sourceToOutput(relativeSource);
  const output = join(outputRoot, relativeOutput);
  try {
    const png = capture(source);
    const { width, height } = pngDimensions(png);
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, buildSvg(png.toString('base64'), width, height));
    return { source: relativeSource, output: relative(outputRoot, output), width, height, status: 'success' };
  } catch (error) {
    return { source: relativeSource, output: relative(outputRoot, output), status: 'error', error: error.message };
  }
}

function parseArguments(argumentsList) {
  const all = argumentsList.includes('--all');
  const sourceIndex = argumentsList.indexOf('--source');
  const outputIndex = argumentsList.indexOf('--output');
  if ((!all && sourceIndex === -1) || outputIndex === -1) {
    throw new Error('Usage: --all | --source <html-file>, plus --output <directory>');
  }
  return {
    sources: all
      ? SOURCE_ROOTS.flatMap((directory) => walkHtml(join(ROOT, directory))).sort()
      : [resolve(ROOT, argumentsList[sourceIndex + 1])],
    outputRoot: resolve(ROOT, argumentsList[outputIndex + 1]),
  };
}

function main() {
  const { sources, outputRoot } = parseArguments(process.argv.slice(2));
  mkdirSync(outputRoot, { recursive: true });
  const entries = sources.map((source) => writeCapture(source, outputRoot));
  writeFileSync(join(outputRoot, 'manifest.json'), `${JSON.stringify({ viewportWidth: VIEWPORT_WIDTH, entries }, null, 2)}\n`);
  if (entries.some((entry) => entry.status === 'error')) process.exitCode = 1;
}

if (isDirectExecution(process.argv[1])) main();
