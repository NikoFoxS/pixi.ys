namespace ys3d {

    let m = ys3d.Matrix4.create();
    let v = ys3d.Matrix4.create();
    let p = ys3d.Matrix4.create();

    export class Mesh3D extends Object3D {
        constructor(geo: ys3d.PIXIGeometry, mat: ys3d.Material | any) {
            super();
            this.visible = true;
            this.worldPosition = new Vector4();
            const state = new PIXI.State();
            state.depthTest = true; //深度检测
            state.offsets = true;//深度冲突
            state.polygonOffset = 10.0;//深度冲突
            if (mat.side == MaterialSide.FRONT) {
                state.culling = true;//隐藏面剔除
            } else if (mat.side == MaterialSide.BACK) {
                state.culling = true;//隐藏面剔除
                state.clockwiseFrontFace = true;
            }
            const ma = <IMaterial>mat;
            ma.bindAttribute(geo);
            ma.bindMesh(this);
            this.pixiGeo = geo;
            this.$display = new PIXI.Mesh(geo.pixiGeo, mat.pixiShader, state);
        }

        public worldPosition: Vector4;
        private pixiGeo: ys3d.PIXIGeometry;
        protected $display: PIXI.Mesh;
        public get display() {
            return this.$display;
        }

        public get geometry() {
            return this.pixiGeo;
        }

        public draw(scene: Scene, cam: Camera) {
            this.display.parent && this.display.parent.addChild(this.display);
            
            m.copy(this.worldMatrix);
            v.copy(cam.viewMatrix);
            p.copy(cam.projectionMatrix);

            let mtx = v.multiply(m);
            mtx = p.multiply(mtx);
            this.$display.shader.uniforms.mvpMatrix = mtx.getTypedArray();
        }
    }
}