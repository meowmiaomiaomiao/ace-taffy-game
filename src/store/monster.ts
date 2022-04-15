import { MONSTERS } from '@/constants/monsters'
import { subscribe } from 'valtio'
import { SCType, SCDisplayType } from './sc'
import { getRandomFromRate2 } from '@/utils/tools'
import { nanoid } from 'nanoid/non-secure'

export type MonsterInfoType = {
  name: string;
  alias: string;
  hp: number;
  atk: number;
  speed: number;
  blueSC: number;
  yellowSC: number;
  redSC: number;
  noSC: number;
  refreshRate: number;
  icon: string;
}

export type MonsterType = 'MMR1' | 'MMR2' | 'LZR' | 'YLG' | 'JBG' | 'V87'



const monsterBox: Record<MonsterType, MonsterInfoType> = { 
  'MMR1': {
    name: 'MMR1',
    alias: '萌萌人1号',
    hp: 1,
    speed: 1,
    atk: 1,
    blueSC: 0.8,
    yellowSC: 0.5,
    redSC: 0.3,
    noSC: 0.5,
    refreshRate: 0.3,
    icon: './assets/ui/monster/mmr1.png',
  },
  'MMR2': {
    name: 'MMR2',
    alias: '萌萌人2号',
    hp: 1,
    speed: 1,
    atk: 1,
    blueSC: 0.8,
    yellowSC: 0.5,
    redSC: 0.3,
    noSC: 0.5,
    refreshRate: 0.3,
    icon: './assets/ui/monster/mmr2.png',
  },
  'LZR': {
    name: 'LZR',
    alias: '乐子人',
    hp: 1,
    speed: 1,
    atk: 1,
    blueSC: 0.8,
    yellowSC: 0.2,
    redSC: 0.1,
    noSC: 0.5,
    refreshRate: 0.3,
    icon: './assets/ui/monster/lzr.png',
  },
  'YLG': {
    name: 'YLG',
    alias: '引流狗',
    hp: 1,
    speed: 1,
    atk: 1,
    blueSC: 0.8,
    yellowSC: 0.2,
    redSC: 0.1,
    noSC: 0.5,
    refreshRate: 0.3,
    icon: './assets/ui/monster/ylg.png',
  },
  'JBG': {
    name: 'JBG',
    alias: '举办狗',
    hp: 1,
    speed: 1,
    atk: 1,
    blueSC: 0.8,
    yellowSC: 0.2,
    redSC: 0.1,
    noSC: 0.5,
    refreshRate: 0.3,
    icon: './assets/ui/monster/jbg.png',
  },
  'V87': {
    name: 'V87',
    alias: 'V87',
    hp: 1,
    speed: 1,
    atk: 1,
    blueSC: 0.8,
    yellowSC: 0.2,
    redSC: 0.1,
    noSC: 0.5,
    refreshRate: 0.3,
    icon: './assets/ui/monster/v87.png',
  }
}

// const state = {
//   active: cache['seagull']
// }



const getRandomSCType = (type: MonsterType): (SCDisplayType | null) => {
  const monster = monsterBox[type]
  const { blueSC,  yellowSC, redSC, noSC } = monster
  const rateArray = [blueSC, yellowSC, redSC, noSC]
  const rateKeys: SCType[] = ['blue', 'yellow', 'red']
  
  // const random = Math.random() * (blueSC + yellowSC + redSC + noSC)
  const tmp: SCDisplayType = {
    id: nanoid(),
    name: monster.name,
    icon: monster.icon, 
    price: 0,
    desc: '',
  }

  const randomArray = getRandomFromRate2(rateArray)
  randomArray.forEach((v, i)=>{
    if (v) {
      tmp.type = rateKeys[i]
    }
  });
  return tmp.type ? tmp : null 

}
// subscribe(state, ()=>{

// })
export {
  monsterBox,
  getRandomSCType
}
