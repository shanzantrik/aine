'use client'

import { useTheme } from '@/contexts/theme-context'

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2025 The Asian Institute of Nursing Education. Developed by Shantanu Goswami
        </div>
      </div>
    </footer>
  )
}
