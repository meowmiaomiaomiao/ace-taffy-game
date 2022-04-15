import {subscribe} from 'valtio'
import { proxyWithComputed } from 'valtio/utils'
import { MonsterType, getRandomSCType } from './monster';
import { getRandomFromRate } from '@/utils/tools'
import { nanoid } from 'nanoid/non-secure'
import { SCType, SCDisplayType, state as sc } from './sc'
import { db } from './db'
import { state as flow } from './flow'
import { changeCardInCell } from './card-cells'

export type CardInfoType = {
  id: string;
  rate: number;
  desc: string;
  abbr: string;
  effect?: string;
  upgrade?: boolean;
  type: CardType;
}

export type CardSaveType = {
  id: string;
  originId: string;
  upgradeId?: string;
  upgrade: boolean;
  type: CardType;
  sc:  {
    price: number;
    desc: string;
  };
  border: readonly number[];
}

export type CardPosType = (string | 0)[]
export type CardCfgType = (string | 0)[]
export type CardType = 'normal' | 'weapon' | 'skill'
export type BorderType = 'red' | 'blue' | 'white' | 'black' | 'yellow' | 'rainbow'

export const baseCardBox: Record<CardType, CardInfoType[]> = {
  normal: [
    {id: '1', desc: '最大生命值+1', rate: 0.8, type: 'normal', upgrade: false, abbr: 'MAXHP +1'},
    {id: '2', desc: '最大生命值+2', rate: 0.2, type: 'normal', upgrade: false, abbr: 'MAXHP +2'},
  ],
  weapon: [
    {id: '3', desc: '武器伤害+1', rate: 0.8, type: 'weapon', upgrade: false, abbr: 'ATK +1'},
    {id: '4', desc: '武器伤害+2', rate: 0.2, type: 'weapon', upgrade: false, abbr: 'ATK +2'},
    {id: '900', desc: '连射', rate: 0.0, type: 'weapon', upgrade: false, abbr: '连射'},
    {id: '901', desc: '蓄力', rate: 0.0, type: 'weapon', upgrade: false, abbr: '蓄力'},
    {id: '902', desc: '霰弹', rate: 0.0, type: 'weapon', upgrade: false, abbr: '霰弹'},
    {id: '903', desc: '左轮', rate: 0.0, type: 'weapon', upgrade: false, abbr: '左轮'},
  ],
  skill: [
    {id: '5', desc: '技能伤害+1', rate: 0.8, type: 'skill', upgrade: false, abbr: 'SP +1'},
    {id: '6', desc: '技能伤害+2', rate: 0.2, type: 'skill', upgrade: false, abbr: 'SP +2'},
    {id: '910', desc: '放海鸥', rate: 0.0, type: 'skill', upgrade: false, abbr: '放海鸥'},
    {id: '911', desc: '热水器', rate: 0.0, type: 'skill', upgrade: false, abbr: '热水器'},
    {id: '912', desc: '鼠标垫', rate: 0.0, type: 'skill', upgrade: false, abbr: '鼠标垫'},
    {id: '913', desc: '生日歌', rate: 0.0, type: 'skill', upgrade: false, abbr: '生日歌'},
  ]
}

