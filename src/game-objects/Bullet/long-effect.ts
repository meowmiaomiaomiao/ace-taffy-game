import { Orientation } from '../../geometry/orientation';
import { Weapon } from './Weapon';
import { WEAPONS } from '../../constants/assets/weapons';
import { Arrow } from '.'
import { setDirectionRotation } from '@/utils/tools'
import { Player } from '../Player';
export class LongEffect extends Phaser.GameObjects.Sprite {
  // public scene: Phaser.Scene;
  // public scaleY: number;
  // public body: MatterJS.BodyType;
  private tween: Phaser.Tweens.Tween
  constructor(scene: Phaser.Scene, player: Player, arrow: Arrow) {
    super(scene, player.x, player.y, WEAPONS.IMAGES.LONGARROW);
    this.scene = scene;
    // this.scaleY = 2
    // this.scaleX = 0.5
    // this.body.centerOfMass()
    this.setOrigin(0.1, 0.5)
    this.setDepth(1000);
    this.scene.add.existing(this)
   
    this.tween = this.scene.tweens.create({
      targets: [this],
      // angle: 60,

      // scaleY: 0,
      displayWidth: 600,
      // scaleY: 10,
      displayHeight: {value: 0, delay: 500},
      // width: {value: 0, delay: 400},
      duration: 200,
      onUpdate: ()=>{
        // this.update()
      },
      onComplete: () => {
        player.emit('shootEnd')
        this.destroy()
        arrow.destroy()
      }
    })

    this.tween.play(true)
    this.setRotation(player.mouseRadian)
    this.preUpdate = (()=>{
      this.setRotation(player.mouseRadian)
    })
    
  }

 
}
