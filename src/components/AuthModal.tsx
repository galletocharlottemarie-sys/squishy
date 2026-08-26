import React, { useState } from 'react';
import { X, User, Smartphone, ShieldCheck, Mail, Lock, CheckCircle2, ArrowRight, Store } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'register' | 'login' | 'profile'>(currentUser ? 'profile' : 'register');
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [gcashNumber, setGcashNumber] = useState(currentUser?.gcashNumber || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserProfile['role']>(currentUser?.role || 'both');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validate Philippine GCash Number (starts with 09 and is 11 digits)
  const validateGcash = (num: string) => {
    const clean = num.replace(/[^0-9]/g, '');
    return /^09\d{9}$/.test(clean);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateGcash(gcashNumber)) {
      setErrorMessage('Please enter a valid 11-digit Philippine GCash number (e.g. 09171234567).');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      gcashNumber: gcashNumber.trim(),
      role,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${fullName}`,
      balancePhp: 500.0, // Welcome bonus wallet balance in PHP
      joinedDate: new Date().toISOString().split('T')[0],
      isGcashVerified: true,
    };

    onSaveProfile(newProfile);
    setSuccessMessage('Account registered and GCash verified successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    // Standard demo profile
    const loggedInProfile: UserProfile = {
      id: currentUser?.id || `usr-${Date.now()}`,
      name: fullName || 'Juan Squishy Collector',
      email: email.trim().toLowerCase(),
      gcashNumber: gcashNumber || '09178829901',
      role: 'both',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      balancePhp: currentUser?.balancePhp || 850.0,
      joinedDate: currentUser?.joinedDate || '2026-08-01',
      isGcashVerified: true,
    };

    onSaveProfile(loggedInProfile);
    setSuccessMessage('Logged in successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg font-serif text-white">
                {mode === 'profile' ? 'Your Account & GCash Profile' : mode === 'register' ? 'Register Account with GCash' : 'Sign In'}
              </h3>
              <p className="text-xs text-slate-400">Manage your orders, seller listings, and GCash payouts</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (if not currently logged in) */}
        {!currentUser && (
          <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                mode === 'register' ? 'border-b-2 border-rose-500 text-rose-400 bg-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register &amp; Input GCash
            </button>
            <button
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                mode === 'login' ? 'border-b-2 border-rose-500 text-rose-400 bg-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Messages */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4" /> {successMessage}
          </div>
        )}

        {/* Mode: Registration Form */}
        {mode === 'register' && !currentUser && (
          <form onSubmit={handleRegister} className="p-6 space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Maria Santos"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maria.santos@example.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Philippine GCash Number (09XXXXXXXXX) *
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={gcashNumber}
                  onChange={(e) => setGcashNumber(e.target.value)}
                  placeholder="09171234567"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-emerald-400 font-bold placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Used for instant seller payouts and 1-tap buyer verification.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Password (Min. 6 chars) *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserProfile['role'])}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:ring-2 focus:ring-rose-500"
              >
                <option value="both">Both (Buyer &amp; Verified Seller)</option>
                <option value="seller">Artisan Seller Only</option>
                <option value="buyer">Squishy Collector / Buyer Only</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>Create Account &amp; Verify GCash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mode: Login Form */}
        {mode === 'login' && !currentUser && (
          <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@example.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Password *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Sign In to Account
            </button>
          </form>
        )}

        {/* Mode: Existing Profile View */}
        {currentUser && (
          <div className="p-6 space-y-5 text-xs sm:text-sm">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                🍡
              </div>
              <div>
                <h4 className="font-bold text-lg text-white font-serif">{currentUser.name}</h4>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> GCash: {currentUser.gcashNumber}
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Balance & Member Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <span className="text-[11px] text-slate-400 block">Squishy Wallet Credit</span>
                <span className="text-xl font-bold text-amber-400 font-serif">₱{currentUser.balancePhp.toFixed(2)}</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                <span className="text-[11px] text-slate-400 block">Member Since</span>
                <span className="text-sm font-semibold text-white">{currentUser.joinedDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={onLogout}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
              >
                Log Out of Account
              </button>

              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
