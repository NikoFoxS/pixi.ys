namespace ysui {
    export class ButtonOption {
        public width: number;
        public height: number;
        public fill: number | object;
        public radius: number;
        public shadowOffsetX: number;
        public shadowOffsetY: number;
        public shandowAplha: number;
        public padding: number;
        public fillet: number;
        public chamfer: number;
    }
    export class Button extends PIXI.Graphics {
        constructor(opt?: ButtonOption) {
            super();
            const width = opt.width || 160;
            const height = opt.height || 80;
            const fill = opt.fill || 0x000000;
            const radius = opt.radius || 20;
            const shadowOffsetX = opt.shadowOffsetX || 0;
            const shadowOffsetY = opt.shadowOffsetY || 0;
            const shandowAplha = opt.shandowAplha || 1;
            const padding = opt.padding || 20;
            const fillet = opt.fillet || 0;
            const chamfer = opt.chamfer || 0;

            var draw = (offsetx=0,offsety=0) => {
                if (fillet) {
                    this.drawFilletRect(offsetx, offsety, width, height, fillet);
                } else if (chamfer) {
                    this.drawChamferRect(offsetx, offsety, width, height, chamfer);
                } else if (radius) {
                    this.drawRoundedRect(offsetx, offsety, width, height, radius);
                } else {
                    this.drawRect(offsetx, offsety, width, height,)
                }

                this.endFill();
            }
            //画阴影
            if ((shadowOffsetX + shadowOffsetY) > 0) {
                this.beginFill(0x000000, shandowAplha);
                draw(shadowOffsetX,shadowOffsetY);
            }
            //区分填充
            if (typeof (fill) == 'number') {
                this.beginFill(fill as number);
            } else {
                this.beginTextureFill(fill)
            }
            draw();
            this.txt = new PIXI.Text('');
            this.addChild(this.txt);
            this.btnW = width;
            this.btnH = height;
            this.padding = padding;
        }

        private padding: number;
        private btnW: number;
        private btnH: number;
        private txt: PIXI.Text;
        public set label(txt: string) {
            const t = this.txt;
            t.text = txt;
            this.update();
        }

        public set style(s: PIXI.TextStyle) {
            this.txt.style = s;
            this.update();
        }

        private update() {
            const t = this.txt;
            t.pivot.x = t.width * 0.5;
            t.pivot.y = t.height * 0.5;
            t.x = this.btnW * 0.5;
            t.y = this.btnH * 0.5;
            const w = t.width + this.padding * 2;
            if (w > this.btnW) {
                t.scale.set(this.btnW / w);
            }
        }

    }

}