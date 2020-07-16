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
            const cam = new ys3d.Camera(80, stageW / stageH, 1, 20000);
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

            this.interactive = true;
            // this.on()

            var geo = new ys3d.SphereGeometry(30);
            var mat = new ys3d.ColorMaterial(0xffff00);
            var mesh = new ys3d.Mesh3D(geo, mat);
            scene.addChild(mesh);
            mesh.position.z = - 500;

            this.addChild(mesh.display);

            var raycast = new ys3d.RayCaster();

            var i = 10;
            var map = RES.getRes('headimg_jpg');

            var arr = [];

            while(i--)
            {
                var geo = new ys3d.BoxGeometry(50,50,50);
                var mat = new ys3d.TextureMaterial(map);
                var box = new ys3d.Mesh3D(geo,mat);
                box.position.x = -100 + Math.random()*200;
                box.position.z = -300 + Math.random()*-400;
                box.position.y = -300 + Math.random()*600;
                scene.addChild(box);
                this.addChild(box.display);
                arr.push(box);
            }
            arr.push(mesh);

            this.on('pointertap', (e: PIXI.InteractionEvent) => {

                var pt = e.data.getLocalPosition(ys.stage);
                var v2 = new ys3d.Vector2((pt.x - stageHalfW) / stageW, (-pt.y + stageHalfH) / stageH);
                v2.scale(2);
                console.log('v2:',v2);

                raycast.setFromCamera(v2,cam);
                var a = raycast.intersect(arr);
                a.forEach(ms=>{
                    ms.mesh.visible = false;
                })
                console.log(a);

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
