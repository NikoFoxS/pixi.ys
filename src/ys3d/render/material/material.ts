namespace ys3d {
    const vertexSrc = `
precision mediump float;
attribute vec3 aVertexPosition;
attribute vec2 aUvs;
uniform mat4 mvpMatrix;
varying vec2 vUvs;
void main() {
    vUvs = aUvs;
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
}`;

    const fragmentSrc = `
precision mediump float;
uniform sampler2D uSampler2;
varying vec2 vUvs;
void main() {
    gl_FragColor = texture2D(uSampler2, vUvs);
}`;
    const program = PIXI.Program.from(vertexSrc, fragmentSrc);
    export class Material {
        constructor(map: PIXI.Texture) {
            let mtx = new ys3d.Matrix4();
            mtx.identity();

            this._shader = new PIXI.Shader(program, {
                uSampler2: map,
                mvpMatrix: mtx
            })
        }
        private _shader: PIXI.Shader;
        public get shader() {
            return this._shader;
        }

        private _map: PIXI.Texture;
        public get map() {
            return this._map;
        }
        public set map(m: PIXI.Texture) {
            this._map = m;
        }
    }




}




