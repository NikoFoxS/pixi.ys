/// <reference path="Config.ts"/>
/// <reference path="ScreenAdapter.ts"/>
/// <reference path="GG.ts"/>
/// <reference path="res/RES.ts"/>
/// <reference path="../ys/mvc/view.ts"/>
/// <reference path="../ys/mvc/model.ts"/>
/// <reference path="../ys/mvc/controller.ts"/>

let stageW: number, stageH: number, stageHalfW: number, stageHalfH: number;

namespace ys {

    export class Stage extends PIXI.Container {
        constructor() {
            super();
            this._root = new PIXI.Container();
            this.addChild(this._root);
            //屏蔽stage的remove方法
            this.removeChildren = (b?, e?): PIXI.DisplayObject[] => { return };
            this.removeChildAt = (a?): PIXI.DisplayObject => { return };
            this.removeChild = (a?): PIXI.DisplayObject => { 
                if(a != this._root)
                {
                    super.removeChild(a);
                }
                return };
        }
        private _root: PIXI.Container;
        public get root() {
            return this._root;
        }
    }

    export const stage: ys.Stage = new ys.Stage();
    export let renderer: PIXI.Renderer;
    export let wxgame: boolean = false;

    /**弹层统一管理管理 */
    export class PopManager {
        public constructor() {
        }

        public static popUp(d: PIXI.Container, blockAlpha = 0.7) {
            if (!d) {
                return;
            }
            if (!PopManager.layer) {
                PopManager.layer = new PIXI.Container();
            }

            if (!PopManager.block) {
                const g = new PIXI.Graphics();
                g.beginFill(0x000000);
                g.drawRect(0, 0, stageW, stageH);
                g.endFill();
                g.interactive = true;
                PopManager.block = g;
            }

            const block = PopManager.block;
            const layer = PopManager.layer;

            ys.stage.addChild(layer);
            layer.addChild(block);
            layer.addChild(d);

            block.alpha = blockAlpha;

            d.once('removed', () => {
                //remove后，numChildren不会马上-1
                if (layer.children.length == 1) {
                    GG.removeDisplayObject(layer);
                } else {
                    layer.addChildAt(block, layer.children.length - 2);
                }
            }, this);
        }
        private static block: PIXI.Graphics;
        private static layer: PIXI.Container;
    }

    export interface ILoadGroupReport {
        onGroupStart(groupName: string): void;
        onGroupProgress(groupName: string, loaded: number, total: number, res: PIXI.LoaderResource): void;
        onGroupComplete(groupName: string): void;
    }

    export let stageScale: number = 1;
    export let canvas: HTMLCanvasElement;
    export let tikcer: PIXI.Ticker;
    export class Application implements ys.ILoadGroupReport {
        constructor(canvas: HTMLCanvasElement, cfg: Config) {
            PIXI.utils.skipHello();

            const ticker = PIXI.Ticker.shared;
            ys.tikcer = ticker;

            var renderer = new PIXI.Renderer({
                view: canvas,
                width: cfg.canvasWidth, height: cfg.canvasHeight,
                resolution: cfg.pixelRatio, autoDensity: true,
                antialias: cfg.antialias,
                backgroundColor: cfg.backgroundColor
            });
            ys.renderer = renderer;
            ys.canvas = renderer.view;

            //自动显示VConsole
            if (!ys.wxgame) {
                const VConsole = (<any>window).VConsole;
                VConsole && new VConsole();

                document.body.addEventListener('focusout', () => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                })

                const Stats = (<any>window).Stats;
                if (Stats) {
                    var stats = new Stats();
                    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
                    document.body.appendChild(stats.dom);
                    ticker.add(() => {
                        stats.begin();
                        renderer.render(ys.stage);
                        stats.end();
                    }, PIXI.UPDATE_PRIORITY.LOW);
                } else {
                    ticker.add(() => {
                        renderer.render(ys.stage);
                    }, PIXI.UPDATE_PRIORITY.LOW);
                }
            } else {
                ticker.add(() => {
                    renderer.render(ys.stage);
                }, PIXI.UPDATE_PRIORITY.LOW);
            }
            ticker.start();
            RES.setup(cfg);
            this.resize(canvas, cfg);
            this.loadGroup(cfg);

        }

        private loadGroup(cfg: Config) {
            //加载资源组
            var loadGroup = () => {
                if (cfg.groups.length) {
                    let name = cfg.groups.shift();
                    this.onGroupStart(name);
                    RES.loadGroup(name, (loaded: number, total: number, res: PIXI.LoaderResource) => {
                        this.onGroupProgress(name, loaded, total, res);
                    }, () => {
                        this.onGroupComplete(name);
                        loadGroup();
                    }, this);
                } else {
                    this.onStart();
                }
            }
            //加载资源配置
            RES.loadConfig(cfg.resourceJSON, () => {
                RES.setBaseUrl(cfg.resourceRoot);
                loadGroup();
            }, this);
        }

        private resize(canvas: HTMLCanvasElement, cfg: Config) {
            //屏幕适配
            const resize = () => {
                const adapter = cfg.screenAdapter || new ys.ScreenAdapter();
                const { stageWidth, stageHeight, scale } = adapter.calStageSize(cfg.scaleMode, cfg.canvasWidth, cfg.canvasHeight, cfg.stageWidth, cfg.stageHeight);
                stageW = stageWidth;
                stageHalfW = stageW >> 1;
                stageH = stageHeight;
                stageHalfH = stageH >> 1;
                console.log('scale', scale);
                ys.stage.scale.set(scale);
                if (!ys.wxgame) {
                    canvas.style.position = 'absolute';
                    canvas.style.top = '0px';
                    canvas.style.left = '0px';
                }
                stageScale = scale;

            }
            if (!ys.wxgame) {
                if (window) {
                    window.addEventListener('resize', () => {
                        cfg.canvasWidth = innerWidth;
                        cfg.canvasHeight = innerHeight;
                        resize();
                    });
                }
            }

            resize();
        }

        public onGroupStart(groupName: string) {
        }

        public onGroupProgress(groupName: string, loaded: number, total: number, res: PIXI.LoaderResource) {
        }

        public onGroupComplete(groupName: string) {
        }

        protected onStart() {

        }
    }
}

window.ys = ys;