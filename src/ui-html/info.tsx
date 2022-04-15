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

type SCProps = {
  list: SCDisplayType[];
  detail: SCDisplayType;
}
const colorBox = {
  'skill': 'red',
  'weapon': 'yellow',
  'normal': 'blue',
} 

const Info: React.FC  = ()=>{

  // const {rate, type, random, card} = useSnapshot(state)
  const { info } = useSnapshot(flow)
  const { visible, type, message} = info
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
      enterActive: `animate__animated animate__fadeIn` ,
      exitActive: `animate__animated animate__fadeOut`,

    }}
    timeout={500}
    
  >
    <div className="info-box">
      <div className="info-message animate__animated animate__tada">{message}</div>
    </div>
  </CSSTransition>)
};

export default Info
