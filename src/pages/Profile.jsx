// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useApp } from '../hooks/useApp';
import { 
  User, Mail, Phone, MapPin, Package, Calendar, Clock, 
  DollarSign, LogOut, Edit2, Check, X, ChefHat, Lock, Eye, EyeOff,
  ChevronDown
} from 'lucide-react';
import { SectionLoader, LoadingButton, OrderItemSkeleton } from '../components/LoadingComponents.jsx';

export default function Profile() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '' });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Password change states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch profile and orders
  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);

      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const userData = {
        name: currentUser?.user_metadata?.full_name || '',
        email: currentUser?.email || '',
        phone: currentUser?.user_metadata?.phone || '',
        address: currentUser?.user_metadata?.address || ''
      };
      setProfile(userData);
      setEditForm({ name: userData.name, phone: userData.phone, address: userData.address });

      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && ordersData) {
        const formatted = ordersData.map(order => ({
          id: order.id,
          number: `LB-${order.id.slice(0, 4).toUpperCase()}`,
          date: new Date(order.created_at).toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
          time: new Date(order.created_at).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          day: new Date(order.created_at).toLocaleDateString('en-US', { weekday: 'long' }),
          status: order.status,
          total: order.total,
          items: Array.isArray(order.items) ? order.items : [],
          itemCount: Array.isArray(order.items) 
            ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0) 
            : 0,
          paymentMethod: order.payment_method,
          customerAddress: order.customer_address
        }));
        setOrders(formatted);
      }

      setLoading(false);
    }

    fetchData();
  }, [user]);

  const handleUpdateProfile = async () => {
    setUpdateError(null);
    setUpdateSuccess(false);
    setIsSaving(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: editForm.name,
        phone: editForm.phone,
        address: editForm.address
      }
    });

    if (error) {
      setUpdateError(error.message);
    } else {
      setProfile({ ...profile, name: editForm.name, phone: editForm.phone, address: editForm.address });
      setUpdateSuccess(true);
      setIsEditing(false);
      setTimeout(() => setUpdateSuccess(false), 3000);
    }
    setIsSaving(false);
  };

  const handleCancelEdit = () => {
    setEditForm({ name: profile.name, phone: profile.phone, address: profile.address });
    setIsEditing(false);
    setUpdateError(null);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (passwordData.new !== passwordData.confirm) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (passwordData.new.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setIsChangingPassword(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password: passwordData.current,
    });

    if (signInError) {
      setPasswordError('Current password is incorrect.');
      setIsChangingPassword(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: passwordData.new,
    });

    if (updateError) {
      setPasswordError(updateError.message);
    } else {
      setPasswordSuccess(true);
      setPasswordData({ current: '', new: '', confirm: '' });
      setTimeout(() => {
        setPasswordSuccess(false);
        setShowPasswordModal(false);
      }, 3000);
    }

    setIsChangingPassword(false);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordError(null);
    setPasswordSuccess(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const getStatusColor = (status) => {
    if (status === 'delivered' || status === 'completed') return 'bg-green-100 text-green-700';
    if (status === 'pending' || status === 'preparing') return 'bg-orange-100 text-orange-700';
    if (status === 'on the way' || status === 'shipped') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status) => {
    if (status === 'delivered' || status === 'completed') return 'Delivered';
    if (status === 'pending') return 'Pending';
    if (status === 'preparing') return 'Preparing';
    if (status === 'on the way' || status === 'shipped') return 'On the Way';
    return status;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="font-playfair text-4xl md:text-5xl text-[#2d2420] mb-2">My Profile</h1>
          <p className="text-[#6b5b4f] font-dm text-sm">Manage your account and view your order history</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <SectionLoader text="Loading your profile..." />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="space-y-4">
                <OrderItemSkeleton />
                <OrderItemSkeleton />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-xl text-[#2d2420] flex items-center gap-2">
                  <User className="w-5 h-5 text-[#8e4a0e]" />
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-dm font-medium text-[#8e4a0e] hover:text-[#6d3a0b] transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-dm font-medium text-green-600 hover:text-green-700 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? <div className="w-3.5 h-3.5 border-2 border-green-600 border-t-transparent rounded-full animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-dm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                )}
              </div>

              {updateSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-green-600 text-sm font-dm">
                  <Check className="w-4 h-4" /> Profile updated successfully!
                </div>
              )}
              {updateError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-600 text-sm font-dm">
                  <X className="w-4 h-4" /> {updateError}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#faf7f2] rounded-lg">
                      <User className="w-4 h-4 text-[#8e4a0e]" />
                      <span className="text-sm text-[#2d2420] font-dm">{profile.name || 'Not set'}</span>
                    </div>
                  )}
                </div>

                {/* Email (read-only) */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">Email Address</label>
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#faf7f2] rounded-lg">
                    <Mail className="w-4 h-4 text-[#8e4a0e]" />
                    <span className="text-sm text-[#2d2420] font-dm">{profile.email}</span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#faf7f2] rounded-lg">
                      <Phone className="w-4 h-4 text-[#8e4a0e]" />
                      <span className="text-sm text-[#2d2420] font-dm">{profile.phone || 'Not set'}</span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">Default Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                      placeholder="Your delivery address"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
                    />
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#faf7f2] rounded-lg">
                      <MapPin className="w-4 h-4 text-[#8e4a0e]" />
                      <span className="text-sm text-[#2d2420] font-dm">{profile.address || 'Not set'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Change Password Button (opens modal) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-2 w-full text-left group"
              >
                <Lock className="w-5 h-5 text-[#8e4a0e]" />
                <h2 className="font-playfair text-xl text-[#2d2420] flex-1 group-hover:text-[#8e4a0e] transition-colors">Change Password</h2>
                <span className="text-[#8e4a0e] group-hover:translate-x-1 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Order History - Dropdown */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => setShowOrderHistory(!showOrderHistory)}
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-[#faf7f2] transition-colors"
              >
                <h2 className="font-playfair text-xl text-[#2d2420] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#8e4a0e]" />
                  Order History
                  <span className="ml-3 text-[10px] uppercase tracking-[0.15em] text-[#6b5b4f] font-dm font-medium bg-[#faf7f2] px-3 py-1 rounded-full">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                  </span>
                </h2>
                <ChevronDown className={`w-5 h-5 text-[#8e4a0e] transition-transform duration-300 ${showOrderHistory ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showOrderHistory ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ChefHat className="w-12 h-12 mx-auto text-[#8e4a0e]/20 mb-4" />
                      <p className="text-[#6b5b4f] font-dm text-sm">No orders yet. Hungry?</p>
                      <button 
                        onClick={() => navigate('/menu')}
                        className="mt-4 text-[10px] uppercase tracking-[0.15em] font-dm font-medium text-[#8e4a0e] hover:text-[#6d3a0b] transition-colors"
                      >
                        Browse Menu →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-[#e8ddd4] rounded-xl p-5 hover:shadow-md transition-shadow">
                          {/* Order Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div>
                              <p className="font-playfair text-sm text-[#2d2420]">Order #{order.number}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-[10px] text-[#6b5b4f] font-dm">
                                  <Calendar className="w-3 h-3" /> {order.date}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] text-[#6b5b4f] font-dm">
                                  <Clock className="w-3 h-3" /> {order.time}
                                </span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-dm font-medium ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status)}
                            </span>
                          </div>

                          {/* Items */}
                          <div className="bg-[#faf7f2] rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] uppercase tracking-[0.15em] text-[#6b5b4f] font-dm font-medium">Items</span>
                              <span className="text-[10px] text-[#6b5b4f] font-dm">{order.itemCount} items</span>
                            </div>
                            <div className="space-y-1">
                              {order.items.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm font-dm">
                                  <span className="text-[#2d2420]">{item.name}</span>
                                  <span className="text-[#6b5b4f]">x{item.quantity}</span>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <p className="text-[10px] text-[#6b5b4f] font-dm">+{order.items.length - 3} more items</p>
                              )}
                            </div>
                          </div>

                          {/* Order Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#e8ddd4]">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1 text-[10px] text-[#6b5b4f] font-dm">
                                <DollarSign className="w-3 h-3" /> {order.paymentMethod}
                              </span>
                              <span className="text-[10px] text-[#6b5b4f] font-dm">{order.day}</span>
                            </div>
                            <span className="font-playfair text-lg text-[#8e4a0e]">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Logout Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <button 
                onClick={() => logout()}
                className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-white hover:bg-red-700 font-dm text-sm uppercase tracking-[0.15em] font-medium py-3 rounded-lg border border-red-200 hover:border-red-700 transition-all duration-300 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePasswordModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95">
            <button onClick={closePasswordModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center text-[#6b5b4f] hover:bg-[#e8ddd4]">
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#8e4a0e]/10 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-[#8e4a0e]" />
              </div>
              <h2 className="font-playfair text-2xl text-[#2d2420]">Change Password</h2>
              <p className="text-[#6b5b4f] text-sm font-dm mt-1">Verify your identity to update your password</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {passwordSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-600 text-sm font-dm">
                  <Check className="w-4 h-4" /> Password changed successfully!
                </div>
              )}
              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-600 text-sm font-dm">
                  <X className="w-4 h-4" /> {passwordError}
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                    required
                    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5b4f] hover:text-[#8e4a0e]"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                    required
                    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5b4f] hover:text-[#8e4a0e]"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#6b5b4f] font-dm font-medium mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                    required
                    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-[#e8ddd4] focus:border-[#8e4a0e] focus:ring-2 focus:ring-[#8e4a0e]/20 outline-none text-sm text-[#2d2420] font-dm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b5b4f] hover:text-[#8e4a0e]"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <LoadingButton
                type="submit"
                loading={isChangingPassword}
                className="w-full mt-2"
              >
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </LoadingButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}