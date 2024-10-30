import { _decorator, Component, Input, input } from 'cc';
import { eventTarget } from './Common';
import { PLAY_SHOOT_SOUND, SET_HAS_SHOOT, SHOOT } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private _isHasShoot: boolean = false;

    start() {
        input.on(Input.EventType.TOUCH_END, this.onTouchStart, this);
        // input.on(Input.EventType.MOUSE_DOWN,this.onTouchStart, this);
        eventTarget.on(SET_HAS_SHOOT, e => this.setCanShoot());
    }

    onTouchStart() {
        if (!this._isHasShoot) {
            return;
        }

        this._isHasShoot = false;
        eventTarget.emit(SHOOT);
        eventTarget.emit(PLAY_SHOOT_SOUND);
    }

    setCanShoot() {
        this._isHasShoot = true;
    }
}


