import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'admin' | 'principal' | 'faculty' | 'accountant' | 'clerk' | 'student'
          designation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: 'admin' | 'principal' | 'faculty' | 'accountant' | 'clerk' | 'student'
          designation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'principal' | 'faculty' | 'accountant' | 'clerk' | 'student'
          designation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      students: {
        Row: {
          id: string
          admission_no: string
          name: string
          dob: string
          course_id: string
          year: number
          fees_status: 'pending' | 'paid' | 'partial'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          admission_no: string
          name: string
          dob: string
          course_id: string
          year: number
          fees_status?: 'pending' | 'paid' | 'partial'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          admission_no?: string
          name?: string
          dob?: string
          course_id?: string
          year?: number
          fees_status?: 'pending' | 'paid' | 'partial'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          name: string
          duration: number
          syllabus_doc: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          duration: number
          syllabus_doc?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          duration?: number
          syllabus_doc?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          student_id: string
          course_id: string
          date: string
          type: 'theory' | 'practical'
          status: 'present' | 'absent' | 'late'
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          date: string
          type: 'theory' | 'practical'
          status: 'present' | 'absent' | 'late'
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          date?: string
          type?: 'theory' | 'practical'
          status?: 'present' | 'absent' | 'late'
          created_at?: string
        }
      }
      faculty: {
        Row: {
          id: string
          name: string
          designation: string
          salary: number
          leave_balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          designation: string
          salary: number
          leave_balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          designation?: string
          salary?: number
          leave_balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      leaves: {
        Row: {
          id: string
          faculty_id: string
          date_from: string
          date_to: string
          reason: string
          status: 'pending' | 'approved' | 'rejected'
          substitute_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          faculty_id: string
          date_from: string
          date_to: string
          reason: string
          status?: 'pending' | 'approved' | 'rejected'
          substitute_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          faculty_id?: string
          date_from?: string
          date_to?: string
          reason?: string
          status?: 'pending' | 'approved' | 'rejected'
          substitute_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      salary: {
        Row: {
          id: string
          faculty_id: string
          month: string
          base_salary: number
          deductions: number
          net_salary: number
          created_at: string
        }
        Insert: {
          id?: string
          faculty_id: string
          month: string
          base_salary: number
          deductions: number
          net_salary: number
          created_at?: string
        }
        Update: {
          id?: string
          faculty_id?: string
          month?: string
          base_salary?: number
          deductions?: number
          net_salary?: number
          created_at?: string
        }
      }
      fees: {
        Row: {
          id: string
          student_id: string
          amount: number
          due_date: string
          paid: boolean
          receipt_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          amount: number
          due_date: string
          paid?: boolean
          receipt_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          amount?: number
          due_date?: string
          paid?: boolean
          receipt_url?: string | null
          created_at?: string
        }
      }
      stock_items: {
        Row: {
          id: string
          name: string
          description: string | null
          qty_available: number
          unit_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          qty_available: number
          unit_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          qty_available?: number
          unit_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      requisitions: {
        Row: {
          id: string
          item_id: string
          qty: number
          requester_id: string
          status: 'pending' | 'approved' | 'rejected'
          approved_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          item_id: string
          qty: number
          requester_id: string
          status?: 'pending' | 'approved' | 'rejected'
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          item_id?: string
          qty?: number
          requester_id?: string
          status?: 'pending' | 'approved' | 'rejected'
          approved_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          category: string
          description: string
          amount: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          description: string
          amount: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          description?: string
          amount?: number
          date?: string
          created_at?: string
        }
      }
      collections: {
        Row: {
          id: string
          student_id: string
          fee_type: string
          amount: number
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          fee_type: string
          amount: number
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          fee_type?: string
          amount?: number
          date?: string
          created_at?: string
        }
      }
    }
  }
}
