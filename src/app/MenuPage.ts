namespace app {
    export class MenuPage extends ys.Page {
        constructor() {
            super();
        }

        public bg: PIXI.Sprite;
        protected onInit() {

            // GG.newRect(stageW, stageH, 0xff00ff, this);

            const m = new PIXI.Matrix();
            const sp = PIXI.Sprite.from('resource/headimg.jpg', { scaleMode: PIXI.SCALE_MODES.NEAREST });
            sp.width = stageW;
            sp.height = stageH;
            sp.alpha = 0.5;
            this.addChild(sp);

            const layer = new PIXI.Container();
            this.addChild(layer);

            const star = new PIXI.Graphics();
            star.beginFill(0xffff00);
            star.drawStar(0, 0, 15, 200, 150, 0);
            this.addChild(star);
            star.position.set(stageHalfW, 200);

            const render = new ys3d.Render();
            const cam = new ys3d.Camera(70, stageW / stageH, 1, 20000);
            cam.lookAt(0, 0, -1);


            const scene = new ys3d.Scene(stageW, stageH);
            // const geo = new ys3d.PIXIGeometry(new ys3d.PlaneGeometry(128, 256));


            ys.tikcer.add(() => {
                render.render(scene, cam);
            })

            const opt = new ysui.ButtonOption();
            opt.width = 250;
            opt.height = 100;
            const tex = GG.texGradient(opt.width, opt.height, 0, 0, 0, opt.height, ['#ff0000', '#ffcccc'], [0, 1])
            opt.fill = 0x2d85f3;

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

            this.addChild(btn);
            GG.layoutMiddleX(btn);
            GG.layoutBottom(btn, 100);
            btn.interactive = true;

            // var s = new ys.Sound(RES.getRes('bgm_mp3'));
            // var play = false;

            var g = new ys3d.Group();
                scene.addChild(g);
                ys.tikcer.add(() => {
                    g.rotation.y += 1;
                })

            btn.on('pointertap', () => {
                // play = !play;
                // play ? (s.play()):(s.stop())
                // console.log(play);

                // RES.getResByUrl('https://webglfundamentals.org/webgl/resources/models/book-vertex-chameleon-study/book.obj', (res) => {
                // console.log(res);

                var tex = RES.getRes('weapon_png') as PIXI.Texture;

                var geo = new ys3d.ObjGeometry(RES.getRes('sniper_obj'),3000,RES.getRes('sniper_mtl'))
                // var geo = new ys3d.ObjGeometry(RES.getRes('weapon_obj'),0.05)

                // var buffer = new ys3d.TextureVertexBuffer(geo.vertices, geo.uvs);
                var buffer = new ys3d.ColorVertexBuffer(geo.vertices, geo.colors)
                // var shader = new ys3d.TexureShader(tex);
                var shader = new ys3d.ColorShader();
                let mesh = new ys3d.Mesh3D(buffer, shader);

                this.addChild(mesh.display);
                // scene.addChild(mesh);
                mesh.position.z = - 400;
                mesh.position.y = -100;

                g.addChild(mesh);

                ys.tikcer.add(() => {
                    mesh.rotation.y += 1;
                })
            }, this)




            // }, this);
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
