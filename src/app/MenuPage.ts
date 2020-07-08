namespace app {
    export class MenuPage extends ys.Page {
        constructor() {
            super();
        }

        public bg: PIXI.Sprite;
        protected onInit() {

            // GG.newRect(stageW, stageH, 0xff00ff, this);
            
            const m = new PIXI.Matrix();
            const sp = PIXI.Sprite.from('resource/atlas.png', { scaleMode: PIXI.SCALE_MODES.NEAREST });
            sp.width = stageW;
            sp.height = stageH;
            this.addChild(sp);

            const opt = new ysui.ButtonOption();
            opt.width = 250;
            opt.height = 100;
            const tex = GG.texGradient(opt.width, opt.height, 0, 0, 0, opt.height, ['#ff0000', '#ffcccc'], [0, 1])
            opt.fill = tex;//0x2d85f3;

            opt.shadowOffsetX = 0;
            opt.shadowOffsetY = 8;
            opt.shandowAplha = 0.5;
            opt.chamfer = opt.height >> 1;
            const btn = new ysui.Button(opt);
            btn.label = 'Start';
            btn.style = new PIXI.TextStyle({
                align: 'center', fontSize: 50,
                fill: 0xffffff,
            })

            GG.setAncher(btn, 0.5, 0.5);
            btn.x = stageHalfW;
            btn.y = stageH * 0.7;
            btn.interactive = true;
            btn.buttonMode = true;
            btn.on('pointertap', () => {
                // const mp3 = new ys.Sound(RES.getRes('bgm_mp3'));
                // mp3.play();
                // const mp3 = new ys.SoundX('resource/sound/bgm.mp3');
                // mp3.play();
            }, this)

            const mp3 = new ys.SoundX('resource/sound/bgm.mp3');
            mp3.play();

            const star = new PIXI.Graphics();
            star.beginFill(0xffff00);
            star.drawStar(0, 0, 15, 50, 40, 0);
            this.addChild(star);
            star.position.set(stageHalfW, 200);

            const arc2 = new PIXI.Graphics();

            arc2.lineStyle(6, 0x3333DD, 1);
            arc2.beginFill(0xff0000);
            arc2.arc(650, 270, 60, 2 * Math.PI, 3 * Math.PI / 2);
            arc2.endFill();
            this.addChild(arc2);
            this.addChild(btn);
        }

        protected onRemoved() {

        }
    }

    class MenuPageMediator extends ys.Mediator {
        constructor(view: ys.View) {
            super(view);
        }

        public onInit() {
            console.log(this, 'init');
            // this.registerCommand(StartCMD);

            var v = this.getView() as MenuPage;
            v.bg.interactive = true;
            v.bg.on('pointerdown', () => {
                this.sendNotice('StartCMD', { name: 'FoxS' })
            }, this);
        }

        protected listenNotice(): string[] {
            return [];
        }

        protected onNotice(no: ys.Notice) {

        }
    }
}
