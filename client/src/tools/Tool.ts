import ISettings from '../interfaces/ISettings';

export default class Tool {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null | undefined;
  socket: WebSocket;
  settings: ISettings;

  constructor(canvas: HTMLCanvasElement, settings: ISettings, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.socket = socket;
    this.settings = settings;

    this.destroyEvents();
    this.setSettings(settings);
  }

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }

  setSettings(settings: ISettings) {
    this.ctx!.strokeStyle = settings.strokeColor;
    this.ctx!.fillStyle = settings.fillColor;
    this.ctx!.lineWidth = settings.lineWidth;
  }

  static setSettings(settings: ISettings, ctx: CanvasRenderingContext2D | null | undefined) {
    ctx!.strokeStyle = settings!.strokeColor || '';
    ctx!.fillStyle = settings!.fillColor || '';
    ctx!.lineWidth = settings!.lineWidth || 1;
  }
}
