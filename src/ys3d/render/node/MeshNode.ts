namespace ys3d {


    export class MeshNode extends Object3D {
        constructor(geometry:PIXI.Geometry,mat:ys3d.Material) {
            super();
            this.visible = true;
            this.worldPosition = new Vector4();
            const state = new PIXI.State();
            state.depthTest = true;
            state.polygonOffset = 10.0;
            state.offsets = true;
            state.culling = true;
            // state.clockwiseFrontFace = true;
            this.$display = new PIXI.Mesh(geometry,mat.shader,state);
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