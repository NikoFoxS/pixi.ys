namespace ys {
	
	export class MVC extends PIXI.utils.EventEmitter{

		public static MVC_NOTICE: string = 'on_mvc_notice';
		public constructor() {
			super();
			this.proxy = {};
			this.commands = {};
			//处理命令
			this.on(MVC.MVC_NOTICE, (data:any) => {
				var name = data.name;
				var data = data.data;
				var cmdclass = this.commands[name];
				if (cmdclass) {
					console.log('[MVC]:执行通知指令->',name);
					var cmd: NoticeCMD = new cmdclass();
					var no = new Notice();
					no.name = name;
					no.data = data;
					cmd.execute(no);
				}
			}, this);
		}

		/**
		 * 发送通知
		 */
		public sendNotice(name:string, data?:any) {
			this.emit(MVC.MVC_NOTICE,{ name: name, data: data });
		}

		//model
		private proxy: any;
		/**
		 * 注册代理。注册即实例化
		 */
		public registerProxy(ProxyClass:any) {
			const name = ProxyClass.name;
			if (!this.proxy[name]) {
				this.proxy[name] = new ProxyClass();
			}
		}

		/**
		 * 移除代理
		 */
		public removeProxy(ProxyClass:any) {
			const name = ProxyClass.name;
			this.proxy[name] = null;
			delete this.proxy[name];
		}
		/**
		 * 获取代理
		 */
		public getProxy(ProxyClass:any) {
			const name = ProxyClass.name;
			return this.proxy[name];
		}

		//controller
		private commands: any;
		/**
		 * 注册命令,只保存commandClass，执行命令的时候，才动态实例化。
		 */
		public registerCommand(commandClass:any) {
			const name = commandClass.name;
			if (!this.commands[name]) {
				this.commands[name] = commandClass;
			}
		}
		/**
		 * 移除命令
		 */
		public removeCommand(commandClass:any) {
			const name = commandClass.name;
			this.commands[name] = null;
			delete this.commands[name];
		}

		public logProxy()
		{
			console.log(this.proxy);
		}

		public logCommand()
		{
			console.log(this.commands);
		}
	}

	export const mvc:ys.MVC = new MVC();
}