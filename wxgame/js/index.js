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
    ys.stageScale = 1;
    class Application {
        constructor(canvas, cfg) {
            console.log('PIXI::', PIXI);
            PIXI.utils.skipHello();
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
            console.log('>>', ticker, stage);
            ticker.add(() => {
                renderer.render(stage);
            }, PIXI.UPDATE_PRIORITY.LOW);
            ticker.start();
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
                ys.stageScale = scale;
                console.log(stageW, stageH);
            };
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
        cfg.backgroundColor = 0xff0000;
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
            const m = new PIXI.Matrix();
            const sp = PIXI.Sprite.from('resource/atlas.png', { scaleMode: PIXI.SCALE_MODES.NEAREST });
            sp.width = stageW;
            sp.height = stageH;
            this.addChild(sp);
            const opt = new ysui.ButtonOption();
            opt.width = 250;
            opt.height = 100;
            const tex = GG.texGradient(opt.width, opt.height, 0, 0, 0, opt.height, ['#ff0000', '#ffcccc'], [0, 1]);
            opt.fill = tex;
            opt.shadowOffsetX = 0;
            opt.shadowOffsetY = 8;
            opt.shandowAplha = 0.5;
            opt.chamfer = opt.height >> 1;
            const btn = new ysui.Button(opt);
            btn.label = 'Start';
            btn.style = new PIXI.TextStyle({
                align: 'center', fontSize: 50,
                fill: 0xffffff,
            });
            GG.setAncher(btn, 0.5, 0.5);
            btn.x = stageHalfW;
            btn.y = stageH * 0.7;
            btn.interactive = true;
            btn.buttonMode = true;
            btn.on('pointertap', () => {
            }, this);
            const mp3 = new ys.SoundX('resource/sound/bgm.mp3');
            mp3.play();
            const star = new PIXI.Graphics();
            star.beginFill(0xffff00);
            star.drawStar(0, 0, 15, 50, 40, 0);
            this.addChild(star);
            star.position.set(stageHalfW, 200);
            const arc2 = new PIXI.Graphics();
            arc2.lineStyle(6, 0x3333DD, 1);
            arc2.beginFill(0xff0000);
            arc2.arc(650, 270, 60, 2 * Math.PI, 3 * Math.PI / 2);
            arc2.endFill();
            this.addChild(arc2);
            this.addChild(btn);
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

        window.Main=Main;
        window.ys=ys;
        window.ysui = ysui;
        window.GG=GG;
        window.RES=RES;
        window.WEB=WEB;
        window.app=app;

        PIXI.Renderer.registerPlugin('accessibility', PIXI.AccessibilityManager);
            PIXI.Renderer.registerPlugin('batch', PIXI.BatchRenderer);
            PIXI.Renderer.registerPlugin('extract', PIXI.Extract);
            PIXI.Renderer.registerPlugin('interaction', PIXI.InteractionManager);
            PIXI.Renderer.registerPlugin('particle', PIXI.ParticleRenderer);
            PIXI.Renderer.registerPlugin('prepare', PIXI.Prepare);
            PIXI.Loader.registerPlugin(PIXI.SpritesheetLoader);
        