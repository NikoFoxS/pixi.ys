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

            const map = PIXI.Texture.from('resource/headimg.jpg');
            const geoBox = new ys3d.PIXIGeometry(new ys3d.BoxGeometry(100, 100, 100));
            const mat = new ys3d.Material(map);

            const box = new ys3d.MeshNode(geoBox, mat);
            layer.addChild(box.display);
            scene.addChild(box);
            box.position.z = - 200;

            let i = 0;
            while (i--) {
                const mat = new ys3d.Material(map);
                const box = new ys3d.MeshNode(geoBox, mat);
                layer.addChild(box.display);
                scene.addChild(box);
                box.position.z = - 1000 - Math.random() * 2000;
                box.position.x = -700 + Math.random() * 1400
                box.position.y = -700 + Math.random() * 1400
                ys.tikcer.add(() => {
                    box.rotation.y += 1;
                })
            }

            ys.tikcer.add(() => {
                box.rotation.y += 2;
                box.rotation.z += 1;
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

                scene.removeChild(box);
                GG.removeDisplayObject(box.display);

                var {position,texcoord,normal} = ys3d.parseOBJ(RES.getRes('weapon_obj'));
                console.log(position,texcoord,normal);

                var geo = new PIXI.Geometry();
                position = position.map((val,index)=>{
                    return val/20;
                })
                // var bt = new PIXI.BaseTexture();
                var tex = RES.getRes('weapon_png') as PIXI.Texture;
                var mat = new ys3d.Material(tex)
                geo.addAttribute('aVertexPosition',position,3);
                geo.addAttribute('aUvs',texcoord,2);
                var mesh = new ys3d.MeshNode(geo,mat);
                mesh.position.z = -200;
                // mesh.scale.set(10,10,10);
                scene.addChild(mesh);
                this.addChild(mesh.display);
                // mesh.rotation.y = -30;
                // mesh.position.y = -2;

                ys.tikcer.add(()=>{
                    mesh.rotation.y += 1;
                    mesh.rotation.z += 1;
                })
                
            }, this);
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
