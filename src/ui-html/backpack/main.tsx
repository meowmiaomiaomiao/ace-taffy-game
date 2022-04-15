
import React from 'react';

import { useState, forwardRef, useEffect, useCallback  } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'
import { CSSTransition } from 'react-transition-group';
import { state as flow, setBackpackVisible } from '@/store/flow';
import { state as cellState, changeCardPosition, removeCard} from '@/store/card-cells'
import { state as weaponState, weaponBox, changeActiveWeapon, WeaponType } from '@/store/weapon';
import { state as skillState, skillBox, changeActiveSkill, SkillType } from '@/store/skill';
import { db } from '@/store/db';
import { state as card, CardSaveType, CardInfoType, setUserCardPos, setUserCardCfg, saveUserInfo } from '@/store/card';
import { useSnapshot } from 'valtio'
import { nanoid } from 'nanoid/non-secure'
import Tooltip from 'rc-tooltip'
import { DownSquareFilled, DeleteFilled} from '@ant-design/icons'
import { useLiveQuery } from "dexie-react-hooks";
import { getBorderColor, colorBox, titleBox } from '../card'
import Detail from './detail'

import './main.less'
// 'seagull' | 'birthday' | 'hotwater' | 'mousepad'
const weaponIconBox = {
  'continuousgun': 'icon-lianji2',
  'chargegun': 'icon-xuli',
  'shotgun': 'icon-xiandan',
  'revolver': 'icon-fensan',
}
const skillIconBox = {
  'seagull': 'icon-haiou',
  'birthday': 'icon-shengri',
  'hotwater': 'icon-rdq',
  'mousepad': 'icon-pigu',
}

const cardIconBox = {
  'skill': 'icon-sun',
  'normal': 'icon-star',
  'weapon': 'icon-moon',
}

const borderColorBox = {
  '0': 'transparent',
  '1': '#ac1830',
  '2': '#d9b213',
  '3': '#285dad',
  '4': '#ddd',
}

type BoxType = {
  id: string;
  card: CardSaveType;
  base: CardInfoType;
}



// box-shadow: 0px -10px 0px 0px red,  -10px 0px 0px 0px green,  10px 0px 0px 0px blue, 0px 10px 0px 0px pink;   /*下边阴影  黄色*/


 

const getActiveColor = (boxes, i, noActiveNoborder = false)=>{

  if (!boxes.length || !boxes[i]['card']) {
    return {}
  }
  
  const columns = 5
  const active = boxes[i] && boxes[i]['active']
  // const rainbow = active.includes(9)
  if (!active) {
    return {}
  }

  const style = {}
  const getTopBorderColor = ()=> {
    const type = active[0] 
    if (type) {
      style['borderTopStyle'] = 'solid'
    } else if (noActiveNoborder) {
      style['borderTopWidth'] = 0
    }
    return borderColorBox[type]
  }

  const getBottomBorderColor = ()=> {
    const type = active[1] 
    if (type) {
      style['borderBottomStyle'] = 'solid'
    } else if (noActiveNoborder) {
      style['borderBottomWidth'] = 0
    }
    return  borderColorBox[type]
  }

  const getLeftBorderColor = ()=> {
    const type = active[2] 
    if (type) {
      style['borderLeftStyle'] = 'solid'
    } else if (noActiveNoborder) {
      style['borderLeftWidth'] = 0
    }
    return  borderColorBox[type]
  }
  
  const getRightBorderColor = ()=> {
    const type = active[3] 
    if (type) {
      style['borderRightStyle'] = 'solid'
    } else if (noActiveNoborder) {
      style['borderRightWidth'] = 0
    }
    return  borderColorBox[type]
  }
  style['boxShadow'] = `0px -4px 0px 0px ${getTopBorderColor()}, -4px 0px 0px 0px ${getLeftBorderColor()}, 4px 0px 0px 0px ${getRightBorderColor()}, 0px 4px 0px 0px ${getBottomBorderColor()}`
  return style
}







