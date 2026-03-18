'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

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
      style={{ background: '#070A0E' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="editorial-headline text-3xl text-white tracking-wide">
            KIN <span className="text-kin-gold">HOME</span>
          </h1>
          <p className="text-white/25 text-xs mt-3 uppercase tracking-[0.2em]">Sales Training Portal</p>
        </div>

        {/* Login form */}
        <div className="bg-white/[0.03] rounded-lg p-8" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          {error && (
            <div className="mb-6 flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@kinhome.com"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/8 rounded-md text-white placeholder-white/20 focus:border-kin-gold/40 focus:outline-none transition text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-white/30 mb-2 uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/8 rounded-md text-white placeholder-white/20 focus:border-kin-gold/40 focus:outline-none transition text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-medium py-3 rounded-md transition mt-2 disabled:opacity-50 bg-kin-green hover:bg-kin-green-light text-sm"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] text-white/20 mb-2 uppercase tracking-[0.15em]">Demo Credentials</p>
            <div className="space-y-1 text-xs text-white/30">
              <p><span className="text-white/15">Admin:</span> admin@kinhome.com / kinhome2024</p>
              <p><span className="text-white/15">Rep:</span> rep@kinhome.com / trainme</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
