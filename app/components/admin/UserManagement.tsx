import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  X,
  Save,
  UserPlus
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  totalWaste: number;
  rewardPoints: number;
  avatar: string;
  lastActivity: string;
}

interface UserManagementProps {
  users?: User[];
  onAddUser?: (user: Omit<User, 'id'>) => void;
  onEditUser?: (id: string, user: Partial<User>) => void;
  onDeleteUser?: (id: string) => void;
  onUpdateUserStatus?: (id: string, status: User['status']) => void;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    status: "active",
    joinDate: "2024-01-15",
    totalWaste: 245.5,
    rewardPoints: 1250,
    avatar: "👩‍💼",
    lastActivity: "2 hours ago"
  },
  {
    id: "2",
    name: "Raj Patel",
    email: "raj.patel@email.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    status: "active",
    joinDate: "2024-02-20",
    totalWaste: 189.2,
    rewardPoints: 980,
    avatar: "👨‍💻",
    lastActivity: "1 day ago"
  },
  {
    id: "3",
    name: "Ananya Singh",
    email: "ananya.singh@email.com",
    phone: "+91 76543 21098",
    city: "Bangalore",
    status: "inactive",
    joinDate: "2024-03-10",
    totalWaste: 67.8,
    rewardPoints: 340,
    avatar: "👩‍🎓",
    lastActivity: "1 week ago"
  },
  {
    id: "4",
    name: "Vikram Gupta",
    email: "vikram.gupta@email.com",
    phone: "+91 65432 10987",
    city: "Chennai",
    status: "suspended",
    joinDate: "2024-04-05",
    totalWaste: 23.4,
    rewardPoints: 120,
    avatar: "👨‍🏭",
    lastActivity: "2 weeks ago"
  }
];

export const UserManagement: React.FC<UserManagementProps> = ({
  users = mockUsers,
  onAddUser,
  onEditUser,
  onDeleteUser,
  onUpdateUserStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view');

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (mode: typeof modalMode, user?: User) => {
    setModalMode(mode);
    setSelectedUser(user || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    if (onUpdateUserStatus) {
      onUpdateUserStatus(userId, newStatus);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              User Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage system users and their permissions
            </p>
          </div>
        </div>
        
        <button
          onClick={() => openModal('add')}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => openModal('view', user)}
                  className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="View Details"
                >
                  <Search className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openModal('edit', user)}
                  className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  title="Edit User"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteUser?.(user.id)}
                  className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Delete User"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{user.city}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Waste Collected</span>
                  <p className="font-medium text-gray-900 dark:text-white">{user.totalWaste} kg</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 dark:text-gray-400">Reward Points</span>
                  <p className="font-medium text-green-600 dark:text-green-400">{user.rewardPoints}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Last active: {user.lastActivity}</p>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex space-x-2">
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                className="flex-1 text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={closeModal}></div>
            
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {modalMode === 'add' ? 'Add New User' : 
                   modalMode === 'edit' ? 'Edit User' : 'User Details'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {selectedUser && modalMode === 'view' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedUser.avatar}</span>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedUser.name}
                      </h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.city}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Join Date</label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Waste</label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.totalWaste} kg</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reward Points</label>
                      <p className="text-green-600 dark:text-green-400 font-semibold">{selectedUser.rewardPoints}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                {modalMode === 'edit' && (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2 inline" />
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
