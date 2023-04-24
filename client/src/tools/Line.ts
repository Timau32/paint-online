import IMessage, { IFigure } from '../interfaces/IMessage';
import Rect from './Rect';

export default class Line extends Rect {
  mouseUpHandler() {
    this.mouseDown = false;
    const message: IMessage = {
      method: 'draw',
      id: this.settings.id!,
      figure: {
        type: 'Line',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        settings: this.settings,
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  draw(width: number, height: number) {
    const image = new Image();
    image.src = this.saved;

    image.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.beginPath();
      this.ctx?.moveTo(this.startX, this.startY);
      this.ctx?.lineTo(this.startX + width, this.startY + height);
      this.ctx?.stroke();
    };
  }

  static staticDraw(ctx: CanvasRenderingContext2D | null | undefined, figure: IFigure) {
    const { x = 0, y = 0, width = 0, height = 0, settings } = figure;
    super.setSettings(settings!, ctx);

    ctx?.beginPath();
    ctx?.moveTo(x, y);
    ctx?.lineTo(x + width, y + height);
    ctx?.stroke();
  }
}
