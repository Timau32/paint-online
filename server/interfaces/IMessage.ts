interface IMessage {
  method: 'connection' | 'message' | 'draw' | '';
  id: number | string;
  username: string;
}

export default IMessage;
