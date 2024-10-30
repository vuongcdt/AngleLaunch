import { _decorator, Component, randomRangeInt } from 'cc';
import { Bubble } from './Bubble';
import { eventTarget } from './Common';
import { SET_HAS_SHOOT, SET_SCORE, SHOOT_BUBBLE } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private _bubbleList: Bubble[] = [];
    private _currentBubble: Bubble = null;
    private _nextBubble: Bubble = null;
    private _score: number = 0;

    start() {
        eventTarget.on(SHOOT_BUBBLE, e => this.shootBubble(e));
        this.init();
    }

    init() {
        this._bubbleList = this.getComponentsInChildren(Bubble);
        this._currentBubble = this._bubbleList[0];
        this._nextBubble = this._bubbleList[randomRangeInt(0, 6)];

        this.setBubbles();
    }

    private setBubbles() {
        while (this._nextBubble == this._currentBubble) {
            this._nextBubble = this._bubbleList[randomRangeInt(0, 6)];
        }
        this._bubbleList.forEach((bubble: Bubble, index: number) => {
            if (this._nextBubble == bubble) {
                bubble.setActiveBubble();
            }
            else if (this._currentBubble == bubble) {
                bubble.setCurrentBubble();
            }
            else {
                bubble.setHidenBubble();
            }
        });
    }

    shootBubble(data: Bubble) {
        this._currentBubble = data;
        this.setBubbles();
        this.setScore();
        eventTarget.emit(SET_HAS_SHOOT);
    }

    setScore() {
        this._score++;
        eventTarget.emit(SET_SCORE, this._score);
    }
}


