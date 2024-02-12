/** @format */
import { cn } from "@/utils/cn";
import React from 'react';

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {}

function Container(props: ContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full rounded-xl  flex py-4 shadow-lg px-3 mx-auto",
        props.className
      )}
      style={{
        background: 'linear-gradient(180deg, rgba(135, 206, 235, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', 
      }}
    ></div>
  );
}

export default Container;
