namespace ys {
    export class Config {
        public groups: string[]
        public resourceJSON: string
        public resourceRoot: string;
        public release: boolean;
        public scaleMode: string;
        public stageWidth: number;
        public stageHeight: number;
        public canvasWidth: number;
        public canvasHeight: number;
        public fps: number = 60;
        public proxy: any[];
        public command: any[];
        public mockAjax: boolean;
        public antialias: boolean;
        public backgroundColor: number;
        public versionFun: Function;
        public screenAdapter: ys.IScreenAdapter;
        public resizeto: any;
        public pixelRatio: number;
    }
}