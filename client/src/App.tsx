import Canvas from './Components/Canvas';
import Settingbar from './Components/Settingbar';
import Toolbar from './Components/Toolbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './styles/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/:id"
            element={
              <>
                <Toolbar />
                <Settingbar />
                <Canvas />
              </>
            }
          />
          <Route path="/" element={<Navigate to={`/f${(+new Date()).toString(16)}`} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
