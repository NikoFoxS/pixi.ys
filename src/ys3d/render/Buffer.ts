namespace ys3d {
    //顶点，材质
    export class TextureVertexBuffer extends PIXI.Geometry {
        constructor(vertices: number[], uvs: number[], indices?: number[]) {
            super();
            this.addAttribute('aVertexPosition', vertices, 3);
            this.addAttribute('aUvs', uvs, 2);
            if (indices && indices.length) {
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
            if (indices && indices.length) {
                this.addIndex(indices)
            }
            this.interleave();
        }
    }

    //顶点，材质，光照
    export class TextureLightBuffer extends PIXI.Geometry {
        constructor(vertices: number[], uvs: number[],normals:number[], indices?: number[]) {
            super();
            this.addAttribute('aVertexPosition', vertices, 3);
            this.addAttribute('aUvs', uvs, 2);
            this.addAttribute('aNormal', normals, 3);
            if (indices && indices.length) {
                this.addIndex(indices)
            }
            this.interleave();
        }
    }

    //顶点，颜色，光照
    export class ColorLightBuffer extends PIXI.Geometry {
        constructor(vertices: number[], colors: number[],normals:number[], indices?: number[]) {
            super();
            this.addAttribute('aVertexPosition', vertices, 3);
            this.addAttribute('aColor', colors, 3);
            this.addAttribute('aNormal', normals, 3);
            if (indices && indices.length) {
                this.addIndex(indices)
            }
            this.interleave();
        }
    }
    
}