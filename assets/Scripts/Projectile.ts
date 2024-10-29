import { _decorator, Canvas, CircleCollider2D, Collider2D, Component, Contact2DType, ICollisionEvent, IPhysics2DContact, math, Node, PhysicsSystem2D, Quat, RigidBody2D, Sprite, Tween, tween, UITransform, v3, Vec2, Vec3 } from 'cc';
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

    private _centerPoint: Vec3 = Vec3.ZERO;
    private _avatar: Node;
    private _duration: number = 0;
    private _rg: RigidBody2D;

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
        console.log('angle', this.node.angle);

        tween(this.node)
            .to(this._duration, { eulerAngles: v3(0, 0, 360) })
            .call(() => {
                this.node.setRotationFromEuler(0, 0, 0);
                this.startRotation();
            })
            .start();

        // tween(this.node)
        //     .to(this._duration, { eulerAngles: v3(0, 0, 90) })
        //     .call(() => {
        //         this.shootProjectile();
        //     })
        //     .start();
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
            this.node.angle += 180;
            this.startRotation();
        }, 0);
    }
}


