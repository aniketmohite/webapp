import { Router, Request, Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

export const infoRouter = Router();

const pkg = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf-8'));
const startTime = Date.now();

infoRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    version: pkg.version,
    uptime: Math.floor((Date.now() - startTime) / 1000),
  });
});
