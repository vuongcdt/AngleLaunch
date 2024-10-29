import { _decorator, Canvas, Component, Node, Quat, Sprite, Tween, tween, UITransform, v3, Vec3 } from 'cc';
import { eventTarget } from './Common';
import { SHOOT } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    @property
    private speedRotation: number = 0;
    @property
    private speedShoot: number = 0;
    @property(Canvas)
    private canvas: Canvas;

    private _centerPoint: Vec3 = Vec3.ZERO;
    private _avatar: Node;
    private _duration: number = 0;

    start() {
        eventTarget.on(SHOOT, () => this.shootProjectile());
        this._duration = 10 / this.speedRotation;

        this.node.position = this._centerPoint;
        this._avatar = this.getComponentInChildren(Sprite).node;
        this.startRotation();
    }

    startRotation() {

        tween(this.node)
            .to(this._duration, { eulerAngles: v3(0, 0, 360) })
            .call(() => {
                this.node.setRotationFromEuler(0, 0, 0);
                this.startRotation();
            })
            .start();
    }

    shootProjectile() {
        const posWorldAvatar = this._avatar.getWorldPosition();
        const posNodedAvatar = this.canvas.getComponent(UITransform).convertToNodeSpaceAR(posWorldAvatar);
        const target = posNodedAvatar.subtract(this.node.position).multiplyScalar(10);

        Tween.stopAll();
        tween(this.node)
            .to(this._duration , { position: target })
            .start();

        console.log('shoot', target);
        // console.log('shoot', Vec3.distance(target,this._avatar.position));
    }
}


