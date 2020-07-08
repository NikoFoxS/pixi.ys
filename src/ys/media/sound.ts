namespace ys {

    const wx = (<any>window).wx;
    export interface ISound {
        play(start: number, loop: boolean): void;
        pause(): void;
        resume(): void;
        stop(): void;
        destroy(): void;
    }

    export class SoundX implements ISound {
        constructor(src: string) {
            if (wx) {
                this.audio = wx.createInnerAudioContext();
                this.audio.src = src
                this.audio.autoplay = false
            }

        }
        private audio: any;
        play(start: number = 0, loop: boolean = true): void {

            if (this.audio) {
                this.audio.startTime = start;
                this.audio.autoplay = true;
                this.audio.loop = loop;
                this.audio.play();

                wx.onShow(function () {
                    this.audio?.play();
                });

                wx.onAudioInterruptionEnd(function () {
                    this.audio?.play();
                })
            }
        }

        pause(): void {
            this.audio?.pause();
        }

        resume(): void {
            this.audio?.play();
        }

        stop(): void {
            this.audio?.stop();
        }

        destroy(): void {
            this.pause();
            this.audio?.destroy();
            this.audio = null;
        }

    }

    export class Sound implements ISound {
        constructor(audio: HTMLAudioElement) {
            this.audio = audio;
            audio.addEventListener("ended", this.onPlayEnd.bind(this));
        }
        private audio: HTMLAudioElement;
        public play(start: number = 0, loop: boolean = true) {
            if (this.audio) {
                this.loop = loop;
                this.startTime = start;
                this._play();
            }
        }

        public pause() {
            this.audio && this.audio.pause();
        }

        public resume() {
            this.audio && this.audio.play();
        }

        public stop() {
            if (!this.audio)
                return;
            const a = this.audio;
            //延迟一定时间再停止，规避chrome报错
            setTimeout(() => {
                a.removeEventListener("ended", this.onPlayEnd);
                a.pause();
            }, 200);
        }

        destroy(): void {
            this.stop();
            this.audio = null;
        }

        private startTime: number;
        private _play() {
            if (this.audio) {
                this.audio.currentTime = this.startTime;
                this.audio.play();
            }
        }

        private onPlayEnd() {
            if (this.loop) {
                this._play();
            } else {
                this.stop();
            }
        }

        private loop: boolean;
        public set volume(v: number) {
            this.audio && (this.audio.volume = v);
        }

        public get volume() {
            return this.audio.volume;
        }

        public get currentTime(): number {
            if (!this.audio)
                return 0;
            return this.audio.currentTime;
        }
    }
}