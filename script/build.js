var fsExtra = require("fs-extra");
var cp = require("child_process");

console.log(process.argv[2])
const type = process.argv[2] || 'h5';
console.log("\x1b[35m***BUILD***\x1b[0m");

console.log("Cleaning...");
const path = 'dist';
type == 'release' && (path = 'release');
fsExtra.emptyDirSync(path);

console.log("Building...");
try {
    cp.execSync("node node_modules/typescript/bin/tsc", {
        stdio: "inherit"
    });

    if(type == 'wx')
    {
        console.log("to wxgame...");
        let doc = fsExtra.readFileSync(path+'/index.js','utf-8');
        
        doc += `
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
        `
        fsExtra.writeFileSync('wxgame/js/index.js',doc);
        doc = fsExtra.readFileSync('js/pixi.js','utf-8');
        fsExtra.writeFileSync('wxgame/js/pixi.js',doc);
    }else if(type == 'release')
    {
        console.log("to release...");
        cp.execSync(`uglifyjs js/pixi.js dist/index.js -m -c -o ${release}/index.js`, {
            stdio: "inherit"
        });
    }

    console.log("\x1b[35m***BUILD COMPLETE***\x1b[0m");
} catch (ex) {
    console.log(ex.stdout);
    console.log("\x1b[35m***BUILD FAILED***\x1b[0m");
}