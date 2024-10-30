import { _decorator, Button, Component, Node } from 'cc';
import { eventTarget } from '../Common';
import { SET_HAS_SHOOT } from '../CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('HomeScreen')
export class HomeScreen extends Component {
    @property(Node)
    private playBtn: Node;

    start() {
        this.playBtn.on(Button.EventType.CLICK, this.onPlayClicked, this);
    }

    onPlayClicked(){
        this.node.active = false;
        eventTarget.emit(SET_HAS_SHOOT);
    }
}


