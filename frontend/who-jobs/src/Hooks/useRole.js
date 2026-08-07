import { useState } from "react";
import { content } from "../Utils/content";

export function useRole(initialRole = "candidato") {
  const [role, setRole] = useState(initialRole);
  const data = content[role] || content.candidato || {}

  return { role, setRole, data };
}
