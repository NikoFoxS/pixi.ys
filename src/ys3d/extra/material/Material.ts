namespace ys3d {
    export enum MaterialSide {
        FRONT,
        BACK,
        DOUBLE
    }

    export interface IMaterial {
        bindAttribute(geo: ys3d.PIXIGeometry): void;
        bindMesh(mesh: ys3d.Mesh3D): void;
    }

    export class Material {
        constructor() {
            //MVP变换矩阵
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            this.mtx = mtx;
        }

        public side: number = MaterialSide.FRONT;
        private mtx: ys3d.Matrix4;

        public get pixiShader() {
            return this.shader;
        }

        private shader: PIXI.Shader;

        protected createShader(p: PIXI.Program, uniform) {
            uniform.mvpMatrix = this.mtx;
            this.shader = new PIXI.Shader(p, uniform);
        }

        public updateUniform(key: any, val: any) {
            this.shader.uniforms[key] = val;
        }


    }
}