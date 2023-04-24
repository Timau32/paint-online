import { FC, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAppSelector } from '../hooks/redux';

type NotificationsProps = {
  isNew: boolean;
  connectedUsers: string;
  id?: string;
};

const Notifications: FC<NotificationsProps> = ({ isNew, connectedUsers, id }) => {
  const [isNewOpen, setIsNewOpen] = useState<boolean>(true);
  const [isConnectedOpen, setIsConnectedOpen] = useState<boolean>(true);
  const [isConnectedUsers, setIsConnectedUsers] = useState<boolean>(true);

  const {username} = useAppSelector((state) => state.toolReducer)

  const closeNewAlert = () => setIsNewOpen(false);
  const closeConnectedAlert = () => setIsConnectedOpen(false);
  const closeConnetedUsers = () => setIsConnectedUsers(false);

  const isConnect = (connectedUsers && (connectedUsers !== username))

  return (
    <div className="notifications">
      {isNew ? (
        <Alert show={isNewOpen} variant="success" onClose={closeNewAlert} dismissible>
          <Alert.Heading> Вы создали новый холст</Alert.Heading>
        </Alert>
      ) : (
        <Alert show={isConnectedOpen} variant="success" onClose={closeConnectedAlert} dismissible>
          <Alert.Heading>Вы присоединились к существующему холсту №{id}</Alert.Heading>
        </Alert>
      )}
      {isConnect && (
        <Alert show={isConnectedUsers} onClose={closeConnetedUsers} variant="info" dismissible>
          <Alert.Heading>{connectedUsers} присоединился к холсту</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Notifications;
