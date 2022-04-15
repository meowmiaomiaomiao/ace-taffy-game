import {subscribe, proxy} from 'valtio'
import {subscribeKey} from 'valtio/utils'
import { MonsterType, getRandomSCType } from './monster';
import { getRandomFromRate } from '@/utils/tools'



export type stepType = 'default' | 'base' | 'randomMaze' | 'monster' | 'eliteMonsterStart' | 'eliteMonsterEnd' | 'gacha' | 'bossStart' | 'bossEnd'

const stepBox = [
  'default',
  'base',
  'randomMaze', 
  'monster',
  'eliteMonsterStart',
  'eliteMonsterEnd',
  'gacha',
  'bossStart',
  'bossEnd'
]

const state = proxy<{
  step: stepType;
  info: {
    visible: boolean;
    type: string;
    message: string;
  };
  backpack: {
    visible: boolean;
    type: string;
    message: string;
  };
  actionCard: {
    visible: boolean;
    type: string;
    message: string;
    position: [number, number];
  };
  gameLoading: {
    visible: boolean;
    value: number;
    logoEnd: boolean;
  };
}>({
  step: 'default',
  info: {
    visible: false,
    type: 'normal',
    message: '',
  },
  backpack: {
    visible: false,
    type: 'normal',
    message: '',
  },
  actionCard: {
    visible: false,
    type: 'normal',
    message: '',
    position: [0, 0]
  },
  gameLoading: {
    visible: true,
    value: 0,
    logoEnd: false,
  }
  // uiVisible: false,
})

subscribeKey(state.info, 'visible', ()=>{
  if (state.info.visible) {
    setTimeout(()=>{
      state.info.visible = false
    }, 2000)
  }

})

const setBackpackVisible = (v: boolean) => {
  state.backpack.visible = v
}







export {
  state,
  setBackpackVisible
}
