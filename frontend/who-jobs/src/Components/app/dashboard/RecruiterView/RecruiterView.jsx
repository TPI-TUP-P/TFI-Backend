import RecruiterWelcome from './RecruiterWelcome'
import RecruiterStats from './RecruiterStats'
import RecruiterJobs from './RecruiterJobs'
import RecruiterActivity from './RecruiterActivity'
import { useRecruiterDashboard } from '../../../../Hooks/useRecruiterDashboard'

export default function RecruiterView() {
  const {
    profile,
    jobs,
    totalPublications,
    totalApplicants,
    postulationStats,
    loading,
    error,
  } = useRecruiterDashboard()

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#355872]" />

          <p className="mt-3 text-sm text-slate-500">
            Preparando tu panel...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-700">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <RecruiterWelcome
        name={profile.name}
        totalPublications={totalPublications}
      />

      <RecruiterStats
        totalPublications={totalPublications}
        totalApplicants={totalApplicants}
        visibleJobs={jobs.length}
        postulationStats={postulationStats}
      />

      <RecruiterJobs jobs={jobs} />

      <RecruiterActivity jobs={jobs} />

    </div>
  )
}