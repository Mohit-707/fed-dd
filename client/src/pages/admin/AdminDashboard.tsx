import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.firstName} {user?.lastName}</p>
            </div>
            <button
              onClick={logout}
              className="btn btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
              <p className="text-gray-600 mb-4">Platform management features coming soon</p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">📊 Platform Overview</h3>
                  <p className="text-sm text-gray-600">View total donations, active users, and ongoing drives</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">👥 User Management</h3>
                  <p className="text-sm text-gray-600">Approve new users and manage accounts</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">🎯 Donation Drives</h3>
                  <p className="text-sm text-gray-600">Create and manage donation campaigns</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">📈 Analytics</h3>
                  <p className="text-sm text-gray-600">View trends and generate reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard