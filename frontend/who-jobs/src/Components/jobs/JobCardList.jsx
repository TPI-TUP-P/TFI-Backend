import React from "react";
import JobCard from "./JobCard";

const JobCardList = ({ jobs, onDelete, appliedJobsMap, onApplied, onUnapplied }) => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 p-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          appliedJobsMap={appliedJobsMap}
          onApplied={onApplied}
          onUnapplied={onUnapplied}
        />
      ))}
    </div>
  );
};

export default JobCardList;