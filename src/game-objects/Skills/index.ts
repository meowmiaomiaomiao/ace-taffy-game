import { Orientation } from '../../geometry/orientation';
import { Player } from '../Player';
import { SKILLS } from '../../constants/assets/skills';

import { COLLISON } from '../../constants/collison';
// import { ASSETS } from '../../constants/assets/index';
// const WEAPON;
const SKILL_SPEED = 120;
export interface Params { 
  hp: number;
  attack: number;
}
const getSkillImage = (type: string)=>{
  switch (type) {
    case 'seagull':
      return SKILLS.IMAGES.SEAGULL_FLY
    default:
      break;  
  }    
}
const createSeagull = function() {
  const {scene, player} = this
  this.play(SKILLS.ANIMATIONS.SEAGULL_FLY, true);
  this.center = {
    x: player.x,
    y: player.y
  }
  let r = 10
  scene.sound.add(SKILLS.AUDIOS.SEAGULL_FLY).play()

  this.attack = 3
  this.preUpdate = ((time, delta)=>{
    this.anims.update(time, delta)
    r = r + 0.3
    if (this.initTime === 0) {
      this.initTime = time
    }
    const t = (time - this.initTime) / 1000
    const x = r * Math.cos(SKILL_SPEED * t * Math.PI / 180) + this.center.x;
    const y = r * Math.sin(SKILL_SPEED * t * Math.PI / 180) + this.center.y;
    this.setPosition(x, y)
    this.setAngle(t * SKILL_SPEED + 180)
  })
  setTimeout(()=>{
    this.destroy()
  }, 10000)
}

export class Skill extends Phaser.Physics.Matter.Sprite implements Params {
  public scene: Phaser.Scene;
  public player: Player;
  public hp: number;
  public attack: number;
  private initTime: number;
  
  // public updateDisplayOrigin () {
  //   console.log(this, 'thisthis')
  // }
  constructor(scene: Phaser.Scene, player: Player, direction: Orientation, type?: string, options?: Phaser.Types.Physics.Matter.MatterBodyConfig) {
    
    super(scene.matter.world, player.x, player.y, getSkillImage(type), 0, {
      label: 'skill',
      ...options,
    });
    this.scene = scene;
    this.player = player;
    this.scene.add.existing(this);
    this.hp = 1
    this.attack = 1
    this.setDepth(1000);
    this.initTime = 0;
    this.setCollisionGroup(COLLISON.PLAYER)
    this.setCollisionCategory(COLLISON.LAYERS.MONSTER)
    this.setCollidesWith([8])
    switch (type) {
      case 'seagull': 
        createSeagull.call(this)
        // this.setAngularVelocity(SKILL_SPEED);
        // this.setVelocityY(-SKILL_SPEED);
        break;
      default:
        break;
    }
  }
}
