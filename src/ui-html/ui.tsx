import * as React from 'react';
import {DownSquareFilled, UpSquareFilled} from '@ant-design/icons'
// type HelloProps = {
//   name: string;
// }
import { useSnapshot } from 'valtio'
import { state as flow, setBackpackVisible } from '@/store/flow';
import './ui.less'
const UI: React.FC = ()=>{

  const {backpack, actionCard}  = useSnapshot(flow)
  return (
    <div className="ui-box">
      {actionCard.visible && <div className="action-box" style={{
        top: actionCard.position[1],
        left: actionCard.position[0]
      }}>
        <div className="action-button">
            <div className={'game-button'}>
              <a href="#" className="action-button shadow animate button-normal active-animate" style={{
                padding: '5px 20px',
              }}>E</a>
            </div>
        </div>
        <div  className={'action-message'}>{actionCard.message}</div>
        
      </div>}
      <div className="tool-box">
          <div key={0} className="item">

            <div className="skill-item">
              
            </div>
          </div>
          <div key={1} className="item">

            <div className="skill-item">
                
            </div>
          </div>
          <div key={2} className="item">
            <div className="skill-item">
              
            </div>
          </div>
          <div key={3} className="item">
              <div className="skill-item">
          
              </div>
          </div>
          <div key={4} className="item" onClick={()=>{
            setBackpackVisible(true)
          }}>
            {backpack.visible ? 
              <span style={{color:'#ddd'}}><DownSquareFilled /></span> :
              <span  style={{color:'#ddd'}}><UpSquareFilled  /></span>}
          </div>
      </div>
    </div>
  );
};

export default UI
