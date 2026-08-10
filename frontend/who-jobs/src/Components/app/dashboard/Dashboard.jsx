import CandidateView from './CandidateView'
import RecruiterView from './RecruiterView'
import AdminView from './AdminView'

// Simulación para probar el dashboard sin backend
const user = {
  role: 'CANDIDATE', // 'CANDIDATE' | 'RECRUITER' | 'ADMIN'
}

export default function Dashboard() {
  switch (user.role) {
    case 'ADMIN':
      return <AdminView />

    case 'RECRUITER':
      return <RecruiterView />

    case 'CANDIDATE':
    default:
      return <CandidateView />
  }
}