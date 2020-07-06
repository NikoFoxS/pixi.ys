namespace ys {
	const cjk: RegExp = new RegExp(/([\u4e00-\u9fa5]|[\uAC00-\uD7A3]|[\u0800-\u4e00])/ig);//中日韩

	class InputManager {
		private static _instance: InputManager;
		public static get GET() {
			if (!InputManager._instance) {
				InputManager._instance = new InputManager();
			}
			return InputManager._instance;
		}
		private input: HTMLInputElement;
		constructor() {
			this.input = document.createElement('input') as HTMLInputElement;
			const input = this.input;
			input.style.border = 'none';
			input.style.position = 'absolute';
			input.style.background = 'none';
			input.style.outline = 'none';
			input.style.transformOrigin = '0% 0% 0px';
			input.style.padding = '0px';
			input.type = 'text';
			input.style.wordBreak = 'break-all';
			input.style.overflow = 'hiden';
			input.style.display = 'none';
		}

		private addEvt() {
			const input = this.input;
			input.addEventListener('focus', this.onFocusIn.bind(this));
			input.addEventListener('blur', this.onFocusOut.bind(this));
			ys.canvas.addEventListener('click', this.checkInput.bind(this));
			ys.canvas.addEventListener('touchend', this.checkInput.bind(this));
		}

		private removeEvt() {
			const input = this.input;
			input.removeEventListener('focus', this.onFocusIn.bind(this));
			input.removeEventListener('blur', this.onFocusOut.bind(this));
			ys.canvas.removeEventListener('click', this.checkInput.bind(this));
			ys.canvas.removeEventListener('touchend', this.checkInput.bind(this));
		}

		private checkInput(event: TouchEvent | MouseEvent) {

			const txt = this.activeTxt;
			if (txt) {
				const input = this.input;
				event.stopImmediatePropagation();

				if (this.needFocus) {
					this.needFocus = false;
					this.sizeTo(txt);

					input.style.display = 'block';
					input.value = this.activeTxt.text;
					input.selectionStart = input.value.length;
					input.selectionEnd = input.value.length;
					input.focus();
				} else {
					input.blur();
				}
			}
		}

		private onFocusIn() {
			const txt = this.activeTxt;
			if (txt) {
				txt.visible = false;
				txt.emit('focus');
			}
			console.log('focus', txt)
		}

		private onFocusOut() {
			const txt = this.activeTxt;
			const input = this.input;
			if (txt) {
				txt.visible = true;
				txt.text = input.value;
				input.value = '';
				txt.emit('blur');
			}
			console.log('blur', txt);
			input.style.display = 'none';
			this.activeTxt = null;

		}

		private inputList: ys.TextFieldInput[] = [];
		private activeTxt: ys.TextFieldInput;

		public add(txt: ys.TextFieldInput) {
			if (this.inputList.length == 0) {
				document.body.appendChild(this.input);
				this.addEvt();
			}
			console.log('add input ')
			this.inputList.push(txt);
			txt.interactive = true;
			txt.cursor = 'text';
			txt.hitArea = new PIXI.Rectangle(0, 0, txt.inputWidth, txt.style.fontSize)
			txt.on('pointerdown', this.select, this);
			txt.once('removed', () => {
				let i = this.inputList.length;
				while (i--) {
					let t = this.inputList[i];
					if (t === txt) {
						this.inputList.splice(i, 1);
						break;
					}
				}

				if (this.inputList.length == 0) {
					if (this.input.parentNode) {
						this.input.parentNode.removeChild(this.input);
					}
					this.removeEvt();
				}
			}, this);
		}

		private needFocus: boolean;
		public select(e: PIXI.InteractionEvent) {
			const txt = e.target as ys.TextFieldInput;
			if (this.activeTxt && txt != this.activeTxt) {
				this.input.blur();
			}
			txt.alpha = 1;
			this.activeTxt = txt;
			this.needFocus = true;
			console.log('active', txt)
		}

		private sizeTo(txt: ys.TextFieldInput) {
			const scale = ys.stageScale;
			const style = txt.style as PIXI.TextStyle;
			const input = this.input;
			input.style.left = (txt.x * scale) + 'px';
			input.style.top = (txt.y * scale) + 'px';
			input.style.fontSize = (parseFloat(style.fontSize + '') * scale) + 'px';
			input.style.width = (txt.inputWidth * scale) + 'px';
			input.style.color = style.fill + '';
			if (txt.maxChars > 0) {
				input.setAttribute("maxlength", txt.maxChars + '');
			} else {
				input.removeAttribute("maxlength");
			}
		}
	}

	export class TextFieldInput extends PIXI.Text {
		constructor(inputWidth: number = 100, style?: PIXI.TextStyle) {
			super('', style);
			this._inputWidth = inputWidth;
			this.on('added', () => {
				InputManager.GET.add(this);
			}, this);
		}

		private _maxChars: number = 0;
		public get maxChars() {
			return this._maxChars;
		}
		public set maxChars(max) {
			this._maxChars = max;
		}

		private _inputWidth: number;
		public get inputWidth() {
			return this._inputWidth;
		}
		public placeHolder(t: string) {
			this.text = t;
			this.alpha = 0.5;
		}

	}

	export class TextField extends PIXI.Text {
		public constructor(style?: PIXI.TextStyle) {
			super('', style);
		}

		public locale(t: string, wordWrapWidth: number = 0) {
			t = ys.getLocale(t);
			if (wordWrapWidth > 0) {
				this.wrapWord(t, wordWrapWidth);
			} else {
				this.text = t;
			}
		}

		public wrapWord(txt: string, wordWrapWidth: number = 0) {
			//中日韩文字，特殊处理
			if (cjk.test(txt)) {
				txt = txt.replace(/\n/ig, '')

				let word = '';
				let letter = '';
				let words = [];

				let len = txt.length;
				//解析所有单词
				for (let i = 0; i < len; i++) {
					letter = txt.charAt(i);
					if (cjk.test(letter)) {
						//中日韩
						if (word != '') {
							words.push(word);
							word = '';
						}
						word = letter;
						words.push(word);
						word = '';
					} else {
						//按照空格分隔
						if (letter == ' ') {
							words.push(word + ' ');
							word = '';
						} else {
							word += letter;
						}
					}

					if (i == len - 1) {
						words.push(word);
					}
				}
				//解析换行
				len = words.length;
				let w1, w2;
				let str = '';
				let line = '';
				for (let i = 0; i < len; i++) {
					w1 = words[i];
					w2 = words[i + 1];
					line += w1;
					const met = PIXI.TextMetrics.measureText(line + w2,this.style)
					if (met.width > wordWrapWidth) {
						str += line + '\n';
						line = '';
					}
				}
				this.text = str;
			} else {
				const style = this.style as PIXI.TextStyle;
				style.wordWrap = true;
				style.wordWrapWidth = wordWrapWidth;
				this.text = txt;
			}
		}
	}
	//多语言
	export var getLocale: Function = (t: string) => {
		return t;
	};

}