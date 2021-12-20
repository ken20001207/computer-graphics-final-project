import HittableObject from "./HittableObject";
import sendPopMessage from "../utils/sendPopMessage";

export enum ZombieState {
  ALIVE, HIT, DEAD
}

class Zombie extends HittableObject {
  constructor() {
    super("zombie", "zombie");
    this.scale = [.08, .08, .08]
    this._state = ZombieState.ALIVE
    this.anchorPoint.y = -1

    this.onNextTick = (t) => {
      if (this._state === ZombieState.HIT) {
        this.rotation.yaw += 3.14 / (t * 12000)
        if (this.rotation.yaw > 3.14 / 2) {
          this._state = ZombieState.DEAD
        }
      }
    }

  }

  private _state: ZombieState;

  get state(): ZombieState {
    return this._state;
  }

  public onHit() {
    sendPopMessage('做得好！', '你撞死了一只僵尸，继续加油！', 3)
    this._state = ZombieState.HIT;
  }

}

export default Zombie;