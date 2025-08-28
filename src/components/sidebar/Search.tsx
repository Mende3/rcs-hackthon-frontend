"use client";

import React, { useState } from "react";
import { FiCommand, FiSearch } from "react-icons/fi";
import { CommandMenu } from "./CommandMenu";

type CommandMenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Search: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-stone-200 mb-4 relative rounded flex items-center px-2 py-1.5 text-sm">
        <FiSearch className="mr-2" />
        <input
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.blur();
            setOpen(true);
          }}
          type="text"
          placeholder="Pesquisar"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />
        <span className="p-1 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-1.5 top-1/2 -translate-y-1/2">
          <FiCommand />K
        </span>
      </div>

      {/* Aqui já tipamos como CommandMenuProps */}
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};
