import { AbstractScene } from '../AbstractScene';
import { SCENES } from '../../constants/scenes';
import { MAPS } from '../../constants/maps';
import { create } from 'domain';

export class BossLevel extends AbstractScene {
  constructor() {
    super(SCENES.MAZE_LEVEL, 'random-maze');
    // super({
    //   key: SCENES.MAZE_LEVEL,
    //   physics: {
    //     matter: {
    //       debug: true,
    //     }
    //   }
    // })

    
    // this.name = "test"
  }

  // create() {
  //   console.log('init')
  //   this.input.on('pointerup', function (pointer) {
  //     console.log('pointeruppointeruppointerup22')
  //       this.scene.start(SCENES.BASE_LEVEL);

  //   }, this);
  // };
}
