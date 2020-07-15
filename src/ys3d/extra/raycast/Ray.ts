namespace ys3d {
    let _vector: ys3d.Vector3 = Vector3.create();
    export class Ray {
        public origin: ys3d.Vector3;
        public direction: ys3d.Vector3;

        constructor(origin?: ys3d.Vector3, direction?: ys3d.Vector3) {
            this.origin = origin || Vector3.create();
            this.direction = direction || Vector3.create();
        }

        public set(origin: ys3d.Vector3, direction: ys3d.Vector3) {
            this.origin.copy(origin);
            this.direction.copy(direction);
            return this;
        }

        public lookAt(v3: Vector3) {
            this.direction.copy(v3).subtract(this.origin).normalize();
            return this;
        }

        public intersectSphere(center: ys3d.Vector3, radius: number): Vector3 {
            _vector.copy(center);
            _vector.subtract(this.origin);
            const tca = _vector.dot(this.direction);//this.direction 是归一化的。则|direction| =1 所以tca是_vector在direction方向上的投影。
            const d2 = _vector.dot(_vector) - tca * tca;//_vector.dot(_vector) 就 |_vector|的平方。所以d2 就是点到圆心的距离的平方
            const radius2 = radius * radius;

            if (d2 > radius2) return null;//点在圆的半径之外.不会有相交。

            const thc = Math.sqrt(radius2 - d2);//点到圆表面的距离。

            const t0 = tca - thc;// 第一个点
            const t1 = tca + thc; //第二个点

            if (t0 < 0 && t1 < 0) return null; //如果都是负数，说明点不在射线段上。

            if (t0 < 0) return this.at(t1);//如果第一个点为0，那边第一个点在球内。返回第二个点。
            return this.at(t0);//返回第。一个交点
        }

        public at(t: number) {
            const v3 = Vector3.create();
            return v3.copy(this.direction).scale(t).add(this.origin);
        }




    }
}