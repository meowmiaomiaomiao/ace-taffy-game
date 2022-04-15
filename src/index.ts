import 'phaser';
import { ShopLevel } from './scenes/level/shopLevel';
import { MazeLevel } from './scenes/level/mazeLevel';
import { Preloader } from './scenes/Preloader/index';
import { GameManager } from './scenes/GameManager';
import { HUD } from './scenes/HUD';
import DOM from './ui-html/dom'
import React from 'react';
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css';
import GlowFilterPipelinePlugin from 'phaser3-rex-plugins/plugins/glowfilter2pipeline-plugin.js';
import KawaseBlurPipelinePlugin from 'phaser3-rex-plugins/plugins/kawaseblurpipeline-plugin.js';
import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js'
// import 'animate.css';
import 'rc-tooltip/assets/bootstrap.css'
import './index.less'
import {initDB} from '@/store/db'


ReactDOM.render(React.createElement(DOM), document.querySelector('#ui-container'));

setTimeout(()=>{
  initDB()
},0)

class PhaserGame extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 640, 
      height: 360,
      zoom: 2,
      pixelArt: true,
      physics: {
        default: 'matter',
        matter: {
          debug: true,
        }
      },

      fps: {
        target: 60,
      },
 
      plugins: {
        global: [{
            key: 'rexGlowFilterPipeline',
            plugin: GlowFilterPipelinePlugin,
            start: true
        },{
          key: 'rexKawaseBlurPipeline',
          plugin: KawaseBlurPipelinePlugin,
          start: true
        }, {
          key: 'rexOutlinePipeline',
          plugin: OutlinePipelinePlugin,
          start: true
        }]
      },
      // pipeline: {
      //   name: 'rexGlowFilterPipeline',
      //   pipeline: GlowFilterPostFx
      // },
      // HUD   FirstLevel, 
      scene: [Preloader, GameManager,  ShopLevel, MazeLevel ],
    };
    super(config);
  }
}

// tslint:disable-next-line
new PhaserGame();
