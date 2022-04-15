import { clear } from 'console';
import {subscribe, proxy} from 'valtio'
import { MonsterType, getRandomSCType } from './monster';
import { getCardTypeFromSC } from './card';
import { state as flow } from './flow';

import { nanoid } from 'nanoid/non-secure'

export type SCInfoType = {
  price: number;
  desc: string;
  type: SCType;
}

export type SCDisplayType = {
  id: string;
  name: string;
  icon: string;
  price: number;
  desc: string;
  type?: SCType;
}

export type SCType = 'red' | 'blue' | 'yellow'


const scBox: Record<SCType, SCInfoType[]> = { 
  'blue': [],
  'yellow': [],
  'red': [],
}

const examples: [number, string][] = [
  [30, '什么B动静?'],
  [50,	'Taffy加油'],
  [100,	'...'],
  [500,	'关注永雏塔菲喵'],
  [1000,	'助力红地毯'],
  [1000,	'收大米喽~'],
]


const state = proxy<{
  list: SCDisplayType[];
  detail: SCDisplayType;
}>({
  list: [],
  detail: null
})

const initSC = (list: [number, string][]) => {
  list.forEach((sc)=>{
    const tmp: SCInfoType = {
      price: sc[0],
      desc: sc[1],
      type: 'blue',
    }
    if (sc[0] < 100) {
      tmp.type = 'blue'
      scBox['blue'].push(tmp)
      return
    } else if (sc[0] > 999) {
      tmp.type = 'red'
      scBox['red'].push(tmp)
      return
    } else {
      tmp.type = 'yellow'
      scBox['yellow'].push(tmp)
      return
    }
  })
}
initSC(examples)
// const state = {
//   scBox,
// }
const getRandomSCInfo = (sc: SCDisplayType) => {
  if (sc) {
    const type = sc.type 
    const list = scBox[type]
    const random = list[Math.floor((Math.random() * list.length))]
    return Object.assign(sc, random)
  }
}

const getRandomSC = (type: MonsterType)=>{
  return getRandomSCInfo(getRandomSCType(type))
}

const removeSC = (idx: number) => {
  const { list, detail } = state;
  list.splice(idx, 1)
  state.list = [...list]
}

// window.test_kill = getRandomSC
const addSC = (type, specSc?: SCDisplayType )=>{
  const {list, detail} = state
  if (list.length > 9) {
    return 
  } else {
    
    const sc = specSc || getRandomSC(type); 
    if (sc) {
     
      state.detail = sc
      list.push(sc)
      list.sort((a, b)=>{
        return b.price - a.price
      })
      state.list = [...list]

      if (state.list.length === 10) {
        flow.step = 'eliteMonsterStart'
        // flow.step = 'gacha'
      } else {
        
      }
      // scList = list
    }
    // addSC('MMR1')
  }
}
addSC('MMR1')

// const time = setInterval(()=>{
//   if (state.list.length > 9) { 
//     clearInterval(time)
//   }
//   addSC('MMR1')
// }, 100)




export {
  state,
  scBox,
  addSC,
  removeSC,
  getRandomSC,
  getRandomSCInfo,
}
