
// import { II } from '../../constants/assets/monster';
// import {  } from '../../constants/monsters';
// // MMR1_IDLE_DOWN: 'player-idle-down',
// //     MMR1_IDLE_UP: 'player-idle-up',
// //     MMR1_IDLE_SIDE: 'player-idle-side',
// //     MMR1_WALK_DOWN: 'player-walk-down',
// //     MMR1_WALK_UP: 'player-walk-up',
// //     MMR1_WALK_SIDE: 'player-walk-side',

// const monsterType = MONSTERS.MONSTER_TYPE
// const monsterSize = MONSTERS.MONSTER_SIZE
// export const loadMonsterAssets = (scene: Phaser.Scene) =>{
  
//   monsterType.forEach((m, i)=>{
//     console.log(MONSTER.IMAGES[`${m}_MOVE`], `assets/spritesheets/monster/${m}.png`)
//     scene.load.spritesheet(MONSTER.IMAGES[`${m}_MOVE`], `assets/spritesheets/monster/${m}.png`, {
//       frameWidth: monsterSize[i],
//       frameHeight: monsterSize[i],
//     })
//   })
  
 
//   // scene.load.audio(SKILLS.AUDIOS.SEAGULL_FLY, 'assets/audio/skills/seagull.mp3')
// }

// export const createMonsterAnimations = (scene: Phaser.Scene) => {
//   monsterType.forEach((m)=>{
//     scene.anims.create({
//       key: MONSTER.ANIMATIONS[`${m}_MOVE_LEFT`],
//       frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 4, end: 7 }),
//       frameRate: 10,
//       repeat: -1,
//     });
//     scene.anims.create({
//       key: MONSTER.ANIMATIONS[`${m}_MOVE_RIGHT`],
//       frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 12, end: 15 }),
//       frameRate: 10,
//       repeat: -1,
//     });
//     scene.anims.create({
//       key: MONSTER.ANIMATIONS[`${m}_MOVE_UP`],
//       frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 8, end: 11 }),
//       frameRate: 10,
//       repeat: -1,
//     });
//     scene.anims.create({
//       key: MONSTER.ANIMATIONS[`${m}_MOVE_DOWN`],
//       frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 0, end: 3 }),
//       frameRate: 10,
//       repeat: -1,
//     });

//     scene.anims.create({
//       key: MONSTER.ANIMATIONS[`${m}_IDLE_DOWN`],
//       frames: scene.anims.generateFrameNumbers(MONSTER.IMAGES[`${m}_MOVE`], { start: 0, end: 0 }),
//       frameRate: 10,
//       repeat: 1,
//     });
//   })

  
  
// }