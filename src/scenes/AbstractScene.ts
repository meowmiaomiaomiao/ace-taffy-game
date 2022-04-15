import { Orientation } from '../geometry/orientation';
import { Player } from '../game-objects/Player';


import { Npc } from '../game-objects/Npc';
import { Zone } from '../game-objects/Zone';
import { MAP_CONTENT_KEYS } from '../constants/map-content-keys';
import { ASSETS } from '../constants/assets/index';
import { ACTION_KEYS } from '../constants/user-keys';
import { monsterBox } from '@/store/monster'
import { state as flow } from '@/store/flow'
import { subscribeKey } from 'valtio/utils'
import { MONSTERS } from '@/constants/monsters';
import { mapZoneSizeReset, getRandomElement } from '@/utils/tools'
import { RandomMaze } from '@/utils/tile-map'
import { Console } from 'console';
import { BaseMonster } from '../game-objects/Monster/base';
import { EliteMonster } from '../game-objects/Monster/elite';

const CAMERA_LERP = 1;


interface InterSceneData {
  comesFrom: string;
}
// const this.mapScale = 2

export abstract class AbstractScene extends Phaser.Scene {
  public player: Player;
  public PLAYER_INITIAL_POSITION  = {
    x: 450,
    y: 500,
  };
  public keyboradCursors: Record<string, Phaser.Input.Keyboard.Key>
  public mouseCurors: Record<string, any>
  public npcs: Npc[];
  public monsters: BaseMonster[];
  public eliteMonster: EliteMonster
  public map: Phaser.Tilemaps.Tilemap;
  public maze: RandomMaze;
  public monsterGroup: Phaser.Physics.Arcade.Group;
  public actionZone: Zone;
  public layers: {
    terrain: any; // Phaser.Tilemaps.StaticTilemapLayer;
    deco: any; //Phaser.Tilemaps.StaticTilemapLayer;
    bridge: any; //Phaser.Tilemaps.StaticTilemapLayer;
  };
  public mapKey: string;
  public world: Phaser.Physics.Matter.World
  public mapScale = 2;
  public blankPosition = [];
  
  constructor(key: string, mapKey: string) {
    super({
      key: key,
      physics: {
        matter: {
          debug: true,
        }
      }
    });
    
    this.mapKey = mapKey;
    this.player = null;
    this.keyboradCursors = null;
    this.npcs = [];
    this.monsters = [];
    this.eliteMonster = null;
    this.monsterGroup = null;
    this.map = null;
    this.layers = null;
  }

  public create() {
    this.matter.world.disableGravity()
  }
  public createMap() {
    console.log('empty map')
  }
  public update() {
    const { mouseCurors, input } = this
    // input.activePointer.x
    // console.log(mouseCurors, input, 'mouseCurors')

    const keyPressed = {
      left: this.keyboradCursors.left.isDown,
      right: this.keyboradCursors.right.isDown,
      up: this.keyboradCursors.up.isDown,
      down: this.keyboradCursors.down.isDown,
      roll: this.keyboradCursors.roll.isDown,
      rollAction: this.keyboradCursors.roll.isDown,
      action: this.keyboradCursors.action.isDown,
      ...mouseCurors
    };

  

    this.monsters.map((monster: BaseMonster, i) => {
      monster.updateMonster()
    });
    if (this.eliteMonster) {
      this.eliteMonster.updateMonster()
    }
    // console.log(this.monsters)
    this.player.updatePlayer(keyPressed);
    
    if (this.actionZone && keyPressed.action) {
      this.actionZone.doAction()
    }
  }
  
  public destroy() {
    
  }
  protected init(data: InterSceneData) {
    this.map && this.map.destroy()

    subscribeKey(flow, 'backpack', ()=>{
      flow.backpack.visible ? this.scene.pause() : this.scene.resume() 
    })
    // this.matter.world.destroy()
    
    // this.on()
    this.createMap && this.createMap()
    
    const { PLAYER_INITIAL_POSITION } = this
    this.player = new Player(this, PLAYER_INITIAL_POSITION.x, PLAYER_INITIAL_POSITION.y);
    this.initMouse();
    this.initCamera();
    this.keyboradCursors = this.input.keyboard.addKeys(ACTION_KEYS) as Record<string, Phaser.Input.Keyboard.Key>;
    this.mouseCurors = {
      shoot: false,
      shootChargeTime: 0,
      shootAction: false,
      skill: false,
      skillAction: false
    }
  }

  private initMouse() {
    this.input.mouse.disableContextMenu();
    this.input.on('pointerdown', (pointer)=>{
      if (pointer.button === 0) {
        this.mouseCurors.shoot = true
        this.mouseCurors.shootChargeTime = 0
        this.mouseCurors.shootAction = false
      }
      if (pointer.button === 2) {
        this.mouseCurors.skill = true;
        this.mouseCurors.skillAction = false;
      }
    });
    // this.input.on('pointermove', (pointer)=>{
    //   if (pointer.button === 0) {
    //     this.mouseCurors.shootTarget = { x: pointer.x, y: pointer.x }
    //   }
    // });
    this.input.on('pointerup', (pointer)=>{
      if (pointer.button === 0) {
        this.mouseCurors.shoot = false
        this.mouseCurors.shootChargeTime = pointer.getDuration()
        this.mouseCurors.shootAction = true
        
        // this.mouseCurors.shootTarget = { x: 0, y: 0 }
      } 

      if (pointer.button === 2) {
        this.mouseCurors.skill = false;
        this.mouseCurors.skillAction = true;
      }


      
    });
  }
 

 

  public changeCameraFollow(target) {
    this.cameras.main.startFollow(target, true, CAMERA_LERP, CAMERA_LERP);
  }
  private initCamera() {
    this.cameras.main.setRoundPixels(true);
    if (this.map) {
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels  * this.mapScale, this.map.heightInPixels  * this.mapScale);
    } else {
      this.cameras.main.setBounds(0, 0, 1920, 1080);
    }
    this.changeCameraFollow(this.player)
    
  }
}
