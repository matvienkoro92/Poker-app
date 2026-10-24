import {ensureGameParticipation as checkParticipation} from '../../app-game-participation.js';
import {ensureGameVersion} from './game-version.mjs';
export async function ensureGameParticipation(){return await ensureGameVersion()&&await checkParticipation();}
