/// <reference path="./Material.ts" />

namespace ys3d {
    /**颜色着色器 */
    const vs = `
attribute vec3 aVertexPosition;
uniform mat4 mvpMatrix;
void main() {
    gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
}`;
    const fs = `
precision mediump float;
uniform vec3 uColor;
void main() {
    gl_FragColor = vec4(uColor,1.);
}`;
    let colorProgram: PIXI.Program;

    export class ColorMaterial extends Material implements IMaterial {
        constructor(color: number) {
            super();
            if (!colorProgram) {
                colorProgram = new PIXI.Program(vs, fs);
            }
            this.createShader(colorProgram, { uColor: ys3d.numberToRGB(color) })
        }

        bindAttribute(geo: ys3d.PIXIGeometry) {
            geo.addAttribute('aVertexPosition', geo.vertices, 3);
            geo.indices.length && geo.addIndex(geo.indices);
            geo.interleave();
            console.log('geo.indices',geo.indices)
        }

        bindMesh(mesh:Mesh3D):void
        {

        }
    }
}