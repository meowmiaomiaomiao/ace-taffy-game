import { AbstractScene } from '../AbstractScene';
import { SCENES } from '../../constants/scenes';
import { MAPS } from '../../constants/maps';
import { Zone } from '../../game-objects/Zone';
import { mapZoneSizeReset, getRandomElement } from '@/utils/tools'
import { state as flow } from '@/store/flow'

export class ShopLevel extends AbstractScene {
  constructor() {
    super(SCENES.BASE_LEVEL, 'random-maze');
    
  }

  createMap() {
    this.createMapWithLayers();
  } 

  private createMapWithLayers() {

    // this.map = this.make.tilemap({ key: this.mapKey }) ;
    this.map = this.make.tilemap({ key: 'base-tiles' }) ;
    const tileset = this.map.addTilesetImage('top_down_essentials_16x16', 'base-tiles', 16, 16, 0, 0);
    this.map.createLayer('waterLayer', tileset, 0, 0).setScale(this.mapScale);
    const border = this.map.createLayer('borderLayer', tileset, 0, 0).setScale(this.mapScale);
    this.map.createLayer('itemLayer', tileset, 0, 0).setScale(this.mapScale);
    console.log(border, 'tilesettileset')
    const zoneLayer = this.map.objects.find(
      o => o.name === "zoneLayer",
    );

    const npcLayer = this.map.objects.find(
      o => o.name === "npcLayer",
    );
    if (zoneLayer) {
      zoneLayer.objects.map((o: any) => {
        const zone = mapZoneSizeReset(o, this.mapScale)
        new Zone(this, zone.x, zone.y, zone.width, zone.height, { 
          message: '进入', callback: ()=>{
            flow.step = 'randomMaze';
            flow.actionCard.visible = false;
          }
        })
      });
    }
    border.setCollisionByProperty({ collides: true });
    const box = this.matter.world.convertTilemapLayer(border);
    
    console.log(box)
  }

  // create() {
  //   console.log('init')
  //   this.input.on('pointerup', function (pointer) {
  //     console.log('pointeruppointeruppointerup22')
  //       this.scene.start(SCENES.BASE_LEVEL);

  //   }, this);
  // };
}
