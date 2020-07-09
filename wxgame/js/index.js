var ys;
(function (ys) {
    class Config {
        constructor() {
            this.fps = 60;
        }
    }
    ys.Config = Config;
})(ys || (ys = {}));
var ys;
(function (ys) {
    let StageScaleMode;
    (function (StageScaleMode) {
        StageScaleMode["FIXED_HEIGHT"] = "fixedHeight";
        StageScaleMode["FIXED_WIDTH"] = "fixedWidth";
        StageScaleMode["SHOW_ALL"] = "showAll";
    })(StageScaleMode = ys.StageScaleMode || (ys.StageScaleMode = {}));
    class ScreenAdapter {
        calStageSize(scaleMode, screenWidth, screenHeight, contentWidth, contentHeight) {
            let displayWidth = screenWidth;
            let displayHeight = screenHeight;
            let stageWidth = contentWidth;
            let stageHeight = contentHeight;
            let scaleX = (screenWidth / stageWidth) || 0;
            let scaleY = (screenHeight / stageHeight) || 0;
            let scale = 1;
            switch (scaleMode) {
                case StageScaleMode.FIXED_HEIGHT:
                    stageWidth = Math.round(screenWidth / scaleY);
                    scale = screenHeight / stageHeight;
                    break;
                case StageScaleMode.FIXED_WIDTH:
                    stageHeight = Math.round(screenHeight / scaleX);
                    scale = screenWidth / stageWidth;
                    break;
                case StageScaleMode.SHOW_ALL:
                    if (scaleX > scaleY) {
                        displayWidth = Math.round(stageWidth * scaleY);
                        scale = screenHeight / stageHeight;
                    }
                    else {
                        displayHeight = Math.round(stageHeight * scaleX);
                        scale = screenWidth / stageWidth;
                    }
                    break;
                default:
                    stageWidth = screenWidth;
                    stageHeight = screenHeight;
                    break;
            }
            return {
                stageWidth: stageWidth,
                stageHeight: stageHeight,
                scale: scale
            };
        }
    }
    ys.ScreenAdapter = ScreenAdapter;
})(ys || (ys = {}));
var GG;
(function (GG) {
    const hello = decodeURIComponent('%E4%B8%8E%E6%97%B6%E4%BA%92%E5%8A%A8%7C%E9%BA%BB%E8%BE%A3%E5%B0%8F%E6%B8%B8%E6%88%8F%E3%80%91%20vx%EF%BC%9ANikoFoxS');
    let pages = [];
    function showPage(pageclass, clear = true) {
        console.log('show page', pageclass.name);
        const page = new pageclass();
        clear && ys.stage.removeChildren();
        ys.stage.addChild(page);
        if (page.cache) {
        }
        page.on('removed', () => {
        }, this);
    }
    GG.showPage = showPage;
    function log(msg) {
        console.log(msg);
    }
    GG.log = log;
    function popUp(d, a) {
        ysui.PopManager.popUp(d, a);
    }
    GG.popUp = popUp;
    function removeDisplayObject(d) {
        d.parent && d.parent.removeChild(d);
    }
    GG.removeDisplayObject = removeDisplayObject;
    function newSprite(res, con) {
        const sp = PIXI.Sprite.from(RES.getRes(res));
        con && con.addChild(sp);
        return sp;
    }
    GG.newSprite = newSprite;
    function newRect(w, h, color, con) {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawRect(0, 0, w, h);
        g.endFill();
        con && con.addChild(g);
        return g;
    }
    GG.newRect = newRect;
    function newCircle(r, color, con) {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawCircle(0, 0, r);
        g.endFill();
        con && con.addChild(g);
        return g;
    }
    GG.newCircle = newCircle;
    function newText(size, color, align, con) {
        const t = new PIXI.Text('');
        const style = new PIXI.TextStyle();
        style.fontSize = size;
        style.fill = color;
        style.align = align;
        t.style = style;
        con && con.addChild(t);
        return t;
    }
    GG.newText = newText;
    function setAncher(d, x = 0.5, y) {
        y || (y = x);
        d.pivot.x = x * d.width;
        d.pivot.y = y * d.height;
    }
    GG.setAncher = setAncher;
    function layoutLeft(d, left) {
        d.x = left + d.pivot.x;
        d.pivot;
    }
    GG.layoutLeft = layoutLeft;
    function layoutRight(d, right) {
        d.x = stageW - d.width + d.pivot.x - right;
    }
    GG.layoutRight = layoutRight;
    function layoutMiddleX(d, offset = 0) {
        d.x = stageHalfW - d.width * 0.5 + d.pivot.x + offset;
    }
    GG.layoutMiddleX = layoutMiddleX;
    function layoutMiddleY(d, offset = 0) {
        d.y = stageHalfH - d.height * 0.5 + d.pivot.y + offset;
    }
    GG.layoutMiddleY = layoutMiddleY;
    function layoutTop(d, top) {
        d.y = top + d.pivot.y;
    }
    GG.layoutTop = layoutTop;
    function layoutBottom(d, bottom) {
        d.y = stageH - d.height + d.pivot.y - bottom;
    }
    GG.layoutBottom = layoutBottom;
    function layoutVH(d, vh) {
        d.y = stageH * vh;
    }
    GG.layoutVH = layoutVH;
    function layoutVW(d, vw) {
        d.x = stageH * vw;
    }
    GG.layoutVW = layoutVW;
    function texGradient(width, height, x0, y0, x1, y1, colors, raito) {
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        const ctx = c.getContext("2d");
        const grd = ctx.createLinearGradient(x0, y0, x1, y1);
        raito.forEach((val, index) => {
            (val < 0 && (val = 0)) || (val > 1 && (val = 1));
            grd.addColorStop(val, colors[index]);
        });
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        return PIXI.Texture.from(c);
    }
    GG.texGradient = texGradient;
})(GG || (GG = {}));
window.GG = GG;
var RES;
(function (RES) {
    let cfgGroups;
    let cfgGroupsLen;
    let cfgResources;
    let cfgResourcesLen;
    let groupLoaded = [];
    let myCache = {};
    let loader;
    function setup(cfg) {
        loader = new PIXI.Loader();
        loader.pre((resource, next) => {
            resource.url = cfg.versionFun(resource.url);
            next();
        });
    }
    RES.setup = setup;
    function reset() {
        loader.baseUrl = '';
        loader.reset();
        loader.destroy();
    }
    RES.reset = reset;
    function list() {
        for (var key in PIXI.utils.TextureCache) {
            console.log('材质', key);
        }
        for (var key in myCache) {
            console.log('非材质', key);
        }
    }
    RES.list = list;
    function getRes(name) {
        return PIXI.utils.TextureCache[name] || myCache[name];
    }
    RES.getRes = getRes;
    function destoryRes(name) {
        const tex = PIXI.utils.TextureCache[name];
        if (tex) {
            tex.destroy();
        }
        else {
            myCache[name] = null;
            delete myCache[name];
        }
    }
    RES.destoryRes = destoryRes;
    function setBaseUrl(url) {
        loader.baseUrl = url;
    }
    RES.setBaseUrl = setBaseUrl;
    function loadConfig(url, compFunc, thisObject) {
        getResByUrl(url, (res) => {
            const json = res.data;
            console.log(json);
            cfgGroups = json.groups;
            cfgResources = json.resources;
            cfgGroupsLen = cfgGroups.length;
            cfgResourcesLen = cfgResources.length;
            compFunc.call(thisObject);
        }, this);
    }
    RES.loadConfig = loadConfig;
    function loadGroup(name, onProgress, onComplete, thisObject) {
        if (isGroupLoaded(name)) {
            onComplete.call(thisObject);
            return;
        }
        if (cfgGroups) {
            let i = cfgGroupsLen;
            let keys = '';
            while (i--) {
                let group = cfgGroups[i];
                if (group.name == name) {
                    keys = group.keys;
                    break;
                }
                keys = '';
            }
            if (keys && keys != '') {
                let loaded = 0;
                let total = 0;
                loader.reset();
                const arr = keys.split(',');
                arr.forEach((val, index) => {
                    let j = cfgResourcesLen;
                    while (j--) {
                        let { name, url } = cfgResources[j];
                        if (name == val) {
                            loader.add(name, url);
                            total++;
                        }
                    }
                });
                let idLoaded = loader.onLoad.add((ldr, res) => {
                    loaded++;
                    if (res.type != PIXI.LoaderResource.TYPE.IMAGE) {
                        myCache[res.name] = res.data;
                    }
                    onProgress.call(thisObject, loaded, total, res);
                });
                loader.onComplete.once((ldr, res) => {
                    groupLoaded.push(name);
                    loader.onLoad.detach(idLoaded);
                    onComplete.call(thisObject);
                });
                loader.load();
            }
        }
    }
    RES.loadGroup = loadGroup;
    function getResByUrl(url, onComplete, thisObject) {
        loader.reset();
        loader.add(url);
        loader.load((ldr, resources) => {
            onComplete.call(thisObject, resources[url]);
        });
    }
    RES.getResByUrl = getResByUrl;
    function isGroupLoaded(name) {
        return groupLoaded.indexOf(name) != -1;
    }
    RES.isGroupLoaded = isGroupLoaded;
})(RES || (RES = {}));
var ys;
(function (ys) {
    class Mediator {
        constructor(view) {
            this._view = view;
            ys.mvc.on(ys.MVC.MVC_NOTICE, this._onNotice, this);
        }
        getView() {
            return this._view;
        }
        _onNotice(e) {
            var name = e.data.name;
            if (name) {
                var list = this.listenNotice();
                if (list.indexOf(name) != -1) {
                    var data = e.data.data;
                    var no = new ys.Notice();
                    no.name = name;
                    no.data = data;
                    console.log('[' + this + ']:处理通知->', name, data);
                    this.onNotice(no);
                }
            }
        }
        sendNotice(name, data) {
            console.log('[' + this + ']:发送通知->', name, data);
            ys.mvc.sendNotice(name, data);
        }
        getProxy(ProxyClass) {
            return ys.mvc.getProxy(ProxyClass);
        }
        registerProxy(ProxyClass) {
            ys.mvc.registerProxy(ProxyClass);
        }
        registerCommand(commandClass) {
            ys.mvc.registerCommand(commandClass);
        }
        onInit() {
        }
        listenNotice() {
            return [];
        }
        onNotice(no) {
        }
    }
    ys.Mediator = Mediator;
    class View extends PIXI.Container {
        constructor() {
            super();
            this.once('added', this.onAdded, this);
            this.once('removed', this.onRemoved, this);
        }
        addMediator(mediatorClass) {
            mediatorClass && new mediatorClass(this);
        }
        onAdded() {
        }
        onRemoved() {
        }
    }
    ys.View = View;
    class Page extends View {
        constructor(mediatorClass, groupName) {
            super();
            if (groupName) {
                this.onGroupStart(groupName);
                RES.loadGroup(groupName, (loaded, total, res) => {
                    this.onGroupProgress(groupName, loaded, total, res);
                }, () => {
                    this.onGroupComplete(groupName);
                    this.onInit();
                    this.addMediator(mediatorClass);
                }, this);
            }
            else {
                this.onInit();
                this.addMediator(mediatorClass);
            }
        }
        onInit() {
        }
        onGroupStart(groupName) {
        }
        onGroupProgress(groupName, loaded, total, res) {
        }
        onGroupComplete(groupName) {
        }
    }
    ys.Page = Page;
})(ys || (ys = {}));
var ys;
(function (ys) {
    class Proxy {
        constructor() {
            this.onCreate();
        }
        get data() {
            return this._data;
        }
        sendNotice(name, data) {
            ys.mvc.sendNotice(name, data);
        }
        onCreate() {
        }
    }
    ys.Proxy = Proxy;
})(ys || (ys = {}));
var ys;
(function (ys) {
    class Notice {
        constructor() {
        }
    }
    ys.Notice = Notice;
    class NoticeCMD {
        constructor() {
        }
        getProxy(ProxyClass) {
            return ys.mvc.getProxy(ProxyClass);
        }
        sendNotice(name, data) {
            ys.mvc.sendNotice(name, data);
        }
        execute(no) {
        }
    }
    ys.NoticeCMD = NoticeCMD;
})(ys || (ys = {}));
let stageW, stageH, stageHalfW, stageHalfH;
var ys;
(function (ys) {
    ys.stage = new PIXI.Container();
    ys.wxgame = false;
    ys.stageScale = 1;
    class Application {
        constructor(canvas, cfg) {
            console.log('PIXI::', PIXI);
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
            if (!ys.wxgame) {
                const VConsole = window.VConsole;
                VConsole && new VConsole();
                document.body.addEventListener('focusout', () => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                });
                const Stats = window.Stats;
                if (Stats) {
                    var stats = new Stats();
                    stats.showPanel(0);
                    document.body.appendChild(stats.dom);
                    ticker.add(() => {
                        stats.begin();
                        renderer.render(stage);
                        stats.end();
                    }, PIXI.UPDATE_PRIORITY.LOW);
                }
                else {
                    ticker.add(() => {
                        renderer.render(stage);
                    }, PIXI.UPDATE_PRIORITY.LOW);
                }
            }
            else {
                ticker.add(() => {
                    renderer.render(stage);
                }, PIXI.UPDATE_PRIORITY.LOW);
            }
            ticker.start();
            var stage = ys.stage;
            RES.setup(cfg);
            this.resize(canvas, stage, cfg);
            this.loadGroup(cfg);
        }
        loadGroup(cfg) {
            var loadGroup = () => {
                if (cfg.groups.length) {
                    let name = cfg.groups.shift();
                    this.onGroupStart(name);
                    RES.loadGroup(name, (loaded, total, res) => {
                        this.onGroupProgress(name, loaded, total, res);
                    }, () => {
                        this.onGroupComplete(name);
                        loadGroup();
                    }, this);
                }
                else {
                    this.onStart();
                }
            };
            RES.loadConfig(cfg.resourceJSON, () => {
                RES.setBaseUrl(cfg.resourceRoot);
                loadGroup();
            }, this);
        }
        resize(canvas, stage, cfg) {
            const resize = () => {
                const adapter = cfg.screenAdapter || new ys.ScreenAdapter();
                const { stageWidth, stageHeight, scale } = adapter.calStageSize(cfg.scaleMode, cfg.canvasWidth, cfg.canvasHeight, cfg.stageWidth, cfg.stageHeight);
                stageW = stageWidth;
                stageHalfW = stageW >> 1;
                stageH = stageHeight;
                stageHalfH = stageH >> 1;
                console.log('scale', scale);
                stage.scale.set(scale);
                if (!ys.wxgame) {
                    canvas.style.position = 'absolute';
                    canvas.style.top = '0px';
                    canvas.style.left = '0px';
                }
                ys.stageScale = scale;
            };
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
        onGroupStart(groupName) {
        }
        onGroupProgress(groupName, loaded, total, res) {
        }
        onGroupComplete(groupName) {
        }
        onStart() {
        }
    }
    ys.Application = Application;
})(ys || (ys = {}));
window.ys = ys;
class Main extends ys.Application {
    constructor(canvas, canvasWidth, canvasHeight, pixelRatio) {
        const cfg = new ys.Config();
        cfg.groups = ['preload'];
        cfg.resourceJSON = 'resource/default.res.json';
        cfg.resourceRoot = 'resource/';
        cfg.release = false;
        cfg.scaleMode = 'fixedWidth';
        cfg.stageWidth = 750;
        cfg.stageHeight = 1334;
        cfg.canvasWidth = canvasWidth;
        cfg.canvasHeight = canvasHeight;
        cfg.proxy = [];
        cfg.command = [];
        cfg.mockAjax = false;
        cfg.backgroundColor = 0x000000;
        cfg.pixelRatio = pixelRatio;
        cfg.antialias = true;
        cfg.screenAdapter = null;
        cfg.versionFun = (url) => {
            return url;
        };
        ysui.getLocale = (t) => {
            return t;
        };
        super(canvas, cfg);
    }
    onGroupStart(groupName) {
        console.log('start', groupName);
    }
    onGroupProgress(groupName, loaded, total, res) {
        console.log('progress', groupName, loaded, total, res.url);
    }
    onGroupComplete(groupName) {
        console.log('complete', groupName);
    }
    onStart() {
        GG.showPage(app.MenuPage);
    }
}
var app;
(function (app) {
    class MenuPage extends ys.Page {
        constructor() {
            super();
        }
        onInit() {
            const render = new ys3d.Render();
            const cam = new ys3d.Camera(70, stageW / stageH, 1, 20000);
            cam.lookAt(0, 0, -1);
            const scene = new ys3d.Scene(stageW, stageH);
            const geo = new PIXI.Geometry();
            geo.addAttribute('aVertexPosition', [-100, -100, 0, 1.0,
                100, -100, 0, 1.0,
                100, 100, 0, 1.0,
                -100, 100, 0, 1.0], 4)
                .addAttribute('aUvs', [0, 0,
                1, 0,
                1, 1,
                0, 1], 2)
                .addIndex([0, 1, 2, 0, 2, 3]);
            let i = 50;
            while (i--) {
                const plane = new ys3d.Plane3D(geo);
                this.addChild(plane.display);
                plane.position.z = -1000 - 5000 * Math.random();
                plane.position.x = -500 + 1000 * Math.random();
                plane.position.y = -500 + 1000 * Math.random();
                plane.display.interactive = true;
                plane.display.buttonMode = true;
                plane.display.on('pointerdown', () => {
                    console.log('click??');
                }, this);
                scene.addChild(plane);
                let ro = Math.random() * 360;
                plane.rotation.y = ro;
                ys.tikcer.add(() => {
                    if (plane.position.z - cam.position.z > 0) {
                        plane.position.z -= 2000;
                    }
                });
            }
            ys.tikcer.add(() => {
                cam.position.z -= 10;
                render.render(scene, cam);
            });
        }
        onRemoved() {
        }
    }
    app.MenuPage = MenuPage;
    class MenuPageMediator extends ys.Mediator {
        constructor(view) {
            super(view);
        }
        onInit() {
            console.log(this, 'init');
            var v = this.getView();
            v.bg.interactive = true;
            v.bg.on('pointerdown', () => {
                this.sendNotice('StartCMD', { name: 'FoxS' });
            }, this);
        }
        listenNotice() {
            return [];
        }
        onNotice(no) {
        }
    }
})(app || (app = {}));
var WEB;
(function (WEB) {
    function getURLParams(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
    WEB.getURLParams = getURLParams;
    function getVar(key) {
        if (key.indexOf(".") != -1) {
            var arr = key.split(".");
            var info = window[arr[0]];
            if (info) {
                return info[arr[1]];
            }
            else {
                return "";
            }
        }
        else {
            return window[key];
        }
    }
    WEB.getVar = getVar;
    function navigateToURL(url, replace = false) {
        if (replace) {
            window.location.replace(url);
        }
        else {
            window.location.href = url;
        }
    }
    WEB.navigateToURL = navigateToURL;
    WEB.UA_WEIXIN = "micromessenger";
    WEB.UA_WEIBO = "weibo";
    WEB.UA_SUNING = "snebuy-app";
    WEB.UA_JD = "jdapp";
    WEB.UA_VIVO_BROWSER = "vivobrowser";
    WEB.UA_ALIPAY = 'aplipay';
    function checkUserAgent(ua) {
        var uas = navigator.userAgent.toLocaleLowerCase();
        var reg = new RegExp(ua, "i");
        if (uas.match(reg)) {
            return true;
        }
        else {
            return false;
        }
    }
    WEB.checkUserAgent = checkUserAgent;
    function addJStoIndex(url, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.src = url;
        s.addEventListener('load', function () {
            callback && callback();
        }, false);
        document.body.appendChild(s);
    }
    WEB.addJStoIndex = addJStoIndex;
    function showQrCode(url) {
        var uri = location.href;
        if (url) {
            uri = url;
        }
        console.info(uri);
        console.info("%c ", "opacity:.6;display:block;padding:50px;background:url('http://tool.oschina.net/action/qrcode/generate?data=" + encodeURIComponent(uri) + "&output=image%2Fgif&error=L&type=0&margin=4&size=4') no-repeat;background-size:contain;");
    }
    WEB.showQrCode = showQrCode;
    ;
    function Url() {
        return location.protocol + '//' + location.host + location.pathname;
    }
    WEB.Url = Url;
})(WEB || (WEB = {}));
var ys;
(function (ys) {
    const wx = window.wx;
    class SoundX {
        constructor(src) {
            if (wx) {
                this.audio = wx.createInnerAudioContext();
                this.audio.src = src;
                this.audio.autoplay = false;
            }
        }
        play(start = 0, loop = true) {
            if (this.audio) {
                this.audio.startTime = start;
                this.audio.autoplay = true;
                this.audio.loop = loop;
                this.audio.play();
                wx.onShow(function () {
                    var _a;
                    (_a = this.audio) === null || _a === void 0 ? void 0 : _a.play();
                });
                wx.onAudioInterruptionEnd(function () {
                    var _a;
                    (_a = this.audio) === null || _a === void 0 ? void 0 : _a.play();
                });
            }
        }
        pause() {
            var _a;
            (_a = this.audio) === null || _a === void 0 ? void 0 : _a.pause();
        }
        resume() {
            var _a;
            (_a = this.audio) === null || _a === void 0 ? void 0 : _a.play();
        }
        stop() {
            var _a;
            (_a = this.audio) === null || _a === void 0 ? void 0 : _a.stop();
        }
        destroy() {
            var _a;
            this.pause();
            (_a = this.audio) === null || _a === void 0 ? void 0 : _a.destroy();
            this.audio = null;
        }
    }
    ys.SoundX = SoundX;
    class Sound {
        constructor(audio) {
            this.audio = audio;
            audio.addEventListener("ended", this.onPlayEnd.bind(this));
        }
        play(start = 0, loop = true) {
            if (this.audio) {
                this.loop = loop;
                this.startTime = start;
                this._play();
            }
        }
        pause() {
            this.audio && this.audio.pause();
        }
        resume() {
            this.audio && this.audio.play();
        }
        stop() {
            if (!this.audio)
                return;
            const a = this.audio;
            setTimeout(() => {
                a.removeEventListener("ended", this.onPlayEnd);
                a.pause();
            }, 200);
        }
        destroy() {
            this.stop();
            this.audio = null;
        }
        _play() {
            if (this.audio) {
                this.audio.currentTime = this.startTime;
                this.audio.play();
            }
        }
        onPlayEnd() {
            if (this.loop) {
                this._play();
            }
            else {
                this.stop();
            }
        }
        set volume(v) {
            this.audio && (this.audio.volume = v);
        }
        get volume() {
            return this.audio.volume;
        }
        get currentTime() {
            if (!this.audio)
                return 0;
            return this.audio.currentTime;
        }
    }
    ys.Sound = Sound;
})(ys || (ys = {}));
var ys;
(function (ys) {
    class Video {
        constructor() { }
    }
    ys.Video = Video;
})(ys || (ys = {}));
var ys;
(function (ys) {
    class MVC extends PIXI.utils.EventEmitter {
        constructor() {
            super();
            this.proxy = {};
            this.commands = {};
            this.on(MVC.MVC_NOTICE, (data) => {
                var name = data.name;
                var data = data.data;
                var cmdclass = this.commands[name];
                if (cmdclass) {
                    console.log('[MVC]:执行通知指令->', name);
                    var cmd = new cmdclass();
                    var no = new ys.Notice();
                    no.name = name;
                    no.data = data;
                    cmd.execute(no);
                }
            }, this);
        }
        sendNotice(name, data) {
            this.emit(MVC.MVC_NOTICE, { name: name, data: data });
        }
        registerProxy(ProxyClass) {
            const name = ProxyClass.name;
            if (!this.proxy[name]) {
                this.proxy[name] = new ProxyClass();
            }
        }
        removeProxy(ProxyClass) {
            const name = ProxyClass.name;
            this.proxy[name] = null;
            delete this.proxy[name];
        }
        getProxy(ProxyClass) {
            const name = ProxyClass.name;
            return this.proxy[name];
        }
        registerCommand(commandClass) {
            const name = commandClass.name;
            if (!this.commands[name]) {
                this.commands[name] = commandClass;
            }
        }
        removeCommand(commandClass) {
            const name = commandClass.name;
            this.commands[name] = null;
            delete this.commands[name];
        }
        logProxy() {
            console.log(this.proxy);
        }
        logCommand() {
            console.log(this.commands);
        }
    }
    MVC.MVC_NOTICE = 'on_mvc_notice';
    ys.MVC = MVC;
    ys.mvc = new MVC();
})(ys || (ys = {}));
var ys;
(function (ys) {
    class Ajax {
        constructor() {
        }
        xhr() {
            if (typeof XMLHttpRequest !== 'undefined') {
                return new XMLHttpRequest();
            }
            var versions = [
                "MSXML2.XmlHttp.6.0",
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];
            var xhr;
            for (var i = 0; i < versions.length; i++) {
                try {
                    xhr = new window['ActiveXObject'](versions[i]);
                    break;
                }
                catch (e) {
                }
            }
            return xhr;
        }
        send(url, callback, method, data, async) {
            if (async === undefined) {
                async = true;
            }
            var x = this.xhr();
            x.open(method, url, async);
            x.onreadystatechange = function () {
                if (x.readyState == 4) {
                    callback(x.status, x.responseText);
                }
            };
            if (method == 'POST') {
                x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
            x.send(data);
        }
        post(url, data, callback, async = true) {
            if (Ajax.mock) {
                callback(null);
                return;
            }
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            this.send(url, callback, 'POST', query.join('&'), async);
        }
        get(url, data, callback, async = true) {
            if (Ajax.mock) {
                callback(null);
                return;
            }
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            this.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
        }
    }
    ys.Ajax = Ajax;
})(ys || (ys = {}));
var ysui;
(function (ysui) {
    class ButtonOption {
    }
    ysui.ButtonOption = ButtonOption;
    class Button extends PIXI.Graphics {
        constructor(opt) {
            super();
            const width = opt.width || 160;
            const height = opt.height || 80;
            const fill = opt.fill || 0x000000;
            const radius = opt.radius || 20;
            const shadowOffsetX = opt.shadowOffsetX || 0;
            const shadowOffsetY = opt.shadowOffsetY || 0;
            const shandowAplha = opt.shandowAplha || 1;
            const padding = opt.padding || 20;
            const fillet = opt.fillet || 0;
            const chamfer = opt.chamfer || 0;
            var draw = (offsetx = 0, offsety = 0) => {
                if (fillet) {
                    this.drawFilletRect(offsetx, offsety, width, height, fillet);
                }
                else if (chamfer) {
                    this.drawChamferRect(offsetx, offsety, width, height, chamfer);
                }
                else if (radius) {
                    this.drawRoundedRect(offsetx, offsety, width, height, radius);
                }
                else {
                    this.drawRect(offsetx, offsety, width, height);
                }
                this.endFill();
            };
            if ((shadowOffsetX + shadowOffsetY) > 0) {
                this.beginFill(0x000000, shandowAplha);
                draw(shadowOffsetX, shadowOffsetY);
            }
            if (typeof (fill) == 'number') {
                this.beginFill(fill);
            }
            else {
                this.beginTextureFill(fill);
            }
            draw();
            this.txt = new PIXI.Text('');
            this.addChild(this.txt);
            this.btnW = width;
            this.btnH = height;
            this.padding = padding;
        }
        set label(txt) {
            const t = this.txt;
            t.text = txt;
            this.update();
        }
        set style(s) {
            this.txt.style = s;
            this.update();
        }
        update() {
            const t = this.txt;
            t.pivot.x = t.width * 0.5;
            t.pivot.y = t.height * 0.5;
            t.x = this.btnW * 0.5;
            t.y = this.btnH * 0.5;
            const w = t.width + this.padding * 2;
            if (w > this.btnW) {
                t.scale.set(this.btnW / w);
            }
        }
    }
    ysui.Button = Button;
})(ysui || (ysui = {}));
var ysui;
(function (ysui) {
    class PopManager {
        constructor() {
        }
        static popUp(d, blockAlpha = 0.7) {
            if (!d) {
                return;
            }
            if (!PopManager.popLayer) {
                PopManager.popLayer = new PIXI.Container();
            }
            if (!PopManager.popblock) {
                const g = new PIXI.Graphics();
                g.beginFill(0x000000);
                g.drawRect(0, 0, stageW, stageH);
                g.endFill();
                PopManager.popblock = g;
                PopManager.popblock.alpha = blockAlpha;
                PopManager.popblock.cacheAsBitmap = true;
            }
            const block = PopManager.popblock;
            block.scale.set(stageW / block.width, stageH / block.height);
            const layer = PopManager.popLayer;
            ys.stage.addChild(layer);
            layer.addChild(block);
            layer.addChild(d);
            d.once('removed', () => {
                console.log('??? ', layer.children.length);
                if (layer.children.length == 1) {
                    GG.removeDisplayObject(layer);
                }
                else {
                    layer.addChildAt(block, layer.children.length - 2);
                }
            }, this);
        }
    }
    ysui.PopManager = PopManager;
})(ysui || (ysui = {}));
var ysui;
(function (ysui) {
    const cjk = new RegExp(/([\u4e00-\u9fa5]|[\uAC00-\uD7A3]|[\u0800-\u4e00])/ig);
    class InputManager {
        constructor() {
            this.inputList = [];
            this.input = document.createElement('input');
            const input = this.input;
            input.style.border = 'none';
            input.style.position = 'absolute';
            input.style.background = 'none';
            input.style.outline = 'none';
            input.style.transformOrigin = '0% 0% 0px';
            input.style.padding = '0px';
            input.type = 'text';
            input.style.wordBreak = 'break-all';
            input.style.overflow = 'hiden';
            input.style.display = 'none';
        }
        static get GET() {
            if (!InputManager._instance) {
                InputManager._instance = new InputManager();
            }
            return InputManager._instance;
        }
        addEvt() {
            const input = this.input;
            input.addEventListener('focus', this.onFocusIn.bind(this));
            input.addEventListener('blur', this.onFocusOut.bind(this));
            ys.canvas.addEventListener('click', this.checkInput.bind(this));
            ys.canvas.addEventListener('touchend', this.checkInput.bind(this));
        }
        removeEvt() {
            const input = this.input;
            input.removeEventListener('focus', this.onFocusIn.bind(this));
            input.removeEventListener('blur', this.onFocusOut.bind(this));
            ys.canvas.removeEventListener('click', this.checkInput.bind(this));
            ys.canvas.removeEventListener('touchend', this.checkInput.bind(this));
        }
        checkInput(event) {
            const txt = this.activeTxt;
            if (txt) {
                const input = this.input;
                event.stopImmediatePropagation();
                if (this.needFocus) {
                    this.needFocus = false;
                    this.sizeTo(txt);
                    input.style.display = 'block';
                    input.value = this.activeTxt.text;
                    input.selectionStart = input.value.length;
                    input.selectionEnd = input.value.length;
                    input.focus();
                }
                else {
                    input.blur();
                }
            }
        }
        onFocusIn() {
            const txt = this.activeTxt;
            if (txt) {
                txt.visible = false;
                txt.emit('focus');
            }
            console.log('focus', txt);
        }
        onFocusOut() {
            const txt = this.activeTxt;
            const input = this.input;
            if (txt) {
                txt.visible = true;
                txt.text = input.value;
                input.value = '';
                txt.emit('blur');
            }
            console.log('blur', txt);
            input.style.display = 'none';
            this.activeTxt = null;
        }
        add(txt) {
            if (this.inputList.length == 0) {
                document.body.appendChild(this.input);
                this.addEvt();
            }
            console.log('add input ');
            this.inputList.push(txt);
            txt.interactive = true;
            txt.cursor = 'text';
            txt.hitArea = new PIXI.Rectangle(0, 0, txt.inputWidth, txt.style.fontSize);
            txt.on('pointerdown', this.select, this);
            txt.once('removed', () => {
                let i = this.inputList.length;
                while (i--) {
                    let t = this.inputList[i];
                    if (t === txt) {
                        this.inputList.splice(i, 1);
                        break;
                    }
                }
                if (this.inputList.length == 0) {
                    if (this.input.parentNode) {
                        this.input.parentNode.removeChild(this.input);
                    }
                    this.removeEvt();
                }
            }, this);
        }
        select(e) {
            const txt = e.target;
            if (this.activeTxt && txt != this.activeTxt) {
                this.input.blur();
            }
            txt.alpha = 1;
            this.activeTxt = txt;
            this.needFocus = true;
            console.log('active', txt);
        }
        sizeTo(txt) {
            const scale = ys.stageScale;
            const style = txt.style;
            const input = this.input;
            input.style.left = (txt.x * scale) + 'px';
            input.style.top = (txt.y * scale) + 'px';
            input.style.fontSize = (parseFloat(style.fontSize + '') * scale) + 'px';
            input.style.width = (txt.inputWidth * scale) + 'px';
            input.style.color = style.fill + '';
            if (txt.maxChars > 0) {
                input.setAttribute("maxlength", txt.maxChars + '');
            }
            else {
                input.removeAttribute("maxlength");
            }
        }
    }
    class TextFieldInput extends PIXI.Text {
        constructor(inputWidth = 100, style) {
            super('', style);
            this._maxChars = 0;
            this._inputWidth = inputWidth;
            this.on('added', () => {
                InputManager.GET.add(this);
            }, this);
        }
        get maxChars() {
            return this._maxChars;
        }
        set maxChars(max) {
            this._maxChars = max;
        }
        get inputWidth() {
            return this._inputWidth;
        }
        placeHolder(t) {
            this.text = t;
            this.alpha = 0.5;
        }
    }
    ysui.TextFieldInput = TextFieldInput;
    class TextField extends PIXI.Text {
        constructor(style) {
            super('', style);
        }
        locale(t, wordWrapWidth = 0) {
            t = ysui.getLocale(t);
            if (wordWrapWidth > 0) {
                this.wrapWord(t, wordWrapWidth);
            }
            else {
                this.text = t;
            }
        }
        wrapWord(txt, wordWrapWidth = 0) {
            if (cjk.test(txt)) {
                txt = txt.replace(/\n/ig, '');
                let word = '';
                let letter = '';
                let words = [];
                let len = txt.length;
                for (let i = 0; i < len; i++) {
                    letter = txt.charAt(i);
                    if (cjk.test(letter)) {
                        if (word != '') {
                            words.push(word);
                            word = '';
                        }
                        word = letter;
                        words.push(word);
                        word = '';
                    }
                    else {
                        if (letter == ' ') {
                            words.push(word + ' ');
                            word = '';
                        }
                        else {
                            word += letter;
                        }
                    }
                    if (i == len - 1) {
                        words.push(word);
                    }
                }
                len = words.length;
                let w1, w2;
                let str = '';
                let line = '';
                for (let i = 0; i < len; i++) {
                    w1 = words[i];
                    w2 = words[i + 1];
                    line += w1;
                    const met = PIXI.TextMetrics.measureText(line + w2, this.style);
                    if (met.width > wordWrapWidth) {
                        str += line + '\n';
                        line = '';
                    }
                }
                this.text = str;
            }
            else {
                const style = this.style;
                style.wordWrap = true;
                style.wordWrapWidth = wordWrapWidth;
                this.text = txt;
            }
        }
    }
    ysui.TextField = TextField;
    ysui.getLocale = (t) => {
        return t;
    };
})(ysui || (ysui = {}));
var ys3d;
(function (ys3d) {
    class Vector3 extends Array {
        constructor() {
            super();
            Object["setPrototypeOf"](this, Vector3.prototype);
            this[0] = 0;
            this[1] = 0;
            this[2] = 0;
        }
        set(x = 0, y = 0, z = 0) {
            this[0] = x;
            this[1] = y;
            this[2] = z;
        }
        set x(v) {
            this[0] = v;
        }
        set y(v) {
            this[1] = v;
        }
        set z(v) {
            this[2] = v;
        }
        get x() {
            return this[0];
        }
        get y() {
            return this[1];
        }
        get z() {
            return this[2];
        }
        add(b) {
            Vector3.add(this, this, b);
        }
        subtract(b) {
            Vector3.subtract(this, this, b);
        }
        scale(v) {
            Vector3.scale(this, this, v);
        }
        getLength() {
            return Vector3.getLength(this);
        }
        dot(b) {
            return Vector3.dot(this, b);
        }
        cross(b) {
            Vector3.cross(this, this, b);
        }
        static create(x = 0, y = 0, z = 0) {
            const v = new Vector3();
            v[0] = x;
            v[1] = y;
            v[2] = z;
            return v;
        }
        static add(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
        }
        static subtract(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
        }
        static scale(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
        }
        static distance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
        static getLength(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
        static negate(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        }
        static normalize(out, a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let len = x * x + y * y + z * z;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
            }
            out[0] = a[0] * len;
            out[1] = a[1] * len;
            out[2] = a[2] * len;
            return out;
        }
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        }
        static cross(out, a, b) {
            let ax = a[0], ay = a[1], az = a[2];
            let bx = b[0], by = b[1], bz = b[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
        }
        static lerp(out, a, b, t) {
            let ax = a[0];
            let ay = a[1];
            let az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
        }
    }
    ys3d.Vector3 = Vector3;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    let ID = 0;
    class Object3D {
        constructor() {
            this.parent = null;
            this.children = [];
            this.position = ys3d.Vector3.create();
            this.rotation = ys3d.Euler.create();
            this.quat = ys3d.Quaternion.create();
            this.scale = ys3d.Vector3.create(1, 1, 1);
            this.type = 'Object3D';
            this.id = ID++;
            this.visible = false;
            this.matrix = ys3d.Matrix4.create();
            this.worldMatrix = ys3d.Matrix4.create();
            this.rotation.onChange = () => {
                this.quat.fromEuler(this.rotation);
            };
            this.quat.onChange = () => {
                this.rotation.fromQuaternion(this.quat);
            };
            this.rotation.set(0, 0, 0);
        }
        updateMatrix() {
            const matrix = this.matrix;
            const q = this.quat;
            const pos = this.position;
            const scale = this.scale;
            matrix.compose(q, pos, scale);
        }
        updateMatrixWorld() {
            this.updateMatrix();
            if (this.parent) {
                this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            }
            else {
                this.worldMatrix.copy(this.matrix);
            }
            this.children.forEach(child => {
                child.updateMatrixWorld();
            });
        }
        getChildIndex(obj) {
            return this.children.indexOf(obj);
        }
        addChild(obj) {
            obj.parent && obj.parent.removeChild(obj);
            const index = this.getChildIndex(obj);
            if (index == -1) {
                obj.parent = this;
                this.children.push(obj);
            }
        }
        removeChild(obj) {
            let index = this.getChildIndex(obj);
            if (index != -1) {
                obj.parent = null;
                this.children.splice(index, 1);
            }
        }
        traverse(callback) {
            if (callback(this))
                return;
            this.children.forEach(child => {
                child.traverse(callback);
            });
        }
    }
    ys3d.Object3D = Object3D;
    class Group extends Object3D {
        constructor() {
            super();
            this.type = 'Group';
            this.visible = true;
        }
    }
    ys3d.Group = Group;
    class Scene extends Object3D {
        constructor(w, h) {
            super();
            this.type = 'Scene';
            this.$display = new PIXI.Container();
            const display = this.$display;
            display.x = w * 0.5;
            display.y = h * 0.5;
            this.visible = true;
            this.name = 'scene';
        }
        get display() {
            return this.$display;
        }
    }
    ys3d.Scene = Scene;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    let tmp = ys3d.Vector3.create();
    class Camera extends ys3d.Object3D {
        constructor(fov, aspect, near = 0.1, far = 2000) {
            super();
            this.type = 'Camera';
            this._fov = fov;
            this._aspect = aspect;
            this._near = near;
            this._far = far;
            this.name = 'camera';
            this._projectionMatrix = ys3d.Matrix4.create();
            this._updateProjectMatrix();
            this._viewMatrix = ys3d.Matrix4.create();
            this.up = ys3d.Vector3.create(0, 1, 0);
            this.lookAt(0, 0, -1);
        }
        set fov(v) {
            this._fov = v;
            this._updateProjectMatrix();
        }
        get fov() {
            return this._fov;
        }
        get far() {
            return this._far;
        }
        updateMatrixWorld() {
            super.updateMatrixWorld();
            this._viewMatrix.copy(this.worldMatrix);
            this._viewMatrix.inverse();
        }
        _updateProjectMatrix() {
            this._projectionMatrix.fromPerspective(this._fov, this._aspect, this._near, this._far);
        }
        get projectionMatrix() {
            return this._projectionMatrix;
        }
        get viewMatrix() {
            return this._viewMatrix;
        }
        lookAt(x, y, z) {
            const pos = this.position;
            const up = this.up;
            this.viewMatrix.lookAt(pos, ys3d.Vector3.create(x, y, z), up);
            this.viewMatrix.getRotation(this.quat);
            this.rotation.fromQuaternion(this.quat);
        }
        project(v3) {
            tmp = this._viewMatrix.transformV3(v3);
            tmp = this._projectionMatrix.transformV3(tmp);
            return tmp;
        }
        unproject(x, y) {
            let tempMat4 = ys3d.Matrix4.create();
            tempMat4.copy(this._projectionMatrix);
            tempMat4.inverse();
            tmp.set(x, y, 0);
            tmp = tempMat4.transformV3(tmp);
            tmp = this.worldMatrix.transformV3(tmp);
            return tmp;
        }
    }
    ys3d.Camera = Camera;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class Geometry extends PIXI.Geometry {
        constructor() {
            super();
        }
        get vertices() {
            return this._vertices.slice();
        }
        get indices() {
            return this._indices;
        }
        get uvs() {
            return this._uvs;
        }
    }
    ys3d.Geometry = Geometry;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class Box extends ys3d.Geometry {
        constructor(width, height, depth) {
            super();
            width = width || 1;
            height = height || 1;
            depth = depth || 1;
            const widthSegments = 1;
            const heightSegments = 1;
            const depthSegments = 1;
            var indices = [];
            var vertices = [];
            var uvs = [];
            var numberOfVertices = 0;
            var groupStart = 0;
            buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0);
            buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1);
            buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2);
            buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3);
            buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4);
            buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5);
            this._indices = indices;
            this._vertices = vertices;
            this._uvs = uvs;
            function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
                var segmentWidth = width / gridX;
                var segmentHeight = height / gridY;
                var widthHalf = width / 2;
                var heightHalf = height / 2;
                var depthHalf = depth / 2;
                var gridX1 = gridX + 1;
                var gridY1 = gridY + 1;
                var vertexCounter = 0;
                var groupCount = 0;
                var ix, iy;
                var vector = ys3d.Vector3.create();
                for (iy = 0; iy < gridY1; iy++) {
                    var y = iy * segmentHeight - heightHalf;
                    for (ix = 0; ix < gridX1; ix++) {
                        var x = ix * segmentWidth - widthHalf;
                        vector[u] = x * udir;
                        vector[v] = y * vdir;
                        vector[w] = depthHalf;
                        vertices.push(vector.x, vector.y, vector.z);
                        vector[u] = 0;
                        vector[v] = 0;
                        vector[w] = depth > 0 ? 1 : -1;
                        uvs.push(ix / gridX);
                        uvs.push(1 - (iy / gridY));
                        vertexCounter += 1;
                    }
                }
                for (iy = 0; iy < gridY; iy++) {
                    for (ix = 0; ix < gridX; ix++) {
                        var a = numberOfVertices + ix + gridX1 * iy;
                        var b = numberOfVertices + ix + gridX1 * (iy + 1);
                        var c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                        var d = numberOfVertices + (ix + 1) + gridX1 * iy;
                        indices.push(a, b, d);
                        indices.push(b, c, d);
                        groupCount += 6;
                    }
                }
                groupStart += groupCount;
                numberOfVertices += vertexCounter;
            }
        }
    }
    ys3d.Box = Box;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class Plane extends ys3d.Geometry {
        constructor(width = 100, height = 100, widthSegments = 1, heightSegments = 1) {
            super();
            width = width || 1;
            height = height || 1;
            var width_half = width / 2;
            var height_half = height / 2;
            var gridX = Math.floor(widthSegments) || 1;
            var gridY = Math.floor(heightSegments) || 1;
            var gridX1 = gridX + 1;
            var gridY1 = gridY + 1;
            var segment_width = width / gridX;
            var segment_height = height / gridY;
            var ix, iy;
            var indices = [];
            var vertices = [];
            var uvs = [];
            for (iy = 0; iy < gridY1; iy++) {
                var y = iy * segment_height - height_half;
                for (ix = 0; ix < gridX1; ix++) {
                    var x = ix * segment_width - width_half;
                    vertices.push(x, -y, 0);
                    uvs.push(ix / gridX);
                    uvs.push(1 - (iy / gridY));
                }
            }
            for (iy = 0; iy < gridY; iy++) {
                for (ix = 0; ix < gridX; ix++) {
                    var a = ix + gridX1 * iy;
                    var b = ix + gridX1 * (iy + 1);
                    var c = (ix + 1) + gridX1 * (iy + 1);
                    var d = (ix + 1) + gridX1 * iy;
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                }
            }
            this._vertices = vertices;
            this._indices = indices;
            this._uvs = uvs;
        }
    }
    ys3d.Plane = Plane;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    const temp = [0, 0, 0];
    class Matrix4 extends Array {
        constructor() {
            super();
            Object["setPrototypeOf"](this, Matrix4.prototype);
        }
        getTypedArray() {
            var ta = new Float32Array(this);
            return ta;
        }
        translate(v) {
            Matrix4.translate(this, this, v);
        }
        rotate(rad, axis) {
            Matrix4.rotate(this, this, rad, axis);
        }
        scale(v) {
            Matrix4.scale(this, this, v);
        }
        identity() {
            Matrix4.identity(this);
        }
        inverse() {
            Matrix4.invert(this, this);
        }
        compose(q, pos, scale) {
            Matrix4.composeRotationTranslationScale(this, q, pos, scale);
        }
        copy(m) {
            Matrix4.copy(this, m);
        }
        fromPerspective(fov, aspect, near, far) {
            fov = fov * (Math.PI / 180);
            Matrix4.perspective(this, fov, aspect, near, far);
        }
        fromOrthogonal(left, right, bottom, top, near, far) {
            Matrix4.ortho(this, left, right, bottom, top, near, far);
        }
        fromQuaternion(q) {
            Matrix4.fromQuaternion(this, q);
        }
        multiply(ma, mb) {
            if (mb) {
                Matrix4.multiply(this, ma, mb);
            }
            else {
                Matrix4.multiply(this, this, ma);
            }
            return this;
        }
        lookAt(eye, target, up) {
            Matrix4.lookAt(this, eye, target, up);
        }
        transformV4(v) {
            Matrix4.transformVector4(v, v, this);
            return v;
        }
        transformV3(v) {
            Matrix4.transformVector3(v, v, this);
            return v;
        }
        getRotation(q) {
            Matrix4.getRotation(q, this);
        }
        static create() {
            let mat = new Matrix4();
            Matrix4.identity(mat);
            return mat;
        }
        static copy(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        static set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
            out[0] = m00;
            out[1] = m01;
            out[2] = m02;
            out[3] = m03;
            out[4] = m10;
            out[5] = m11;
            out[6] = m12;
            out[7] = m13;
            out[8] = m20;
            out[9] = m21;
            out[10] = m22;
            out[11] = m23;
            out[12] = m30;
            out[13] = m31;
            out[14] = m32;
            out[15] = m33;
        }
        static identity(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
        }
        static transpose(out, a) {
            if (out === a) {
                let a01 = a[1], a02 = a[2], a03 = a[3];
                let a12 = a[6], a13 = a[7];
                let a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            }
            else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }
        }
        static invert(out, a) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        }
        static multiply(out, a, b) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        }
        static translate(out, a, v) {
            let x = v[0], y = v[1], z = v[2];
            let a00, a01, a02, a03;
            let a10, a11, a12, a13;
            let a20, a21, a22, a23;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            }
            else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }
        }
        static scale(out, a, v) {
            let x = v[0], y = v[1], z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        static rotate(out, a, rad, axis) {
            let x = axis[0], y = axis[1], z = axis[2];
            let len = ys3d.math.hypot(x, y, z);
            let s, c, t;
            let a00, a01, a02, a03;
            let a10, a11, a12, a13;
            let a20, a21, a22, a23;
            let b00, b01, b02;
            let b10, b11, b12;
            let b20, b21, b22;
            if (Math.abs(len) < ys3d.EPSILON) {
                return;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
        }
        static composeRotationTranslationScale(out, q, v, s) {
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            let sx = s[0];
            let sy = s[1];
            let sz = s[2];
            out[0] = (1 - (yy + zz)) * sx;
            out[1] = (xy + wz) * sx;
            out[2] = (xz - wy) * sx;
            out[3] = 0;
            out[4] = (xy - wz) * sy;
            out[5] = (1 - (xx + zz)) * sy;
            out[6] = (yz + wx) * sy;
            out[7] = 0;
            out[8] = (xz + wy) * sz;
            out[9] = (yz - wx) * sz;
            out[10] = (1 - (xx + yy)) * sz;
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
        }
        static getTranslation(out, mat) {
            out[0] = mat[12];
            out[1] = mat[13];
            out[2] = mat[14];
        }
        static getScaling(out, mat) {
            let m11 = mat[0];
            let m12 = mat[1];
            let m13 = mat[2];
            let m21 = mat[4];
            let m22 = mat[5];
            let m23 = mat[6];
            let m31 = mat[8];
            let m32 = mat[9];
            let m33 = mat[10];
            out[0] = ys3d.math.hypot(m11, m12, m13);
            out[1] = ys3d.math.hypot(m21, m22, m23);
            out[2] = ys3d.math.hypot(m31, m32, m33);
        }
        static getRotation(out, mat) {
            let scaling = ys3d.Vector3.create();
            Matrix4.getScaling(scaling, mat);
            let is1 = 1 / scaling[0];
            let is2 = 1 / scaling[1];
            let is3 = 1 / scaling[2];
            let sm11 = mat[0] * is1;
            let sm12 = mat[1] * is2;
            let sm13 = mat[2] * is3;
            let sm21 = mat[4] * is1;
            let sm22 = mat[5] * is2;
            let sm23 = mat[6] * is3;
            let sm31 = mat[8] * is1;
            let sm32 = mat[9] * is2;
            let sm33 = mat[10] * is3;
            let trace = sm11 + sm22 + sm33;
            let S = 0;
            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                out[3] = 0.25 * S;
                out[0] = (sm23 - sm32) / S;
                out[1] = (sm31 - sm13) / S;
                out[2] = (sm12 - sm21) / S;
            }
            else if (sm11 > sm22 && sm11 > sm33) {
                S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
                out[3] = (sm23 - sm32) / S;
                out[0] = 0.25 * S;
                out[1] = (sm12 + sm21) / S;
                out[2] = (sm31 + sm13) / S;
            }
            else if (sm22 > sm33) {
                S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
                out[3] = (sm31 - sm13) / S;
                out[0] = (sm12 + sm21) / S;
                out[1] = 0.25 * S;
                out[2] = (sm23 + sm32) / S;
            }
            else {
                S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
                out[3] = (sm12 - sm21) / S;
                out[0] = (sm31 + sm13) / S;
                out[1] = (sm23 + sm32) / S;
                out[2] = 0.25 * S;
            }
        }
        ;
        static fromQuaternion(out, q) {
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let yx = y * x2;
            let yy = y * y2;
            let zx = z * x2;
            let zy = z * y2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
        }
        static perspective(out, fovy, aspect, near = 0.1, far = 2000) {
            if (near === far || aspect === 0) {
                throw "null frustum";
            }
            if (near <= 0) {
                throw "near <= 0";
            }
            if (far <= 0) {
                throw "far <= 0";
            }
            let f = 1.0 / Math.tan(fovy / 2);
            let nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
        }
        static ortho(out, left, right, bottom, top, near = 0.1, far = 2000) {
            let lr = 1 / (left - right);
            let bt = 1 / (bottom - top);
            let nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
        }
        static lookAt(out, eye, target, up) {
            let eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
            let z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
            let len = z0 * z0 + z1 * z1 + z2 * z2;
            if (len === 0) {
                z2 = 1;
            }
            else {
                len = 1 / Math.sqrt(len);
                z0 *= len;
                z1 *= len;
                z2 *= len;
            }
            let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
            len = x0 * x0 + x1 * x1 + x2 * x2;
            if (len === 0) {
                if (upz) {
                    upx += 1e-6;
                }
                else if (upy) {
                    upz += 1e-6;
                }
                else {
                    upy += 1e-6;
                }
                (x0 = upy * z2 - upz * z1), (x1 = upz * z0 - upx * z2), (x2 = upx * z1 - upy * z0);
                len = x0 * x0 + x1 * x1 + x2 * x2;
            }
            len = 1 / Math.sqrt(len);
            x0 *= len;
            x1 *= len;
            x2 *= len;
            out[0] = x0;
            out[1] = x1;
            out[2] = x2;
            out[3] = 0;
            out[4] = z1 * x2 - z2 * x1;
            out[5] = z2 * x0 - z0 * x2;
            out[6] = z0 * x1 - z1 * x0;
            out[7] = 0;
            out[8] = z0;
            out[9] = z1;
            out[10] = z2;
            out[11] = 0;
            out[12] = eyex;
            out[13] = eyey;
            out[14] = eyez;
            out[15] = 1;
        }
        static transformVector4(out, a, mat) {
            let x = a[0], y = a[1], z = a[2];
            out[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
            out[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
            out[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
            let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            out[3] = w;
        }
        static transformVector3(out, a, mat) {
            let x = a[0], y = a[1], z = a[2];
            let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            w = w || 1.0;
            out[0] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
            out[1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
            out[2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
        }
    }
    ys3d.Matrix4 = Matrix4;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    let tempMat4 = ys3d.Matrix4.create();
    class Euler extends Array {
        constructor() {
            super();
            this.onChange = () => { };
            Object["setPrototypeOf"](this, Euler.prototype);
            this[0] = 0;
            this[1] = 0;
            this[2] = 0;
        }
        set x(v) {
            this[0] = v;
            this.onChange();
        }
        set y(v) {
            this[1] = v;
            this.onChange();
        }
        set z(v) {
            this[2] = v;
            this.onChange();
        }
        set(x, y, z) {
            this[0] = x;
            this[1] = x;
            this[2] = x;
            this.onChange();
        }
        get x() {
            return this[0];
        }
        get y() {
            return this[1];
        }
        get z() {
            return this[2];
        }
        fromQuaternion(q) {
            ys3d.Matrix4.fromQuaternion(tempMat4, q);
            Euler.fromRotationMatrix(this, tempMat4);
            this.onChange();
        }
        static create() {
            const e = new Euler();
            return e;
        }
        static fromRotationMatrix(out, m, order = 'YXZ') {
            if (order === 'XYZ') {
                out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
                if (Math.abs(m[8]) < 0.99999) {
                    out[0] = Math.atan2(-m[9], m[10]);
                    out[2] = Math.atan2(-m[4], m[0]);
                }
                else {
                    out[0] = Math.atan2(m[6], m[5]);
                    out[2] = 0;
                }
            }
            else if (order === 'YXZ') {
                out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
                if (Math.abs(m[9]) < 0.99999) {
                    out[1] = Math.atan2(m[8], m[10]);
                    out[2] = Math.atan2(m[1], m[5]);
                }
                else {
                    out[1] = Math.atan2(-m[2], m[0]);
                    out[2] = 0;
                }
            }
            else if (order === 'ZXY') {
                out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
                if (Math.abs(m[6]) < 0.99999) {
                    out[1] = Math.atan2(-m[2], m[10]);
                    out[2] = Math.atan2(-m[4], m[5]);
                }
                else {
                    out[1] = 0;
                    out[2] = Math.atan2(m[1], m[0]);
                }
            }
            else if (order === 'ZYX') {
                out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
                if (Math.abs(m[2]) < 0.99999) {
                    out[0] = Math.atan2(m[6], m[10]);
                    out[2] = Math.atan2(m[1], m[0]);
                }
                else {
                    out[0] = 0;
                    out[2] = Math.atan2(-m[4], m[5]);
                }
            }
            else if (order === 'YZX') {
                out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
                if (Math.abs(m[1]) < 0.99999) {
                    out[0] = Math.atan2(-m[9], m[5]);
                    out[1] = Math.atan2(-m[2], m[0]);
                }
                else {
                    out[0] = 0;
                    out[1] = Math.atan2(m[8], m[10]);
                }
            }
            else if (order === 'XZY') {
                out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
                if (Math.abs(m[4]) < 0.99999) {
                    out[0] = Math.atan2(m[6], m[5]);
                    out[1] = Math.atan2(m[8], m[0]);
                }
                else {
                    out[0] = Math.atan2(-m[9], m[10]);
                    out[1] = 0;
                }
            }
            return out;
        }
    }
    ys3d.Euler = Euler;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class Quaternion extends Array {
        constructor() {
            super();
            this.onChange = () => { };
            Object["setPrototypeOf"](this, Quaternion.prototype);
            this[0] = 0;
            this[1] = 0;
            this[2] = 0;
            this[3] = 1;
        }
        set x(v) {
            this[0] = v;
            this.onChange();
        }
        set y(v) {
            this[1] = v;
            this.onChange();
        }
        set z(v) {
            this[2] = v;
            this.onChange();
        }
        set w(v) {
            this[3] = v;
            this.onChange();
        }
        get x() {
            return this[0];
        }
        get y() {
            return this[1];
        }
        get z() {
            return this[2];
        }
        get w() {
            return this[3];
        }
        fromEuler(eu) {
            Quaternion.fromEuler(this, eu);
        }
        static create() {
            const q = new Quaternion();
            return q;
        }
        static identity(out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
        }
        static setAxisAngle(out, axis, rad) {
            rad = rad * 0.5;
            let s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
        }
        static slerp(out, a, b, t) {
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = b[0], by = b[1], bz = b[2], bw = b[3];
            let omega, cosom, sinom, scale0, scale1;
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            if (1.0 - cosom > 0.000001) {
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            }
            else {
                scale0 = 1.0 - t;
                scale1 = t;
            }
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;
        }
        static fromMat4(out, m) {
            let fTrace = m[0] + m[4] + m[8];
            let fRoot;
            if (fTrace > 0.0) {
                fRoot = Math.sqrt(fTrace + 1.0);
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            }
            else {
                let i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                let j = (i + 1) % 3;
                let k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }
        }
        static fromEuler(out, euler, order = 'YXZ') {
            const rad = Math.PI / 180;
            let sx = Math.sin(euler[0] * 0.5 * rad);
            let cx = Math.cos(euler[0] * 0.5 * rad);
            let sy = Math.sin(euler[1] * 0.5 * rad);
            let cy = Math.cos(euler[1] * 0.5 * rad);
            let sz = Math.sin(euler[2] * 0.5 * rad);
            let cz = Math.cos(euler[2] * 0.5 * rad);
            if (order === 'XYZ') {
                out[0] = sx * cy * cz + cx * sy * sz;
                out[1] = cx * sy * cz - sx * cy * sz;
                out[2] = cx * cy * sz + sx * sy * cz;
                out[3] = cx * cy * cz - sx * sy * sz;
            }
            else if (order === 'YXZ') {
                out[0] = sx * cy * cz + cx * sy * sz;
                out[1] = cx * sy * cz - sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
            }
            else if (order === 'ZXY') {
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz + sx * sy * cz;
                out[3] = cx * cy * cz - sx * sy * sz;
            }
            else if (order === 'ZYX') {
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
            }
            else if (order === 'YZX') {
                out[0] = sx * cy * cz + cx * sy * sz;
                out[1] = cx * sy * cz + sx * cy * sz;
                out[2] = cx * cy * sz - sx * sy * cz;
                out[3] = cx * cy * cz - sx * sy * sz;
            }
            else if (order === 'XZY') {
                out[0] = sx * cy * cz - cx * sy * sz;
                out[1] = cx * sy * cz - sx * cy * sz;
                out[2] = cx * cy * sz + sx * sy * cz;
                out[3] = cx * cy * cz + sx * sy * sz;
            }
        }
    }
    ys3d.Quaternion = Quaternion;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class Vector4 extends Array {
        constructor() {
            super();
            Object["setPrototypeOf"](this, Vector4.prototype);
            this.set(0, 0, 0, 1);
        }
        set x(v) {
            this[0] = v;
        }
        set y(v) {
            this[1] = v;
        }
        set z(v) {
            this[2] = v;
        }
        set w(v) {
            this[3] = v;
        }
        get x() {
            return this[0];
        }
        get y() {
            return this[1];
        }
        get z() {
            return this[2];
        }
        get w() {
            return this[3];
        }
        getLength() {
            let v = this;
            let x = v[0], y = v[1], z = v[2], w = v[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
        copy(a) {
            this[0] = a[0];
            this[1] = a[1];
            this[2] = a[2];
            this[3] = a[3];
        }
        set(x, y, z, w) {
            this[0] = x;
            this[1] = y;
            this[2] = z;
            this[3] = w;
        }
        static create(x = 0, y = 0, z = 0, w = 1) {
            const v = new Vector4();
            v[0] = x;
            v[1] = y;
            v[2] = z;
            v[3] = w;
            return v;
        }
    }
    ys3d.Vector4 = Vector4;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    ys3d.EPSILON = 0.000001;
    class math {
        constructor() {
        }
        static hypot(...arg) {
            var y = 0, i = arguments.length;
            while (i--)
                y += arguments[i] * arguments[i];
            return Math.sqrt(y);
        }
    }
    ys3d.math = math;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class Render {
        constructor() {
        }
        render(scene, cam) {
            scene.display.removeChildren();
            scene.updateMatrixWorld();
            cam.updateMatrixWorld();
            const renderList = [];
            scene.traverse((child) => {
                if (!child.visible)
                    return true;
                if (!child.draw)
                    return;
                renderList.push(child);
            });
            renderList.forEach((child) => {
                let tempV4 = child.worldPosition;
                tempV4.x = 0;
                tempV4.y = 0;
                tempV4.z = 0;
                tempV4.w = 1;
                tempV4 = child.worldMatrix.transformV4(tempV4);
                tempV4 = cam.viewMatrix.transformV4(tempV4);
                child.worldPosition = tempV4;
            });
            renderList.sort((a, b) => {
                const az = a.worldPosition.z;
                const bz = b.worldPosition.z;
                const alen = a.worldPosition.getLength();
                const blen = b.worldPosition.getLength();
                const dis = alen - blen;
                if (Math.abs(dis) < 0.0001) {
                    if (az == bz) {
                        return a.id - b.id;
                    }
                    else {
                        bz - az;
                    }
                }
                else {
                    return -dis;
                }
            });
            renderList.forEach((node, index) => {
                const pos = node.worldPosition;
                node.draw(scene, cam);
            });
        }
    }
    ys3d.Render = Render;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    class RenderNode extends ys3d.Object3D {
        constructor() {
            super();
            this.visible = true;
            this.worldPosition = new ys3d.Vector4();
        }
        get display() {
            return this.$display;
        }
        draw(scene, cam) {
        }
        mvp(cam, v4) {
            v4 = this.worldMatrix.transformV4(v4);
            v4 = cam.viewMatrix.transformV4(v4);
            v4 = cam.projectionMatrix.transformV4(v4);
        }
    }
    ys3d.RenderNode = RenderNode;
})(ys3d || (ys3d = {}));
var ys3d;
(function (ys3d) {
    const vertexSrc = `
    precision mediump float;
	attribute vec4 aVertexPosition;
    attribute vec2 aUvs;
    uniform mat4 mvpMatrix;

	varying vec2 vUvs;

    void main() {
		vUvs = aUvs;
        gl_Position = vec4(mvpMatrix*aVertexPosition);

    }`;
    const fragmentSrc = `
    precision mediump float;
	varying vec2 vUvs;
    uniform sampler2D uSampler2;

    void main() {
        gl_FragColor = texture2D(uSampler2, vUvs);
	}`;
    class Plane3D extends ys3d.RenderNode {
        constructor(geometry) {
            super();
            this.geometry = geometry;
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            this.shader = PIXI.Shader.from(vertexSrc, fragmentSrc, {
                uSampler2: PIXI.Texture.from('resource/headimg.jpg'),
                mvpMatrix: mtx.getTypedArray()
            });
            this.$display = new PIXI.Mesh(this.geometry, this.shader);
        }
        draw(scene, cam) {
            this.display.parent && this.display.parent.addChild(this.display);
            let m = ys3d.Matrix4.create();
            let v = ys3d.Matrix4.create();
            let p = ys3d.Matrix4.create();
            m.copy(this.worldMatrix);
            v.copy(cam.viewMatrix);
            p.copy(cam.projectionMatrix);
            let mtx = v.multiply(m);
            mtx = p.multiply(mtx);
            this.shader.uniforms.mvpMatrix = mtx.getTypedArray();
        }
    }
    ys3d.Plane3D = Plane3D;
})(ys3d || (ys3d = {}));

        window.Main=Main;
        window.ys=ys;
        window.ysui = ysui;
        window.GG=GG;
        window.RES=RES;
        window.WEB=WEB;
        window.app=app;
        ys.wxgame = true;

        PIXI.Renderer.registerPlugin('accessibility', PIXI.AccessibilityManager);
            PIXI.Renderer.registerPlugin('batch', PIXI.BatchRenderer);
            PIXI.Renderer.registerPlugin('extract', PIXI.Extract);
            PIXI.Renderer.registerPlugin('interaction', PIXI.InteractionManager);
            PIXI.Renderer.registerPlugin('particle', PIXI.ParticleRenderer);
            PIXI.Renderer.registerPlugin('prepare', PIXI.Prepare);
            PIXI.Loader.registerPlugin(PIXI.SpritesheetLoader);
        console.log('构建时间:',new Date().toString())
        