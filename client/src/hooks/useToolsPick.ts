import ISettings from '../interfaces/ISettings';
import tools from '../interfaces/toolsType';
import canvasTools from '../helpers/canvasTools';


const getToolsPick = (canvas: HTMLCanvasElement, type: tools, settings: ISettings, socket: WebSocket | null) => {
  const newCanvas = new canvasTools[type](canvas, settings, socket!);
  return newCanvas;
};

export default getToolsPick;
