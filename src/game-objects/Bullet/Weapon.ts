import { Orientation } from '../../geometry/orientation';
import { Player } from '../Player';
import { WEAPONS } from '../../constants/assets/weapons';
import { Short } from './short';
import { Long } from './long';
import { Effect } from '@/game-objects/Skills/effect'
// const WEAPON;
import { state as weaponState} from '@/store/weapon'
const getSkillsImage = (type: string)=>{
  switch (type) {
    case 'default':
      return WEAPONS.IMAGES.DEFAULT
    default:
      break;  
  }    
}
const PLAYER_RELOAD = 200

export class Weapon extends  Phaser.GameObjects.Sprite {
  public scene: Phaser.Scene;
  public scale: number;
  private direction: Orientation;
  private isLoading: boolean;
  private tween: Phaser.Tweens.Tween
  private player: Player;
  private longArrow: boolean;
  private continuous: Phaser.Time.TimerEvent;


  constructor(scene: Phaser.Scene, player: Player) {
    super(scene, player.x, player.y, getSkillsImage('default'));
    this.scene = scene;
    this.player = player
    this.alpha = 0
    this.scale = 0.3
  
    
    this.setScale(this.scale);
    this.setDepth(1000);
    this.scene.add.existing(this);
    this.longArrow = false;
    this.isLoading = false;
    // this.anims.play(WEAPONS.ANIMATIONS.CHARGE, true);
  }
  
  

  show() {
    this.alpha = 1
    this.scale = 0.3
    this.setPosition(this.player.x,  this.player.y - 10)
    this.tween = this.scene.tweens.create({
      targets: [this, this.body],
      scale: 1,
      duration: PLAYER_RELOAD * 2,
    })
    this.tween.play(true)
    this.play(WEAPONS.ANIMATIONS.CHARGE, true)
    if (weaponState.active === 'continuousgun') {
      return this.continuousFire()
    } 
  }

  private continuousFire() {
    this.emit('shootStart')
    const arrow = new Short(this.scene, this.player)
    arrow.setOnCollide( (data: Phaser.Types.Physics.Matter.MatterCollisionData)=>{
      const struckObject = data.bodyA.gameObject
      if (struckObject && struckObject.loseHp) {
        struckObject.loseHp(arrow)
      }
      

     
    })
    this.addArrowCollide(arrow)
    if (this.alpha !== 0) {
      this.continuous = this.scene.time.addEvent({
        delay: PLAYER_RELOAD,
        callback: this.continuousFire,
        callbackScope: this,
      });
    }
    this.player.emit('shootEnd')
   
  }

  private chargeFire() {
    this.player.emit('shootStart')
    const arrow = new Long(this.scene, this.player)
    new Effect(this.scene, this.player, 'use-weapon')
    this.addArrowCollide(arrow)
    if (this.alpha !== 0) {
      
    }
   
  }

  addArrowCollide(arrow) {
    arrow.setOnCollide((data: Phaser.Types.Physics.Matter.MatterCollisionData)=>{
      const struckObject = data.bodyA.gameObject
      if (struckObject && struckObject.loseHp) {
        struckObject.loseHp(arrow)
      }
    })
  }

  hide() {
    this.tween.remove()
    this.alpha = 0
    if (this.continuous) {
      this.continuous.destroy()
    }
    if (this.scale === 1 && weaponState.active === 'chargegun') {
      return this.chargeFire()
    } 
  }

  // preUpdate(time, delta) {
   
  //   if (this.scale < 1) {
  //     this.scale += 0.015
  //     // this.setScale(this.scale)
  //   } else {
  //     this.longArrow = true
  //   }
    
  //   this.anims.update(time, delta)
  // }
  
  createArrow() {
    
    // if (this.longArrow) {
    //   
    //   return new Long(this.scene, this.player, this.direction)
    // } else {
    //   return new Short(this.scene, this.player)
    // }
  }

  getArrow() {
    return []
  }

}
