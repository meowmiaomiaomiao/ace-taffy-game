import { Orientation } from '../geometry/orientation';
import { Player, PLAYER_SPEED } from './Player';
import { WEAPONS } from '../constants/assets/weapons';
import { ASSETS } from '../constants/assets/index';
import { Effect } from '@/game-objects/Skills/effect'
import { COLLISON } from '../constants/collison';
// const WEAPON;
import { Character } from './Character';
import { AbstractScene } from '../scenes/AbstractScene';
import { state as weaponState} from '@/store/weapon'
// const getSkillsImage = (type: string)=>{
//   switch (type) {
//     case 'default':
//       return ASSETS.IMAGES.IO_MOVE
//     default:
//       break;  
//   }    
// }
const IO_DELAY = 800
const IO_ANIMATION = {
  down: { flip: false, anim: ASSETS.ANIMATIONS.IO_MOVE_DOWN },
  up: { flip: false, anim: ASSETS.ANIMATIONS.IO_MOVE_UP },
  left: { flip: false, anim: ASSETS.ANIMATIONS.IO_MOVE_LEFT },
  right: { flip: false, anim: ASSETS.ANIMATIONS.IO_MOVE_RIGHT },
};

export class IO extends Character {
  // public scene: Phaser.Scene;
  // public scale: number;
 
  private player: Player;



  constructor(scene: AbstractScene, player: Player) {
    super(scene, player.x, player.y,  ASSETS.IMAGES.IO_MOVE);
    this.scene = scene;
    this.player = player
    this.visible = false
    // this.setSensor(true)
    this.setBody({
      width: 5,
      height: 5,
    })
    this.setCollisionGroup(COLLISON.MONSTER)
    this.setSensor(true)
    this.setCollisionCategory(-1)
    this.setDepth(999);


    // this.anims.play(WEAPONS.ANIMATIONS.CHARGE, true);
  }


  public show() {
    this.visible = true
    this.player.setSensor(true)
    this.setSensor(false)
    this.setPosition(this.player.x,  this.player.y - 10)
    this.player.setTint(0x363636)
   
    this.scene.time.addEvent({
      delay: IO_DELAY,
      callback: this.hide,
      callbackScope: this,
    });
    this.scene.changeCameraFollow(this)
    // this.tween = this.scene.tweens.create({
    //   targets: [this, this.body],
    //   scale: 1,
    //   duration: PLAYER_RELOAD * 2,
    // })
    // this.tween.play(true)

  }
  public hide() {
  

    
    this.scene.tweens.create({
      targets: [this.player],
      alpha: 0,
      duration: 200,
      onYoyo: ()=>{
        this.player.setSensor(false)
        this.setSensor(true)
        this.visible = false
        this.setVelocity(0,0)
        this.player.setPosition(this.x, this.y)
        this.player.weapon.setPosition(this.x, this.y)
        this.player.clearTint()
        this.scene.changeCameraFollow(this.player)
      },
      yoyo: true,
    }).play(true)
    // this.tween
  }  
  public move(direction: string, shouldAnimate?: boolean) {
    
    const { flip, anim } = IO_ANIMATION[direction];
    
    switch (direction) {
      case Orientation.Left:
        this.setVelocityX(-PLAYER_SPEED);
        // this.setX(this.x - PLAYER_SPEED)
        break;
      case Orientation.Right:
        this.setVelocityX(PLAYER_SPEED);
        // this.setX(this.x + PLAYER_SPEED)
        break;
      case Orientation.Up:
        this.setVelocityY(-PLAYER_SPEED);
        // this.setY(this.y - PLAYER_SPEED)
        break;
      case Orientation.Down:
        this.setVelocityY(PLAYER_SPEED);
        // this.setY(this.y + PLAYER_SPEED)
        break;
      default:
        break;
    }

    
    if (!shouldAnimate) {
      return;
    }
 

    this.play(anim, true);

   
    
  }

  public handleHorizontalMovement(keyPressed) {
    const isUpDownPressed = keyPressed.up || keyPressed.down;
    if (keyPressed.left) {
      this.move(Orientation.Left, !isUpDownPressed);
      return;
    } else if (keyPressed.right) {
      this.move(Orientation.Right, !isUpDownPressed);
      return;
    }
  }

  public handleVerticalMovement(keyPressed) {
   
    if (keyPressed.up) {      
      this.move(Orientation.Up);
      return;
    } else if (keyPressed.down) {
      this.move(Orientation.Down);
      return;
    }
  }

  public beIdle() {
    // const { flip, anim } = IO.IO_IDLE[orientation];
    this.play(ASSETS.ANIMATIONS.IO_MOVE_DOWN, true);
  }
  

}
