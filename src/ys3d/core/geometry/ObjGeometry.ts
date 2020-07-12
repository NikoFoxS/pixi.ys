namespace ys3d {
    export class ObjGeometry extends Geometry {
        constructor(objectData: string,scale:number=1) {
            super();

            const {vertices,textures,indices,vertexNormals} = this.parse(objectData);
            this._vertices = vertices;
            this._vertices = this._vertices.map((val)=>{ return val*scale});
            this._uvs = textures;
            this._indices = indices;
        }
        //https://github.com/YuqinShao/WebGL-Obj-Loader/blob/master/webgl-obj-loader.js
        private parse(objectData: string){
            /*
                With the given elementID or string of the OBJ, this parses the
                OBJ and creates the mesh.
            */

            const verts = [];
            const vertNormals = [];
            const textures = [];

            // unpacking stuff
            let packed: any = {};
            packed.verts = [];
            packed.norms = [];
            packed.textures = [];
            packed.hashindices = {};
            packed.indices = [];
            packed.index = 0;

            // array of lines separated by the newline
            let lines: any[] = objectData.split('\n');
            let line:any;
            for (var i = 0; i < lines.length; i++) {
                // if this is a vertex
                if (lines[i].startsWith('v ')) {
                    line = lines[i].slice(2).split(" ")
                    verts.push(line[0]);
                    verts.push(line[1]);
                    verts.push(line[2]);
                }
                // if this is a vertex normal
                else if (lines[i].startsWith('vn')) {
                    line = lines[i].slice(3).split(" ")
                    vertNormals.push(line[0]);
                    vertNormals.push(line[1]);
                    vertNormals.push(line[2]);
                }
                // if this is a texture
                else if (lines[i].startsWith('vt')) {
                    line = lines[i].slice(3).split(" ")
                    textures.push(line[0]);
                    textures.push(line[1]);
                }
                // if this is a face
                else if (lines[i].startsWith('f ')) {
                    line = lines[i].slice(2).split(" ");
                    var quad = false;
                    for (var j = 0; j < line.length; j++) {
                        // Triangulating quads
                        // quad: 'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2 v3/t3/vn3/'
                        // corresponding triangles:
                        //      'f v0/t0/vn0 v1/t1/vn1 v2/t2/vn2'
                        //      'f v2/t2/vn2 v3/t3/vn3 v0/t0/vn0'
                        if (j == 3 && !quad) {
                            // add v2/t2/vn2 in again before continuing to 3
                            j = 2;
                            quad = true;
                        }

                        if (line[j] in packed.hashindices) {
                            packed.indices.push(packed.hashindices[line[j]]);
                        }
                        else {
                            var face = line[j].split('/');
                            // vertex position
                            packed.verts.push(verts[(face[0] - 1) * 3 + 0]);
                            packed.verts.push(verts[(face[0] - 1) * 3 + 1]);
                            packed.verts.push(verts[(face[0] - 1) * 3 + 2]);
                            // vertex textures
                            packed.textures.push(textures[(face[1] - 1) * 2 + 0]);
                            packed.textures.push(textures[(face[1] - 1) * 2 + 1]);
                            // vertex normals
                            packed.norms.push(vertNormals[(face[2] - 1) * 3 + 0]);
                            packed.norms.push(vertNormals[(face[2] - 1) * 3 + 1]);
                            packed.norms.push(vertNormals[(face[2] - 1) * 3 + 2]);
                            // add the newly created vertex to the list of indices
                            packed.hashindices[line[j]] = packed.index;
                            packed.indices.push(packed.index);
                            // increment the counter
                            packed.index += 1;
                        }

                        if (j == 3 && quad) {
                            // add v0/t0/vn0 onto the second triangle
                            packed.indices.push(packed.hashindices[line[0]]);
                        }
                    }
                }
            }
            packed.verts = packed.verts.map(parseFloat)
            packed.norms = packed.norms.map(parseFloat)
            packed.textures = packed.textures.map(parseFloat)
            return {
                vertices: packed.verts,
                vertexNormals: packed.norms,
                textures: packed.textures,
                indices: packed.indices
            }
        }
    }
}