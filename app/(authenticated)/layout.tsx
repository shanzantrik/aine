import { createClient } from '@/lib/auth'
import { MainLayout } from '@/components/layout/main-layout'
import { ThemeProvider } from '@/contexts/theme-context'
import { redirect } from 'next/navigation'

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user details from users table
  const { data: userData } = await supabase
    .from('users')
    .select('name, role, designation')
    .eq('id', user.id)
    .single()

  if (!userData) {
    redirect('/login')
  }

  return (
    <ThemeProvider>
      <MainLayout user={userData}>
        {children}
      </MainLayout>
    </ThemeProvider>
  )
}
