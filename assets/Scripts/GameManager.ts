import { _decorator, Component, randomRangeInt } from 'cc';
import { Bubble } from './Bubble';
import { eventTarget } from './Common';
import { GAME_OVER, RESET_GAME, SET_HAS_SHOOT, SET_SCORE, SHOOT_BUBBLE, SHOW_GAME_OVER_SCREEN } from './CONSTANTS';
import { Projectile } from './Projectile';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Projectile)
    private projectile: Projectile;

    private _bubbleList: Bubble[] = [];
    private _currentBubble: Bubble = null;
    private _nextBubble: Bubble = null;
    private _score: number = 0;

    start() {
        eventTarget.on(SHOOT_BUBBLE, e => this.shootBubble(e));
        eventTarget.on(GAME_OVER, e => this.setGameOver());
        eventTarget.on(RESET_GAME, e => this.reset());
        
        this._bubbleList = this.getComponentsInChildren(Bubble);
        this.reset();
    }

    reset() {
        this._currentBubble = this._bubbleList[0];
        this._nextBubble = this._bubbleList[randomRangeInt(0, 6)];

        this.setBubbles();
        this.projectile.init(this._currentBubble.node.position);
        eventTarget.emit(SET_HAS_SHOOT);
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

    setGameOver() {
        eventTarget.emit(SHOW_GAME_OVER_SCREEN, this._score);
    }
}


