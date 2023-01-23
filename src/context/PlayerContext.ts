import { createContext } from 'react'
import { Player } from '../models/Player';

export const PlayerContext = createContext<Player | null>(null);