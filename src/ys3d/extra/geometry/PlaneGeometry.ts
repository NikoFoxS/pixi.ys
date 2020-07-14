namespace ys3d {

	export class PlaneGeometry extends Geometry {

		static buildPlane(position, normal, uv, index, width, height, depth, wSegs=1, hSegs=1, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
			const io = i;
			const segW = width / wSegs;
			const segH = height / hSegs;
	
			for (let iy = 0; iy <= hSegs; iy++) {
				let y = iy * segH - height / 2;
				for (let ix = 0; ix <= wSegs; ix++, i++) {
					let x = ix * segW - width / 2;
	
					position[i * 3 + u] = x * uDir;
					position[i * 3 + v] = y * vDir;
					position[i * 3 + w] = depth / 2;
	
					normal[i * 3 + u] = 0;
					normal[i * 3 + v] = 0;
					normal[i * 3 + w] = depth >= 0 ? 1 : -1;
	
					uv[i * 2] = ix / wSegs;
					uv[i * 2 + 1] = 1 - iy / hSegs;
	
					if (iy === hSegs || ix === wSegs) continue;
					let a = io + ix + iy * (wSegs + 1);
					let b = io + ix + (iy + 1) * (wSegs + 1);
					let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
					let d = io + ix + iy * (wSegs + 1) + 1;
	
					index[ii * 6] = a;
					index[ii * 6 + 1] = b;
					index[ii * 6 + 2] = d;
					index[ii * 6 + 3] = b;
					index[ii * 6 + 4] = c;
					index[ii * 6 + 5] = d;
					ii++;
				}
			}
		}

		constructor(width = 100, height = 100, widthSegments = 1, heightSegments = 1) {
			super();
			var indices = [];
			var vertices = [];
			var uvs = [];
			var normals = [];
			PlaneGeometry.buildPlane(vertices,normals,uvs,indices,width,height,0);
			this._vertices = vertices;
			this._indices = indices;
			this._uvs = uvs;
			this._normals = normals;

		}
	}
}