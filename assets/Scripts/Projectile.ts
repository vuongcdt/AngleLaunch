import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, math, PhysicsSystem2D, randomRangeInt, RigidBody2D, Tween, tween, Vec2, Vec3 } from 'cc';
import { eventTarget } from './Common';
import { GAME_OVER, INIT_PROJECTILE, SHOOT, HIT_BUBBLE, PLAY_HIT_SOUND, PLAY_GAME_OVER_SOUND } from './CONSTANTS';
import { Bubble } from './Bubble';
import { Obstacle } from './Obstacle';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {
    @property
    private speedRotation: number = 3;
    @property
    private speedShoot: number = 1;

    private _pivot: Vec3 = new Vec3(0, 0, 0);
    private _radius: number = 120;
    private _dirRotation: number = -1;
    private _rg: RigidBody2D;
    private _dirArr: number[] = [-1, 1];
    private _angle: number = 0;

    onLoad() {
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        eventTarget.on(SHOOT, e => this.shootProjectile());
        eventTarget.on(INIT_PROJECTILE, e => this.init(e));

        this._rg = this.getComponent(RigidBody2D);
    }

    init(startPoint: Vec3) {
        this._pivot = startPoint;
        this.startRotation();
    }

    startRotation() {
        tween(this.node)
            .repeatForever(
                tween()
                    .call(() => {
                        this._angle += this.speedRotation * this._dirRotation;
                        if (this._angle >= 360) {
                            this._angle -= 360;
                        }
                        const radian = this._angle * Math.PI / 180;
                        const x = this._pivot.x + this._radius * Math.cos(radian);
                        const y = this._pivot.y + this._radius * Math.sin(radian);

                        this.node.setPosition(x, y, this.node.position.z);
                    })
                    .delay(0)
            )
            .start();
    }

    shootProjectile() {
        const target = this.node.position
            .subtract(this._pivot)
            .normalize()
            .multiplyScalar(20 * this.speedShoot);

        Tween.stopAll();
        this._rg.linearVelocity = new Vec2(target.x, target.y);
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this._rg.linearVelocity = Vec2.ZERO;
        const bubble = selfCollider.getComponent(Bubble);
        const obstacle = selfCollider.getComponent(Obstacle);

        if (obstacle) {
            eventTarget.emit(GAME_OVER);
            eventTarget.emit(PLAY_GAME_OVER_SOUND);
            return;
        }

        if (!bubble) {
            return;
        }

        eventTarget.emit(HIT_BUBBLE, bubble);
        eventTarget.emit(PLAY_HIT_SOUND);

        const worldPos = contact.getWorldManifold().points[0];
        const localPoint = selfCollider.node.inverseTransformPoint(new Vec3(), new Vec3(worldPos.x, worldPos.y));
        const angle = this.getAngleFromVec3(localPoint);

        setTimeout(() => {
            this._pivot = selfCollider.node.position;
            this._dirRotation = this._dirArr[randomRangeInt(0, 2)];
            this._angle = angle;
            this.startRotation();
        }, 0);
    }

    getAngleFromVec3(vec: Vec3): number {
        const angleRadians = Math.atan2(vec.y, vec.x);
        const angleDegrees = math.toDegree(angleRadians);
        return angleDegrees;
    }
}


