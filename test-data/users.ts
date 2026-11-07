import { getEnv } from '../utils/env';
import type { UserCredentials } from './types';

type UserKey = 'standard' | 'lockedOut' | 'performanceGlitch' | 'problem' | 'invalid';

const DEFAULT_PASSWORD = getEnv('SWAG_PASSWORD', 'secret_sauce');

export const USERS: Record<UserKey, UserCredentials> = {
  standard: { username: getEnv('SWAG_USERNAME', 'standard_user'), password: DEFAULT_PASSWORD },
  lockedOut: { username: 'locked_out_user', password: DEFAULT_PASSWORD },
  performanceGlitch: { username: 'performance_glitch_user', password: DEFAULT_PASSWORD },
  problem: { username: 'problem_user', password: DEFAULT_PASSWORD },
  invalid: { username: 'usuario_inexistente', password: 'senha_incorreta_123' },
};
