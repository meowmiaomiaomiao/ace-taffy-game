import { Orientation } from '../../geometry/orientation';
import { Weapon } from './Weapon';
import { Player } from '../Player';
import { WEAPONS } from '../../constants/assets/weapons';
import { Arrow } from '.'
import { setDirectionRotation } from '@/utils/tools'
import { COLLISON } from '../../constants/collison';
const ARROW_SPEED = 3;

export class Short extends Arrow {
  
  constructor(scene: Phaser.Scene, pleyer: Player) {
    super(scene, pleyer, WEAPONS.IMAGES.SHORTARROW);
    this.scene = scene;
    
    
    this.setDisplaySize(60, 30)
    // // this.setScale(0.5)
    // this.setSize(30, 30)
    this.setMass(100000)
    this.setDepth(1000);
    this.setBody({
      width: 20,
      height: 15,
    }, {
      label: 'short-arrow',
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0,
    })
    this.setCollisionGroup(COLLISON.PLAYER)
    this.setCollisionCategory(COLLISON.LAYERS.MONSTER)
    this.setCollidesWith([COLLISON.LAYERS.MONSTER])

    setTimeout(()=>{
      this.emit('shootEnd')
    }, 0)
   
    this.setDepth(1000);
    // this.setRotation(Math.PI / 180 * 30)
    // this.rotation = Math.PI / 180 * 30
    // this.setRotation(this.player.mouseAngle)
    
    const v2 = new Phaser.Math.Vector2(ARROW_SPEED, ARROW_SPEED)
    v2.setAngle(this.player.mouseRadian)
    this.setRotation(this.player.mouseRadian)
    // this.setDirectionRotation(this, this.player.mouseAngle)
    this.setVelocity(v2.x, v2.y)
  }  
}
