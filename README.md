# pixi.ys (基于 pixi.js V5.3.0)
白鹭引擎用了5年多，工具流比较全，但是引擎有很多限制，特别是着色器这块。pixi.js性能好限制少，但是pixi.js是一个纯粹的渲染引擎，在实际工作中用起来不方便。所以封装一下。
## 封装功能
- [x] 基于typescript
- [x] 自定义打包pixijs的
- [x] 使用白鹭引擎的 Res Depot进行资源管理，修正PIXI.Loader使其能正确加载音频文件。
- [x] 使用TexturePacker进行Sprtiesheet处理
- [x] 屏幕适配。固定高和固定宽（固定宽最常用）      
- [x] 简易的pureMVC框架（做大型一点的项目需要用到）
- [x] Ajax
- [x] TextFiled添加中日韩文字的自动换行
- [x] TextFiledInput单行输入文本 
- [x] 音频播放功能（audio，webaudio，及微信小游戏）
- [x] 简易3D库：3D及2D内容可混排。

