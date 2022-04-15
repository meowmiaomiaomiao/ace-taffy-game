import { Orientation } from '../geometry/orientation';
import { Character } from './Character';
import { Weapon } from './Bullet/Weapon';
import { Skill } from './Skills/index';
import { Effect } from './Skills/effect';
import { IO } from './IO';
import { COLLISON } from '../constants/collison';
import { AbstractScene } from '../scenes/AbstractScene';
import { ASSETS } from '../constants/assets/index';
import { ACTION_KEYS } from '../constants/user-keys';
import { state as weaponState} from '@/store/weapon'


export const HIT_DELAY = 500;
export const PLAYER_SPEED = 2;
export const PLAYER_RELOAD = 500;
export const HP = 3;
export const KEY_ARRAY = Object.keys(ACTION_KEYS)
export class Player extends Character {
  public static MAX_HP = 3;
  
  public mouseRadian: number;
  public mouseAngle: number;
  private static MOVE_ANIMATION = {
    down: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_MOVE_DOWN },
    up: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_MOVE_UP },
    left: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_MOVE_LEFT },
    right: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_MOVE_RIGHT },
  };

 

  private static IDLE_ANIMATION = {
    down: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_IDLE_DOWN },
    up: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_IDLE_UP },
    left: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_IDLE_LEFT },
    right: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_IDLE_RIGHT },
  };

  // private static SHOOT_ANIMATION = {
  //   down: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_ATTACK_WEAPON_DOWN },
  //   up: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_ATTACK_WEAPON_UP },
  //   left: { flip: true, anim: ASSETS.ANIMATIONS.PLAYER_ATTACK_WEAPON_SIDE },
  //   right: { flip: false, anim: ASSETS.ANIMATIONS.PLAYER_ATTACK_WEAPON_SIDE },
  // };
  public weapon: Weapon;
  private hp: number = HP;
  private orientation: Orientation;
  private lastTimeHit: number;
  private isLoading: boolean;
  private isShooting: boolean;
  private isUseSkill: boolean;
  private isCharge: boolean;
  private isIO: boolean;
  private tomb: Phaser.GameObjects.Sprite;
 
  private io: IO;
  
  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y, ASSETS.IMAGES.PLAYER_IDLE);

    if (!this.hp) {
      this.hp = Player.MAX_HP;
    }
    this.setBody({
      width: 20,
      height: 20,
    })
    this.setOrigin(0.5, 0.6);
    this.setMass(1)
    this.setCollisionGroup(COLLISON.PLAYER)
    this.setCollisionCategory(COLLISON.LAYERS.PLAYER)
    // this.setCollidesWith([COLLISON.LAYERS.PLAYER, COLLISON.LAYERS.MONSTER])
    
  
    this.orientation = Orientation.Down;
    this.lastTimeHit = new Date().getTime();
    

    
    // this.setStatic(true)
    // this.setSize(10, 10);
    // this.setSensor(true)
    // this.setScale(0.5)
    this.setDepth(10);
    this.isLoading = false;
    this.isShooting = false;
    this.isUseSkill = false;
    this.isCharge = false;
    this.tomb = null;
    this.tag = 'taffy'
    this.weapon = new Weapon(this.scene, this)
    this.io = new IO(this.scene, this)
    this.isIO = false
    this.addListener('shootStart', ()=>{
      this.isCharge = true
    })
    this.addListener('shootEnd', ()=>{
      this.isCharge = false
    })
  }

  public updatePlayer(keyPressed) {
    // console.log(keyPressed)
    if (!this.active) {
      return;
    }
    
    
    const pointer = this.scene.input.activePointer
    pointer.updateWorldPoint(this.scene.cameras.main)

    this.mouseRadian = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY, )
    this.mouseAngle = this.mouseRadian / (Math.PI / 180)
    
    const noKeyPressed = KEY_ARRAY.filter((k)=>{
      return keyPressed[k]
    }).length === 0
    // const noKeyPressed = Object.values(keyPressed).filter((x)=>{
    //   console.log(x)
    //   return // x.isDown
    // }).length === 0;

    // console.log('beIdle', noKeyPressed)
    if (noKeyPressed && !this.isLoading) {
      this.beIdle();
      this.io.beIdle()
    }
    
    this.setVelocity(0);
    if (keyPressed.roll && !this.io.visible) {
      this.io.setVelocity(0);
      this.io.show()
      this.beIdle()
    }
    this.handleMovement(keyPressed);
    

    
    

    // 触发技能开始动画
    
    if (keyPressed.skill && this.isUseSkill === false) {
      this.useSkill();
      setTimeout(()=>{
        this.concludeSkill()
      }, 300)
    }

     // 松开按键释放技能
    // if (keyPressed.skillAction && this.isUseSkill === true) {
    //   this.concludeSkill();
    // }


    // 触发射箭开始动画
    if (keyPressed.shoot && this.isShooting === false && this.isCharge === false) {
   
      this.shoot();
      
    }

    // 松开按键射箭
    if (keyPressed.shootAction && keyPressed.shootChargeTime && this.isShooting === true) {
 
      this.concludeShoot(keyPressed.shootChargeTime);
    }
  }

  public canGetHit() {
    return new Date().getTime() - this.lastTimeHit > HIT_DELAY;
  }

  public loseHp() {
    this.hp--;

    this.lastTimeHit = new Date().getTime();

    if (this.hp > 0) {
      return;
    }

    // Player dies
    if (!this.tomb) {
      this.tomb = this.scene.add.sprite(this.x, this.y, ASSETS.IMAGES.TOMB).setScale(0.1);
    }
    this.destroy();
  }

  // private get hp() {
  //   return this.uiScene.playerHp;
  // }

  // private set hp(newHp: number) {
  //   this.uiScene.playerHp = newHp;
  // }

  private reload() {
    this.isLoading = true;
    this.isUseSkill = false;
    // this.scene.time.addEvent({
    //   delay: PLAYER_RELOAD,
    //   callback: this.readyToFire,
    //   callbackScope: this,
    // });
  }

  private readyToFire() {
    this.isLoading = false;
  }

  private move(direction: Orientation, shouldAnimate = true) {
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

    this.orientation = direction;

    this.animate(Player.MOVE_ANIMATION, this.orientation);
  }

  private handleHorizontalMovement(keyPressed) {
    const isUpDownPressed = keyPressed.up || keyPressed.down;
    if (keyPressed.left) {
      this.move(Orientation.Left, !isUpDownPressed);
      return;
    } else if (keyPressed.right) {
      this.move(Orientation.Right, !isUpDownPressed);
      return;
    }
  }

  private handleVerticalMovement(keyPressed) {
    if (keyPressed.up) {
      this.move(Orientation.Up);
    } else if (keyPressed.down) {
      this.move(Orientation.Down);
    }
  }

  private handleMovement(keyPressed) {
    if (this.io.visible) {
      this.io.handleHorizontalMovement(keyPressed);
      this.io.handleVerticalMovement(keyPressed);
    } else {
      if (this.isShooting || this.isUseSkill || this.isCharge) {
        return;
      }
      this.handleHorizontalMovement(keyPressed);
      this.handleVerticalMovement(keyPressed);
    }
   
  }

  private activeIdelAnimation () {
    if ( -135 <= this.mouseAngle && this.mouseAngle < -45) {
      this.animate(Player.IDLE_ANIMATION, Orientation.Up);
    } else if ( -45 <= this.mouseAngle && this.mouseAngle <= 45) {
      this.animate(Player.IDLE_ANIMATION, Orientation.Right);
    } else if ( 45 <= this.mouseAngle && this.mouseAngle <= 135) {
      this.animate(Player.IDLE_ANIMATION, Orientation.Down);
    } else {
      this.animate(Player.IDLE_ANIMATION, Orientation.Left);
    }
    // this.animate(Player.IDLE_ANIMATION, this.orientation);
  }

  private useSkill() {
    if (this.isUseSkill === false) {
      this.isUseSkill = true
      new Effect(this.scene, this, 'use-skill')
      this.activeIdelAnimation()
      // this.animate(Player.IDLE_ANIMATION, this.orientation);
    }  
    
  }

  private concludeSkill () {
    
    const skill = new Skill(this.scene, this, this.orientation, 'seagull');
    skill.setOnCollide( (data: Phaser.Types.Physics.Matter.MatterCollisionData)=>{

      const struckObject = data.bodyA.gameObject

      if (struckObject && struckObject.loseHp) {
        // console.log(struckObject, ' this.setStatic(true) this.setStatic(true)')
        struckObject.loseHp(skill)
      }
      

     
    })
    this.isUseSkill = false;
  } 

  private shoot() {

    if (this.isShooting === false) {
      this.isShooting = true
      this.weapon.show()
      this.activeIdelAnimation()
    }
  }
  

  private concludeShoot = (chargeTime: number) => {
    this.isShooting = false
    this.weapon.hide()
    // const arrow = this.weapon.getArrow();
    
    this.readyToFire()
    
  };


  private beIdle() {
    this.activeIdelAnimation()
    // this.animate(Player.IDLE_ANIMATION, this.orientation);
  }


}
