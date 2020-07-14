namespace ys3d {
    export class PIXIGeometry extends ys3d.Geometry {
        constructor() {
            super();
            this.geo = new PIXI.Geometry();
        }

        private geo: PIXI.Geometry;
        public get pixiGeo()
        {
            return this.geo;
        }

        /** pixi的材质坐标上下是颠倒,所以处理下 */
        public get pixiUVs() {
            let uvs = this.uvs;
            uvs = uvs.map((val, index) => {
                if (index % 2 == 1) {
                    return 1 - val;
                } else {
                    return val;
                }
            })
            return uvs;
        }

        public addAttribute(
            id: string,
            buffer?: PIXI.Buffer | number[],
            size?: number,
            normalized?: boolean,
            type?: number,
            stride?: number,
            start?: number,
            instance?: boolean): ys3d.PIXIGeometry {
            this.geo.addAttribute(id, buffer, size, normalized, type, stride, start, instance);
            return this;
        }

        public addIndex(buffer:PIXI.Buffer | number[])
        {
            this.geo.addIndex(this.indices);
        }

        public interleave()
        {
            this.geo.interleave();
        }
    }
}