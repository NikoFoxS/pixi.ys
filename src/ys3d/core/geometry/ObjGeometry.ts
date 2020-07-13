namespace ys3d {
  export class ObjGeometry extends Geometry {
    constructor(objTxt: string, scale: number = 1, mtlTxt?: string) {
      super();

      const info = this.parseData(objTxt, scale, mtlTxt);
      this._colors = info.colors;
      this._uvs = info.uvs;
      this._vertices = info.vertices;
    }

    private parseData(objTxt: string, scale: number = 1, mtlTxt?: string) {
      const vertices: number[] = [];
      const uvs: number[] = [];
      const colors: number[] = [];
      const indices: number[] = [];

      //清除前后空格
      objTxt = objTxt.trim();


      var matchLines = (reg, txt) => {
        //正则出数据
        let arr = txt.match(reg);
        if (arr) {
          //删除换行符
          arr = arr.map(val => { return val.replace(/\n/ig, '') });
        }
        return arr;
      }

      //取出顶点
      let v: string[] = matchLines(/v [\s\S]*?\n/g, objTxt);
      let vArr: number[][] = v.map(val => {
        val = val.trim();
        return val.slice(2).split(' ').map(parseFloat).map(v => { return v * scale });
      })

      //取出uv
      let vt: string[] = matchLines(/vt [\s\S]*?\n/g, objTxt);
      let vtArr: number[][] = vt.map(val => {
        val = val.trim();
        return val.slice(3).split(' ').map(parseFloat);
      })

      //取出面和mtl
      let kdMap = {};
      if (mtlTxt) {
        mtlTxt = mtlTxt.trim();
        let kdColor: string[] = matchLines(/(Kd |newmtl )[\s\S]*?\n/g, mtlTxt);

        let key, value;
        for (let i = 0; i < kdColor.length; i += 2) {
          key = kdColor[i] + '';
          value = kdColor[i + 1] + '';
          key = key.replace('new', 'use');
          value = value.slice(3).split(' ');
          value = value.map(parseFloat)
          kdMap[key] = value;
        }
      }


      let index = 0;//索引
      function addVertex(vert: string, color: number[]) {
        const indexArr = vert.split('/');
        //顶点位置
        const vIndex = parseInt(indexArr[0]) - 1;
        vertices.push(...vArr[vIndex])
        //顶点材质
        const vtIndex = parseInt(indexArr[1]) - 1;
        // console.log(indexArr[1],vtIndex,isNaN(vtIndex))
        if (!isNaN(vtIndex)) {//如果有uv数据
          uvs.push(...vtArr[vtIndex]);
        }
        if (color) {
          colors.push(...color);
        }

      }

      let color: number[];//颜色
      let face: string[];
      let facemtl: string[] = matchLines(/(f |usemtl )[\s\S]*?\n/g, objTxt);
      facemtl.forEach(val => {

        if (kdMap[val]) { //检测mtl里面的颜色
          color = kdMap[val];
        } else {
          val = val.trim();
          face = val.slice(2).split(' ');
          const numTriangles = face.length - 2;
          for (let tri = 0; tri < numTriangles; ++tri) {
            addVertex(face[0], color);
            addVertex(face[tri + 1], color);
            addVertex(face[tri + 2], color);
          }
        }
      })
      return { vertices, uvs, colors, indices }
    }

  }
}