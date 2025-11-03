import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const LogisticsDashboard: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Logistics Dashboard</h2>
              <p className="text-gray-600 mb-4">Logistics management features coming soon</p>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">📦 Inventory</h3>
                  <p className="text-sm text-gray-600">Manage donated items storage</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">🚚 Delivery Routes</h3>
                  <p className="text-sm text-gray-600">Plan and optimize delivery paths</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">📋 Status Updates</h3>
                  <p className="text-sm text-gray-600">Update delivery statuses</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">📊 Reports</h3>
                  <p className="text-sm text-gray-600">View delivery analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogisticsDashboard