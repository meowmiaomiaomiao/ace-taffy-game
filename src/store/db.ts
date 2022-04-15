import Dexie, { Table }from 'Dexie'
import {UserBaseType, baseData} from './user'
import { CardSaveType,  CardCfgType, CardPosType, setUserCardList, setUserCardPos, setUserCardCfg } from './card'
import { SkillSaveType, skillSaveData, setSkillStore, state as skill} from './skill'
import { WeaponSaveType, weaponSaveData, setWeaponStore, state as weapon } from './weapon'
import { nanoid } from 'nanoid/non-secure'

type UserSaveType = {
  id: string;
  player: string;
  base: UserBaseType;
  cardPos: CardPosType;
  cardCfg: CardCfgType;
  skill: SkillSaveType; 
  weapon: WeaponSaveType;
}

 class DB extends Dexie {
  userInfo!: Table<UserSaveType, string>;
  cardList!: Table<CardSaveType, string>;
  constructor() {
    super('taffy-game');
    this.version(1).stores({
      userInfo: 'id, player, base, cardCfg, cardPos, skill, weapon',
      cardList: 'id, originId, type, sc, border, idx'
    });
  }

  deleteList(todoListId: number) {
    // return this.transaction('rw', this.todoItems, this.todoLists, () => {
    //   this.todoItems.where({ todoListId }).delete();
    //   this.todoLists.delete(todoListId);
    // });
  }
}
const db = new DB()


export async function resetDB() {
  return db.transaction('rw', db.cardList, db.userInfo, async () => {
    await Promise.all(db.tables.map(table => {console.log(table); table.clear()}));
  });
}

// resetDB()


function resetBorder(cardList: CardSaveType[]) {
  if (cardList) {
    const tmp = cardList.map((card)=>{
      if (card.border.includes(9)) {
        card.border = [9,9,9,9]
      }
      return card
    })
    return tmp
  } else {
    return []
  }
}


function initSkillandWeapon() {
  return db.userInfo.update(window.USER_ID, {
    skill: skillSaveData,
    weapon: weaponSaveData,
  })
}

export async function initDB() {

  // console.log(tmpResult, 'resultresult')
  // await db.userInfo.where('player').equals('taffy').toArray()
  //  await db.userInfo.where({player: 'taffy'}).toArray()
  // return 
 const result =  await db.userInfo.toArray()
 
 if ( result[0] ) {
  const userInfo = result[0]
  const {cardPos, cardCfg, id} =  userInfo
  window.USER_ID = id
  const cardList = await db.cardList.toArray()

  if (userInfo.skill && userInfo.weapon) {
    setWeaponStore(userInfo.weapon)
    setSkillStore(userInfo.skill)
  }
  setUserCardList(resetBorder(cardList) || [])
  setUserCardPos(cardPos)
  setUserCardCfg(cardCfg)
 } else {
  await db.userInfo.add({
    id: nanoid(),
    player: 'taffy',
    base: baseData,
    cardCfg: [],
    cardPos: [],
    skill: skillSaveData,
    weapon: weaponSaveData,
  })
  initDB()
 }
}


// resetdb()


export {
  db,
}