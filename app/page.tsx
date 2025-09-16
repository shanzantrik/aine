import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Users,
  GraduationCap,
  DollarSign,
  Package,
  BarChart3,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      title: 'B.Sc. Nursing Programme',
      description: '4-year undergraduate degree program with 100 seats available. Minimum 50% in Higher Secondary Science group required.',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Post Basic B.Sc. Nursing',
      description: '2-year program for GNM graduates. 25 seats available. Requires GNM certificate with 45% and above.',
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'M.Sc. Nursing Programme',
      description: '2-year master\'s program with 4 specialties: Medical-Surgical, Community Health, Obstetrics & Gynecological, and Child Health Nursing.',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'GNM Programme',
      description: 'General Nursing and Midwifery program preparing students for comprehensive nursing care and midwifery practice.',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Nurse Practitioner in Critical Care',
      description: '2-year residential program for B.Sc. nurses with 1 year clinical experience. 10 seats available.',
      icon: BarChart3,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Affiliated & Recognized',
      description: 'Affiliated to Srimanta Sankaradeva University of Health Sciences and recognized by Indian Nursing Council.',
      icon: Shield,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ]

  const benefits = [
    {
      title: 'Streamlined Operations',
      description: 'Automate routine tasks and reduce manual work',
      icon: CheckCircle
    },
    {
      title: 'Real-time Data',
      description: 'Access up-to-date information across all modules',
      icon: Clock
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Generate detailed reports for better decision making',
      icon: BarChart3
    },
    {
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with data protection',
      icon: Shield
    }
  ]

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
              <Link href="/login">
                <button className="btn-secondary">Login</button>
              </Link>
              <Link href="/register">
                <button className="btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Asian Institute of
              <span className="gradient-text block"> Nursing Education (AINE)</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empowering Northeast India with world-class nursing education.
              From B.Sc. Nursing to M.Sc. programs, we prepare compassionate
              healthcare professionals for tomorrow&apos;s challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Access Dashboard
                </button>
              </Link>
              <Link href="#features">
                <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Nurses Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Proud Northeast Indian Nurses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the compassionate healthcare professionals who make a difference in our communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
                  <Users className="h-20 w-20 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Excellence</h3>
              <p className="text-gray-600">Our nurses are trained with the highest standards of care and compassion</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-20 w-20 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Impact</h3>
              <p className="text-gray-600">Serving Northeast India with dedication and commitment to healthcare</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-20 w-20 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Education</h3>
              <p className="text-gray-600">Comprehensive programs that prepare nurses for real-world challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Nursing Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive nursing education programs designed for Northeast India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="stats-card card-hover">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose NIMS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for nursing institutes with modern technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Institute?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of nursing institutes already using NIMS to streamline
            their operations and improve efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">AINE</span>
            </div>
            <p className="text-gray-400 mb-4">
              © 2025 The Asian Institute of Nursing Education. Developed by Shantanu Goswami
            </p>
            <p className="text-sm text-gray-500">
              Empowering Northeast India with World-Class Nursing Education
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
