/// <reference path="Config.ts"/>
/// <reference path="ScreenAdapter.ts"/>
/// <reference path="GG.ts"/>
/// <reference path="res/RES.ts"/>
/// <reference path="../ys/mvc/view.ts"/>
/// <reference path="../ys/mvc/model.ts"/>
/// <reference path="../ys/mvc/controller.ts"/>

let stageW: number, stageH: number, stageHalfW: number, stageHalfH: number;

namespace ys {

    export const stage:PIXI.Container = new PIXI.Container();

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
            console.log('PIXI::',PIXI);
            PIXI.utils.skipHello();

            //自动显示VConsole
            // const VConsole = (<any>window).VConsole;
            // VConsole && new VConsole()

            var renderer = new PIXI.Renderer({
                view: canvas,
                width: cfg.canvasWidth, height: cfg.canvasHeight,
                resolution: cfg.pixelRatio, autoDensity: true,
                antialias: cfg.antialias,
                backgroundColor: cfg.backgroundColor
            });

            ys.canvas = renderer.view;

            var stage = ys.stage;
            RES.setup(cfg);

            const ticker = PIXI.Ticker.shared;
            ys.tikcer = ticker;

            // document.body.addEventListener('focusout', () => {
            //     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            // })

            // const Stats = (<any>window).Stats;
            // if (Stats) {
            //     var stats = new Stats();
            //     stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            //     document.body.appendChild(stats.dom);
            //     ticker.add(() => {
            //         stats.begin();
            //         renderer.render(stage);
            //         stats.end();
            //     }, PIXI.UPDATE_PRIORITY.LOW);
            // } else {
            //     ticker.add(() => {
            //         renderer.render(stage);
            //     }, PIXI.UPDATE_PRIORITY.LOW);
            // }
            console.log('>>',ticker,stage)
            ticker.add(() => {
                renderer.render(stage);
            }, PIXI.UPDATE_PRIORITY.LOW);
            ticker.start();

            this.resize(canvas, stage, cfg);
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

        private resize(canvas: HTMLCanvasElement, stage: PIXI.Container, cfg: Config) {
            //屏幕适配
            const resize = () => {
                const adapter = cfg.screenAdapter || new ys.ScreenAdapter();
                const { stageWidth, stageHeight, scale } = adapter.calStageSize(cfg.scaleMode, cfg.canvasWidth, cfg.canvasHeight, cfg.stageWidth, cfg.stageHeight);
                stageW = stageWidth;
                stageHalfW = stageW >> 1;
                stageH = stageHeight;
                stageHalfH = stageH >> 1;
                console.log('scale', scale);
                stage.scale.set(scale);
                // canvas.style.position = 'absolute';
                // canvas.style.top = '0px';
                // canvas.style.left = '0px';
                stageScale = scale;

                console.log(stageW,stageH)

            }
            // if (window) {
            //     window.addEventListener('resize', () => {
            //         cfg.canvasWidth = innerWidth;
            //         cfg.canvasHeight = innerHeight;
            //         resize();
            //     });
            // }
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