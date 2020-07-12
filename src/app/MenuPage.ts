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

            btn.on('pointertap', () => {
                // play = !play;
                // play ? (s.play()):(s.stop())
                // console.log(play);

                // RES.getResByUrl('https://webglfundamentals.org/webgl/resources/models/book-vertex-chameleon-study/book.obj', (res) => {
                // console.log(res);

                var tex = RES.getRes('weapon_png') as PIXI.Texture;
                let geo: ys3d.ObjGeometry = new ys3d.ObjGeometry(null, 100);

                geo.parseData(RES.getRes('knife_sharp_obj'),RES.getRes('knife_sharp_mtl'))

                return;
                // const buffer = new ys3d.TextureVertexBuffer(geo.vertices, geo.uvs, geo.indices);
                // const info = geometries[0].data;
                // info.position = info.position.map(val => { return val * 100 })
                // const buffer = new ys3d.ColorVertexBuffer(info.position, info.color)
                // const shader = new ys3d.TexureShader(tex);
                const shader = new ys3d.ColorShader();
                let mesh = new ys3d.Mesh3D(null, shader, ys3d.SIDE.DOUBLE);


                this.addChild(mesh.display);
                scene.addChild(mesh);
                mesh.position.z = - 100;

                ys.tikcer.add(() => {
                    mesh.rotation.y += 1;
                    // mesh.rotation.z += 1;
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
