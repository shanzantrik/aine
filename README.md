# NIMS - Nursing Institute Management System

A comprehensive management system built with Next.js 15 and Supabase for nursing institutes.

## Features

### 🏥 Core Modules

- **Student Management**: Admissions, records, attendance tracking
- **Faculty & Staff Management**: Profiles, workload, leave management
- **Finance Management**: Fees, expenses, salary processing
- **Stock Management**: Digital stock register, requisitions
- **Reports & Analytics**: Comprehensive reporting system

### 🔐 Authentication & Security

- Role-based access control (Admin, Principal, Faculty, Accountant, Clerk, Student)
- Secure authentication with Supabase Auth
- Row-level security (RLS) for data protection

### 📊 Dashboard Features

- Role-specific dashboards
- Real-time statistics and analytics
- Quick action buttons
- Recent activity tracking

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Shadcn/ui, Radix UI
- **Data Fetching**: React Query
- **Charts**: Recharts
- **PDF Generation**: jsPDF, html2canvas
- **Excel Export**: xlsx

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nims
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Get your project URL and anon key

4. **Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The system uses the following main tables:

- `users` - User accounts and roles
- `students` - Student information and records
- `courses` - Course definitions
- `faculty` - Faculty and staff information
- `attendance` - Student attendance records
- `leaves` - Faculty leave applications
- `salary` - Salary management
- `fees` - Fee collection and tracking
- `stock_items` - Inventory items
- `requisitions` - Material requisitions
- `expenses` - Institute expenses
- `collections` - Fee payments
- `student_cumulative_records` - Academic records

## User Roles

### Admin

- Full system access
- User management
- System configuration

### Principal

- Approvals and reporting
- Faculty management
- Financial oversight

### Faculty

- Student management
- Attendance marking
- Leave applications
- Grade management

### Accountant

- Financial management
- Fee collection
- Expense tracking
- Salary processing

### Clerk

- Stock management
- Requisition processing
- Basic data entry

### Student

- View personal records
- Check attendance
- View grades
- Fee status

## Key Features

### Student Management

- **Admission Process**: Complete admission workflow with document verification
- **Cumulative Records**: Academic history, marks, certificates
- **Attendance Tracking**: Separate theory and practical attendance
- **Fee Management**: Fee collection and tracking

### Faculty Management

- **Profile Management**: Faculty information and qualifications
- **Leave Management**: Leave application and approval workflow
- **Workload Allocation**: Course assignments and duties
- **Salary Processing**: Automated salary calculations

### Finance Management

- **Fee Collection**: Student fee tracking and receipts
- **Expense Management**: Institute expense tracking
- **Salary Management**: Faculty salary processing
- **Financial Reports**: Comprehensive financial analytics

### Stock Management

- **Digital Stock Register**: Complete inventory management
- **Requisition System**: Material request workflow
- **Low Stock Alerts**: Automatic notifications
- **Usage Reports**: Item consumption tracking

### Reports & Analytics

- **Student Reports**: Attendance, academic performance
- **Financial Reports**: Revenue, expenses, profitability
- **Stock Reports**: Inventory levels, usage patterns
- **Administrative Reports**: Leave statistics, workload analysis

## API Endpoints

The system uses Supabase's auto-generated REST API. Key endpoints include:

- `GET /rest/v1/students` - Fetch students
- `POST /rest/v1/students` - Create student
- `GET /rest/v1/attendance` - Fetch attendance
- `POST /rest/v1/attendance` - Mark attendance
- `GET /rest/v1/leaves` - Fetch leave applications
- `POST /rest/v1/leaves` - Create leave application

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Create an issue in the repository
- Contact: [Your Email]

## Acknowledgments

- Built with Next.js and Supabase
- UI components from Shadcn/ui
- Icons from Lucide React
- Inspired by modern nursing institute management needs

---

**NIMS** - Streamlining Nursing Institute Management
