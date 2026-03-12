'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Crown } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else if (result?.ok) {
        router.push('/');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0D1117 0%, #0a2a1a 50%, #0D1117 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-kin-gold/20 mb-5">
            <Crown size={32} className="text-kin-gold" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl font-bold text-white tracking-wide">
              KIN <span className="text-kin-gold">HOME</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm mt-3 tracking-wide">Sales Training Portal</p>
          <p className="text-gray-500 text-xs mt-1">Griffin Hill Sales System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-kin-black mb-6">
            Sign In
          </h2>

          {error && (
            <div className="mb-6 flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@kinhome.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-kin-green focus:ring-1 focus:ring-kin-green/20 focus:outline-none transition text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-kin-green focus:ring-1 focus:ring-kin-green/20 focus:outline-none transition text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-lg transition mt-2 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #006039, #007a49)' }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2.5 uppercase tracking-wider font-medium">Demo Credentials</p>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p><span className="text-gray-400">Admin:</span> admin@kinhome.com / kinhome2024</p>
              <p><span className="text-gray-400">Rep:</span> rep@kinhome.com / trainme</p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-[10px] mt-8 tracking-wider uppercase">
          KIN Home &copy; 2024
        </p>
      </div>
    </div>
  );
}
