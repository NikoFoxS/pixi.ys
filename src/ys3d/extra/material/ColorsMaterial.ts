/// <reference path="./Material.ts" />

namespace ys3d {
    /**颜色着色器 */
    const vs = `
attribute vec3 aVertexPosition;
uniform mat4 mvpMatrix;
attribute vec3 aColor;
varying vec3 vColor;
void main() {
    vColor = aColor;
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
}`;
    const fs = `
precision mediump float;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor,1.);
}`;
    let colorsProgram: PIXI.Program;

    export class ColorsMaterial extends Material implements IMaterial{
        constructor() {
            super();
            if (!colorsProgram) {
                colorsProgram = new PIXI.Program(vs, fs);
            }
            this.createShader(colorsProgram, {})
        }

        bindAttribute(geo: ys3d.PIXIGeometry) {
            geo.addAttribute('aVertexPosition', geo.vertices, 3);
            geo.addAttribute('aColor', geo.colors, 3);
            geo.indices.length && geo.addIndex(geo.indices);
            geo.interleave();
        }

        bindMesh(mesh: Mesh3D): void {

        }
    }
}