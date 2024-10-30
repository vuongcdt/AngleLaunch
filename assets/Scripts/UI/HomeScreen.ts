import { _decorator, Button, Component, Node } from 'cc';
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
    }
}


