import {subscribe, proxy} from 'valtio'
import { subscribeKey } from 'valtio/utils'
import {shuffle} from '../utils/tools'
import { db } from './db'
export type WeaponInfoType = {
  name: WeaponType;
  cd: number;
  damage: number;
  speed: number;
  hp: number;
  size: number;
  type: number;
}

export type WeaponSaveType = Partial<Record<WeaponType, {
  name: WeaponType;
  originId: string;
  upgradeId?: string;
  active: boolean;
  border: number[];
}>>



const weaponSaveData: WeaponSaveType = {
  'continuousgun': {
    name: 'continuousgun',
    originId: '900',
    upgradeId: '1900',
    active: true,
    border: shuffle([1, 2, 3, 4]),
  },
  'chargegun': {
    name: 'continuousgun',
    originId: '901',
    upgradeId: '1901',
    active: false,
    border: shuffle([1, 2, 3, 4]),
  },
  'shotgun': {
    name: 'shotgun',
    originId: '902',
    upgradeId: '1902',
    active: false,
    border: shuffle([1, 2, 3, 4]),
  },
  'revolver': {
    name: 'revolver',
    originId: '903',
    upgradeId: '1903',
    active: false,
    border: shuffle([1, 2, 3, 4]),
  }
} 

export type WeaponType = 'continuousgun' | 'chargegun' | 'shotgun' | 'revolver'  | ''

const weaponBox: Partial<Record<WeaponType, WeaponInfoType>> = { 
  'continuousgun': {
    name: 'continuousgun',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  },
  'chargegun': {
    name: 'chargegun',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  },
  'shotgun': {
    name: 'shotgun',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  },
  'revolver': {
    name: 'revolver',
    cd: 2,
    damage: 2,
    speed: 120,
    hp: 3,
    size: 1,
    type: 1,
  }
}



const state = proxy<{
  active: WeaponType;
  store: WeaponSaveType;
}>({
  active: '',
  store: weaponSaveData,
})

const changeActiveWeapon = (type: WeaponType)=>{
  state.active = type
}


subscribeKey(state, 'active', ()=>{
  for (const key in state.store) {
    state.store[key].active = false
    if (key == state.active) {
      state.store[key].active = true
    }
  }

  const weapon = JSON.parse(JSON.stringify(state.store))
  db.userInfo.update(window.USER_ID, {
    weapon,
  })
})

const setWeaponStore = (store: WeaponSaveType) => {
  for (const key in store) {
    if (store[key]['active']) {
      state.active = key as WeaponType
    }
  }
  state.store = store
}

export {
  state,
  weaponBox,
  weaponSaveData,
  setWeaponStore,
  changeActiveWeapon,
  // changeAcitveSkill
}
