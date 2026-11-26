// Package the static 国勢図鑑 Japanese statistics portal and its screenshots for make.fun.
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const output = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(output, { recursive: true });
for (const directory of ['app', 'screenshots']) {
  cpSync(fileURLToPath(new URL('./' + directory, import.meta.url)), join(output, directory), { recursive: true });
}
writeFileSync(join(output, 'dossier.json'), buildDossier(output, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
}));
