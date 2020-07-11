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

            // (async () => {

            //     function parseOBJ(text) {
            //         // because indices are base 1 let's just fill in the 0th data
            //         const objPositions = [[0, 0, 0]];
            //         const objTexcoords = [[0, 0]];
            //         const objNormals = [[0, 0, 0]];

            //         // same order as `f` indices
            //         const objVertexData = [
            //             objPositions,
            //             objTexcoords,
            //             objNormals,
            //         ];

            //         // same order as `f` indices
            //         let webglVertexData = [
            //             [],   // positions
            //             [],   // texcoords
            //             [],   // normals
            //         ];

            //         function addVertex(vert) {
            //             const ptn = vert.split('/');
            //             ptn.forEach((objIndexStr, i) => {
            //                 if (!objIndexStr) {
            //                     return;
            //                 }
            //                 const objIndex = parseInt(objIndexStr);
            //                 const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
            //                 webglVertexData[i].push(...objVertexData[i][index]);
            //             });
            //         }

            //         const keywords = {
            //             v(parts) {
            //                 objPositions.push(parts.map(parseFloat));
            //             },
            //             vn(parts) {
            //                 objNormals.push(parts.map(parseFloat));
            //             },
            //             vt(parts) {
            //                 // should check for missing v and extra w?
            //                 objTexcoords.push(parts.map(parseFloat));
            //             },
            //             f(parts) {
            //                 const numTriangles = parts.length - 2;
            //                 for (let tri = 0; tri < numTriangles; ++tri) {
            //                     addVertex(parts[0]);
            //                     addVertex(parts[tri + 1]);
            //                     addVertex(parts[tri + 2]);
            //                 }
            //             },
            //         };

            //         const keywordRE = /(\w*)(?: )*(.*)/;
            //         const lines = text.split('\n');
            //         for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
            //             const line = lines[lineNo].trim();
            //             if (line === '' || line.startsWith('#')) {
            //                 continue;
            //             }
            //             const m = keywordRE.exec(line);
            //             if (!m) {
            //                 continue;
            //             }
            //             const [, keyword, unparsedArgs] = m;
            //             const parts = line.split(/\s+/).slice(1);
            //             const handler = keywords[keyword];
            //             if (!handler) {
            //                 console.warn('unhandled keyword:', keyword);  // eslint-disable-line no-console
            //                 continue;
            //             }
            //             handler(parts, unparsedArgs);
            //         }

            //         return {
            //             position: webglVertexData[0],
            //             texcoord: webglVertexData[1],
            //             normal: webglVertexData[2],
            //         };
            //     }

            //     const response = await fetch('https://webglfundamentals.org/webgl/resources/models/cube/cube.obj');
            //     const text = await response.text();
            //     const data = parseOBJ(text);
            // })();

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

            var s = new ys.Sound(RES.getRes('bgm_mp3'));
            var play = false;

            btn.on('pointertap', () => {
                play = !play;
                play ? (s.play()):(s.stop())
                console.log(play);
                
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
