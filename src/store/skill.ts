import {subscribe, proxy} from 'valtio'
import {shuffle} from '../utils/tools'
import { subscribeKey } from 'valtio/utils'
import { db } from './db'
export type SkillInfoType = {
  name: SkillType;
  cd: number;
  damage: number;
  speed: number;
  hp: number;
  size: number;
  type: number;
}

export type SkillSaveType = Partial<Record<SkillType, {
  name: SkillType;
  originId: string;
  upgradeId?: string;
  active: boolean;
  border: number[];
}>>



const skillSaveData: SkillSaveType = {
  'seagull': {
    name: 'seagull',
    originId: '910',
    upgradeId: '1910',
    active: true,
    border: shuffle([1, 2, 3, 4]),
  },
  'hotwater': {
    name: 'hotwater',
    originId: '911',
    upgradeId: '1911',
    active: false,
    border: shuffle([1, 2, 3, 4]),
  },
  'mousepad': {
    name: 'mousepad',
    originId: '912',
    upgradeId: '1912',
    active: false,
    border: shuffle([1, 2, 3, 4]),
  },
  'birthday': {
    name: 'birthday',
    originId: '913',
    upgradeId: '1913',
    active: false,
    border: shuffle([1, 2, 3, 4]),
  }
} 

export type SkillType = 'seagull' | 'birthday' | 'hotwater' | 'mousepad' | ''

const skillBox: Partial<Record<SkillType, SkillInfoType>> = { 
  'seagull': {
    name: 'seagull',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  },
  'birthday': {
    name: 'birthday',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  },
  'hotwater': {
    name: 'hotwater',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  },
  'mousepad': {
    name: 'mousepad',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  }
}



// const state = proxy<{
//   active: SkillType;
// }>({
//   active: 'seagull'
// })

const state = proxy<{
  active: SkillType;
  store: SkillSaveType;
}>({
  active: '',
  store: skillSaveData,
})
const changeActiveSkill = (type: SkillType)=>{
  state.active = type
}

subscribeKey(state, 'active', ()=>{
  for (const key in state.store) {
    state.store[key].active = false
    if (key == state.active) {
      state.store[key].active = true
    }
  }

  const skill = JSON.parse(JSON.stringify(state.store))

  db.userInfo.update(window.USER_ID, {
    skill,
  })
})

const setSkillStore = (store: SkillSaveType) => {
  for (const key in store) {
    if (store[key]['active']) {
      state.active = key as SkillType
      
    }
  }
  state.store = store
}

export {
  state,
  skillBox,
  skillSaveData,
  setSkillStore,
  changeActiveSkill,
}
