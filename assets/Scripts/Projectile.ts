import { _decorator, Canvas, Collider2D, Component, Contact2DType, Node, PhysicsSystem2D, randomRangeInt, RigidBody2D, Sprite, Tween, tween, UITransform, v3, Vec2, Vec3 } from 'cc';
import { eventTarget } from './Common';
import { SHOOT } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    @property
    private speedRotation: number = 3;
    @property
    private speedShoot: number = 1;
    @property(Canvas)
    private canvas: Canvas;

    private _centerPoint: Vec3 = v3(400, 0);
    private _avatar: Node;
    private _duration: number = 0;
    private _dirRotation: number = -1;
    private _rg: RigidBody2D;
    private _dirArr: number[] = [-1, 1];

    start() {
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        eventTarget.on(SHOOT, () => this.shootProjectile());
        this._rg = this.getComponent(RigidBody2D);
        this._duration = 10 / this.speedRotation;

        this.node.position = this._centerPoint;
        this._avatar = this.getComponentInChildren(Sprite).node;
        this.startRotation();
    }

    startRotation() {
        tween(this.node)
            .to(this.getDurationRotation(), { eulerAngles: v3(0, 0, 360 * this._dirRotation) })
            .call(() => {
                this.node.setRotationFromEuler(0, 0, 0);
                this.startRotation();
            })
            .start();
    }

    shootProjectile() {
        const posWorldAvatar = this._avatar.getWorldPosition();
        const posNodedAvatar = this.canvas.getComponent(UITransform).convertToNodeSpaceAR(posWorldAvatar);
        const target = posNodedAvatar
            .subtract(this.node.position)
            .normalize()
            .multiplyScalar(15 / this.speedShoot);

        Tween.stopAll();
        this._rg.linearVelocity = new Vec2(target.x, target.y);
    }

    onBeginContact(selfCollider: Collider2D) {
        this._rg.linearVelocity = Vec2.ZERO;

        setTimeout(() => {
            this.node.position = selfCollider.node.position;
            this.node.angle = (this.node.angle + 180 * this._dirRotation) % 360;

            this._dirRotation = this._dirArr[randomRangeInt(0, 2)];
            this.startRotation();
        }, 0);
    }

    getDurationRotation() {
        let angleNode = this.node.angle;
        let duration = this._duration * (360 - angleNode * this._dirRotation) / 360;
        if (duration < 0) {
            duration *= -1;
        }

        return duration;
    }
}


