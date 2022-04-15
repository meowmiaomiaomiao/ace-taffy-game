import {subscribe} from 'valtio'
import { proxyWithComputed, subscribeKey } from 'valtio/utils'

import { MonsterType, getRandomSCType } from './monster';
import { getRandomFromRate } from '@/utils/tools'
import { nanoid } from 'nanoid/non-secure'
import { SCType, SCDisplayType, state as sc } from './sc'
import { db } from './db'
import { state as flow } from './flow'
import { state as card, CardSaveType, baseCardStore, upgradeCardStore, CardInfoType, upgradeCardBox} from './card'
import { state as skill, SkillType} from './skill'
import { state as weapon, WeaponType} from './weapon'
import { setUserCardPos, setUserCardCfg, saveUserInfo, upgradeCard} from './card'

export type CardType = 'normal' | 'weapon' | 'skill'
export type CardBoxType = {
  id: string;
  card: any;
  base?: CardInfoType;
  upgrade?: CardInfoType;
  activeUpgrade: boolean;
  rainbow: boolean;
  active: number[];
}

export const WEAPON_BOX_INDEX = 6
export const SKILL_BOX_INDEX = 13


export const getActiveColorType = (border, compareBorder)=>{
  if (border === 9 && compareBorder === 9) {
    return 0
  }
  if (border === 9 && compareBorder !== 0) {
    return compareBorder
  }
  if (compareBorder === 9) {
    return border
  }
  
  if (border === compareBorder) {
    return border || 0
  } else {
    return 0
  }
}

export const analyseCardActive = (boxes, i) => {

  if (!boxes.length || !boxes[i]['card']) {
    return {
      active: [],
      upgrade: false,
    }
  }

  const hasLeft = (i%5 !== 0)
  const hasRight = (i%5 !== 4)
  const center = boxes[i] && boxes[i]['card']
  const border = [...center.border]
  const top = boxes[i - 5] && boxes[i - 5]['card']
  const bottom = boxes[i + 5] && boxes[i + 5]['card']
  const left = boxes[i - 1] && boxes[i - 1]['card']
  const right = boxes[i + 1] && boxes[i + 1]['card']
  // const rainbow = center.border.includes(9)

  const compareTopBorder = ()=> {
    return top ? getActiveColorType(border[0], top.border[1]): 0
  }

  const compareBottomBorder = ()=> {
    return bottom ? getActiveColorType(border[1], bottom.border[0]): 0
  }

  const compareLeftBorder = ()=> {
    return (left && hasLeft) ?  getActiveColorType(border[2], left.border[3]): 0
  }

  const compareRightBorder = ()=> {
    return (right && hasRight) ? getActiveColorType(border[3], right.border[2]): 0
  }

  const active = [compareTopBorder(), compareBottomBorder(), compareLeftBorder(), compareRightBorder()]
  return {
    active,
    activeUpgrade: !active.includes(0),
    rainbow: border.includes(9)
  }

}

// const borderValues = [1, 2, 3, 4, 0, 9]

const state = proxyWithComputed<{
  posCells: CardBoxType[];
  cfgCells: CardBoxType[];
}, {
  store: any;
}>({
  posCells: [],
  cfgCells: [],
}, {
  store: (snap)=>{
    return {}
  }
})



const changeCardInCell = () => {
  const { posCells, cfgCells } = state
  const { cardPos, cardCfg } = card 
  posCells.forEach((cell, i)=>{
    if (cardPos[i]) {

      cell['card'] = card.store[cardPos[i]] 
      const {originId, upgradeId} = cell['card'] 
      
      cell['base'] = baseCardStore[originId]
      if (upgradeId) {
        cell['upgrade'] = upgradeCardStore[upgradeId];
      }      
    }
  })

  cfgCells.forEach((cell, i)=>{
    if (cardCfg[i]) {
      cell['card'] = card.store[cardCfg[i]]
      const {originId, upgradeId} = cell['card'] 
      cell['base'] = baseCardStore[originId]  
      if (upgradeId) {
        cell['upgrade'] = upgradeCardStore[upgradeId];
      } 
    }


    if (i === WEAPON_BOX_INDEX) {
      cell['card'] = weapon.store[weapon.active]
    }

    if (i === SKILL_BOX_INDEX) {
      cell['card'] = skill.store[skill.active]
    }
  })
  
  state.posCells =  [...posCells]
  state.cfgCells =  [...cfgCells]

}

subscribeKey(state, 'posCells', ()=>{
  state.cfgCells.forEach((cell, i)=>{
    const { active, activeUpgrade, rainbow } = analyseCardActive(state.cfgCells, i);
    cell['active'] = active
    cell['activeUpgrade'] = activeUpgrade
    cell['rainbow'] = rainbow

    // 彩色卡不分配高级技能
    if (activeUpgrade && cell['card'] && !cell['card'].upgradeId && !rainbow) {
      upgradeCard(cell['card'])
    }
  });
})


const initCells = () => {
  // const typeBox = getRandomFromRate(rate)
  const posCells = []
  for (let i = 0; i < 54; i++) {
    posCells.push({id: nanoid()})
  }
  const cfgCells = []
  for (let i = 0; i < 20; i++) {
    cfgCells.push({id: nanoid()})
  }

  state.posCells = posCells;
  state.cfgCells = cfgCells;
}

initCells()



const changeCardPosition = (source: [string, string], traget: [string, string])=>{
  const sourceArray = state[source[0]]
  const targetArray = state[traget[0]]
  const sourceItem = sourceArray[source[1]]
  const targetItem = targetArray[traget[1]]
  targetArray[+traget[1]] = sourceItem
  sourceArray[+source[1]] = targetItem
  // changeCardInCell()
  // sourceArray.splice(+source[1], 1, targetItem)
  setUserCardPos(state.posCells.map((cell)=>((cell.card && cell.card.id ) ? cell.card.id : 0)))
  setUserCardCfg(state.cfgCells.map((cell)=>((cell.card && cell.card.id ) ? cell.card.id : 0)))
  saveUserInfo()
}

const removeCard = (source: [string, string])=>{
  const sourceArray = state[source[0]]
  // const sourceItem = sourceArray[source[1]]
  sourceArray[source[1]]['card'] = null
  sourceArray[source[1]]['base'] = null
  // changeCardInCell()
  setUserCardPos(state.posCells.map((cell)=>((cell.card && cell.card.id ) ? cell.card.id : 0)))
  setUserCardCfg(state.cfgCells.map((cell)=>((cell.card && cell.card.id ) ? cell.card.id : 0)))
  saveUserInfo()
}



// setUserCardPos, setUserCardCfg

export {
  state,
  initCells,
  changeCardPosition,
  changeCardInCell,
  removeCard,
}
