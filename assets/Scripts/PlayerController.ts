import { _decorator, Component, Input, input } from 'cc';
import { eventTarget } from './Common';
import { SHOOT } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    start() {
        input.on(Input.EventType.TOUCH_END,this.onTouchStart, this);
        // input.on(Input.EventType.MOUSE_DOWN,this.onTouchStart, this);
    }

    onTouchStart(){
        eventTarget.emit(SHOOT);
    }
}


