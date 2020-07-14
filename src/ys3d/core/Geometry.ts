
namespace ys3d {
	export class Bounds {
		constructor() {
			this.min = new ys3d.Vector3();
			this.max = new ys3d.Vector3();
			this.center = new ys3d.Vector3();
			this.scale = new ys3d.Vector3();
			this.radius = Infinity;
		}

		public min: ys3d.Vector3;
		public max: ys3d.Vector3;
		public center: ys3d.Vector3;
		public scale: ys3d.Vector3;
		public radius: number;
	}

	export class Geometry {
		public constructor() {
			this._colors = [];
			this._indices = [];
			this._uvs = [];
			this._vertices = [];
			this._normals = [];
		}

		//顶点
		protected _vertices: number[];
		//顶点索引
		protected _indices: number[];
		//uv
		protected _uvs: number[];
		//顶点颜色
		protected _colors: number[];
		//
		protected _normals: number[];

		//法线暂时不处理?
		public bake(r: number, g: number, b: number) {

		}

		public get vertices() {
			return this._vertices.slice();
		}

		public get indices() {
			return this._indices.slice();
		}

		public get uvs() {
			return this._uvs.slice();
		}

		public get colors() {
			return this._colors.slice();
		}

		public get normals() {
			return this._normals.slice();
		}
		/** pixi的材质坐标上下是颠倒,所以处理下 */
		public get uvsPixi() {
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

		private _bounds: ys3d.Bounds;
		public get bounds(): ys3d.Bounds {
			return this._bounds;
		}

		calBoundingBox(array?: number[]) {
			if (!array) array = this.vertices;

			if (!this._bounds) {
				this._bounds = new ys3d.Bounds();
			}

			const min = this.bounds.min;
			const max = this.bounds.max;
			const center = this.bounds.center;
			const scale = this.bounds.scale;

			min.set(+Infinity);
			max.set(-Infinity);

			// TODO: use offset/stride if exists
			// TODO: check size of position (eg triangle with Vec2)
			for (let i = 0, l = array.length; i < l; i += 3) {
				const x = array[i];
				const y = array[i + 1];
				const z = array[i + 2];

				min.x = Math.min(x, min.x);
				min.y = Math.min(y, min.y);
				min.z = Math.min(z, min.z);

				max.x = Math.max(x, max.x);
				max.y = Math.max(y, max.y);
				max.z = Math.max(z, max.z);
			}

			ys3d.Vector3.subtract(scale, max, min);
			ys3d.Vector3.add(center, min, max);
			center.scale(1 / 2);
		}

		calBoundingSphere(array?: number[]) {
			if (!array) array = this.vertices;
			if (!this._bounds) this.calBoundingBox(array);

			let maxRadius = 0;
			let tempVec3 = new ys3d.Vector3();
			for (let i = 0, l = array.length; i < l; i += 3) {
				const x = array[i];
				const y = array[i + 1];
				const z = array[i + 2];
				tempVec3.set(x, y, z);
				maxRadius = Math.max(maxRadius, ys3d.Vector3.distance(tempVec3, this.bounds.center));
			}

			this._bounds.radius = maxRadius;
		}
	}
}
