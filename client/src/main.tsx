import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import TansackProvider from './providers/TansackProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import LayoutAuth from './layouts/LayoutAuth';
import Tasks from './pages/Tasks';
import App from './App';
import './index.css';
import { UserProvider } from './contexts/UserContext';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TansackProvider>
    <UserProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="auth" element={<LayoutAuth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="task" element={<Tasks />} />
          <Route path="task/add" element={<AddTask />} />
          <Route path="task/edit">
            <Route path=":id" element={<EditTask />} />
          </Route>
        </Routes>
      </HashRouter>
    </UserProvider>
  </TansackProvider>,
);
