namespace ys3d {
    export enum SIDE {
        FRONT,
        BACK,
        DOUBLE
    }
    export class Mesh3D extends Object3D {
        constructor(geometry: PIXI.Geometry, shader: PIXI.Shader, side: ys3d.SIDE = SIDE.FRONT) {
            super();
            this.visible = true;
            this.worldPosition = new Vector4();
            const state = new PIXI.State();
            state.depthTest = true; //深度检测
            state.offsets = true;//深度冲突
            state.polygonOffset = 10.0;//深度冲突
            if (side == SIDE.FRONT) {
                state.culling = true;//隐藏面剔除
            } else if (side == SIDE.BACK) {
                state.culling = true;//隐藏面剔除
                state.clockwiseFrontFace = true;
            }

            this.$display = new PIXI.Mesh(geometry, shader, state);
        }

        public worldPosition: Vector4;
        protected $display: PIXI.Mesh;
        public get display() {
            return this.$display;
        }

        public draw(scene: Scene, cam: Camera) {

            this.display.parent && this.display.parent.addChild(this.display);

            let m = ys3d.Matrix4.create();
            let v = ys3d.Matrix4.create();
            let p = ys3d.Matrix4.create();
            m.copy(this.worldMatrix);
            v.copy(cam.viewMatrix);
            p.copy(cam.projectionMatrix);

            let mtx = v.multiply(m);
            mtx = p.multiply(mtx);
            this.$display.shader.uniforms.mvpMatrix = mtx.getTypedArray();
        }
    }
}