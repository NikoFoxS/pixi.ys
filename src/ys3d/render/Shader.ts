namespace ys3d {

    const tv = `
attribute vec3 aVertexPosition;
attribute vec2 aUvs;
uniform mat4 mvpMatrix;
varying vec2 vUvs;
void main() {
    vUvs = aUvs;
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
}`;
    //texture fragment
    const tf = `
precision mediump float;
uniform sampler2D uSampler2;
varying vec2 vUvs;
void main() {
    gl_FragColor = texture2D(uSampler2, vUvs);
}`;

    //color vertix
    const cv = `
attribute vec3 aVertexPosition;
attribute vec3 aColor;
uniform mat4 mvpMatrix;
varying vec3 vColor;
varying vec4 vPosition;
void main() {
    vColor = aColor;
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
    vPosition = gl_Position;
}`;
    //color fragment
    const cf = `
precision mediump float;
varying vec3 vColor;
varying vec4 vPosition;
void main() {
    gl_FragColor = vec4(vColor ,1.);
}`;
    const texProgram = PIXI.Program.from(tv, tf);
    const colProgram = PIXI.Program.from(cv, cf);

    export class TexureShader extends PIXI.Shader {
        constructor(map: PIXI.Texture) {
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            super(texProgram, { uSampler2: map, mvpMatrix: mtx });
        }
    }

    export class ColorShader extends PIXI.Shader {
        constructor() {
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            super(colProgram, { mvpMatrix: mtx });
        }
    }
}