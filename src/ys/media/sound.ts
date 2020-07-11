namespace ys {

    const wx = (<any>window).wx;
    export interface ISound {
        play(start: number, loop: boolean): void;
        pause(): void;
        resume(): void;
        stop(): void;
        destroy(): void;
    }

    export class XAudio implements ISound {
        constructor(src: string) {
            if (wx) {
                this.audio = wx.createInnerAudioContext();
                this.audio.obeyMuteSwitch = false;
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

                if (loop) {
                    //to do 多个loop统一控制
                    wx.onShow(() => {
                        this.resume();
                    });
                    wx.onAudioInterruptionEnd(() => {
                        this.resume();
                    })
                }
            }
        }

        pause(): void {
            this.audio && this.audio.pause();
        }

        resume(): void {
            this.audio && this.audio.play();
        }

        stop(): void {
            this.audio && this.audio.stop();
        }

        destroy(): void {
            this.pause();
            this.audio.destroy();
            this.audio = null;
        }

    }

    let audioCtx: AudioContext;
    export class WebAudio implements ISound {
        constructor(buffer: AudioBuffer) {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || (<any>window).webkitAudioContext)();
            }
            this.buffer = buffer;

        }
        private buffer: AudioBuffer;
        private sourceNode: AudioBufferSourceNode;
        private gainNode: GainNode;
        private pauseTime: number;
        private loop: boolean;

        play(start: number = 0, loop: boolean = true): void {
            //音源
            this.sourceNode = audioCtx.createBufferSource();
            this.sourceNode.buffer = this.buffer;
            this.sourceNode.loop = loop;
            this.loop = loop;
            //音量
            this.gainNode = audioCtx.createGain();
            //连接
            this.sourceNode.connect(this.gainNode);
            this.gainNode.connect(audioCtx.destination);
            this.sourceNode.start(0,start);
            console.log('start ',start)
        }

        pause(): void {
            this.pauseTime = this.sourceNode.context.currentTime;
            this.stop();
        }

        resume(): void {
            this.play(this.pauseTime, this.loop);
        }

        stop(): void {
            this.sourceNode.stop();
            this.sourceNode.disconnect();
            this.gainNode.disconnect();
        }

        destroy(): void {
            this.stop();
            this.sourceNode = null;
            this.gainNode = null;
        }
    }

    export class Audio implements ISound {
        constructor(audio: HTMLAudioElement) {
            this.audio = audio;
            audio.addEventListener("ended", this.onPlayEnd.bind(this));
        }

        private audio: HTMLAudioElement | any;
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
            //待优化
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

    export class Sound implements ISound {
        constructor(src: string | HTMLAudioElement | AudioBuffer) {
            if (ys.wxgame && wx) {
                console.log("wxgame")
                if (typeof src == 'string') {
                    this.s = new ys.XAudio(src + '')
                }
            } else if (src instanceof AudioBuffer) {
                console.log("webaudio")
                if (window.AudioContext || (<any>window).webkitAudioContext) {
                    this.s = new ys.WebAudio(src as AudioBuffer)
                }

            } else if (src instanceof HTMLAudioElement) {
                console.log("audio")
                this.s = new ys.Audio(src as HTMLAudioElement);
            }
        }

        private s: ISound;

        play(start: number = 0, loop: boolean = true): void {
            this.s.play(start, loop);
        }

        pause(): void {
            this.s.pause();
        }

        resume(): void {
            this.s.resume();
        }

        stop(): void {
            this.s.stop();
        }

        destroy(): void {
            this.s.destroy();
        }
    }
}