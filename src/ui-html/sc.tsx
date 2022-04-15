import * as React from 'react';
import { useState, forwardRef  } from 'react';
import { getRandomSC, SCDisplayType } from '@/store/sc'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit'

import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { state, removeSC } from '@/store/sc';
import { state as flow } from '@/store/flow';
import { getCardTypeFromSC} from '@/store/card';
import { useSnapshot } from 'valtio'

type SCProps = {
  list: SCDisplayType[];
  detail: SCDisplayType;
}

const SC: React.FC  = ()=>{
  // const [list, setList] = useState<SCDisplayType[]>([])
  // const [detail, setDetail] = useState<SCDisplayType | null>()
  // const [reload, setReload] = useState<boolean>()
  // console.log(scList, scDetail)
  // const statesA = 
  const [detailVisible, setDetailVisible] = useState(true)
  const {list, detail} = useSnapshot(state)
  const {step} = useSnapshot(flow)
  // const detail = useSnapshot(scDetail)
  // getRandomSC()
  useEffect(()=>{
    if (step === 'gacha') {
      getCardTypeFromSC(list)
      setDetailVisible(false)
    }
  }, [step])


  return (['randomMaze', 'eliteMonsterStart', 'eliteMonsterEnd'].includes(step) && <div 
        className='sc-box'
      >
     <Flipper  flipKey={list.length}>
      <div className="sc-list">
        {list.map((sc, i) => (
          <Flipped  key={sc.id} flipId={sc.id}>
          <div >
            <div className={'sc-item animate__animated animate__fadeInRight sc-outline ' + sc.type} >
                <div className="sc-icon"><img src={sc.icon || './assets/ui/monster/feiqiu.png'} /></div>
                <div className="sc-price">￥{sc.price}</div>
                <div className="remove-button" onClick={(()=>{
                  removeSC(i)
                })}>
              
                  <DeleteOutlined style={{fontSize: 24}} />
                </div>
            </div>
           
              
          </div>
          </Flipped>
        ))}
      </div>
    </Flipper>
    
    { (detailVisible && detail ) && <div className="animate__animated animate__fadeOut animate__delay-4s " key={detail.id}>
      <div className={'sc-detail animate__animated animate__fadeInRight ' + detail.type}>
        <div className="sc-title"><span><img src={detail.icon} /></span><span className='sc-name'>{detail.name}</span>￥{detail.price}</div>
        <div className="sc-desc">{detail.desc}</div>
      </div>
    </div>}
  </div>)
};

export default SC
