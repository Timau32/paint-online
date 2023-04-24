import IMessage, { IFigure } from '../interfaces/IMessage';
import ISettings from '../interfaces/ISettings';
import Tool from './Tool';

export default class Brush extends Tool {
  mouseDown: boolean;

  constructor(canvas: HTMLCanvasElement, settings: ISettings, socket: WebSocket) {
    super(canvas, settings, socket);
    this.mouseDown = false;

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
        type: 'Finish',
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  mouseDownHandler(event: MouseEvent) {
    const target = event.target as HTMLCanvasElement;
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(event.pageX - target.offsetLeft, event.pageY - target.offsetTop);
  }

  mouseMoveHandler(event: MouseEvent) {
    const target = event.target as HTMLCanvasElement;

    if (this.mouseDown) {
      const message: IMessage = {
        method: 'draw',
        id: this.settings.id!,
        figure: {
          type: 'Brush',
          x: event.pageX - target.offsetLeft,
          y: event.pageY - target.offsetTop,
          settings: this.settings,
        },
      };

      this.socket.send(JSON.stringify(message));
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D | null | undefined, figure: IFigure) {
    const { x, y, settings } = figure;
    super.setSettings(settings!, ctx);

    ctx?.lineTo(x!, y!);
    ctx?.stroke();
  }
}
