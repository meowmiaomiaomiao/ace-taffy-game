import { AbstractScene } from '../AbstractScene';
import { SCENES } from '../../constants/scenes';
import { MAPS } from '../../constants/maps';
import { Zone } from '../../game-objects/Zone';
import { mapZoneSizeReset, getRandomElement } from '@/utils/tools'
import { state as flow } from '@/store/flow'
import { MONSTERS } from '@/constants/monsters';
import { subscribeKey } from 'valtio/utils'
import { RandomMaze } from '@/utils/tile-map'
import { monsterBox } from '@/store/monster'
import { BaseMonster } from '../../game-objects/Monster/base';
import { EliteMonster } from '../../game-objects/Monster/elite';


export class MazeLevel extends AbstractScene {
  
  constructor() {
    super(SCENES.MAZE_LEVEL, 'random-maze');
    
  }

  createMap() {
    flow.info.visible = true
      flow.info.message = '让直播间爆金币吧！'
      this.createRandomMaze();
      subscribeKey(flow, 'step', ()=>{
        if (flow.step === 'eliteMonsterStart') {
          this.monsters.map((m)=>{
            m.destroy()
          })
          this.monsters = []
          const monsterType = MONSTERS.ELITE_MONSTER_TYPE
          const randomXY = getRandomElement(this.blankPosition)
          const randomType = getRandomElement(monsterType)
          const info = monsterBox[randomType]
          flow.info.visible = true;
          flow.info.message = `野生${info.alias}出现了！`
          const x = randomXY[0] * 16 * this.mapScale
          const y = randomXY[0] * 16 * this.mapScale
          this.eliteMonster = new EliteMonster(this, x, y, info)
          this.eliteMonster.addListener('die', ()=>{
            console.log('diedie')
            flow.step = 'gacha'
          })
        }
      })
  }

  private createRandomMaze() {
    this.maze = new RandomMaze()
    this.maze.initData(0)
    this.maze.checkWallsA(0)
    this.maze.checkWallsA(0)
    this.maze.checkWallsA(0)
    this.maze.checkWallsA(0)
    // this.maze.checkWallsA(0)
    // this.maze.checkWallsB(0)
    // this.maze.checkWallsB(0)
    // this.maze.checkWallsB(0)
    // this.maze.checkWallsB(0)
    // this.maze.checkWallsB(0)
    // this.maze.checkWallsB(0)
    // this.maze.checkWallsB(0)

    console.log(this.maze, 'this.maze')
    const position = []
    const matrix = this.maze.matrix[0]
    const data = matrix.map((array, m)=>{
      return array.map((v, n) => {
        let center, left, right, top, bottom, leftBottom, rightBottom, leftTop, rightTop = 1;
        if (matrix[m - 1] !== undefined) {
          top = matrix[m - 1][n]
          leftTop = matrix[m - 1][n - 1] !== undefined ? matrix[m - 1][n - 1] : 1
          rightTop = matrix[m - 1][n + 1] !== undefined ? matrix[m - 1][n + 1] : 1
        }  

        if (matrix[m + 1] !== undefined) {
          bottom = matrix[m + 1][n]
          leftBottom = matrix[m + 1][n - 1] !== undefined ? matrix[m + 1][n - 1] : 1
          rightBottom = matrix[m + 1][n + 1] !== undefined ? matrix[m + 1][n + 1] : 1
        }   
         
        if (true) {
          center = matrix[m][n]
          left = matrix[m][n - 1] !== undefined ? matrix[m][n - 1] : 1
          right = matrix[m][n + 1] !== undefined ? matrix[m][n + 1] : 1
        }
        
        if (center === 0) {
          
          if (!([center, left, right, top, bottom, leftBottom, rightBottom, leftTop, rightTop].includes(1))) {
     
            position.push([n, m]) 
          }
          center = 234
        } else if (center === 1) {
          
          // console.log(center, left, right)
          if (top === 0) {
            center = 499
          } else if (bottom === 0) {
            center = 441
          } else if (right === 0) {
            center = 469
          } else if (left === 0) {
            center = 471
          } else {
            center = 533
          }
         
        }
         
        return center
      })
    })
    this.blankPosition = position
    const mazeData = Phaser.Tilemaps.Parsers.Parse2DArray('base-tiles', data, 16, 16, false)
    this.map = this.make.tilemap({ key: 'base-tiles' }) ;
    
    const collideArray = [499, 441, 469, 471, 533]
    const randomLayer =  mazeData.layers[0]

    randomLayer.data.forEach((tileArray, m)=>{
      tileArray.forEach((tile, n)=>{
        tile.properties['collides'] = collideArray.includes(tile.index)
      })
    })
   
    this.map.layers.push(randomLayer)
    const randomXY = getRandomElement(position)
    const {PLAYER_INITIAL_POSITION} = this
    PLAYER_INITIAL_POSITION.x = randomXY[0] * 16 * this.mapScale
    PLAYER_INITIAL_POSITION.y = randomXY[1] * 16 * this.mapScale 
    console.log(randomXY, PLAYER_INITIAL_POSITION.x, PLAYER_INITIAL_POSITION.y, 'PLAYER_INITIAL_POSITION.x, PLAYER_INITIAL_POSITION.y')
    const tileset = this.map.addTilesetImage('top_down_essentials_16x16', 'base-tiles', 16, 16, 0, 0);
    const layer = this.map.createLayer('layer', tileset, 0, 0).setScale(this.mapScale);
    layer.setCollisionByProperty({ collides: true });
    const box = this.matter.world.convertTilemapLayer(layer);
  
    this.monsters = []
    const monsterType = MONSTERS.MONSTER_TYPE
    const positionCopy = JSON.parse(JSON.stringify(position))
    // position.forEach((xy)=>{
    //   const x = xy[0] * 16 * this.mapScale
    //   const y = xy[1] * 16 * this.mapScale
    //   const star = new Phaser.GameObjects.Text(this, x, y, 'test', { font: '"Press Start 2P"' })
    //   this.add.existing(star);
    // })
    const addMonster = () => {
      const idx = Math.floor(Math.random() * positionCopy.length)
      const randomXY = positionCopy.splice(idx, 1)[0]
      const randomType = getRandomElement(monsterType)
      const info = monsterBox[randomType]
      const x = randomXY[0] * 16 * this.mapScale
      const y = randomXY[1] * 16 * this.mapScale
      info.hp = 5
      this.monsters.push(new BaseMonster(this, x, y, info))
    }
    for (let i = 0; i < 10; i++) {
      addMonster()
    }
    this.events.addListener('monsterDie', (monster)=>{
      const idx = this.monsters.findIndex((m)=>{
        return m.uuid = monster.uuid
      })
      this.monsters.splice(idx, 1)
      addMonster()
    })
  }

  // create() {
  //   console.log('init')
  //   this.input.on('pointerup', function (pointer) {
  //     console.log('pointeruppointeruppointerup22')
  //       this.scene.start(SCENES.BASE_LEVEL);

  //   }, this);
  // };
}
