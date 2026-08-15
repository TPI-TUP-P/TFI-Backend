import React from "react";
import JobCard from "./JobCard";

const JobCardList = ({ jobs, onDelete, appliedJobIds, onApplied }) => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 p-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          appliedJobIds={appliedJobIds}
          onApplied={onApplied}
        />
      ))}
    </div>
  );
};

export default JobCardList;