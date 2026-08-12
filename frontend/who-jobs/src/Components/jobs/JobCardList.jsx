import React from 'react'
import JobCard from './CardJob'

const JobCardList = ({jobs}) => {

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 p-6">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
    </div>
  )
}

export default JobCardList