import { Orientation } from '../geometry/orientation';
import { AbstractScene } from '../scenes/AbstractScene';
import { SCENES } from '../constants/scenes';
import { GameManager } from '../scenes/GameManager';



export class Item extends Phaser.Physics.Matter.Sprite {
  // public scene: AbstractScene;
  public tag: string;
  protected uiScene: GameManager;
  public scene: AbstractScene
  constructor(scene: AbstractScene, x: number, y: number, sprite: string, options?: Phaser.Types.Physics.Matter.MatterBodyConfig ) {
    console.log('init', x, y)
    super(scene.matter.world, x, y, sprite, 0, {
      label: 'character',
      ...options
    });
    
    this.scene = scene;
    // this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setIgnoreGravity(true)
    const uiScene: any = this.scene.scene.get(SCENES.GAME_MANAGER);
    this.uiScene = uiScene;
    this.setStatic(false)
    setTimeout(()=>{
      this.setFixedRotation()
    }, 0)
    
  }
}
