/// <reference path="ys/Application.ts"/>

class Main extends ys.Application{
    constructor(canvas: HTMLCanvasElement) {
        const cfg = new ys.Config()
        cfg.groups = ['preload'];//配置加载资源组
        cfg.resourceJSON = 'resource/default.res.json';//配置default.res.json的路径
        cfg.resourceRoot = 'resource/';//配置资源的路径
        cfg.release = false; // 如果未true，会自动屏蔽掉console.log
        cfg.scaleMode = 'fixedWidth';
        cfg.stageWidth = 750;
        cfg.stageHeight = 1334; // iphone6=750x1334 iphoneX=750x1624
        cfg.canvasWidth = innerWidth;
        cfg.canvasHeight = innerHeight;
        cfg.proxy = []; //添加数据代理
        cfg.command = [] //添加通知指令
        cfg.mockAjax = false;
        cfg.backgroundColor = 0x000000;
        cfg.antialias = true;
        cfg.screenAdapter = null;
        //处理加载项
        cfg.versionFun = (url: string) => {
            return url
        }
        //处理多语言
        ysui.getLocale = (t: string) => {
            return t;
        }
        
        super(canvas, cfg);
    }

    public onGroupStart(groupName: string) {
        console.log('start', groupName)
    }

    public onGroupProgress(groupName: string, loaded: number, total: number, res: PIXI.LoaderResource) {
        console.log('progress', groupName, loaded, total, res.url)
    }

    public onGroupComplete(groupName: string) {
        console.log('complete', groupName)
    }

    protected onStart() {
        GG.showPage(MenuPage);
    }
}