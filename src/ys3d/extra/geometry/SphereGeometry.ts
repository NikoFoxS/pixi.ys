namespace ys3d {
    export class SphereGeometry extends PIXIGeometry {
        constructor(radius = 100,
            widthSegments = 16,
            heightSegments = Math.ceil(widthSegments * 0.5),
            phiStart = 0,
            phiLength = Math.PI * 2,
            thetaStart = 0,
            thetaLength = Math.PI) {
            super();

            const wSegs = widthSegments;
            const hSegs = heightSegments;
            const pStart = phiStart;
            const pLength = phiLength;
            const tStart = thetaStart;
            const tLength = thetaLength;

            const position = [];
            const normal = [];
            const uv = [];
            const index = [];

            let i = 0;
            let iv = 0;
            let ii = 0;
            let te = tStart + tLength;
            const grid = [];

            let n = new ys3d.Vector3();

            for (let iy = 0; iy <= hSegs; iy++) {
                let vRow = [];
                let v = iy / hSegs;
                for (let ix = 0; ix <= wSegs; ix++, i++) {
                    let u = ix / wSegs;
                    let x = -radius * Math.cos(pStart + u * pLength) * Math.sin(tStart + v * tLength);
                    let y = radius * Math.cos(tStart + v * tLength);
                    let z = radius * Math.sin(pStart + u * pLength) * Math.sin(tStart + v * tLength);

                    position[i * 3] = x;
                    position[i * 3 + 1] = y;
                    position[i * 3 + 2] = z;

                    n.set(x, y, z);
                    ys3d.Vector3.normalize(n, n);
                    normal[i * 3] = n.x;
                    normal[i * 3 + 1] = n.y;
                    normal[i * 3 + 2] = n.z;

                    uv[i * 2] = u;
                    uv[i * 2 + 1] = 1 - v;

                    vRow.push(iv++);
                }

                grid.push(vRow);
            }

            for (let iy = 0; iy < hSegs; iy++) {
                for (let ix = 0; ix < wSegs; ix++) {
                    let a = grid[iy][ix + 1];
                    let b = grid[iy][ix];
                    let c = grid[iy + 1][ix];
                    let d = grid[iy + 1][ix + 1];

                    if (iy !== 0 || tStart > 0) {
                        index[ii * 3] = a;
                        index[ii * 3 + 1] = b;
                        index[ii * 3 + 2] = d;
                        ii++;
                    }
                    if (iy !== hSegs - 1 || te < Math.PI) {
                        index[ii * 3] = b;
                        index[ii * 3 + 1] = c;
                        index[ii * 3 + 2] = d;
                        ii++;
                    }
                }
            }

            this._vertices = position;
            this._uvs = uv;
            this._normals = normal;
            this._indices = index;

        }
    }
}