const Backpack: React.FC  = ()=>{

  
  // const {rate, type, random, card} = useSnapshot(state)
  const { backpack } = useSnapshot(flow)
  const { cardCfg, cardPos, store } = useSnapshot(card)
  const cells = useSnapshot(cellState)
  const weapon = useSnapshot(weaponState)
  const weaponStore = weapon.store
  const skill = useSnapshot(skillState)
  const skillStore = skill.store
  const { visible, message } = backpack
  const [packRedraw, setPackRedraw] = useState(false)



  /// console.log(cardposCells, 'CSSTransition')
  return (<CSSTransition
    in={visible}
    unmountOnExit={true}
    classNames={{
      appear: '',
      // appear: layout.hidden? 'opacity-0' : 'opacity-1',
      enterActive: `animate__animated animate__fadeInUp animate__faster` ,
      exitActive: `animate__animated animate__fadeOutDown animate__faster`,

    }}
    onEntered={() => {
     
    }}
   
    timeout={500}
    
  >

    <div className="backpack-box" >
      <Flipper flipKey={packRedraw} className=" display-box" >
      <div className="card-pack">
          <div className="card-pack-title">背包</div>
         
            <div className="card-pack-box">
              {cells.posCells.map((item, i)=>{
                 const {card, base, upgrade} = item
                 const info = Object.assign({}, card, base)
                 return <Flipped  key={item.id} flipId={item.id}>
                    
                      <div className="item grab" data-drag-id={item.id} 
                        style={{
                          ...getBorderColor(card ? card.border : [], 3)
                        }}
                        onDragStart={(e)=>{
                          const dataTransfer = e.dataTransfer
                          dataTransfer.setData('sourceIdx', i+'')
                          dataTransfer.setData('sourceArray', 'posCells')
                        }}
                        onDragOver={(e)=>{
                          e.preventDefault()
                        }}
                        
                        onDrop={(e)=>{
                          const dataTransfer = e.dataTransfer
                          const sourceIdx = dataTransfer.getData('sourceIdx');
                          const sourceArray = dataTransfer.getData('sourceArray')
                          const targetIdx = i+''
                          const targetArray = 'posCells'
                          changeCardPosition([sourceArray, sourceIdx], [targetArray, targetIdx])
                          setPackRedraw(!packRedraw)
                        }}
                        
                        draggable="true">
                         
                          {base && <Tooltip 
                              overlay={<Detail info={info} type={'card'}></Detail>} 
                              placement="right" 
                              mouseEnterDelay={1}>
                            {<div className={`card-info back-${base.type}`}>
                              {base.abbr }
                              {upgrade && <div className={`card-back-icon`} >
                                <div className={`iconfont icon ${cardIconBox[base.type]}`}></div>
                              </div>}
                            </div>}
                          </Tooltip>} 
                        </div>
                      
                    </Flipped> 
                
                
                 
              })}
            </div>
         
      </div>
      <div className="card-tree">
          <div className="card-tree-title">装配</div>
          <div className="card-tree-box">
            <div className="card-cfg-box">
            {cells.cfgCells.map((item, i)=>{
              const {card, base, upgrade, activeUpgrade} = item
              return <Flipped  key={item.id} flipId={item.id}
               
              >
                {![6,13].includes(i) ? <div className="item grab" 
                  style={{
                    ...getBorderColor(card ? card.border : [], 3),
                    ...getActiveColor(cells.cfgCells, i)
                  }}
                  data-drag-id={item.id} 
                  data-border={card && card.border}
                  onDragStart={(e)=>{

                    const dataTransfer = e.dataTransfer
                    dataTransfer.setData('sourceIdx', i+'')
                    dataTransfer.setData('sourceArray', 'cfgCells')
                  }}
                  onDragOver={(e)=>{
                    e.preventDefault()
                  }}

                  onDrop={(e)=>{
                    const dataTransfer = e.dataTransfer
                    const sourceIdx = dataTransfer.getData('sourceIdx');
                    const sourceArray = dataTransfer.getData('sourceArray')
                    const targetIdx = i+''
                    const targetArray = 'cfgCells'
                    changeCardPosition([sourceArray, sourceIdx], [targetArray, targetIdx])
                    setPackRedraw(!packRedraw)
                   }}
                   
                   draggable="true">
                     {base && <div className={`card-info back-${base.type}  ${activeUpgrade && 'active-upgrade'}`}>
                        {activeUpgrade ? '' : base.abbr }
                        {upgrade && <div className={`card-back-icon `} >
                          <div className={`iconfont icon ${cardIconBox[base.type]}`}></div>
                        </div>}
                      </div>}
                   </div>:


                   <div className="item" 
                      style={{
                        ...getBorderColor(card ? card.border : [], 0),
                        ...getActiveColor(cells.cfgCells, i, true)
                      }}>
                   <div className={`${activeUpgrade? 'active-upgrade': ''} skill-item-out`}>
                        {i === 6 ? <div className="skill-item"
                          style={{
                            ...getBorderColor(weaponStore[weapon.active] ? weaponStore[weapon.active].border : []),
                            ...getActiveColor(cells.cfgCells, i)
                          }}
                        >
                          <div className={`iconfont ${weaponIconBox[weapon.active]}`}></div>
                        </div>:  <div className="skill-item"
                          style={{
                            ...getBorderColor(skillStore[skill.active] ? skillStore[skill.active].border : []),
                            ...getActiveColor(cells.cfgCells, i)
                          }}
                        >
                          <div className={`iconfont ${skillIconBox[skill.active]}`}></div>
                        </div>}
                    </div>
                  </div>}

                    
                </Flipped>
              })}
            </div>
            <div className="select-box">
              <div className="weapon-box">
                <div  className="title">武器</div>
                <div  className="icon-box">
                {Object.keys(weaponBox).map((key: WeaponType)=>{
                  return  <div key={key} 
                      className={`icon-item ${weapon.active === key && 'active'}`}
                      style={{
                        ...getBorderColor(weaponStore[key] ? weaponStore[key].border : []),
                      }}
                      onClick={()=>{
                        changeActiveWeapon(key)
                      }}
                    >
                    <div className={`iconfont icon ${weaponIconBox[key]}`}
                      style={{
                        fontWeight: 'bolder'
                      }}
                    ></div>
                  </div>
                })}
                </div>
              </div>
              <div className="skill-box">
                <div className="title">技能</div>
                <div  className="icon-box">
                {Object.keys(skillBox).map((key: SkillType)=>{
                  return  <div key={key} 
                      className={`icon-item ${skill.active === key && 'active'}`}
                      style={{
                        ...getBorderColor(skillStore[key] ? skillStore[key].border : []),
                      }}
                      onClick={()=>{
                        changeActiveSkill(key)
                      }}
                  >
                    <div className={`iconfont icon ${skillIconBox[key]}`}  
                      style={{fontWeight: 'bolder'}}
                    ></div>
                  </div>
                })}
                </div>
              </div>
            </div>

            <div className="tool-box">
                <div key={0} className="item" 
                  
                  onDragOver={(e)=>{
                    e.preventDefault()
                  }}

                  onDrop={(e)=>{
                    const dataTransfer = e.dataTransfer
                    const sourceIdx = dataTransfer.getData('sourceIdx');
                    const sourceArray = dataTransfer.getData('sourceArray')
                    removeCard([sourceArray, sourceIdx])
                    setPackRedraw(!packRedraw)
                  }}>
                  <DeleteFilled  />
                </div>
                <div key={1} className="item"></div>
                <div key={2} className="item"></div>
                <div key={3} className="item"></div>
                <div key={4} className="item" onClick={()=>{
                  setBackpackVisible(false)
                }}>
                  <DownSquareFilled />
                </div>
            </div>
            
          </div>
      </div>
      {/* <div className="info-message animate__animated animate__tada">{message}</div> */}
      </Flipper>
    </div>

  </CSSTransition>)
};

export default Backpack
