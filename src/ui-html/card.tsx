import * as React from 'react';
import { useState, forwardRef, useMemo  } from 'react';
import { getRandomSC, SCDisplayType } from '@/store/sc'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'

import { state, saveCard } from '@/store/card';
import { state as flow } from '@/store/flow';
// import { db } from 'db';
import { useSnapshot } from 'valtio'

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



const borderArray = ['borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor']
const borderColorBox = {
  '0': '#121212',
  '1': '#ac1830',
  '2': '#d9b213',
  '3': '#285dad',
  '4': '#ddd',
}


export const getBorderColor = (array: readonly number[], width = 0)=>{
  
  const style = {}

  if (array.length && width) {
    style['borderWidth'] = width
  }

  if (array.includes(9)) {
    style['borderImage'] = `conic-gradient( #ac1830, #ac1830, #ddd, #d9b213,  #285dad, #285dad, #ddd,  #d9b213,  #ac1830) ${width ? width + ' ' + width : '30 30'}`
    return style
  }

  
  
  for (let i = 0; i < 4; i++) {
    const key = borderArray[i]
    style[key] = borderColorBox[array[i]]
  }

  
 
  return style
}

const Card: React.FC  = ()=>{
  const [offset, setOffset] = useState(10)
  const [rotate, setRotate] = useState(30)
  const [color, setColor] = useState('')
  const [noRaidus, setNoRaidus] = useState(false)
  const { rate, random, detail, desc, cardPos } = useSnapshot(state)
  
  const { step } = useSnapshot(flow)
  // const detail = useSnapshot(scDetail)
  // getRandomSC()
  const type  = detail ? detail.type : ''
  // useEffect(()=>{
  //   const pos = {
  //     offset: 10
  //   }


  // }, [])

  const canCreate = useMemo(()=>{
    return cardPos.includes(0)
  }, [cardPos])

  const reset = useCallback(()=>{
    setColor('')
    setOffset(10)
    setNoRaidus(false)
    setRotate(30)
  }, [])

  return (step === 'gacha' && <div className="card-box ">
     <div className='rate-line animate__animated animate__flipInX'>
       <div className='red' style={{width: rate.skill * 100 + '%'}}></div>
       <div className='yellow'  style={{width: rate.weapon * 100 + '%'}}></div>
       <div className='blue'  style={{width: rate.normal * 100 + '%'}}></div>
     </div>
     <div className="card-hand" style={{transform: `translateX(${offset}px)`}} onAnimationEnd={()=>{
       // console.log('123')
       setTimeout(()=>{
        setOffset(15 + (1230 - 10) * random)
       }, 0)
       
     }}></div>
     <div className="card-stage"  onAnimationEnd={()=>{
       // console.log('123')
       setTimeout(()=>{
        setRotate(0)
        setNoRaidus(detail.border.includes(9))
        setColor(colorBox[type])
       }, 0)
     }}>
     
        <div className={`card-info ${color}`}
          style={{
            ...getBorderColor(color ? detail.border : []),
            transform: `rotate(${rotate}deg)`
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
                <div className={'card-title'}>{titleBox[type]}卡</div>
                <div className={'card-desc'}>{desc}</div>
                <div className={'sync-button'} > 
                
                  <div className={'game-button'} onClick={()=>{
                    canCreate ? saveCard() : ''
                  }}>
                    <a href="#" className="action-button shadow animate button-normal">保存</a>
                  </div>
                  <div className={'game-button'} onClick={()=>{
                    reset()
                    flow.step = 'default'
                    setTimeout(()=>{
                      flow.step = 'gacha'
                    }, 0)
                  }}>
                    <a href="#" className="action-button shadow animate button-normal">重抽</a>
                  </div>
              </div>
              </div>}
           </div>
      </div>
  </div>)
};

export default Card
