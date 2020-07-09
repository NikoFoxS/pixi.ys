import './js/libs/weapp-adapter/index.js'
import './js/libs/symbol'
import './js/pixi.min.js';
import './js/index.js'

try {
  const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync()
  new Main(canvas,windowWidth,windowHeight,pixelRatio)
} catch (e) {
  console.log(e);
}
