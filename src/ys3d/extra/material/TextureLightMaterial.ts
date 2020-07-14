/// <reference path="./Material.ts" />

namespace ys3d {
    /** 材质光照着色器 ，光照颜色混合用的加法不是乘法 */
    const vs = `
 attribute vec3 aVertexPosition;
 attribute vec2 aUvs;
 attribute vec3 aNormal;
 varying vec2 vUvs;
 uniform mat4 mvpMatrix;
 varying vec3 vNormal;
 uniform mat4 uWorld;
 void main() {
     vUvs = aUvs;
     vNormal = mat3(uWorld) * aNormal;
     gl_Position = mvpMatrix*vec4(aVertexPosition,1.);
 }`;
    //texture fragment
    const fs = `
 precision mediump float;
 uniform sampler2D uSampler2;
 varying vec2 vUvs;
 varying vec3 vNormal;
 uniform vec3 uLightDirect;
 uniform vec3 uLightcolor;
 void main() {
    vec3 normal = normalize(vNormal);
    float nDotL = dot(normal, uLightDirect)*1.5;
    if(nDotL<0.5)
    {
        nDotL = 0.5;
    }
    gl_FragColor = texture2D(uSampler2, vUvs);
    gl_FragColor.rgb *= nDotL;
 }`;

    let texColorProgram: PIXI.Program;

    export class TextureLightMaterial extends Material implements IMaterial {
        constructor(texture: PIXI.Texture, uLightDirect: ys3d.Vector3, uLightcolor: number) {
            super();
            if (!texColorProgram) {
                texColorProgram = new PIXI.Program(vs, fs);
            }

            let mtx = new ys3d.Matrix4();
            mtx.identity();
            this.createShader(texColorProgram, {
                uSampler2: texture,
                uLightDirect: ys3d.Vector3.normalize(uLightDirect, uLightDirect),
                uLightcolor: numberToRGB(uLightcolor),
                uWorld: mtx
            })
        }

        bindAttribute(geo: ys3d.PIXIGeometry) {
            geo.addAttribute('aVertexPosition', geo.vertices, 3);
            geo.addAttribute('aUvs', geo.uvs, 2);
            geo.addAttribute('aNormal', geo.normals, 3);
            geo.indices.length && geo.addIndex(geo.indices);
            geo.interleave();
        }

        bindMesh(mesh: ys3d.Mesh3D) {
            this.updateUniform('uWorld', mesh.worldInverseTransposeMatrix);
        }


    }
}