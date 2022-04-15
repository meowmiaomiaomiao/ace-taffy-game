import { Orientation } from '../geometry/orientation';
import { AbstractScene } from '../scenes/AbstractScene';
import { SCENES } from '../constants/scenes';
import { GameManager } from '../scenes/GameManager';

type CharacterAnimation = {
  [K in Orientation]: {
    flip: boolean;
    anim: string;
  };
};

export abstract class Character extends Phaser.Physics.Matter.Sprite {
  // public scene: AbstractScene;
  public tag: string;
  public scene: AbstractScene
  constructor(scene: AbstractScene, x: number, y: number, sprite: string, options?: Phaser.Types.Physics.Matter.MatterBodyConfig ) {
    super(scene.matter.world, x, y, sprite, 0, {
      label: 'character',
      ...options
    });
    
    this.scene = scene;
    // this.scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.setIgnoreGravity(true)
    this.setStatic(false)
    setTimeout(()=>{
      // console.log(this)
      this.setFixedRotation()
    }, 0)
    
  }

  protected animate(animationKeys: CharacterAnimation, orientation: Orientation, repeat?: number) {
    const { flip, anim } = animationKeys[orientation];
    // console.log(animationKeys[orientation])
    if (repeat !== undefined) {
      const manager = this.anims.animationManager
      manager.get(anim).repeat = repeat;
    }
    
    // console.log()
    this.setFlipX(flip);
    this.play(anim, true);
  }

  
}
