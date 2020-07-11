namespace ys3d {

	export class PlaneGeometry extends Geometry {
		constructor(width = 100, height = 100, widthSegments = 1, heightSegments = 1) {
			super();

			width = width || 1;
			height = height || 1;

			var width_half = width / 2;
			var height_half = height / 2;

			var gridX = Math.floor(widthSegments) || 1;
			var gridY = Math.floor(heightSegments) || 1;

			var gridX1 = gridX + 1;
			var gridY1 = gridY + 1;

			var segment_width = width / gridX;
			var segment_height = height / gridY;

			var ix, iy;

			// buffers

			var indices = [];
			var vertices = [];
			var uvs = [];

			// generate vertices, normals and uvs

			for (iy = 0; iy < gridY1; iy++) {
				var y = iy * segment_height - height_half;
				for (ix = 0; ix < gridX1; ix++) {
					var x = ix * segment_width - width_half;
					vertices.push(x, - y, 0);
					uvs.push(ix / gridX);
					uvs.push(1 - (iy / gridY));
				}
			}

			// indices
			for (iy = 0; iy < gridY; iy++) {
				for (ix = 0; ix < gridX; ix++) {
					var a = ix + gridX1 * iy;
					var b = ix + gridX1 * (iy + 1);
					var c = (ix + 1) + gridX1 * (iy + 1);
					var d = (ix + 1) + gridX1 * iy;
					// faces
					//a,b
					//d,c
					indices.push(a, b, d);
					indices.push(b, c, d);
				}
			}

			this._vertices = vertices;
			this._indices = indices;
			this._uvs = uvs;

		}
	}
}