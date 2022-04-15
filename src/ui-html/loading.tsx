import React from 'react';

import { useState, forwardRef  } from 'react';
import { getRandomSC, SCDisplayType } from '@/store/sc'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'
import { DownloadOutlined } from '@ant-design/icons';
import { state } from '@/store/card';
import { CSSTransition } from 'react-transition-group';
import { state as flow } from '@/store/flow';
import { useSnapshot } from 'valtio'

const Info: React.FC  = ()=>{

  // const {rate, type, random, card} = useSnapshot(state)
  const { gameLoading } = useSnapshot(flow)
  const { visible, value } = gameLoading
  useEffect(()=>{
    const pos = {
      offset: 10
    }
  }, [])

  return (<CSSTransition
    in={visible}
    unmountOnExit={true}
    classNames={{
      // appear: layout.hidden? 'opacity-0' : 'opacity-1',
     
      exitActive: `animate__animated animate__fadeOut animate`,

    }}
    timeout={1000}
    
  >
    <div className="loading-box">
      <video style={{height: 500, width: 500}} muted src="./assets/ui/crashdietwice.mp4" autoPlay onEnded={()=>{
        flow.gameLoading.logoEnd = true
        if (value === 1) {
          flow.gameLoading.visible = false
          flow.step = 'base'
          
        }
      }} ></video>
      <div className="loading-progress">
        <span>{Math.floor(value * 100)}%</span>
        <div className="css-progress" style={{width: `${value * 100}%`}}>
           
        </div>
      </div>
    </div>

   
  </CSSTransition>)
};

export default Info
