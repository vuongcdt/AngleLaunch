import { _decorator, Button, Label, Node } from 'cc';
import { eventTarget } from '../Common';
import { RESET_GAME, SHOW_GAME_OVER_SCREEN } from '../CONSTANTS';
import { ScreenBase } from './ScreenBase';
const { ccclass, property } = _decorator;

@ccclass('GameOverScreen')
export class GameOverScreen extends ScreenBase {
    @property(Label)
    private scoreText: Label;
    @property(Node)
    private replayBtn: Node;


    start() {
        super.start();
        eventTarget.on(SHOW_GAME_OVER_SCREEN, e => this.show(e));
        this.replayBtn.on(Button.EventType.CLICK, this.onReplayClicked, this);
        this.node.active = false;
    }

    show(data: number) {
        this.node.active = true;
        this.scoreText.string = data.toString();
    }

    onReplayClicked() {
        this.node.active = false;
        eventTarget.emit(RESET_GAME);
    }
}


