import { _decorator, AudioSource, Component } from 'cc';
import { eventTarget } from './Common';
import { PLAY_GAME_OVER_SOUND, PLAY_HIT_SOUND, PLAY_SHOOT_SOUND, TOGGLE_SOUND } from './CONSTANTS';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    @property(AudioSource)
    private shootSound: AudioSource;
    @property(AudioSource)
    private hitSound: AudioSource;
    @property(AudioSource)
    private gameOverSound: AudioSource;

    start() {
        eventTarget.on(PLAY_SHOOT_SOUND, e => this.playShootSound());
        eventTarget.on(PLAY_HIT_SOUND, e => this.playHitSound());
        eventTarget.on(PLAY_GAME_OVER_SOUND, e => this.playGameOverSound());
        eventTarget.on(TOGGLE_SOUND, e => this.toggleSound(e));
    }

    playShootSound() {
        this.shootSound.play();
    }

    playHitSound() {
        this.hitSound.play();
    }

    playGameOverSound() {
        this.gameOverSound.play();
    }

    toggleSound(isSound: boolean) {
        this.shootSound.volume = isSound ? 1 : 0;
        this.hitSound.volume = isSound ? 1 : 0;
        this.gameOverSound.volume = isSound ? 1 : 0;
    }
}


