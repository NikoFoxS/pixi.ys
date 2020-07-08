class MenuPage extends ys.Page {
    constructor() {
        super();
    }

    public bg: PIXI.Sprite;
    protected onInit() {

        GG.newRect(stageW, stageH, 0xff00ff, this);
        const m = new PIXI.Matrix();
        // m.scale(2,3);
        // m.translate(0,10);

        const sp = PIXI.Sprite.from('resource/atlas.png', { scaleMode: PIXI.SCALE_MODES.NEAREST });
        sp.width = stageW;
        sp.height = stageH;
        // sp.scale.set(20);
        this.addChild(sp);

        // const tex = PIXI.Texture.from('headimg_jpg') // RES.getRes('headimg_jpg') as PIXI.Texture;

        // const opt = { texture: tex}
        const opt = new ysui.ButtonOption();
        opt.width = 250;
        opt.height = 100;
        const tex = GG.texGradient(opt.width, opt.height, 0, 0, 0, opt.height, ['#ff0000', '#ffcccc'], [0, 1])
        opt.fill = 0x2d85f3// { texture: tex };


        opt.shadowOffsetX = 0;
        opt.shadowOffsetY = 8;
        opt.shandowAplha = 0.5;
        // opt.fillet = 40;
        opt.chamfer = opt.height >> 1;
        // opt.radius = 80;
        const btn = new ysui.Button(opt);
        // const btn = new ysui.Button(200, 80,0xff0000, 20,5);
        btn.label = 'Start';
        btn.style = new PIXI.TextStyle({
            align: 'center', fontSize: 50,
            fill: 0xffffff,
            // dropShadow:true,dropShadowColor:0xffffff,dropShadowDistance:4,dropShadowAngle:45 
        })

        GG.setAncher(btn, 0.5, 0.5);
        btn.x = stageHalfW;
        btn.y = stageH * 0.7;
        btn.interactive = true;
        btn.buttonMode = true;
        btn.on('pointertap', () => {
            const mp3 = new ys.MP3(RES.getRes('bgm_mp3'));
            mp3.play();
            console.log('play ')
        }, this)

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
        // btn.position.set(100, 200);
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