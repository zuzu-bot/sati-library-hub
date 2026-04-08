import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import AddEditBook from './pages/AddEditBook';
import AdminUsers from './pages/AdminUsers';
import Layout from './components/Layout';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
};
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/books" element={
            <ProtectedRoute>
              <Layout>
                <BookList />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/books/add" element={
            <ProtectedRoute>
              <Layout>
                <AddEditBook />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/books/edit/:id" element={
            <ProtectedRoute adminOnly>
              <Layout>
                <AddEditBook />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/books/add" element={
            <ProtectedRoute adminOnly>
              <Layout>
                <AddEditBook />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute adminOnly>
              <Layout>
                <AdminUsers />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
