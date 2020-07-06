/**
 * 负责数据的获取，及整理封装。只处理一个VO,VO只能get不能set
 */
namespace ys {

    export class Proxy {
        public constructor() {
            this.onCreate();
        }

        protected _data: any;
		/**
		 * data的数据类型，自行转换
		 */
        public get data(): any {
            return this._data;
        }

        protected sendNotice(name: string, data?: any) {
            ys.mvc.sendNotice(name, data);
        }

        protected onCreate() {

        }

    }
}