import { Search } from "lucide-react";
import React from "react";
import Input from "../ui/Input";

const AppSearch = () => {


  return (
    <div className="relative w-full max-w-xs">
      <Search
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
      />
      <Input
        placeholder="Buscar..."
        classname="pl-9 py-2 text-xs rounded-full"
      />
    </div>
  );
};

export default AppSearch;
