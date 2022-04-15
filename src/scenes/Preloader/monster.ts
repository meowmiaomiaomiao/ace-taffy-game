
import { MONSTER } from '../../constants/assets/monster';

// const monsterType = MONSTERS.MONSTER_TYPE
// const monsterSize = MONSTERS.MONSTER_SIZE
// const monsterType = MONSTERS.MONSTER_TYPE
// const monsterSize = MONSTERS.MONSTER_SIZE
export const loadMonsterAssets = (scene: Phaser.Scene, monsterType: any = [], monsterSize: any = []) =>{
  monsterType.forEach((m, i)=>{

    scene.load.spritesheet(MONSTER.IMAGES[`${m}_MOVE`], `assets/spritesheets/monster/${m}.png`, {
      frameWidth: monsterSize[i],
      frameHeight: monsterSize[i],
    })
  })
  
 
  // scene.load.audio(SKILLS.AUDIOS.SEAGULL_FLY, 'assets/audio/skills/seagull.mp3')
}

export const createMonsterAnimations = (scene: Phaser.Scene, monsterType: any = []) => {
  monsterType.forEach((m)=>{
    scene.anims.create({
      key: MONSTER.ANIMATIONS[`${m}_MOVE_LEFT`],
      frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: MONSTER.ANIMATIONS[`${m}_MOVE_RIGHT`],
      frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: MONSTER.ANIMATIONS[`${m}_MOVE_UP`],
      frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: MONSTER.ANIMATIONS[`${m}_MOVE_DOWN`],
      frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: MONSTER.ANIMATIONS[`${m}_IDLE_DOWN`],
      frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 0, end: 0 }),
      frameRate: 10,
      repeat: 1,
    });
  })

  
  
}