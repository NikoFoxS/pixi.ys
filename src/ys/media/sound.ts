namespace ys {

    // class Sound {
    //     get paused() {
    //         return this.ctx?.paused
    //     }
    //     private ctx: any;
    //     constructor(src, { volume = 1, loop = false, autoplay }) {
    //         const wx = (<any>window).wx;
    //         this.ctx = wx.createInnerAudioContext()
    //         this.ctx.src = src
    //         this.ctx.loop = loop
    //         this.ctx.volume = volume
    //         this.ctx.autoplay = autoplay

    //         !loop && this.ctx.onEnded(() => this.destroy())
    //         this.ctx.onError(() => this.destroy())
    //     }

    //     play() {
    //         this.ctx?.play()
    //     }

    //     stop() {
    //         this.ctx?.stop()
    //     }

    //     pause() {
    //         this.ctx?.pause()
    //     }

    //     destroy() {
    //         if (!this.ctx) return
    //         this.ctx.destroy()
    //         this.ctx = null
    //     }
    // }

    // export function load(src, opt = { autoplay: false }) {
    //     const sound = new Sound(src, opt)
    //     return sound
    // }

    // export function play(src, opt = { autoplay: true }) {
    //     const sound = new Sound(src, opt)
    //     return sound
    // }

    export interface ISound {
        play(start: number,loop: boolean):void;
        pause():void;
        resume():void;
        stop():void;
    }

    export class SoundX implements ISound
    {
        constructor(audio:any)
        {

        }
        play(start: number,loop: boolean):void
        {

        }

        pause():void
        {

        }

        resume():void
        {

        }

        stop():void
        {

        }
    }

    export class Sound implements ISound{
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
            this.audio = null;
            //延迟一定时间再停止，规避chrome报错
            setTimeout(() => {
                a.removeEventListener("ended", this.onPlayEnd);
                a.pause();
            }, 200);
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