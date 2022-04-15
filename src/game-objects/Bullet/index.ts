
import { Orientation } from '../../geometry/orientation';
import { Weapon } from './Weapon';
import { Player } from '../Player';
import { COLLISON } from '../../constants/collison';
import { setDirectionRotation } from '@/utils/tools'
const ARROW_SPEED = 150;
export interface Params { 
  hp: number;
  attack: number;
}


export class Arrow  extends Phaser.Physics.Matter.Sprite implements Params {
  // public scene: Phaser.Scene;
  public player: Player;
  public hp: number;
  public attack: number;
  public setDirectionRotation = setDirectionRotation
  constructor(scene: Phaser.Scene, player: Player, image: string, options?: Phaser.Types.Physics.Matter.MatterBodyConfig) {
    super(scene.matter.world, player.x, player.y, image, 0, {
      label: 'arrow',
      ...options,
    });
    this.scene = scene;
    this.player = player;
    this.setSensor(true)
    this.hp = 1
    this.attack = 1
    this.scene.add.existing(this);
  }
}

