namespace ys3d {
    const tempMat4 = Matrix4.create();
    const center = Vector3.create();

    export class RayCaster {
        private ray: Ray;
        constructor(origin?: Vector3, direction?: Vector3) {
            this.ray = new Ray(origin, direction);
        }
        /** coords需要转换成裁剪空间坐标 x[-1,1] y[-1,1]*/
        public setFromCamera(coords: ys3d.Vector2, camera: Camera) {
            //从相机的世界坐标提取位置信息。
            Matrix4.getTranslation(this.ray.origin, camera.worldMatrix)
            this.ray.direction.set(coords.x, coords.y, 0.5);
            //将屏幕上的点，映射到3D空间。
            camera.unproject(this.ray.direction);
            //将方向进行归一化处理。
            this.ray.direction.subtract(this.ray.origin).normalize();
        }

        public intersect(mesh: Mesh3D[]): any[] {
            const hits = [];
            mesh.forEach(m => {
                //计算圆球
                var geo = m.geometry;
                geo.bounds || geo.calBoundingSphere();//计算包围盒和包围球
                center.copy(m.position);

                var v3 = this.ray.intersectSphere(center, geo.bounds.radius);
                if (v3) { hits.push({ mesh: m, point: v3 }) };
            })

            return hits;
        }
    }
}