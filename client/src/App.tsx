import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import DonorDashboard from './pages/donor/DonorDashboard'
import RecipientDashboard from './pages/recipient/RecipientDashboard'
import LogisticsDashboard from './pages/logistics/LogisticsDashboard'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Redirect to appropriate dashboard based on user role
  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'ADMIN':
        return '/admin/dashboard'
      case 'DONOR':
        return '/donor/dashboard'
      case 'RECIPIENT':
        return '/recipient/dashboard'
      case 'LOGISTICS':
        return '/logistics/dashboard'
      default:
        return '/login'
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/donor/dashboard" element={<DonorDashboard />} />
      <Route path="/recipient/dashboard" element={<RecipientDashboard />} />
      <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
      <Route path="/" element={<Navigate to={getDashboardRoute()} replace />} />
      <Route path="*" element={<Navigate to={getDashboardRoute()} replace />} />
    </Routes>
  )
}

export default App