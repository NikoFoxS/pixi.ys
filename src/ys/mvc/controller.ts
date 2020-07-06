namespace ys {
	export class Notice {
		public constructor() {
		}

		public name: string;
		public data: any;
    }

    export class NoticeCMD {
		public constructor() {
		}

		public getProxy(ProxyClass:any) {
			return ys.mvc.getProxy(ProxyClass);
		}

		public sendNotice(name:string, data?:any) {
			ys.mvc.sendNotice(name, data);
		}

		public execute(no: ys.Notice) {

		}
	}
}
