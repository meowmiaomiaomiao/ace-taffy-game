import { Orientation } from '../../geometry/orientation';
import { Character } from '../Character';
import { ASSETS } from '../../constants/assets/index';
import { Arrow } from '../Bullet'
import { Skill } from '../Skills'
import { COLLISON } from '../../constants/collison';
import { addSC } from '@/store/sc';
import { AbstractScene } from '@/scenes/AbstractScene'
import { nanoid } from 'nanoid/non-secure'

export abstract class Monster extends Character {
  private static WANDER_DELAY = () => 1000 + 1000 * Math.random();
  private static WANDER_LENGTH = () => 1000 + 5000 * Math.random();

  public WALK_ANIMATION;
  public MONSTER_IDLE_DOWN;
  public uuid: string;
  protected MONSTER_SPEED = 20;
  protected MONSTER_HIT_DELAY = 100;
  protected CHASING_DISTANCE = 100;

  protected hp: number;
  protected atk: number;
  // public monsterName: string;
  private chasingPlayerTimerEvent: Phaser.Time.TimerEvent;
  private isWandering = false;
  private isStartled = false;
  private dead = false;
  
  
  constructor(scene: AbstractScene, x = 400, y = 400, image) {
    super(scene, x, y, image, {
      label: 'monster'
    });
    this.scene = scene
    this.uuid = nanoid()
    // this.setCollideWorldBounds(true);
    // this.setImmovable(true);
    this.setMass(1)
    // this.setFrictionStatic(0)
    
    
    this.setFixedRotation()
    this.setCollisionGroup(COLLISON.MONSTER)
    this.setCollisionCategory(COLLISON.LAYERS.MONSTER);
    // this.setCollidesWith([COLLISON.LAYERS.MONSTER])
    // this.setCollidesWith(2)
    // console.log(this.body.collisionFilter, 'monster.collisionFilter')
  }

  public updateMonster() {
    if (!this.active) {
      return;
    }
    this.handleChase();
  }

  public attack = () => {
    if (!this.scene.player.canGetHit()) {
      return;
    }

    this.scene.player.loseHp();
    // this.animateAttack();
  };

  public loseHp = (projectile?: Arrow | Skill) => {
    console.log(this.hp, projectile.attack, 'clearTintclearTint')
    this.hp = this.hp - projectile.attack;
    this.isStartled = true;
    this.setTint(0xff0000);
    this.scene.time.addEvent({
      delay: this.MONSTER_HIT_DELAY,
      callback: () => this.clearTint(),
      callbackScope: this,
    });
    projectile.hp -= 1
    if (projectile.hp === 0) {
      projectile && projectile.destroy();
    }
    // this.setFriction(0, 0, 0)
    
    if (this.hp < 1 && !this.dead) {
     
      this.dead = true
      this.setAngularVelocity(Math.random() * 0.2 + 0.3)
      this.setSensor(true)
      setTimeout(()=>{
        this.die();
        addSC(this.name) 
      }, 500)
      
    }
  };
  



  // protected abstract animateAttack(): void;

  public die = () => {
    const deathAnim = this.scene.add.sprite(this.x, this.y, ASSETS.IMAGES.MONSTER_DEATH);
    // this
    this.scene.events.emit('monsterDie', this)
    this.destroy();
    deathAnim.play(ASSETS.ANIMATIONS.MONSTER_DEATH, false);
  };

  private shouldChase = () => {
    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    const distance = monsterPoint.distance(playerPoint);

    if (distance < this.CHASING_DISTANCE) {
      return true;
    }

    if (this.isStartled) {
      return true;
    }

    return false;
  };

  private getOrientationFromTargettedPosition(x: number, y: number): Orientation {
    if (Math.abs(y) > Math.abs(x)) {
      return y < 0 ? Orientation.Up : Orientation.Down;
    }

    return x < 0 ? Orientation.Left : Orientation.Right;
  }

  private moveTowardsPlayer() {
    if (!this.active) {
      return;
    }

    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    const { x, y } = playerPoint.subtract(monsterPoint);

    this.run(x, y);
  }

  private run(x: number, y: number) {
    
    if (x === 0 && y === 0) {
      return;
    }

    if (!this.active) {
      return;
    }
    this.setVelocityX(Math.sign(x) / 20 * this.MONSTER_SPEED);
    this.setVelocityY(Math.sign(y) / 20 * this.MONSTER_SPEED);
    // this.setX(this.x + Math.sign(x) * this.MONSTER_SPEED);
    // this.setY(this.y + Math.sign(y) * this.MONSTER_SPEED);

    const orientation = this.getOrientationFromTargettedPosition(x, y);
    this.animate(this.WALK_ANIMATION, orientation);
  }

  private stopRunning() {
    if (!this.active) {
      return;
    }

    this.setVelocity(0);
    this.beIdle();
  }

  private startChasing() {
    this.chasingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 500,
      callback: this.moveTowardsPlayer,
      callbackScope: this,
      repeat: Infinity,
      startAt: 2000,
    });
  }

  private beIdle() {
    this.play(this.MONSTER_IDLE_DOWN);
  }

  private stopChasing() {
    if (this.active) {
      this.stopRunning();
    }
    this.chasingPlayerTimerEvent.destroy();
    this.chasingPlayerTimerEvent = null;
  }

  private handleChase() {

    if (!this.chasingPlayerTimerEvent && this.shouldChase()) {
      this.startChasing();
      return;
    }

    if (this.chasingPlayerTimerEvent && !this.shouldChase()) {
      this.stopChasing();
    }

    if (!this.shouldChase()) {
      this.wanderAround();
    }
  }

  private wanderAround() {
    if (this.isWandering) {
      return;
    }

    this.isWandering = true;

    const direction = this.getRandomDirection();
    this.run(direction.x, direction.y);

    this.scene.time.addEvent({
      delay: Monster.WANDER_LENGTH(),
      callbackScope: this,
      callback: () => {
        this.stopRunning();

        if (!this.active) {
          return;
        }

        this.scene.time.addEvent({
          delay: Monster.WANDER_DELAY(),
          callbackScope: this,
          callback: () => {
            this.isWandering = false;
          },
        });
      },
    });
  }

  private getRandomDirection() {
    const randomBetweenMinusOneAndOne = () => Math.round(2 * Math.random()) - 1;
    const x = randomBetweenMinusOneAndOne();
    const y = randomBetweenMinusOneAndOne();

    return { x, y };
  }
}
