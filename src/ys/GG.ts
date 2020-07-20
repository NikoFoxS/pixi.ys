//快捷工具类，为什么叫GG,应为键盘上方便按到。
namespace GG {
    const hello = decodeURIComponent('%E4%B8%8E%E6%97%B6%E4%BA%92%E5%8A%A8%7C%E9%BA%BB%E8%BE%A3%E5%B0%8F%E6%B8%B8%E6%88%8F%E3%80%91%20vx%EF%BC%9ANikoFoxS');
    let pages: ys.Page[] = [];

    export function showPage(pageclass: any, clear: boolean = true) {
        console.log('show page', pageclass.name)
        const page = new pageclass() as ys.Page;
        clear && ys.stage.removeChildren();
        ys.stage.addChild(page);

        if (page.cache) {

        }

        page.on('removed', () => {

        }, this);

    }

    export function log(msg: string) {
        console.log(msg);
    }

    export function popUp(d: PIXI.Container, a: number) {
        ys.PopManager.popUp(d, a)
    }

    export function removeDisplayObject(d: PIXI.Container) {
        d.parent && d.parent.removeChild(d);
    }

    export function newSprite(res: string, con?: PIXI.Container): PIXI.Sprite {
        const sp = PIXI.Sprite.from(RES.getRes(res));
        con && con.addChild(sp);
        return sp;
    }

    export function newRect(w: number, h: number, color: number, con?: PIXI.Container): PIXI.Graphics {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawRect(0, 0, w, h);
        g.endFill();
        con && con.addChild(g);
        return g;
    }

    export function newCircle(r: number, color: number, con?: PIXI.Container): PIXI.Graphics {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawCircle(0, 0, r);
        g.endFill();
        con && con.addChild(g);
        return g;
    }

    export function newText(size: number, color: number, align: string, con?: PIXI.Container) {
        const t = new PIXI.Text('');
        const style = new PIXI.TextStyle();
        style.fontSize = size;
        style.fill = color;
        style.align = align;
        t.style = style;
        con && con.addChild(t);
        return t;
    }

    export function setAncher(d: PIXI.Container, x: number = 0.5, y?: number) {
        y || (y = x);
        d.pivot.x = x * d.width;
        d.pivot.y = y * d.height;
    }

    export function layoutLeft(d: PIXI.Container, left: number) {
        d.x = left + d.pivot.x;
        d.pivot
    }

    export function layoutRight(d: PIXI.Container, right: number) {
        d.x = stageW - d.width + d.pivot.x - right;
    }

    export function layoutMiddleX(d: PIXI.Container, offset = 0) {
        d.x = stageHalfW - d.width * 0.5 + d.pivot.x + offset;
    }

    export function layoutMiddleY(d: PIXI.Container, offset = 0) {
        d.y = stageHalfH - d.height * 0.5 + d.pivot.y + offset;
    }

    export function layoutTop(d: PIXI.Container, top: number) {
        d.y = top + d.pivot.y;
    }

    export function layoutBottom(d: PIXI.Container, bottom: number) {
        d.y = stageH - d.height + d.pivot.y - bottom;
    }

    export function layoutVH(d: PIXI.Container, vh: number) {
        d.y = stageH * vh;
    }

    export function layoutVW(d: PIXI.Container, vw: number) {
        d.x = stageH * vw;
    }

    export function texGradient(width: number, height: number, x0, y0, x1, y1, colors: string[], raito: number[]) {
        const c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        const ctx = c.getContext("2d");
        const grd = ctx.createLinearGradient(x0, y0, x1, y1);
        raito.forEach((val, index) => {
            (val < 0 && (val = 0)) || (val > 1 && (val = 1))
            grd.addColorStop(val, colors[index]);
        })
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        return PIXI.Texture.from(c);
    }

	export function randomNumber(min: number, max: number): number {
		if (max < min) {
			var t = max;
			max = min;
			min = t;
		}
		return min + Math.random() * (max - min);
	}

	export function randomInt(min: number, max: number): number {
		var num = randomNumber(min, max);

		return parseInt(num + "");
	}

	export function randomArr(arr: any[]): any {
		return arr[Math.random() * arr.length | 0];
	}


}

window.GG = GG;