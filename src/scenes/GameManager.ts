import { REGISTRY_KEYS } from '../constants/registry';
import { SCENES } from '../constants/scenes';
import { EVENTS } from '../constants/events';
import { state as flow } from '@/store/flow'
import { subscribeKey } from 'valtio/utils'
export class GameManager extends Phaser.Scene {
  constructor() {
    super(SCENES.GAME_MANAGER);
  }

  public get playerHp(): number {
    return this.registry.get(REGISTRY_KEYS.PLAYER.HP);
  }

  public set playerHp(newHp: number) {
    this.registry.set(REGISTRY_KEYS.PLAYER.HP, newHp);
    this.events.emit(EVENTS.UPDATE_HP);
  }

  protected create() {
    // this.scene.tweens
    // window.Tweens = this.scene.scene.tweens
    // console.log(this.scene.scene.tweens, 'this.scene.create')
    // console.log(this.scene.scene.tweens, 'scene')
  
    
    
    // this.scene.launch(SCENES.BASE_LEVEL);
    subscribeKey(flow, 'step', ()=>{
      if (flow.step === 'base') {
        this.scene.start(SCENES.BASE_LEVEL);
      } else if (flow.step === 'randomMaze') {
        this.scene.remove(SCENES.BASE_LEVEL)
        // this.scene.launch(SCENES.MAZE_LEVEL);
        this.scene.start(SCENES.MAZE_LEVEL)
        // setTimeout(()=>{
         
        // }, 0)
        
      }
    })
    // this.scene.pause()
  }

  protected ready() {
   
    window.Tweens = this.scene.scene.tweens
  }
}
