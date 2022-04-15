
import { SKILLS } from '@/constants/assets/skills';

import { WEAPONS } from '@/constants/assets/weapons';
import { Player } from '../Player';
// const WEAPON;

const getEffectImage = (type: string)=>{
  switch (type) {
    case 'use-skill':
      return SKILLS.IMAGES.USE_SKILL
    case 'use-weapon':
      return WEAPONS.IMAGES.USE_WEAPON
    default:
      break;  
  }    
}

const getEffectAnimation = (type: string)=>{
  switch (type) {
    case 'use-skill':
      return SKILLS.ANIMATIONS.USE_SKILL
    case 'use-weapon':
      return WEAPONS.ANIMATIONS.USE_WEAPON
    default:
      break;  
  }    
}

export class Effect extends  Phaser.GameObjects.Sprite {
  public scene: Phaser.Scene;
  constructor(scene: Phaser.Scene, player: Player, type?: string) {

    super(scene, player.x, player.y, getEffectImage(type));
    this.scene = scene;
    this.scene.add.existing(this);
    this.setDepth(1000);
    // this.set()
    this.setScale(0.8)
    console.log(getEffectAnimation(type), 'getEffectAnimation(type)')
    this.play(getEffectAnimation(type), true)
    this.on('animationcomplete', ()=>{ this.destroy() })
  }
}
