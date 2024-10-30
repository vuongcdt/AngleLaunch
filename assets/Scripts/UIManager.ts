import { _decorator, Component, Label } from 'cc';
import { eventTarget } from './Common';
import { SET_SCORE } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property(Label)
    private scoreText: Label;

    start() {
        eventTarget.on(SET_SCORE, e => this.setScore(e));
        this.scoreText.string = '';
    }

    setScore(data: number) {
        this.scoreText.string = data == 0 ? '' : data.toString();
    }
}


