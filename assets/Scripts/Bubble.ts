import { _decorator, CircleCollider2D, Collider2D, Color, Component, RigidBody2D, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bubble')
export class Bubble extends Component {
    private _avatar: Sprite;
    private _rg: RigidBody2D;
    private _collider: Collider2D;

    onLoad() {
        this._avatar = this.getComponentInChildren(Sprite);
        this._rg = this.getComponent(RigidBody2D);
        this._collider = this.getComponent(CircleCollider2D);
    }

    setActiveBubble() {
        this._avatar.color = Color.WHITE;
        this.toggleCollider(true);
    }

    setHidenBubble() {
        this._avatar.color = Color.GRAY;
        this.toggleCollider(false);
    }

    setCurrentBubble() {
        this._avatar.color = Color.BLACK;
        this.toggleCollider(true);
    }

    private toggleCollider(isActive: boolean) {
        this._collider.enabled = isActive;
        setTimeout(() => {
            this._rg.enabled = isActive;
        }, 0);
    }
}


