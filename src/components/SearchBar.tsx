import { cn } from "@/utils/cn";
import React, { ChangeEvent, FormEvent } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

export default function SearchBox(props: Props) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(e);
    }
  };

  return (
    <form
      className={cn(
        "flex  items-center justify-center h-10 ",
        props.className
      )}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search location... "
        className="text-gray-500 px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
        value={props.value}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full"
      >
        <IoSearch />
      </button>
    </form>
  );
}
