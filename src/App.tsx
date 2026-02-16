import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/login-pages/LoginPage';
import RegisterPage from './pages/login-pages/RegisterPage';
import ProfilePage from './pages/profile-pages/ProfilePage';
import TasksPage from './pages/tasks-pages/TasksPage';
import AddTaskPage from './pages/tasks-pages/AddTaskPage';
import SamplePage from './pages/samplePage';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase-client';

function App() {

  const [session, setSession] = useState<any>(null);

  // 🧠 1️⃣ MOST IMPORTANT PART: This get the current session from Supabase
  useEffect(() => {

    async function fetchSession() {

      const session = await supabase.auth.getSession();
      console.log("Initial session:", session.data.session);
      setSession(session.data.session);

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log("Auth state changed, new session:", session);
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }

    fetchSession();

  }, []);



  return (
    
    <div className="min-h-screen bg-white">
      <Navbar session={session} />   {/* 2️⃣ SESSION IS PASSES TO EACH COMPONENT AS PROPS */}
      <div className="max-w-6xl mx-auto p-0">
        <Routes>
          <Route path="/" element={<TasksPage session={session} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage session={session} />} />
          <Route path="/add-task" element={<AddTaskPage session={session} />} />
          <Route path="/sample" element={<SamplePage />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
