import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Input from "../ui/Input";
import { jobService } from "../../Services/job.service";
import { Link } from "react-router-dom";

const AppSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const timer = useRef(null);
  // useEffect(() => {
  //   const searchJobs = async () => {
  //     try {
  //       var result = await jobService.getJobs(1, searchValue);
  //       setJobs(result?.items);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   searchJobs();
  // }, [searchValue]);

  const handleNavigate = ()=> {
    setSearchValue("");
    setJobs([])
  }

  const handleChange = async(e) => {
    const value = e.target.value;
    console.log(value)
    setSearchValue(value);

    clearTimeout(timer.current);

    if (!value.trim()) {
      setJobs([]);
      return;
    }try {
      
      timer.current = setTimeout(async () => {
        const res = await jobService.getJobsBySearch(1, searchValue);
        setJobs(res.items);
      }, 300);
    } catch (error) {
      console.log(error, "error")
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <Search
        size={14}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-brand-muted"
      />
      <Input
        placeholder="Buscar..."
        value={searchValue}
        onChange={handleChange}
        classname="pl-9 py-2 text-xs rounded-full"
      />

      {searchValue && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-brand-border bg-brand-card shadow-lg shadow-brand-title/10">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <Link
                key={job.id}
                onClick={() => handleNavigate()}
                to={`/jobs/${job.id}`}
                className="flex w-full items-center justify-between gap-3 border-b border-brand-border px-4 py-3 text-left last:border-0 hover:bg-brand-bg"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-brand-title">
                    {job.job_position}
                  </p>
                  <p className="truncate text-xs text-brand-muted">
                    {job.applicants} postulantes
                  </p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-brand-accent">
                  ${job.salary}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-3 text-xs text-brand-muted">Sin resultados</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppSearch;
