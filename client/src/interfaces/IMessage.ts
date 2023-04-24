import ISettings from './ISettings';
import tools from './toolsType';

export default interface IMessage {
  id: number | string;
  method: 'draw' | 'connection' | 'message' | '';
  username?: string;
  figure?: IFigure;
}

export interface IFigure {
  x?: number;
  y?: number;
  type: tools | 'Finish';
  width?: number;
  height?: number;
  settings?: ISettings;
}
