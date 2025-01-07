import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import MyComplaints from './components/MyComplaints';
import ComplaintForm from './components/ComplaintForm';
import ArticleForm from './components/ArticleForm';
import Articles from './components/Articles';
import ArticleDetail from './components/ArticleDetail';
import AdminPanel from './components/AdminPanel';
import ComplaintDetail from './components/ComplaintDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/complaints" element={<MyComplaints />} />
                <Route path="/register-complaint" element={<ComplaintForm />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />
                <Route path="/register-article" element={<ArticleForm />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/complaint/:id" element={<ComplaintDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
