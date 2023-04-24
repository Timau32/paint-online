import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { undoCreator, redoCreator } from '../store/actionCreators/Canvas';
import { setUndo, setUsername } from '../store/reducers/toolSlice';
import { getImage, postImage } from '../api/index';
import { setSessionId } from '../store/reducers/settingsSlice';
import { save } from '../helpers/save';
import getToolsPick from '../hooks/useToolsPick';
import IMessage from '../interfaces/IMessage';
import canvasTools from '../helpers/canvasTools';
import '../styles/canvas.scss';
import Notifications from './Notifications';

const Canvas = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [connectedUser, setConnectedUser] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const socket = useRef<WebSocket | null>(null);

  const { tool, triggerRedo, triggerUndo, username, triggerSave } = useAppSelector((state) => state.toolReducer);
  const { settingsReducer: settings } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (!username) return;
    const ctx = canvasRef.current!.getContext('2d') as CanvasRenderingContext2D;

    getImage(params.id!)
      .then((response) => {
        const img = new Image();
        img.src = response.data;
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        };
      })
      .catch(() => setIsNew(true));
  }, [username]);

  useEffect(() => {
    if (username && canvasRef.current) {
      socket.current = new WebSocket('ws://localhost:8000/');
      dispatch(setSessionId(params.id || ''));
      getToolsPick(canvasRef.current, tool, settings, socket.current);

      socket.current.onopen = () => {
        console.log('Coneccted');
        socket.current!.send(
          JSON.stringify({
            id: params.id,
            username: usernameRef.current?.value,
            method: 'connection',
          })
        );
      };

      socket.current.onmessage = (event) => {
        const msg: IMessage = JSON.parse(event.data);

        switch (msg.method) {
          case 'connection':
            setConnectedUser(msg.username!);
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      };
    }
  }, [username]);

  useEffect(() => {
    if (!canvasRef.current || !socket.current) return;
    getToolsPick(canvasRef.current, tool, settings, socket.current);
  }, [tool, settings, socket.current]);

  useEffect(() => {
    if (!canvasRef.current || !triggerUndo) return;
    dispatch(undoCreator(canvasRef.current));
  }, [triggerUndo]);

  useEffect(() => {
    if (!canvasRef.current || !triggerRedo) return;
    dispatch(redoCreator(canvasRef.current));
  }, [triggerRedo]);

  useEffect(() => {
    if (!triggerSave) return;
    save(canvasRef.current!, settings);
  }, [triggerSave]);

  const onMouseDownHandler = () => dispatch(setUndo(canvasRef.current!.toDataURL()));
  const onMouseUpHandler = () => postImage(params.id!, canvasRef.current!.toDataURL());

  const connectionHandler = () => {
    setOpen(false);
    dispatch(setUsername(usernameRef.current!.value));
  };

  const drawHandler = (msg: IMessage) => {
    const { figure } = msg;
    const ctx = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;

    if (figure?.type === 'Finish') {
      return ctx?.beginPath();
    }

    canvasTools[figure!.type].staticDraw(ctx, figure!);
  };

  return (
    <>
      {username ? <Notifications id={params.id} isNew={isNew} connectedUsers={connectedUser} /> : null}
      <div className="canvas">
        <Modal show={open} onHide={() => {}}>
          <Modal.Header closeButton>
            <Modal.Title>Введите ваше имя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" ref={usernameRef} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={connectionHandler}>
              Войти
            </Button>
          </Modal.Footer>
        </Modal>
        <canvas onMouseUp={onMouseUpHandler} onMouseDown={onMouseDownHandler} ref={canvasRef} width={600} height={400}></canvas>
      </div>
    </>
  );
};

export default Canvas;
