namespace ys3d {

    export class RayHit {
        public point: Vector3;
        public distance: number;
        public mesh: Mesh3D;
    }

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

        public set(origin: Vector3, direction: Vector3)
        {
            this.ray.set(origin,direction);
        }

        /**为了提高效率，按照包围球和包围盒来处理 */
        public intersect(meshs: Mesh3D[], type = 'sphere'): RayHit[] {
            const hits: RayHit[] = [];
            meshs.forEach(mesh => {
                if (mesh.visible) {
                    var geo = mesh.geometry;
                    if(type == 'sphere')
                    {
                        geo.bounds || geo.calBoundingSphere();//计算包围球
                    }else
                    {
                        (geo.bounds && geo.bounds.radius != Infinity) || geo.calBoundingBox();//计算包围盒
                    }
                    
                    let v3:ys3d.Vector3;
                    if(type == 'sphere')
                    {
                        v3 = this.ray.intersectSphere(mesh);
                    }else
                    {
                        v3 = this.ray.intersectBox(mesh);
                    }
                    
                    if (v3) {
                        var hit = new RayHit();
                        hit.point = v3;
                        hit.mesh = mesh;
                        hit.distance = Vector3.distance(v3, this.ray.origin);
                        hits.push(hit);
                    };
                }

            })
            //按距离进行排序
            hits.sort((a, b) => { return a.distance - b.distance });

            return hits;
        }

    }
}