import { Orientation } from '../geometry/orientation';
import { AbstractScene } from '../scenes/AbstractScene';
import { SCENES } from '../constants/scenes';
import { GameManager } from '../scenes/GameManager';
import { Console } from 'console';
import { state as flow } from '@/store/flow'

type ZoneOptionsType = {
  message: string;
  callback?: null | Function;
}

export class Zone {
  // public scene: AbstractScene;
  public tag: string;
  public scene: AbstractScene;
  public zone: MatterJS.BodyType;
  public active: boolean;
  public callback: null | Function
  constructor(scene: AbstractScene, x: number, y: number, width: number, height: number, options: ZoneOptionsType = {
    message: '',
    callback: ()=>{},
  }) {
  

    
    this.scene = scene;
    this.zone = this.scene.matter.add.rectangle(x, y, width, height)
    
    this.zone.isSensor = true
    this.active = false
    this.callback = options.callback
    // this.zone.collisionFilter = {

    // }
    // this.scene.matter.overlap(this.zone, ()=>{

    // })
    this.zone.onCollideCallback = (e)=>{
      if (e.bodyB.gameObject.tag === 'taffy') {
        this.active = true
        const camera = this.scene.cameras.main
        const mapScale = this.scene.mapScale
        const {x: playerX, y: playerY} = this.scene.player
        // const xy = this.scene.cameras.main.getWorldPoint(x, y)
        flow.actionCard.visible = true;
        flow.actionCard.message = options.message;
        flow.actionCard.position = [(playerX - camera.worldView.x) * mapScale,  (playerY - camera.worldView.y) * mapScale]
        scene.actionZone = this
      }
    }
    this.zone.onCollideEndCallback = (e)=>{
      this.active = false
      flow.actionCard.visible = false;
      flow.actionCard.message = '';
      flow.actionCard.position = [0, 0]
      scene.actionZone = null
    }
    // this.zone.is
    // this.scene.add.existing(this.zone);
    // this.scene.physics.add.existing(this);

    
  };
  public doAction () {
   
    if (this.active) {
    
      this.active = false
      this.callback && this.callback()
    }
  }
}
