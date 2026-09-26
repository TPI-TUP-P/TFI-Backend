import { useCallback, useEffect, useState } from "react";
import { postulationService } from "../Services/postulation.service";
import { useAuthStore } from "../Components/stores/useAuthStore";

export const usePostulatedJobs = () => {
  const user = useAuthStore((state) => state.user);
  // Map<jobOfferId, { postulationId, state }>
  const [appliedJobsMap, setAppliedJobsMap] = useState(new Map());

  const refresh = useCallback(async () => {
    if (!user) return;
    try {
      const postulations = await postulationService.getByUser(user.id);
      const map = new Map(
        postulations.map((p) => [p.jobOfferId, { postulationId: p.id, state: p.state }])
      );
      setAppliedJobsMap(map);
    } catch (error) {
      console.error("Error fetching user postulations:", error);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markApplied = (jobId, postulationId) => {
    setAppliedJobsMap((prev) =>
      new Map(prev).set(jobId, { postulationId, state: 0 })
    );
  };

  const removeApplication = (jobId) => {
    setAppliedJobsMap((prev) => {
      const next = new Map(prev);
      next.delete(jobId);
      return next;
    });
  };

  return { appliedJobsMap, refresh, markApplied, removeApplication };
};