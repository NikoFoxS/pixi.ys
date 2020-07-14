
namespace ys3d {
	export const EPSILON = 0.000001;
	export class math {
		public constructor() {
		}

		public static hypot(...arg:any) {
			var y = 0, i = arguments.length;
			while (i--) y += arguments[i] * arguments[i];
			return Math.sqrt(y);
		}
	}

	export function numberToRGB(num:number) {
		return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
	}
}