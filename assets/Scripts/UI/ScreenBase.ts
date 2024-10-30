import { _decorator, Button, Component, Node, Sprite, SpriteFrame } from 'cc';
import { eventTarget } from '../Common';
import { TOGGLE_SOUND } from '../CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('ScreenBase')
export class ScreenBase extends Component {
    @property(Node)
    private toggleSoundBtn: Node;
    @property(SpriteFrame)
    private soundMute: SpriteFrame;
    @property(SpriteFrame)
    private soundPlay: SpriteFrame;

    private _isSound: boolean = true;
    private _avatarSound: Sprite;

    start() {
        this.toggleSoundBtn.on(Button.EventType.CLICK, this.onToggleSoundClicked, this);
        this._avatarSound = this.toggleSoundBtn.getComponent(Sprite);
        this._avatarSound.spriteFrame = this.soundMute;
    }

    onToggleSoundClicked() {
        this._isSound = !this._isSound;
        this._avatarSound.spriteFrame = this._isSound ? this.soundMute : this.soundPlay;
        eventTarget.emit(TOGGLE_SOUND, this._isSound);
    }
}


