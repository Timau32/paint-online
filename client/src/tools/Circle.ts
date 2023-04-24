import IMessage, { IFigure } from '../interfaces/IMessage';
import Rect from './Rect';

export default class Circle extends Rect {
  mouseUpHandler() {
    this.mouseDown = false;
    const message: IMessage = {
      method: 'draw',
      id: this.settings.id!,
      figure: {
        type: 'Circle',
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
    const x = this.startX + width / 2;
    const y = this.startY + height / 2;
    const radiusX = Math.abs(height / 2);
    const radiusY = Math.abs(width / 2);
    const rotation = Math.PI / 2;

    const image = new Image();
    image.src = this.saved;

    image.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.beginPath();
      this.ctx?.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
      this.ctx?.fill();
      this.ctx?.stroke();
    };
  }

  static staticDraw(ctx: CanvasRenderingContext2D, figure: IFigure) {
    const { x = 0, y = 0, width = 0, height = 0, settings } = figure;

    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const radiusX = Math.abs(height / 2);
    const radiusY = Math.abs(width / 2);
    const rotation = Math.PI / 2;

    super.setSettings(settings!, ctx);

    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
