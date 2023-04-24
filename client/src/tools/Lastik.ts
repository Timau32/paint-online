import { IFigure } from '../interfaces/IMessage';
import ISettings from '../interfaces/ISettings';
import Brush from './Brush';

export default class Lastik extends Brush {
  constructor(canvas: HTMLCanvasElement, settings: ISettings, socket: WebSocket) {
    super(canvas, settings, socket);
    this.ctx!.strokeStyle = '#fff';
  }

  mouseMoveHandler(event: MouseEvent) {
    const target = event.target as HTMLCanvasElement;
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.settings.id,
          figure: {
            type: 'Lastik',
            x: event.pageX - target.offsetLeft,
            y: event.pageY - target.offsetTop,
            settings: {
              ...this.settings,
              strokeColor: '#fff',
            },
          },
        })
      );
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D | null | undefined, figure: IFigure): void {
    const { settings, x, y } = figure;

    super.setSettings(settings!, ctx);
    ctx?.lineTo(x!, y!);
    ctx?.stroke();
  }
}
