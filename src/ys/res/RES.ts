namespace RES {
    let cfgGroups: any[];
    let cfgGroupsLen: number;
    let cfgResources: any[];
    let cfgResourcesLen: number;
    let groupLoaded: string[] = [];
    let myCache: any = {};
    let loader:PIXI.Loader;

    export function setup(cfg:ys.Config)
    {
        loader = new PIXI.Loader();
        loader.pre((resource: PIXI.LoaderResource, next: Function) => {
            resource.url = cfg.versionFun(resource.url);
            next();
        })
    }

    export function reset()
    {
        loader.baseUrl = '';
        loader.reset();
        loader.destroy();
    }

    export function list()
    {
        for(var key in PIXI.utils.TextureCache)
        {
            console.log('材质',key);
        }

        for(var key in myCache)
        {
            console.log('非材质',key);
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
                        myCache[res.name] = res;
                    }
                    onProgress.call(thisObject, loaded, total,res);
                });
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
        loader.load((ldr,resources)=>{
            onComplete.call(thisObject, resources[url]);
        });
    }

    export function isGroupLoaded(name: string) {
        return groupLoaded.indexOf(name) != -1;
    }

}