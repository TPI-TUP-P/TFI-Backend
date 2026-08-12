import React, { useEffect, useState } from "react";
import JobCardList from "../Components/jobs/JobCardList";
import Pagination from "../Components/jobs/Pagination";
import ProfileCard from "../Components/profile/ProfileCard";
import { jobService } from "../Services/job.service";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobs = async (page = 1) => {
      try {
        const response = await jobService.getJobs(page);
        console.log("RESPUESTA API:", response);

        setJobs(response.items);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs(currentPage);
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-brand-bg py-8">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6">

        {/* Columna izquierda: perfil */}
        <div className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-8">
            <ProfileCard />
          </div>
        </div>

        {/* Columna derecha: jobs */}
        <div className="min-w-0 flex-1">
          <h1 className="mb-6 text-3xl font-bold text-brand-title">
            Ofertas de trabajo
          </h1>

          <JobCardList jobs={jobs} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>
    </main>
  );
};

export default JobsPage;