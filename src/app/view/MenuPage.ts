namespace app {
    export class MenuPage extends ys.Page {
        constructor() {
            super();
        }

        public bg: PIXI.Sprite;
        protected onInit() {

            GG.newRect(stageW, stageH, 0x1099bb, this);

            // const m = new PIXI.Matrix();
            // const sp = PIXI.Sprite.from('resource/headimg.jpg', { scaleMode: PIXI.SCALE_MODES.NEAREST });
            // sp.width = stageW;
            // sp.height = stageH;
            // sp.alpha = 0.5;
            // this.addChild(sp);

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

            ys.tikcer.add(() => {
                render.render(scene, cam);
            })

            const option = new ys3d.OptionObjGeometry();
            option.scale = 0.1;
            option.uvFlipY = true;
            const geo = new ys3d.ObjGeometry(RES.getRes('weapon_1_obj'), option);
            const mat = new ys3d.TextureLightMaterial(RES.getRes('weapon_1_209_png'), new ys3d.Vector3(0, 0.5, 0), 0xff0000)
            const mesh = new ys3d.Mesh3D(geo, mat);
            scene.addChild(mesh);
            mesh.position.z = - 200;
            mesh.position.y = - 100;
            mesh.position.x = 110;

            this.addChild(mesh.display);

            const geobox = new ys3d.BoxGeometry(40, 100, 20);
            const matcolor = new ys3d.ColorMaterial(0x000000);
            const box = new ys3d.Mesh3D(geobox, matcolor);

            scene.addChild(box);

            this.addChild(box.display);
            box.position.z = - 100;
            box.position.y = - 100;
            box.position.x = 0;
            box.rotation.z = -30;
            box.rotation.x = -30;

            mesh.rotation.y = 90;

            ys.tikcer.add(() => {
                // mesh.rotation.y += 1;
            })

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
