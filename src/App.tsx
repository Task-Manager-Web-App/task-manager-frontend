
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/login-pages/LoginPage';
import RegisterPage from './pages/login-pages/RegisterPage';
import ProfilePage from './pages/profile-pages/ProfilePage';
import TasksPage from './pages/tasks-pages/TasksPage';
import AddTaskPage from './pages/tasks-pages/AddTaskPage';
import SamplePage from './pages/samplePage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-0">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/sample" element={<SamplePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
