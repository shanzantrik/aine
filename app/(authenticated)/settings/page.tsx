'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  Edit,
  Key,
  Users,
  Building
} from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('general')
  const [isEditing, setIsEditing] = useState(false)

  const settingsData = {
    general: {
      instituteName: 'The Asian Institute of Nursing Education (AINE)',
      instituteCode: 'AINE2024',
      address: 'Guwahati, Assam, India',
      phone: '+91 8254036679',
      email: 'info@aine.org.in',
      website: 'www.aine.org.in',
      establishedYear: '2020',
      affiliation: 'Srimanta Sankaradeva University of Health Sciences',
      recognition: 'Indian Nursing Council'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      lowStockAlerts: true,
      paymentReminders: true,
      attendanceAlerts: true,
      systemUpdates: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      ipWhitelist: false,
      auditLogs: true
    },
    appearance: {
      theme: theme,
      primaryColor: 'blue',
      fontSize: 'medium',
      sidebarCollapsed: false,
      compactMode: false
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'system', name: 'System', icon: Database }
  ]

  const handleSave = () => {
    // Save settings logic here
    setIsEditing(false)
    console.log('Settings saved')
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Institute Information</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Basic information about the institute
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Institute Name
              </label>
              <Input
                value={settingsData.general.instituteName}
                disabled={!isEditing}
                className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Institute Code
              </label>
              <Input
                value={settingsData.general.instituteCode}
                disabled={!isEditing}
                className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Phone Number
              </label>
              <Input
                value={settingsData.general.phone}
                disabled={!isEditing}
                className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Email Address
              </label>
              <Input
                value={settingsData.general.email}
                disabled={!isEditing}
                className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Website
              </label>
              <Input
                value={settingsData.general.website}
                disabled={!isEditing}
                className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Established Year
              </label>
              <Input
                value={settingsData.general.establishedYear}
                disabled={!isEditing}
                className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Address
            </label>
            <Input
              value={settingsData.general.address}
              disabled={!isEditing}
              className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
            />
          </div>
        </CardContent>
      </Card>

      <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Affiliation & Recognition</CardTitle>
          <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Academic affiliations and recognitions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Affiliation
            </label>
            <Input
              value={settingsData.general.affiliation}
              disabled={!isEditing}
              className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Recognition
            </label>
            <Input
              value={settingsData.general.recognition}
              disabled={!isEditing}
              className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
      <CardHeader>
        <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Notification Preferences</CardTitle>
        <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Configure how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(settingsData.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'smsNotifications' && 'Receive notifications via SMS'}
                {key === 'pushNotifications' && 'Receive push notifications'}
                {key === 'lowStockAlerts' && 'Get alerts when stock is low'}
                {key === 'paymentReminders' && 'Receive payment reminder notifications'}
                {key === 'attendanceAlerts' && 'Get attendance-related alerts'}
                {key === 'systemUpdates' && 'Receive system update notifications'}
              </div>
            </div>
            <Switch checked={value} disabled={!isEditing} />
          </div>
        ))}
      </CardContent>
    </Card>
  )

  const renderSecuritySettings = () => (
    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
      <CardHeader>
        <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Security Settings</CardTitle>
        <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Manage security preferences and access controls
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Add an extra layer of security to your account
            </div>
          </div>
          <Switch checked={settingsData.security.twoFactorAuth} disabled={!isEditing} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Audit Logs</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Keep track of all system activities
            </div>
          </div>
          <Switch checked={settingsData.security.auditLogs} disabled={!isEditing} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>IP Whitelist</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Restrict access to specific IP addresses
            </div>
          </div>
          <Switch checked={settingsData.security.ipWhitelist} disabled={!isEditing} />
        </div>
      </CardContent>
    </Card>
  )

  const renderAppearanceSettings = () => (
    <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
      <CardHeader>
        <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Appearance Settings</CardTitle>
        <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Customize the look and feel of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Theme</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose between light and dark mode
            </div>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Compact Mode</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Use a more compact layout
            </div>
          </div>
          <Switch checked={settingsData.appearance.compactMode} disabled={!isEditing} />
        </div>
      </CardContent>
    </Card>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'security':
        return renderSecuritySettings()
      case 'appearance':
        return renderAppearanceSettings()
      case 'users':
        return (
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>User Management</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                User management features coming soon
              </div>
            </CardContent>
          </Card>
        )
      case 'system':
        return (
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>System Settings</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                System configuration and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                System settings coming soon
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your application settings and preferences
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Settings
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
