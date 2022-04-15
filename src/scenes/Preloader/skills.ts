
import { SKILLS } from '../../constants/assets/skills';
// import { SCENES } from '../../constants/scenes';

export const loadSkillsAssets = (scene: Phaser.Scene) =>{
  scene.load.spritesheet(SKILLS.IMAGES.USE_SKILL, 'assets/spritesheets/skills/use-skill-big.png', {
    frameWidth: 100,
    frameHeight: 100,
    // spacing: 6,
  })
  scene.load.spritesheet(SKILLS.IMAGES.SEAGULL_FLY, 'assets/spritesheets/skills/seagull/seagull.png', {
    frameWidth: 52,
    frameHeight: 32,
    // margin: 8,
    spacing: 6,
  })
  scene.load.audio(SKILLS.AUDIOS.SEAGULL_FLY, 'assets/audio/skills/seagull.mp3')
}

export const createSkillsAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: SKILLS.ANIMATIONS.SEAGULL_FLY,
    frames: scene.anims.generateFrameNumbers(SKILLS.IMAGES.SEAGULL_FLY, { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: SKILLS.ANIMATIONS.USE_SKILL,
    frames: scene.anims.generateFrameNumbers(SKILLS.IMAGES.USE_SKILL, { start: 0, end: 15 }),
    frameRate: 24,
    repeat: 0,
  });
}