export const upgradeCardBox: Record<CardType, CardInfoType[]> = {
  normal: [
    {id: '1001', desc: '防御力+5', rate: 0.5, type: 'normal', upgrade: true, abbr: 'DEF +5'},
    {id: '1002', desc: '移动速度+5', rate: 0.5, type: 'normal', upgrade: true, abbr: 'SPD +5'},
  ],
  weapon: [
    {id: '1003', desc: '武器伤害+5', rate: 0.8, type: 'normal', upgrade: true, abbr: 'ATK +5'},
    {id: '1004', desc: '武器伤害+10', rate: 0.2, type: 'normal', upgrade: true, abbr: 'ATK +10'},
    {id: '1900', desc: '连射有5%几率触发当前技能释放', rate: 0.0, type: 'weapon', upgrade: true, abbr: '连射5%触发技能'},
    {id: '1901', desc: '蓄力有10%几率触发当前技能释放', rate: 0.0, type: 'weapon', upgrade: true, abbr: '蓄力10%触发技能'},
    {id: '1902', desc: '霰弹有10%几率触发当前技能释放', rate: 0.0, type: 'weapon', upgrade: true, abbr: '霰弹10%触发技能'},
    {id: '1903', desc: '左轮有10%几率触发当前技能释放', rate: 0.0, type: 'weapon', upgrade: true, abbr: '左轮10%射触发技能'},
  ],
  skill: [
    {id: '1005', desc: '技能伤害+5', rate: 0.5, type: 'normal', upgrade: true, abbr: 'SP +5'},
    {id: '1006', desc: '技能冷却-10%', rate: 0.2, type: 'normal', upgrade: true, abbr: 'CDT -10%'},
    {id: '1910', desc: '海鸥攻击到敌人时, 海鸥有5%几率发动一次当前武器的射击', rate: 0.0, type: 'skill', upgrade: true, abbr: ''},
    {id: '1911', desc: '被热水器攻击到的敌人有5%几率触发一次当前武器的射击', rate: 0.0, type: 'skill', upgrade: true, abbr: ''},
    {id: '1912', desc: '被鼠标垫吸引到敌人被消灭时有20%几率触发当前武器射击', rate: 0.0, type: 'skill', upgrade: true, abbr: ''},
    {id: '1913', desc: '被生日歌攻击到敌人时有5%几率触发一个随机技能', rate: 0.0, type: 'skill', upgrade: true, abbr: ' '},
  ]
}

export const baseCardStore = (()=>{
  const store: Record<string, CardInfoType> =  {}
  for (const type in baseCardBox) {
    baseCardBox[type].forEach((card)=>{
      if (!card.upgrade) {
        store[card.id] = card
      }
    }) 
  }
  return store
})()



export const upgradeCardStore = (()=>{
  const store: Record<string, CardInfoType> =  {}
  for (const type in upgradeCardBox) {
    upgradeCardBox[type].forEach((card)=>{
      if (card.upgrade) {
        store[card.id] = card
      }
    }) 
  }
  return store
})()
 
export const borderBox = ['red', 'yellow' , 'blue', 'white', 'black', 'rainbow']
const borderRate = {
  red: 0.2, 
  yellow: 0.2, 
  blue: 0.2, 
  white: 0.2, 
  black: 0.15, 
  rainbow: 0.05
}

const borderValues = {
  red: 1, 
  yellow: 2, 
  blue: 3, 
  white: 4, 
  black: 0, 
  rainbow: 9
}

const packSize = 54
// const borderValues = [1, 2, 3, 4, 0, 9]

const state = proxyWithComputed<{
  rate: {
    normal: number;
    weapon: number;
    skill: number;
  };
  sc: {
    price: number;
    desc: string;
  };
  detail: CardSaveType;
  desc: string;
  random: number;
  list: CardSaveType[];
  cardCfg: CardCfgType;
  cardPos: CardPosType;
}, {
  store: Record<string, CardSaveType>;
}>({
  rate: {
    normal: 0,
    weapon: 0,
    skill: 0,
  },
  sc: null, 
  detail: null,
  desc: '',
  random: 0,
  // card: {},
  list: [],
  cardCfg: Array(20).fill(0),
  cardPos: Array(packSize).fill(0),
}, {
  store: (snap)=>{
    const tmp = {}
    snap.list.forEach((card)=>{
      tmp[card.id] = card
    })
    return tmp
  }
})



const getBorder = () => {
  // const typeBox = getRandomFromRate(rate)
  const borderArray: number[] = []
  for (let i = 0; i < 4; i++) {
    const randomResult = getRandomFromRate(borderRate)
    for (const key in randomResult) {
      if (randomResult[key]) {
        borderArray.push(borderValues[key])
      }
    }
  }
  return borderArray
}

const getSaveCard = (card:  CardInfoType)=>{
  let border = getBorder();
  if (border.includes(9)) {
    border = [9,9,9,9]
  }
  const saveCard: CardSaveType = {
    id: nanoid(),
    type: card.type,
    originId: card.id,
    sc: state.sc,
    upgrade: false,
    border,
  }
  return saveCard
  // const id = nanoid() 
  // console.log('捡到了这个卡:', saveCard)
}

