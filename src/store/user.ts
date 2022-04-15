import {subscribe} from 'valtio'
import { SkillType } from './skill'
export type UserBaseType = {
  MAXHP: number;
  HP: number;
  ATK: number;
  SP: number;
  BAT: number;
  CDT: number;
  SPD: number;
  DEF: number;
  LUK: number;
}

export type SkillCardType = {
  name: SkillType;
  originId: string;
  upgradeId?: string;
  border: number[];
}

// const cache: Record<string, UserType> = { 
//   'seagull': {
//     name: 'seagull',
//     cd: 2,
//     damage: 2,
//     speed: 120,
//     hp: 3,
//     size: 1,
//     type: 1,
//   }
// }
// const state = {
//   active: cache['seagull']
// }
// const changeAcitveSkill = (type: string) => {
//   state.active = cache[type]
// }
// subscribe(state, ()=>{

// })
export const baseData: UserBaseType = {
  MAXHP: 3,
  HP: 3,
  ATK: 1,
  SP: 1,
  BAT: 1,
  CDT: 1,
  SPD: 1,
  DEF: 1,
  LUK: 1,
}
export  {

}
