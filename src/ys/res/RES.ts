namespace RES {
    let cfgGroups: any[];
    let cfgGroupsLen: number;
    let cfgResources: any[];
    let cfgResourcesLen: number;
    let groupLoaded: string[] = [];
    let myCache: any = {};
    let loader: PIXI.Loader;

    const canWebAudio = window.AudioContext || (<any>window).webkitAudioContext;
    let audioCtx: AudioContext;

    export function setup(cfg: ys.Config) {
        if (canWebAudio || ys.wxgame) {
            //处理webaudio
            if (canWebAudio) {
                audioCtx = new (window.AudioContext || (<any>window).webkitAudioContext)();
            }
            PIXI.LoaderResource.setExtensionXhrType('mp3', PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
            PIXI.LoaderResource.setExtensionLoadType('mp3', PIXI.LoaderResource.LOAD_TYPE.XHR);
        }

        loader = new PIXI.Loader();
        loader.pre((resource: PIXI.LoaderResource, next: Function) => {
            console.log('pre ', resource.url)
            // console.log(resource.xhrType, resource.xhr)
            resource.url = cfg.versionFun(resource.url);
            next();
        })

        loader.use((resource: PIXI.LoaderResource, next: Function) => {
            if (resource.url.indexOf('.mp3') != -1) {
                if (ys.wxgame) {
                    resource.data = resource.url;
                    next();
                } else {
                    if (canWebAudio) {
                        audioCtx.decodeAudioData(resource.data, (buffer: AudioBuffer) => {
                            resource.data = buffer;
                            next();
                        }, (error) => {
                            console.error('不能decode为AudioBuffer')
                            next();
                        })
                    } else {
                        const buffer = resource.data as ArrayBuffer;
                        const blob = new Blob([buffer], { type: 'autio/mp3' });
                        const src = URL.createObjectURL(blob);
                        resource.data = new Audio(src);
                        next();
                    }
                }
            } else {
                next();
            }
        })

    }

    export function reset() {
        loader.baseUrl = '';
        loader.reset();
        loader.destroy();
    }

    export function list() {
        for (var key in PIXI.utils.TextureCache) {
            console.log('材质', key);
        }

        for (var key in myCache) {
            console.log('非材质', key, myCache[key]);
        }
    }

    export function getRes(name: string) {
        return PIXI.utils.TextureCache[name] || myCache[name];
    }
    /**name可以式别名，也可以是url */
    export function destoryRes(name: string) {

        const tex: PIXI.Texture = PIXI.utils.TextureCache[name];
        if (tex) {
            tex.destroy();
        } else {
            myCache[name] = null;
            delete myCache[name];
        }

    }

    export function setBaseUrl(url: string) {
        loader.baseUrl = url;
    }

    export function loadConfig(url: string, compFunc: Function, thisObject: any) {
        getResByUrl(url, (res: any) => {
            const json = res.data;
            console.log(json);
            cfgGroups = json.groups;
            cfgResources = json.resources;
            cfgGroupsLen = cfgGroups.length;
            cfgResourcesLen = cfgResources.length;
            compFunc.call(thisObject);
        }, this);
    }

    export function loadGroup(name: string, onProgress: Function, onComplete: Function, thisObject: any) {
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

                let idLoaded = loader.onLoad.add((ldr, res: PIXI.LoaderResource) => {
                    loaded++;
                    //保存非纹理资源,纹理资源pixi会自动保存到PIXI.utils.TextureCache
                    if (res.type != PIXI.LoaderResource.TYPE.IMAGE) {
                        //音频和json都保存在data里
                        myCache[res.name] = res.data;
                    }
                    onProgress.call(thisObject, loaded, total, res);
                });
                loader.onStart.add(() => {
                    console.log('load start ???')
                })
                loader.onError.add((e) => {
                    console.log('error', e)
                })
                loader.onComplete.once((ldr, res) => {
                    groupLoaded.push(name);
                    loader.onLoad.detach(idLoaded);
                    onComplete.call(thisObject);
                })
                loader.load();
            }

        }
    }

    export function getResByUrl(url: string, onComplete: Function, thisObject: any) {
        loader.reset();
        loader.add(url);
        loader.load((ldr, resources) => {
            onComplete.call(thisObject, resources[url]);
        });
    }

    export function loadBuffer(context: AudioContext, url: string, cb: Function, ref: any) {
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.onload = function () {
            // Asynchronously decode the audio file data in request.response
            context.decodeAudioData(
                request.response,
                function (buffer) {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    cb.call(ref, null, buffer);
                },
                function (error) {
                    console.error('decodeAudioData error', error);
                    cb.call(ref, 'decode error');
                }
            );
        }

        request.onerror = function () {
            alert('BufferLoader: XHR error');
            cb.call(ref, 'XHR error');
        }

        request.send();
    }

    export function isGroupLoaded(name: string) {
        return groupLoaded.indexOf(name) != -1;
    }

}