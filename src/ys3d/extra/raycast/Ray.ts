namespace ys3d {
    const vector3: ys3d.Vector3 = Vector3.create();
    const tempMat4: ys3d.Matrix4 = Matrix4.create();
    const origin: ys3d.Vector3 = Vector3.create();
    const direction: ys3d.Vector3 = Vector3.create();

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

        public intersectSphere(mesh: Mesh3D): Vector3 {

            origin.copy(this.origin);
            direction.copy(this.direction);
            //将射线，转换到包围球空间
            tempMat4.copy(mesh.worldMatrix);
            tempMat4.inverse();
            origin.applyMatrix4(tempMat4);
            direction.transformDirection(tempMat4);

            vector3.copy(mesh.geometry.bounds.center);
            vector3.subtract(origin);
            const tca = vector3.dot(direction);//this.direction 是归一化的。则|direction| =1 所以tca是vector3在direction方向上的投影。
            const d2 = vector3.dot(vector3) - tca * tca;//vector3.dot(vector3) 就 |vector3|的平方。所以d2 就是点到圆心的距离的平方
            const radius = mesh.geometry.bounds.radius;
            const radius2 = radius * radius;

            if (d2 > radius2) return null;//点在圆的半径之外.不会有相交。

            const thc = Math.sqrt(radius2 - d2);//点到圆表面的距离。

            const t0 = tca - thc;// 第一个点
            const t1 = tca + thc; //第二个点

            if (t0 < 0 && t1 < 0) return null; //如果都是负数，说明点不在射线上。射线的起点到无穷远。
            var dis = t0;
            if (t0 < 0) { dis = t1} //return this.at(t1);//如果第一个点为0，那边第一个点在球内。返回第二个点。否则 返回第一个交点
            
            const v3 = Vector3.create();
            v3.copy(direction).scale(dis).add(origin);
            //世界空间的交点
            v3.applyMatrix4(mesh.worldMatrix);
            return v3;
        }

        public intersectBox(mesh: Mesh3D) {
            origin.copy(this.origin);
            direction.copy(this.direction);
            //将射线，转换到包围盒的空间。方便ray - AABB 检测
            tempMat4.copy(mesh.worldMatrix);
            tempMat4.inverse();
            origin.applyMatrix4(tempMat4);
            direction.transformDirection(tempMat4);

            const box = mesh.geometry.bounds;

            const hittest=()=>{
                let tmin, tmax, tYmin, tYmax, tZmin, tZmax;
                const invdirx = 1 / direction.x;
                const invdiry = 1 / direction.y;
                const invdirz = 1 / direction.z;
                const min = box.min;
                const max = box.max;
                tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
                tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
                tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
                tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
                if (tmin > tYmax || tYmin > tmax) return 0;
                if (tYmin > tmin) tmin = tYmin;
                if (tYmax < tmax) tmax = tYmax;
                tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
                tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
                if (tmin > tZmax || tZmin > tmax) return 0;
                if (tZmin > tmin) tmin = tZmin;
                if (tZmax < tmax) tmax = tZmax;
                if (tmax < 0) return 0;
                return tmin >= 0 ? tmin : tmax;
            }

            const dis = hittest();
            if(dis <=0)
            {
                return null;
            }

            const hit = new RayHit();
            //包围盒空间的交点
            const v3 = ys3d.Vector3.create();
            
            v3.copy(direction).scale(dis).add(origin);
            //世界空间的交点
            v3.applyMatrix4(mesh.worldMatrix);
            

            return v3;
        }

    }
}