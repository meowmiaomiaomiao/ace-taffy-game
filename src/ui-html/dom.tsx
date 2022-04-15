import * as React from 'react';
import SC from './sc'
import Card from './card'
import Info from './info'
import Backpack from './backpack/main'
import UI from './ui'
import Loading from './loading'
type HelloProps = {
  name: string;
}
const DOM: React.FC<HelloProps>  = ()=>{
  return (
    <div>
      <UI></UI>
      <Loading></Loading>
      <Backpack></Backpack>
      <SC/>
      <Card></Card>
      <Info></Info>
    </div>
  );
};

export default DOM
