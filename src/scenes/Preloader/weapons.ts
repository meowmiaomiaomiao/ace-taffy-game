
import { WEAPONS } from '../../constants/assets/weapons';
// import { SCENES } from '../../constants/scenes';

export const loadWeaponsAssets = (scene: Phaser.Scene) =>{
  scene.load.spritesheet(WEAPONS.IMAGES.USE_WEAPON, 'assets/spritesheets/weapons/use-weapon.png', {
    frameWidth: 100,
    frameHeight: 100,
    // spacing: 6,
  })
  scene.load.spritesheet(WEAPONS.IMAGES.DEFAULT, 'assets/spritesheets/weapons/gear.png', {
    frameWidth: 40,
    frameHeight: 40,
  })
  scene.load.spritesheet(WEAPONS.IMAGES.CHARGE, 'assets/spritesheets/weapons/charge3.png', {
    frameWidth: 100,
    frameHeight: 100,
  })
  scene.load.image(WEAPONS.IMAGES.LONGARROW, 'assets/spritesheets/weapons/long.png');
  scene.load.image(WEAPONS.IMAGES.SHORTARROW, 'assets/spritesheets/weapons/short.png');
}

export const createWeaponsAnimations = (scene: Phaser.Scene) => {
  scene.anims.create({
    key: WEAPONS.ANIMATIONS.CHARGE,
    frames: scene.anims.generateFrameNumbers(WEAPONS.IMAGES.CHARGE, { start: 0, end: 60}),
    // frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: WEAPONS.ANIMATIONS.USE_WEAPON,
    frames: scene.anims.generateFrameNumbers(WEAPONS.IMAGES.USE_WEAPON, { start: 0, end: 20 }),
    frameRate: 24,
    repeat: 0,
  });
}