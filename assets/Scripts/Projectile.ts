import { _decorator, Component, Node, Quat, Tween, tween, v3, Vec3 } from 'cc';
import { eventTarget } from './Common';
import { SHOOT } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    @property
    private speed: number = 0;

    private _centerPoint: Vec3 = Vec3.ZERO;

    start() {
        eventTarget.on(SHOOT, () => this.shootProjectile());

        this.node.position = this._centerPoint;
        this.startRotation();
    }

    startRotation() {
        const duration = 10 / this.speed;

        tween(this.node)
            .to(duration, { eulerAngles: v3(0, 0, 360) })
            .call(() => {
                this.node.setRotationFromEuler(0, 0, 0);
                this.startRotation();
            })
            .start();
    }

    shootProjectile() {

    }
}


