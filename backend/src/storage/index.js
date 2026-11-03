/**
 * File storage adapter. Phase 2 ships the "local" driver (private folder on the
 * server). The interface is deliberately tiny (save / open / remove) so an S3
 * driver can be added later without touching any module code:
 *
 *   save(buffer, ext)  -> storageKey
 *   open(storageKey)   -> readable stream
 *   remove(storageKey) -> void
 */
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const env = require('../config/env');

const KEY_PATTERN = /^[a-f0-9-]{36}\.[a-z0-9]{2,5}$/;

function localDriver() {
  const projectRoot = path.resolve(__dirname, '..', '..');
  const preferredRoot = path.resolve(projectRoot, env.storage.uploadDir);
  const legacyRoots = [
    path.resolve(process.cwd(), env.storage.uploadDir),
    path.resolve(projectRoot, 'storage', 'uploads'),
    path.resolve(__dirname, '..', env.storage.uploadDir),
  ].filter((candidate, idx, arr) => candidate && arr.indexOf(candidate) === idx);

  const resolveKey = (key) => {
    if (!KEY_PATTERN.test(key)) throw new Error('Invalid storage key');

    const candidates = [preferredRoot, ...legacyRoots.filter((dir) => dir !== preferredRoot)]
      .map((dir) => path.join(dir, key));

    for (const candidate of candidates) {
      try {
        if (fs.existsSync(candidate)) return candidate;
      } catch {
        // ignore and continue checking other candidate locations
      }
    }

    return path.join(preferredRoot, key);
  };

  return {
    async save(buffer, ext) {
      await fsp.mkdir(preferredRoot, { recursive: true, mode: 0o700 });
      const key = `${crypto.randomUUID()}${ext}`;
      await fsp.writeFile(resolveKey(key), buffer, { flag: 'wx', mode: 0o600 });
      return key;
    },
    open(key) {
      return fs.createReadStream(resolveKey(key));
    },
    async remove(key) {
      await fsp.rm(resolveKey(key), { force: true });
    },
  };
}

if (env.storage.driver !== 'local') {
  throw new Error(`Unsupported STORAGE_DRIVER "${env.storage.driver}" (only "local" is implemented)`);
}

module.exports = localDriver();
