var http = require('http')
var fs = require("fs-extra");
//打包pixi.js需要的模块
function bundler(list, path, cb) {
    let jsData = '';
    downLoad = () => {
        if (list.length) {
            let url = list.shift();
            console.log("加载", url)
            http.get(url, function (req, res) {
                req.on('data', function (chunk) {
                    jsData += chunk
                })
                req.on('end', function () {
                    downLoad();
                })
            })
        } else {
            if (path.indexOf('.min.js') != -1) {
                //删除注释（/*!开头的）
                jsData = jsData.replace(/\/\*![\w\W]*?\*\/\n/ig, '')
                //删除sourceMappingURL
                jsData = jsData.replace(/\/\/# sourceMappingURL[\w\W]*?\.map\n/ig, '');
            }
            fs.writeFileSync(path, jsData);
            console.log('打包完成', path);
            cb && cb();
        }
    }
    downLoad();
}


let files = `
<script src="https://pixijs.download/release/packages/polyfill.js"></script>
<script src="https://pixijs.download/release/packages/constants.js"></script>
<script src="https://pixijs.download/release/packages/math.js"></script>
<script src="https://pixijs.download/release/packages/runner.js"></script>
<script src="https://pixijs.download/release/packages/settings.js"></script>
<script src="https://pixijs.download/release/packages/ticker.js"></script>
<script src="https://pixijs.download/release/packages/utils.js"></script>
<script src="https://pixijs.download/release/packages/display.js"></script>
<script src="https://pixijs.download/release/packages/core.js"></script>
<script src="https://pixijs.download/release/packages/unsafe-eval.js"></script>
<script src="https://pixijs.download/release/packages/mixin-get-child-by-name.js"></script>
<script src="https://pixijs.download/release/packages/mixin-get-global-position.js"></script>
<script src="https://pixijs.download/release/packages/extract.js"></script>
<script src="https://pixijs.download/release/packages/loaders.js"></script>
<script src="https://pixijs.download/release/packages/mesh.js"></script>
<script src="https://pixijs.download/release/packages/particles.js"></script>
<script src="https://pixijs.download/release/packages/sprite.js"></script>
<script src="https://pixijs.download/release/packages/accessibility.js"></script>
<script src="https://pixijs.download/release/packages/graphics.js"></script>
<script src="https://pixijs.download/release/packages/graphics-extras.js"></script>
<script src="https://pixijs.download/release/packages/mesh-extras.js"></script>
<script src="https://pixijs.download/release/packages/mixin-cache-as-bitmap.js"></script>
<script src="https://pixijs.download/release/packages/spritesheet.js"></script>
<script src="https://pixijs.download/release/packages/text.js"></script>
<script src="https://pixijs.download/release/packages/interaction.js"></script>
<script src="https://pixijs.download/release/packages/prepare.js"></script>
`
//https://pixijs.io/customize/

console.log('解析配置')
files = files.trim();
files = files.replace(/https/ig, 'http');
let minifiles = files.replace(/\.js/ig, '.min.js');

let pixijs = files.match(/http+.+\.js/ig);
let piximinijs = minifiles.match(/http+.+\.js/ig);

console.log("清理...");
fs.emptyDirSync("js");

bundler(pixijs, 'js/pixi.js', () => {
    bundler(piximinijs, 'js/pixi.min.js');
});