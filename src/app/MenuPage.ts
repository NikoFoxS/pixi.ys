class MenuPageMediator extends ys.Mediator {
    constructor(view: ys.View) {
        super(view);
    }

    public onInit() {
        console.log(this, 'init');
        this.registerCommand(StartCMD);

        var v = this.getView() as MenuPage;
        v.bg.interactive = true;
        v.bg.on('pointerdown', () => {
            this.sendNotice('StartCMD', { name: 'FoxS' })
        }, this);
    }

    protected listenNotice(): string[] {
        return [];
    }

    protected onNotice(no: ys.Notice) {

    }
}

class MenuPage extends ys.Page {
    constructor() {
        super();
    }

    public bg: PIXI.Sprite;
    protected onInit() {
        console.log('added')
        // GG.newRect(stageW,stageH,0xffff00,this);

        var style = new PIXI.TextStyle();
        style.fill = 0xffffff;
        style.fontSize = 50;

        var input = new ys.TextFieldInput(200,style);
        input.placeHolder('test');
        this.addChild(input);
        input.position.set(100,300);
        input.on('focus',()=>{
            console.log('focus text')
        },this);

        var input = new ys.TextFieldInput(200,style);
        input.placeHolder('ceshiceshi');
        this.addChild(input);
        input.position.set(100,400);
        input.on('focus',()=>{
            console.log('focus text')
        },this);


    }

    protected onRemoved() {

    }
}