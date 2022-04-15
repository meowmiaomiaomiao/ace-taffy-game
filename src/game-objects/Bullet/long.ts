import { Orientation } from '../../geometry/orientation';
import { Weapon } from './Weapon';
import { WEAPONS } from '../../constants/assets/weapons';
import { Arrow } from '.'
import { LongEffect } from './long-effect'
import { COLLISON } from '../../constants/collison';
import { Player } from '../Player';
const ARROW_SPEED = 10;

export class Long extends Arrow {
  // public scene: Phaser.Scene;
  // public scaleY: number;
  // public body: MatterJS.BodyType;
  private tween: Phaser.Tweens.Tween
  private heightReduce: boolean;
  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, player, WEAPONS.IMAGES.LONGARROW, {
      label: 'long-arrow'
    });
    new LongEffect(scene, player, this)
    this.scene = scene;
    this.scaleY = 0.2
    this.scaleX = 2.2
    this.visible = false;
    this.hp = 100000
    this.attack = 10
    // this.setStatic(true)
   
    
    this.setCollisionGroup(COLLISON.PLAYER)
    this.setCollisionCategory(COLLISON.LAYERS.MONSTER)
    this.setCollidesWith([COLLISON.LAYERS.MONSTER])
    
    // this.setCollisionCategory(COLLISON.LAYERS.PLAYER)
    // this.setCollidesWith([COLLISON.LAYERS.PLAYER, COLLISON.LAYERS.MONSTER])
   
    const offset = 155
    const v2 = new Phaser.Math.Vector2(offset, offset)
    v2.setAngle(this.player.mouseRadian)
    this.setPosition(this.player.x + v2.x,  this.player.y + v2.y)
    this.setRotation(player.mouseRadian)
    this.preUpdate = (()=>{
      
      v2.setAngle(this.player.mouseRadian)
      this.setPosition(this.player.x + v2.x,  this.player.y + v2.y)
      this.setRotation(player.mouseRadian)
    })

    
  }

 
}
