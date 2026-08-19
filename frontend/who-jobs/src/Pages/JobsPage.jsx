import React, { useEffect, useState } from "react";
import JobCardList from "../Components/jobs/JobCardList";
import Pagination from "../Components/jobs/Pagination";
import ProfileCard from "../Components/profile/ProfileCard";
import CreateJobModal from "../Components/jobs/CreateJobModal";
import { jobService } from "../Services/job.service";
import { useAuthStore } from "../Components/stores/useAuthStore";
import { usePostulatedJobs } from "../Hooks/usePostulatedJobs";

const ROLE_PERMITIDOS=[1, 2, 3]; // Recluter, Admin, SuperAdmin

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  

  const { appliedJobIds, markApplied } = usePostulatedJobs();

  const fetchJobs = async (page = 1) => {
    try {
      const response = await jobService.getJobs(page);
      setJobs(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const handleJobCreated = () => {
    setCurrentPage(1);
    fetchJobs(1);
  };

  const handleDeleteJob = async (id) => {
    try {
      await jobService.remove(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      alert("No se pudo eliminar la publicación. Intentá de nuevo.");
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg py-8">
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-6">

        <div className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-8">
            <ProfileCard />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-brand-title">
              Ofertas de trabajo
            </h1>
            {ROLE_PERMITIDOS.includes(useAuthStore.getState().user?.role) && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-title"
            >
              + Crear publicación
            </button>
            )}
          
          </div>

          <JobCardList
            jobs={jobs}
            onDelete={handleDeleteJob}
            appliedJobIds={appliedJobIds}
            onApplied={markApplied}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

      </div>

      {showCreateModal && (
        <CreateJobModal
          onClose={() => setShowCreateModal(false)}
          onCreated={handleJobCreated}
        />
      )}
    </main>
  );
};

export default JobsPage;