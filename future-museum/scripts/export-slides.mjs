import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ids = [
  'seedrealtime',
  'seedance-2-5',
  'qwen-vibe-coding',
  'figure-03',
  'unitree-g1',
  'flying-car',
  'reusable-rocket',
];
const baseUrl = process.env.SLIDE_BASE_URL ?? 'http://localhost:3000';
const output = fileURLToPath(new URL('../../deliverables/ppt-slides/', import.meta.url));
await mkdir(output, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

for (const [index, id] of ids.entries()) {
  await page.goto(`${baseUrl}/slides/${id}`, { waitUntil: 'networkidle' });
  await page.locator("[data-slide-ready='true']").waitFor();
  await page.screenshot({
    path: `${output}/${String(index + 1).padStart(2, '0')}-${id}.png`,
  });
}

await browser.close();
