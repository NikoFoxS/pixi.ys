namespace ys3d {
	export class Geometry {
		public constructor() {
			this._colors = [];
			this._indices = [];
			this._uvs = [];
			this._vertices = [];
		}

		//顶点
		protected _vertices: number[];
		//顶点索引
		protected _indices: number[];
		//uv
		protected _uvs: number[];
		//顶点颜色
		protected _colors: number[];

		//法线暂时不处理?

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
	}
}
