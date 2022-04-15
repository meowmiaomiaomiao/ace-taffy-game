import { Monster } from './index';
import { MONSTER } from '../../constants/assets/monster';
import { MonsterInfoType } from '@/store/monster'
import { ASSETS } from '../../constants/assets/index';

export class EliteMonster extends Monster {

  // protected MONSTER_IDLE_DOWN = MONSTER.ANIMATIONS.MOLE_IDLE_DOWN;

  // protected MONSTER_SPEED = 20;

  constructor(scene, x = 400, y = 400, opts: MonsterInfoType) {
    const { name, hp, atk } = opts
    super(scene, x, y,  MONSTER.IMAGES[`${name}_MOVE`]);
    this.hp = hp;
    this.MONSTER_IDLE_DOWN = MONSTER.ANIMATIONS[`${name}_IDLE_DOWN`];
    this.WALK_ANIMATION =  {
      down: { flip: false, anim: MONSTER.ANIMATIONS[`${name}_MOVE_DOWN`] },
      up: { flip: false, anim: MONSTER.ANIMATIONS[`${name}_MOVE_UP`] },
      left: { flip: false, anim: MONSTER.ANIMATIONS[`${name}_MOVE_LEFT`] },
      right: { flip: false, anim: MONSTER.ANIMATIONS[`${name}_MOVE_RIGHT`] },
    };
    
    this.name = name
    this.hp = hp * 3;
    this.atk = atk * 3
    this.setDepth(5);
    this.setStatic(false)
    const glow = scene.plugins.get("rexGlowFilterPipeline")
    const outline = scene.plugins.get("rexOutlinePipeline")
    // this.setScale()
    // this.setCollideWorldBounds(true);
    // this.setImmovable(true);
    outline.add(this, {
      quality: 1,
      thickness: 2,
    })
    glow.add(this, {
      glowColor: 0xfa389a,
      outerStrength: 8,
      distance: 10,
    })
  }


  // protected animateAttack() {
  //   return undefined;
  // }
}
