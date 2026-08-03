import { useState } from "react";
import { content } from "../Utils/content";

export function useRole(initialRole = "candidato") {
  const [role, setRole] = useState(initialRole);
  const data = content[role];

  return { role, setRole, data };
}
