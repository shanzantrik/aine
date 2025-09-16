'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/footer'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        console.log('Login successful, user:', data.user.id)

        // Wait for the session to be properly established
        await new Promise(resolve => setTimeout(resolve, 100))

        // Try to get user role from users table, but don't fail if user doesn't exist
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()

        // If user doesn't exist in users table, that's okay - they can still login
        // The role will be handled by the middleware and dashboard
        if (userError && userError.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is acceptable
          console.warn('Could not fetch user role:', userError.message)
        }

        console.log('Login successful, redirecting to dashboard...')

        // Use window.location for a full page reload to ensure session is properly established
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">AINE</h1>
                <p className="text-sm text-gray-300">The Asian Institute of Nursing Education</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/">
                <button className="btn-secondary">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h2 className="mt-6 text-4xl font-bold text-white">
            AINE Login
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            The Asian Institute of Nursing Education
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Sign in to your account</h3>
            <p className="text-gray-300">
              Enter your email and password to access the system
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300">
              Don&apos;t have an account?{' '}
              <Link href="/contact" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Contact administrator
              </Link>
            </p>
            <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-200 font-medium">Need Help?</p>
              <p className="text-xs text-blue-300">Contact: info@aine.org.in</p>
              <p className="text-xs text-blue-300">Phone: +91 8254036679</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
