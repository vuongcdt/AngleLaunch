import { _decorator, Color, Component, Sprite } from 'cc';
import { eventTarget } from './Common';
import { SET_ACTIVE_BUBBLE, SET_CURRENT_BUBBLE, SET_HIDE_BUBBLE } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('Bubble')
export class Bubble extends Component {
    private _avatar: Sprite;
    private _index: number;

    start() {
        // eventTarget.on(SET_ACTIVE_BUBBLE, e => this.setActiveBubble());
        // eventTarget.on(SET_CURRENT_BUBBLE, e => this.setCurrentBubble());
        // eventTarget.on(SET_HIDE_BUBBLE, e => this.setHidenBubble());
        this._avatar = this.getComponentInChildren(Sprite);
    }

    setActiveBubble() {
        this._avatar.color = Color.WHITE;
    }

    setHidenBubble() {
        this._avatar.color = Color.GRAY;
    }

    setCurrentBubble() {
        this._avatar.color = Color.BLACK;
    }

    setIndex(index: number) {
        this._index = index;
    }

}


