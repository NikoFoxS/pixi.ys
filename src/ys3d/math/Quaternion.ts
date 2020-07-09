namespace ys3d {
	export class Quaternion extends Array {
		public constructor() {
			super();
			(<any>Object)["setPrototypeOf"](this, Quaternion.prototype);
			this[0] = 0;
			this[1] = 0;
			this[2] = 0;
			this[3] = 1;
		}

		public onChange = () => { };

		public set x(v) {
			this[0] = v;
			this.onChange();
		}
		public set y(v) {
			this[1] = v;
			this.onChange();
		}
		public set z(v) {
			this[2] = v;
			this.onChange();
		}
		public set w(v) {
			this[3] = v;
			this.onChange();
		}

		public get x() {
			return this[0];
		}
		public get y() {
			return this[1];
		}
		public get z() {
			return this[2];
		}
		public get w() {
			return this[3];
		}

		public fromEuler(eu: Euler) {
			Quaternion.fromEuler(this, eu)
		}

		public static create() {
			const q = new Quaternion();
			return q;
		}

		public static identity(out: Quaternion) {
			out[0] = 0;
			out[1] = 0;
			out[2] = 0;
			out[3] = 1;
		}

		/**根据弧度和旋转轴向，生成四元素 */
		public static setAxisAngle(out: Quaternion, axis: Vector3, rad: number) {
			rad = rad * 0.5;
			let s = Math.sin(rad);
			out[0] = s * axis[0];
			out[1] = s * axis[1];
			out[2] = s * axis[2];
			out[3] = Math.cos(rad);
		}

		/**两个四元素的球面查值 */
		public static slerp(out: Quaternion, a: Quaternion, b: Quaternion, t: number) {
			// benchmarks:
			//    http://jsperf.com/quaternion-slerp-implementations
			let ax = a[0],
				ay = a[1],
				az = a[2],
				aw = a[3];
			let bx = b[0],
				by = b[1],
				bz = b[2],
				bw = b[3];

			let omega, cosom, sinom, scale0, scale1;

			// calc cosine
			cosom = ax * bx + ay * by + az * bz + aw * bw;
			// adjust signs (if necessary)
			if (cosom < 0.0) {
				cosom = -cosom;
				bx = -bx;
				by = -by;
				bz = -bz;
				bw = -bw;
			}
			// calculate coefficients
			if (1.0 - cosom > 0.000001) {
				// standard case (slerp)
				omega = Math.acos(cosom);
				sinom = Math.sin(omega);
				scale0 = Math.sin((1.0 - t) * omega) / sinom;
				scale1 = Math.sin(t * omega) / sinom;
			} else {
				// "from" and "to" quaternions are very close
				//  ... so we can do a linear interpolation
				scale0 = 1.0 - t;
				scale1 = t;
			}
			// calculate final values
			out[0] = scale0 * ax + scale1 * bx;
			out[1] = scale0 * ay + scale1 * by;
			out[2] = scale0 * az + scale1 * bz;
			out[3] = scale0 * aw + scale1 * bw;
		}
		/**矩阵中提取四元素 */
		public static fromMat4(out: Quaternion, m: Matrix4) {
			// Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
			// article "Quaternion Calculus and Fast Animation".
			let fTrace = m[0] + m[4] + m[8];
			let fRoot;

			if (fTrace > 0.0) {
				// |w| > 1/2, may as well choose w > 1/2
				fRoot = Math.sqrt(fTrace + 1.0); // 2w
				out[3] = 0.5 * fRoot;
				fRoot = 0.5 / fRoot; // 1/(4w)
				out[0] = (m[5] - m[7]) * fRoot;
				out[1] = (m[6] - m[2]) * fRoot;
				out[2] = (m[1] - m[3]) * fRoot;
			} else {
				// |w| <= 1/2
				let i = 0;
				if (m[4] > m[0]) i = 1;
				if (m[8] > m[i * 3 + i]) i = 2;
				let j = (i + 1) % 3;
				let k = (i + 2) % 3;

				fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
				out[i] = 0.5 * fRoot;
				fRoot = 0.5 / fRoot;
				out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
				out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
				out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
			}
		}

		/**欧拉角提取四元素 */
		public static fromEuler(out: Quaternion, euler: Euler, order = 'YXZ') {
			const rad = Math.PI / 180;
			let sx = Math.sin(euler[0] * 0.5 * rad);
			let cx = Math.cos(euler[0] * 0.5 * rad);
			let sy = Math.sin(euler[1] * 0.5 * rad);
			let cy = Math.cos(euler[1] * 0.5 * rad);
			let sz = Math.sin(euler[2] * 0.5 * rad);
			let cz = Math.cos(euler[2] * 0.5 * rad);

			if (order === 'XYZ') {
				out[0] = sx * cy * cz + cx * sy * sz;
				out[1] = cx * sy * cz - sx * cy * sz;
				out[2] = cx * cy * sz + sx * sy * cz;
				out[3] = cx * cy * cz - sx * sy * sz;
			} else if (order === 'YXZ') {
				out[0] = sx * cy * cz + cx * sy * sz;
				out[1] = cx * sy * cz - sx * cy * sz;
				out[2] = cx * cy * sz - sx * sy * cz;
				out[3] = cx * cy * cz + sx * sy * sz;
			} else if (order === 'ZXY') {
				out[0] = sx * cy * cz - cx * sy * sz;
				out[1] = cx * sy * cz + sx * cy * sz;
				out[2] = cx * cy * sz + sx * sy * cz;
				out[3] = cx * cy * cz - sx * sy * sz;
			} else if (order === 'ZYX') {
				out[0] = sx * cy * cz - cx * sy * sz;
				out[1] = cx * sy * cz + sx * cy * sz;
				out[2] = cx * cy * sz - sx * sy * cz;
				out[3] = cx * cy * cz + sx * sy * sz;
			} else if (order === 'YZX') {
				out[0] = sx * cy * cz + cx * sy * sz;
				out[1] = cx * sy * cz + sx * cy * sz;
				out[2] = cx * cy * sz - sx * sy * cz;
				out[3] = cx * cy * cz - sx * sy * sz;
			} else if (order === 'XZY') {
				out[0] = sx * cy * cz - cx * sy * sz;
				out[1] = cx * sy * cz - sx * cy * sz;
				out[2] = cx * cy * sz + sx * sy * cz;
				out[3] = cx * cy * cz + sx * sy * sz;
			}
		}



	}
}