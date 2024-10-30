import { _decorator, Button, Component, Label, Node } from 'cc';
import { eventTarget } from '../Common';
import { RESET_GAME, SHOW_GAME_OVER_SCREEN } from '../CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('GameOverScreen')
export class GameOverScreen extends Component {
    @property(Label)
    private scoreText: Label;
    @property(Button)
    private replayBtn: Button;

    start() {
        eventTarget.on(SHOW_GAME_OVER_SCREEN, e => this.show(e));
        this.replayBtn.node.on(Button.EventType.CLICK, this.onReplayClicked, this);
        this.node.active = false;
    }

    show(data: number) {
        this.node.active = true;
        this.scoreText.string = data.toString();
    }

    onReplayClicked () {
        this.node.active = false;
        eventTarget.emit(RESET_GAME);
    }
}


