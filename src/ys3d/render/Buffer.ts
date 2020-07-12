namespace ys3d {
    //顶点，材质
    export class TextureVertexBuffer extends PIXI.Geometry {
        constructor(vertices: number[], uvs: number[], indices?: number[]) {
            super();
            this.addAttribute('aVertexPosition', vertices, 3);
            this.addAttribute('aUvs', uvs, 2);
            if (indices) {
                this.addIndex(indices)
            }
            this.interleave();
        }
    }
    //顶点，颜色
    export class ColorVertexBuffer extends PIXI.Geometry {
        constructor(vertices: number[], colors: number[], indices?: number[]) {
            super();
            this.addAttribute('aVertexPosition', vertices, 3);
            this.addAttribute('aColor', colors, 3);
            if (indices) {
                this.addIndex(indices)
            }
            this.interleave();
        }
    }
}