import * as React from 'react';
import { useState, forwardRef, useMemo  } from 'react';
import { getRandomSC, SCDisplayType } from '@/store/sc'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'

import { state, saveCard } from '@/store/card';
import { getBorderColor } from '../card'
import { state as flow } from '@/store/flow';
// import { db } from 'db';
import { useSnapshot } from 'valtio'
import Backpack from './main';

export const colorBox = {
  'skill': 'red',
  'weapon': 'yellow',
  'normal': 'blue',
} 

export const titleBox = {
  'skill': '技能',
  'weapon': '武器',
  'normal': '常规',
} 

type PropsType = {
  info: any;
  type: 'card' | 'skill' | 'weapon';
}

const BackpackDetail: React.FC<PropsType>  = (props)=>{
  const {info} = props
  const [offset, setOffset] = useState(10)
  const [rotate, setRotate] = useState(30)
  // const [color, setColor] = useState('')
  const [noRaidus, setNoRaidus] = useState(info.border.includes(9))

  // const { rate, random, detail, desc, cardPos } = useSnapshot(state)
  
  // const detail = useSnapshot(scDetail)
  // getRandomSC()

  const color  = colorBox[info.type]

 
  return (<div className="card-box backpack-tooltip">
    
        <div className={`card-info ${color}`}
          style={{
            ...getBorderColor(color ? info.border : []),
          }} 
        >  
          <div className={`card-outer-border outer-${color}`} style={noRaidus ?  {
            borderRadius: 0 ,
            borderImage: 'linear-gradient(to right, #ac1830, #d9b213, #285dad, #ddd) 30 30',
          } : {}}> </div>
          <div className="card-inset-border" style={{
            borderRadius: noRaidus? 0 : 10
          }}> </div>
            {color && <div className='card-detail animate__animated animate__bounceIn'>
                <div className={'card-title'}>{titleBox[info.type]}卡</div>
                <div className={'card-desc'}>{info.desc}</div>
              </div>}
           </div>
  </div>)
};

export default BackpackDetail
