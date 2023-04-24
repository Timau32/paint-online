import ISettings from '../interfaces/ISettings';

export const save = (convas: HTMLCanvasElement, settings: ISettings) => {
  const dataUrl = convas.toDataURL();
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = settings.id!;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
