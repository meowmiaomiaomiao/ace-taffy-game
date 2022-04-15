import { MAPS } from '../../constants/maps';
import { ASSETS } from '../../constants/assets/index';
import { SCENES } from '../../constants/scenes';
import { MONSTERS } from '../../constants/monsters';
import { loadSkillsAssets, createSkillsAnimations } from './skills'
import { loadWeaponsAssets, createWeaponsAnimations } from './weapons'
import { loadMoveAssets, createMoveAnimations } from './move'
import { loadMonsterAssets, createMonsterAnimations } from './monster'
import { state as flow } from '@/store/flow'

export class Preloader extends Phaser.Scene {
  protected preload() {

    this.load.on('progress', function (value) {
      flow.gameLoading.value = value
    });
                
    this.load.on('fileprogress', function (file) {
      console.log(file.src);
    });
    this.load.on('complete', function () {
      if (flow.gameLoading.logoEnd) {
        flow.gameLoading.visible = false
        flow.step = 'base'
      }
    });

    this.loadAssets();
    loadSkillsAssets(this)
    loadWeaponsAssets(this)
    loadMoveAssets(this)
    loadMonsterAssets(this, MONSTERS.MONSTER_TYPE, MONSTERS.MONSTER_SIZE)
  }

  protected create() {
    this.createAnimations();
    createSkillsAnimations(this)
    createWeaponsAnimations(this)
    createMoveAnimations(this)
    createMonsterAnimations(this, MONSTERS.MONSTER_TYPE)
    // this.scene.launch(SCENES.FIRST_LEVEL);
    // this.scene.launch(SCENES.SECOND_LEVEL);
    this.scene.launch(SCENES.GAME_MANAGER);
    this.scene.launch(SCENES.HUD);

    

  }

  private loadAssets() {
    // this.load.tilemapTiledJSON(MAPS.firstLevel.key, `assets/${MAPS.firstLevel.file}`);
    this.load.tilemapTiledJSON('second-level', `assets/second-map.json`);
    this.load.tilemapTiledJSON('base-tiles', `assets/map/my-map.json`);
    this.load.image('base-tiles', 'assets/map/top_down_essentials_16x16.png');
    this.load.image('tiles', 'assets/environment/tileset.png');
    // Images
    // this.load.image(ASSETS.IMAGES.LOGO, 'assets/logo.png');
    this.load.image(ASSETS.IMAGES.TILES, 'assets/environment/tileset.png');
    this.load.image(ASSETS.IMAGES.TOMB, 'assets/tomb.png');

    // Spritesheets
    
    this.load.spritesheet(ASSETS.IMAGES.PLAYER, 'assets/player.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(ASSETS.IMAGES.NPCS, 'assets/npc.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet(ASSETS.IMAGES.MONSTER_DEATH, 'assets/spritesheets/misc/enemy-death.png', {
      frameWidth: 30,
      frameHeight: 32,
    });

    
  }

  private createAnimations() {
    
    this.anims.create({
      key: ASSETS.ANIMATIONS.MONSTER_DEATH,
      frames: this.anims.generateFrameNumbers(ASSETS.IMAGES.MONSTER_DEATH, { start: 0, end: 6 }),
      frameRate: 15,
      hideOnComplete: true,
    });
  }
}
