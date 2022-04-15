
import { ASSETS } from '../../constants/assets/index';
// import { SCENES } from '../../constants/scenes';
// PLAYER_IDLE_DOWN: 'player-idle-down',
//     PLAYER_IDLE_UP: 'player-idle-up',
//     PLAYER_IDLE_SIDE: 'player-idle-side',
//     PLAYER_WALK_DOWN: 'player-walk-down',
//     PLAYER_WALK_UP: 'player-walk-up',
//     PLAYER_WALK_SIDE: 'player-walk-side',
export const loadMoveAssets = (scene: Phaser.Scene) =>{
  scene.load.spritesheet(ASSETS.IMAGES.PLAYER_MOVE, 'assets/spritesheets/hero/taffy-move.png', {
    frameWidth: 48,
    frameHeight: 48,
  })
  scene.load.spritesheet(ASSETS.IMAGES.PLAYER_IDLE, 'assets/spritesheets/hero/taffy-idle.png', {
    frameWidth: 48,
    frameHeight: 48,
  })
  scene.load.spritesheet(ASSETS.IMAGES.IO_MOVE, 'assets/spritesheets/hero/io.png', {
    frameWidth: 48,
    frameHeight: 48,
  })
  // scene.load.audio(SKILLS.AUDIOS.SEAGULL_FLY, 'assets/audio/skills/seagull.mp3')
}

export const createMoveAnimations = (scene: Phaser.Scene) => {
  // scene.anims.create({
  //   key: SKILLS.ANIMATIONS.SEAGULL_FLY,
  //   frames: scene.anims.generateFrameNumbers(SKILLS.IMAGES.SEAGULL_FLY, { start: 0, end: 3 }),
  //   frameRate: 10,
  //   repeat: -1,
  // });

  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_MOVE_LEFT,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_MOVE, { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_MOVE_RIGHT,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_MOVE, { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_MOVE_UP,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_MOVE, { start: 12, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_MOVE_DOWN,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_MOVE, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.IO_MOVE_LEFT,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.IO_MOVE, { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.IO_MOVE_RIGHT,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.IO_MOVE, { start: 8, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.IO_MOVE_UP,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.IO_MOVE, { start: 12, end: 15 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.IO_MOVE_DOWN,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.IO_MOVE, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_IDLE_UP,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_IDLE, { start: 12, end: 12 }),
    frameRate: 10,
    repeat: 1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_IDLE_DOWN,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_IDLE, { start: 0, end: 0 }),
    frameRate: 10,
    repeat: 1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_IDLE_LEFT,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_IDLE, { start: 4, end: 4 }),
    frameRate: 10,
    repeat: 1,
  });
  scene.anims.create({
    key: ASSETS.ANIMATIONS.PLAYER_IDLE_RIGHT,
    frames: scene.anims.generateFrameNumbers(ASSETS.IMAGES.PLAYER_IDLE, { start: 8, end: 8 }),
    frameRate: 10,
    repeat: 1,
  });
}