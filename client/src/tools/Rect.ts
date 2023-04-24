import IMessage, { IFigure } from '../interfaces/IMessage';
import ISettings from '../interfaces/ISettings';
import Tool from './Tool';

export default class Rect extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  saved: string;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement, settings: ISettings, socket: WebSocket) {
    super(canvas, settings, socket);
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.saved = '';
    this.width = 0;
    this.height = 0;
    this.listen();
  }

  listen() {
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    const message: IMessage = {
      method: 'draw',
      id: this.settings.id!,
      figure: {
        type: 'Rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        settings: this.settings,
      },
    }

    this.socket.send(
      JSON.stringify(message)
    );
  }

  mouseDownHandler(event: MouseEvent) {
    const target = event.target as HTMLCanvasElement;
    this.mouseDown = true;
    this.ctx?.beginPath();

    this.startX = event.pageX - target.offsetLeft;
    this.startY = event.pageY - target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(event: MouseEvent) {
    const target = event.target as HTMLCanvasElement;
    if (this.mouseDown) {
      const currentX = event.pageX - target.offsetLeft;
      const currentY = event.pageY - target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;

      this.draw(this.width, this.height);
    }
  }

  draw(width: number, height: number) {
    const image = new Image();
    image.src = this.saved;

    image.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.beginPath();
      this.ctx?.rect(this.startX, this.startY, width, height);
      this.ctx?.fill();
      this.ctx?.stroke();
    };
  }

  static staticDraw(ctx: CanvasRenderingContext2D, figure: IFigure) {
    const { x, y, width, height, settings } = figure;

    super.setSettings(settings!, ctx);

    ctx.beginPath();
    ctx.rect(x!, y!, width!, height!);
    ctx.fill();
    ctx.stroke();
  }
}
