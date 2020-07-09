namespace ys3d {
    export class PIXIGeometry extends PIXI.Geometry {
        constructor(geo: ys3d.Geometry) {
            super();
            this.addAttribute('aVertexPosition', geo.vertices, 3)
                .addAttribute('aUvs', geo.uvs, 2)
                .addIndex(geo.indices)
                .interleave();
        }
    }
}