const getCardFromType = (type: CardType)=>{
  const cardList = baseCardBox[type]
  const baseCardStore = {}
  cardList.map((card, i)=>{
    baseCardStore[i] = card.rate
    return card.rate
  })
  const dropList = getRandomFromRate(baseCardStore)
  for (const idx in dropList) {
    if (dropList[idx]) {
      state.desc = cardList[idx].desc
      const card = getSaveCard(cardList[idx])
      state.detail = card;
      // state.card = 
      // sendCard(cardList[idx])
    }
  }
}



// window.test_kill = getRandomSC
const getCardTypeFromSC = (scList: SCDisplayType[])=>{
 
  const rate = {
    skill: 0,
    weapon: 0,
    normal: 0,
  }
  // rate.normal = rate.weapon = rate.skill = 0
  scList.forEach((sc)=>{
    if (sc.type === 'blue') {
      rate.normal += 0.1
    } else  if (sc.type === 'yellow') {
      rate.weapon += 0.1
    } else  if (sc.type === 'red') {
      rate.skill += 0.1
    } 
  })

  const typeBox = getRandomFromRate(rate)
  // let type
  for (const type in typeBox) {
    if (typeBox[type]) {
      // type = key
      const sc = scList[Math.floor(typeBox[type] * 10)]
      state.sc = {
        price: sc.price,
        desc: sc.desc
      }
      // state.type = type
      state.random = typeBox[type]
      getCardFromType(type as any)
    }
  }
  // console.log(type, 'rate')
  state.rate = rate
}








const setUserCardList = (list: CardSaveType[])=>{
  state.list = list
  setTimeout(()=>{
    changeCardInCell()
  }, 0)
}

const setUserCardPos = (cardPos: CardPosType)=>{
  state.cardPos = Object.assign([], state.cardPos, cardPos)
}

const setUserCardCfg = (cardCfg: CardCfgType)=>{
  state.cardCfg = Object.assign([], state.cardCfg, cardCfg)
}


const saveUserInfo = async ()=>{
  const cardPos = JSON.parse(JSON.stringify(state.cardPos))
  const cardCfg = JSON.parse(JSON.stringify(state.cardCfg))
  // changeCardInCell()
  setTimeout(()=>{
    changeCardInCell()
  }, 0)
  return db.userInfo.update(window.USER_ID, {
    cardPos,
    cardCfg
  })
}



const updateCard =  async (cardInfo: CardSaveType) => {
  const detail = JSON.parse(JSON.stringify(cardInfo))
  return db.cardList.update(detail.id, {
    ...detail
  })
}


const saveCard =  async () => {
  const detail = JSON.parse(JSON.stringify(state.detail))
  for (let i = 0; i < packSize; i++) {
    // console.log()
    if (state.cardPos[i] === 0) {
      state.cardPos[i] = detail.id;
      state.list.push(detail)
      setUserCardList([...state.list])
      // flow.backpack.visible = true
      flow.step = 'default'
      await db.cardList.add(detail)
      await saveUserInfo()
      return
    }
  }
}

const upgradeCard = (cardInfo: CardSaveType)=>{
  const {type} = cardInfo
  const cardList = upgradeCardBox[type]
  const upgradeCardStore = {}
  cardList.map((card, i)=>{
    upgradeCardStore[i] = card.rate
    return card.rate
  })
  const dropList = getRandomFromRate(upgradeCardStore)
  for (const idx in dropList) {
    if (dropList[idx]) {
      cardInfo.upgradeId = cardList[idx]['id']
    }
  }
  console.log(cardInfo, 'cardInfo')
  updateCard(cardInfo)
}






// setUserCardPos, setUserCardCfg

export {
  state,
  getCardTypeFromSC,
  setUserCardList,
  setUserCardPos,
  setUserCardCfg,
  saveCard,
  saveUserInfo,
  upgradeCard
}
