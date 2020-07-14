/// <reference path="./Material.ts" />

namespace ys3d {
    /**材质着色器 */
    const vs = `
 attribute vec3 aVertexPosition;
 attribute vec2 aUvs;
 varying vec2 vUvs;
 uniform mat4 mvpMatrix;
 void main() {
     vUvs = aUvs;
     gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
 }`;
    //texture fragment
    const fs = `
 precision mediump float;
 uniform sampler2D uSampler2;
 varying vec2 vUvs;
 void main() {
     gl_FragColor = texture2D(uSampler2, vUvs);
 }`;

    let texProgram: PIXI.Program;

    export class TextureMaterial extends Material implements IMaterial {
        constructor(texture: PIXI.Texture) {
            super();
            if (!texProgram) {
                texProgram = new PIXI.Program(vs, fs);
            }
            this.createShader(texProgram, { uSampler2: texture })
        }

        bindAttribute(geo: ys3d.PIXIGeometry) {
            geo.addAttribute('aVertexPosition', geo.vertices, 3);
            geo.addAttribute('aUvs', geo.uvs, 2);
            geo.indices.length && geo.addIndex(geo.indices);
            geo.interleave();
        }

        bindMesh(mesh: Mesh3D): void {

        }
    }
}