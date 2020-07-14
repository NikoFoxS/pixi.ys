namespace ys3d {
    /**材质着色器 */
    const tv = `
attribute vec3 aVertexPosition;
attribute vec2 aUvs;
varying vec2 vUvs;
uniform mat4 mvpMatrix;
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

    /**颜色着色器 */
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

    /** 材质光照着色器 ，光照颜色混合用的加法不是乘法 */
    const tlv = `
attribute vec3 aVertexPosition;
attribute vec2 aUvs;
attribute vec3 aNormal;
varying vec2 vUvs;
uniform mat4 mvpMatrix;
uniform vec3 uLightDirect;
uniform vec3 uLightcolor;
varying vec3 vLightColor;
void main() {
    vUvs = aUvs;
    float nDotL = max(dot(uLightDirect,normalize(aNormal)),.0);
    vLightColor = uLightcolor*nDotL;
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
}`;
    //texture fragment
    const tlf = `
precision mediump float;
uniform sampler2D uSampler2;
varying vec2 vUvs;
varying vec3 vLightColor;
void main() {
    gl_FragColor = texture2D(uSampler2, vUvs) + vec4(vLightColor,1.);
}`;

    /** 颜色光照着色器，光照颜色混合用的加法不是乘法 */
    //color vertix
    const clv = `
attribute vec3 aVertexPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
uniform mat4 mvpMatrix;
varying vec3 vColor;
varying vec4 vPosition;
uniform vec3 uLightDirect;
uniform vec3 uLightcolor;
void main() {
    float nDotL = max(dot(uLightDirect,normalize(aNormal)),.0);
    vColor = aColor + uLightcolor*nDotL;
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
    vPosition = gl_Position;
}`;
    //color fragment
    const clf = `
precision mediump float;
varying vec3 vColor;
varying vec4 vPosition;
void main() {
    gl_FragColor = vec4(vColor ,1.);
}`;

    let texProgram: PIXI.Program;
    let colProgram: PIXI.Program;
    let texLightProgram: PIXI.Program;
    let colLightProgram: PIXI.Program;

    export class TexureShader extends PIXI.Shader {
        constructor(map: PIXI.Texture) {
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            if (!texProgram) {
                texProgram = PIXI.Program.from(tv, tf);
            }
            super(texProgram, { uSampler2: map, mvpMatrix: mtx });
        }
    }

    export class TextureLightShader extends PIXI.Shader {
        constructor(map: PIXI.Texture, lightDirect: number[], lightColor: number[] = [0.5, 0.5, 0.5]) {
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            if (!texLightProgram) {
                texLightProgram = PIXI.Program.from(tlv, tlf);
            }
            super(texLightProgram, {
                uSampler2: map,
                mvpMatrix: mtx,
                uLightDirect: lightDirect,
                uLightcolor: lightColor
            });
        }
    }

    export class ColorShader extends PIXI.Shader {
        constructor() {
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            if (!colProgram) {
                colProgram = PIXI.Program.from(cv, cf);
            }
            super(colProgram, { mvpMatrix: mtx });
        }
    }

    export class ColorLightShader extends PIXI.Shader {
        constructor(lightDirect: number[], lightColor: number[] = [0.5, 0.5, 0.5]) {
            let mtx = new ys3d.Matrix4();
            mtx.identity();
            if (!colProgram) {
                colProgram = PIXI.Program.from(clv, clf);
            }
            super(colProgram, {
                mvpMatrix: mtx,
                uLightDirect: lightDirect,
                uLightcolor: lightColor
            });
        }
    }
}