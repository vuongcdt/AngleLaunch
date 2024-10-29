import { _decorator, Component, Node, randomRangeInt } from 'cc';
import { Bubble } from './Bubble';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property([Node])
    private bubbleNodeList: Node[] = [];

    private _bubbleList: Bubble[] = [];

    start() {
        this.init();
    }

    init() {
        this._bubbleList = this.bubbleNodeList.map(node => node.getComponent(Bubble));
        const currentBubble = 0;
        let randomBubble = randomRangeInt(0, 6);

        while (randomBubble == currentBubble) {
            randomBubble = randomRangeInt(0, 6);
        }

        this._bubbleList.forEach((bubble: Bubble, index: number) => {
            bubble.setIndex(index);

            if (randomBubble == index) {
                bubble.setActiveBubble();
            }
            else if (currentBubble == index) {
                bubble.setCurrentBubble();
            }
            else {
                bubble.setHidenBubble();
            }
        });
    }
}


