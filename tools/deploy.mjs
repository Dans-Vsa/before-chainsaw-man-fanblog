// Publish the built site to the gh-pages branch (GitHub Pages serves that branch).
// Usage: npm run deploy   (runs the build first, then force-pushes dist/ as a single commit)
import { execFileSync } from 'node:child_process';
import { mkdtemp, cp, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const run = (cmd, args, cwd = root) => execFileSync(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();

execFileSync(process.execPath, [join(root, 'tools/build.mjs')], { stdio: 'inherit' });

const remote = run('git', ['remote', 'get-url', 'origin']);
const name = run('git', ['config', 'user.name']);
const email = run('git', ['config', 'user.email']);
const sha = run('git', ['rev-parse', '--short', 'HEAD']);

const tmp = await mkdtemp(join(tmpdir(), 'gh-pages-'));
try {
  await cp(join(root, 'dist'), tmp, { recursive: true });
  await writeFile(join(tmp, '.nojekyll'), ''); // serve files as-is (no Jekyll processing)
  run('git', ['init', '-q', '-b', 'gh-pages'], tmp);
  run('git', ['add', '-A'], tmp);
  run('git', ['-c', `user.name=${name}`, '-c', `user.email=${email}`, 'commit', '-q', '-m', `Deploy ${sha}`], tmp);
  execFileSync('git', ['push', '-q', '--force', remote, 'gh-pages'], { cwd: tmp, stdio: 'inherit' });
  console.log(`Deployed ${sha} → gh-pages`);
} finally {
  await rm(tmp, { recursive: true, force: true });
}
