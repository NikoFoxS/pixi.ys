namespace ys {

    export interface IScreenAdapter {
        calStageSize(scaleMode: string, screenWidth: number, screenHeight: number,
            contentWidth: number, contentHeight: number): StageDisplaySize;
    }
    export interface StageDisplaySize {

        stageWidth: number;
        stageHeight: number;
        scale: number;
    }
    export enum StageScaleMode {
        FIXED_HEIGHT = 'fixedHeight',
        FIXED_WIDTH = 'fixedWidth',
        SHOW_ALL = 'showAll',
    }

    export class ScreenAdapter implements IScreenAdapter {
        public calStageSize(scaleMode: string, screenWidth: number, screenHeight: number,
            contentWidth: number, contentHeight: number): StageDisplaySize {
            let displayWidth = screenWidth;
            let displayHeight = screenHeight;
            let stageWidth = contentWidth;
            let stageHeight = contentHeight;
            let scaleX = (screenWidth / stageWidth) || 0;
            let scaleY = (screenHeight / stageHeight) || 0;
            let scale = 1;
            switch (scaleMode) {
                case StageScaleMode.FIXED_HEIGHT:
                    stageWidth = Math.round(screenWidth / scaleY);
                    scale = screenHeight / stageHeight;
                    break;
                case StageScaleMode.FIXED_WIDTH:
                    stageHeight = Math.round(screenHeight / scaleX);
                    scale = screenWidth / stageWidth;
                    break;
                case StageScaleMode.SHOW_ALL:
                    if (scaleX > scaleY) {
                        displayWidth = Math.round(stageWidth * scaleY);
                        scale = screenHeight / stageHeight;
                    }
                    else {
                        displayHeight = Math.round(stageHeight * scaleX);
                        scale = screenWidth / stageWidth;
                    }
                    break;
                default:
                    stageWidth = screenWidth;
                    stageHeight = screenHeight;
                    break;
            }
            return {
                stageWidth: stageWidth,
                stageHeight: stageHeight,
                scale: scale
            };
        }
    }
}
