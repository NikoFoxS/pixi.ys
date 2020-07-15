namespace ys3d {


    export class Vector2 extends Array {
        constructor(x=0,y=0) {
            super();
            (<any>Object)["setPrototypeOf"](this, Vector2.prototype);
            this[0] = x;
            this[1] = y;
        }

        public set(x = 0, y = 0) {
            this[0] = x;
            this[1] = y;
        }

        public set x(v) {
            this[0] = v;
        }
        public set y(v) {
            this[1] = v;
        }

        public get x() {
            return this[0];
        }
        public get y() {
            return this[1];
        }

        copy(v) {
            Vector2.copy(this, v);
            return this;
        }

        add(va, vb) {
            if (vb) Vector2.add(this, va, vb);
            else Vector2.add(this, this, va);
            return this;
        }

        sub(va, vb) {
            if (vb) Vector2.subtract(this, va, vb);
            else Vector2.subtract(this, this, va);
            return this;
        }

        multiply(v) {
            if (v.length) Vector2.multiply(this, this, v);
            else Vector2.scale(this, this, v);
            return this;
        }

        divide(v) {
            if (v.length) Vector2.divide(this, this, v);
            else Vector2.scale(this, this, 1 / v);
            return this;
        }

        inverse(v = this) {
            Vector2.inverse(this, v);
            return this;
        }

        // Can't use 'length' as Array.prototype uses it
        len() {
            return Vector2.getLength(this);
        }

        distance(v) {
            if (v) return Vector2.distance(this, v);
            else return Vector2.getLength(this);
        }

        squaredLen() {
            return this.squaredDistance();
        }

        squaredDistance(v?: Vector2) {
            if (v) return Vector2.squaredDistance(this, v);
            else return Vector2.squaredLength(this);
        }

        negate(v = this) {
            Vector2.negate(this, v);
            return this;
        }

        cross(va, vb) {
            if (vb) return Vector2.cross(va, vb);
            return Vector2.cross(this, va);
        }

        scale(v) {
            Vector2.scale(this, this, v);
            return this;
        }

        normalize() {
            Vector2.normalize(this, this);
            return this;
        }

        dot(v) {
            return Vector2.dot(this, v);
        }

        equals(v) {
            return Vector2.exactEquals(this, v);
        }

        applyMatrix3(mat3) {
            Vector2.transformMat3(this, this, mat3);
            return this;
        }

        applyMatrix4(mat4) {
            Vector2.transformMat4(this, this, mat4);
            return this;
        }

        lerp(v, a) {
            Vector2.lerp(this, this, v, a);
        }

        clone() {
            var v = new Vector2();
            v.set(this.x, this.y);
            return v;
        }

        fromArray(a, o = 0) {
            this[0] = a[o];
            this[1] = a[o + 1];
            return this;
        }

        toArray(a = [], o = 0) {
            a[o] = this[0];
            a[o + 1] = this[1];
            return a;
        }

        public static copy(out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        }

        /**
         * Set the components of a vec2 to the given values
         *
         * @param {vec2} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} out
         */
        public static set(out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        }

        /**
         * Adds two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        public static add(out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        }

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        public static subtract(out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        }

        /**
         * Multiplies two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        public static multiply(out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        }

        /**
         * Divides two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        public static divide(out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        }

        /**
         * Scales a vec2 by a scalar number
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec2} out
         */
        public static scale(out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        }

        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} distance between a and b
         */
        public static distance(a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        }

        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} squared distance between a and b
         */
        public static squaredDistance(a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return x * x + y * y;
        }

        /**
         * Calculates the length of a vec2
         *
         * @param {vec2} a vector to calculate length of
         * @returns {Number} length of a
         */
        public static getLength(a) {
            var x = a[0],
                y = a[1];
            return Math.sqrt(x * x + y * y);
        }

        /**
         * Calculates the squared length of a vec2
         *
         * @param {vec2} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        public static squaredLength(a) {
            var x = a[0],
                y = a[1];
            return x * x + y * y;
        }

        /**
         * Negates the components of a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to negate
         * @returns {vec2} out
         */
        public static negate(out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        }

        /**
         * Returns the inverse of the components of a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to invert
         * @returns {vec2} out
         */
        public static inverse(out, a) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            return out;
        }

        /**
         * Normalize a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to normalize
         * @returns {vec2} out
         */
        public static normalize(out, a) {
            var x = a[0],
                y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
            }
            out[0] = a[0] * len;
            out[1] = a[1] * len;
            return out;
        }

        /**
         * Calculates the dot product of two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} dot product of a and b
         */
        public static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }

        /**
         * Computes the cross product of two vec2's
         * Note that the cross product returns a scalar
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} cross product of a and b
         */
        public static cross(a, b) {
            return a[0] * b[1] - a[1] * b[0];
        }

        /**
         * Performs a linear interpolation between two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec2} out
         */
        public static lerp(out, a, b, t) {
            var ax = a[0],
                ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        }

        /**
         * Transforms the vec2 with a mat2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2} m matrix to transform with
         * @returns {vec2} out
         */
        public static transformMat2(out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y;
            out[1] = m[1] * x + m[3] * y;
            return out;
        }

        /**
         * Transforms the vec2 with a mat2d
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2d} m matrix to transform with
         * @returns {vec2} out
         */
        public static transformMat2d(out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        }

        /**
         * Transforms the vec2 with a mat3
         * 3rd vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat3} m matrix to transform with
         * @returns {vec2} out
         */
        public static transformMat3(out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[3] * y + m[6];
            out[1] = m[1] * x + m[4] * y + m[7];
            return out;
        }

        /**
         * Transforms the vec2 with a mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec2} out
         */
        public static transformMat4(out, a, m) {
            let x = a[0];
            let y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        }

        /**
         * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
         *
         * @param {vec2} a The first vector.
         * @param {vec2} b The second vector.
         * @returns {Boolean} True if the vectors are equal, false otherwise.
         */
        public static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1];
        }
    }
}