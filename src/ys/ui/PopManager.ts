namespace ysui {
	/**弹层统一管理管理 */
	export class PopManager {
		public constructor() {
		}

		public static popUp(d:PIXI.Container, blockAlpha = 0.7) {
			if(!d)
			{
				return;
			}
			if (!PopManager.popLayer) {
				PopManager.popLayer = new PIXI.Container();
			}

			if (!PopManager.popblock) {
				const g = new PIXI.Graphics();
				g.beginFill(0x000000);
				g.drawRect(0,0,stageW,stageH);
				g.endFill();
				PopManager.popblock = g;
				PopManager.popblock.alpha = blockAlpha;
				PopManager.popblock.cacheAsBitmap = true;
			}
			const block = PopManager.popblock;
			block.scale.set(stageW / block.width,stageH / block.height);
			const layer = PopManager.popLayer;
			ys.stage.addChild(layer);

			layer.addChild(block);
			layer.addChild(d);



			d.once('removed', () => {
				//remove后，numChildren不会马上-1
				console.log('??? ',layer.children.length);
				if (layer.children.length == 1) {
					GG.removeDisplayObject(layer);
				} else {
					layer.addChildAt(block, layer.children.length - 2);
				}
			}, this);
		}

		private static popblock: PIXI.Graphics;
		private static popLayer: PIXI.Container;
	}
}