import { useCallback, useEffect, useState } from "react";
import { postulationService } from "../Services/postulation.service";
import { useAuthStore } from "../Components/stores/useAuthStore";

export const usePostulatedJobs = () => {
  const user = useAuthStore((state) => state.user);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setLoaded(true);
      return;
    }
    try {
      const postulations = await postulationService.getByUser(user.id);
      setAppliedJobIds(new Set(postulations.map((p) => p.jobOfferId)));
    } catch (error) {
      console.error("Error fetching user postulations:", error);
    } finally {
      setLoaded(true);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markApplied = (jobId) => {
    setAppliedJobIds((prev) => new Set(prev).add(jobId));
  };

  return { appliedJobIds, loaded, refresh, markApplied };
};