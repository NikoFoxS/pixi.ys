namespace ys {
	//复制逻辑
	export class Mediator {
		public constructor(view: PIXI.Container) {
			this._view = view;
			ys.mvc.on(MVC.MVC_NOTICE, this._onNotice, this);
		}
		private _view: any;
		public getView() {
			return this._view;
		}

		private _onNotice(e: any) {
			var name = e.data.name;
			if (name) {
				var list = this.listenNotice();
				if (list.indexOf(name) != -1) {
					var data = e.data.data;
					var no = new Notice();
					no.name = name;
					no.data = data;
					console.log('[' + this + ']:处理通知->', name, data)
					this.onNotice(no);
				}
			}
		}

		protected sendNotice(name: string, data?: any) {
			console.log('[' + this + ']:发送通知->', name, data);
			ys.mvc.sendNotice(name, data);
		}

		protected getProxy(ProxyClass: any) {
			return ys.mvc.getProxy(ProxyClass);
		}

		protected registerProxy(ProxyClass: any) {
			ys.mvc.registerProxy(ProxyClass);
		}

		protected registerCommand(commandClass: any) {
			ys.mvc.registerCommand(commandClass);
		}

		/**当view.onInit执行完毕后，会触发该方法 */
		public onInit() {
			//添加界面逻辑
			//通过sendNotice发送通知
			//通过getProxy获取数据
			//通过listenNotice侦听感兴趣的通知
			//通过onNotice处理感兴趣的通知
		}

		protected listenNotice(): string[] {
			return [];
		}

		protected onNotice(no: ys.Notice) {

		}
	}
	//复制界面布局和样式
	export class View extends PIXI.Container {
		constructor() {
			super();
			this.once('added', this.onAdded, this);
			this.once('removed', this.onRemoved, this);
		}

		public addMediator(mediatorClass: any) {
			mediatorClass && new mediatorClass(this);
		}

		protected onAdded() {
		}

		protected onRemoved() {
		}
	}

	export class Page extends View implements ILoadGroupReport{
		constructor(mediatorClass?: any, groupName?: string) {
			super();
			//加载资源组
			if (groupName) {
				this.onGroupStart(groupName);
				RES.loadGroup(groupName, (loaded: number, total: number, res: PIXI.LoaderResource) => {
					this.onGroupProgress(groupName, loaded, total, res);
				}, () => {
					this.onGroupComplete(groupName);
					this.onInit();
					this.addMediator(mediatorClass);
				}, this);
			} else {
				this.onInit();
				this.addMediator(mediatorClass);
			}
		}

		public cache: boolean;

		protected onInit() {

		}

		public onGroupStart(groupName: string) {
		}

		public onGroupProgress(groupName: string, loaded: number, total: number, res: PIXI.LoaderResource) {
		}

		public onGroupComplete(groupName: string) {
		}

	}
}