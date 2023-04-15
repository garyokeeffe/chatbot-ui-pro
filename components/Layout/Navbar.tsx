import { FC } from "react";

interface Props {
  lightMode: "light" | "dark";
}

export const Navbar: FC<Props> = ({ lightMode }) => {
  const bgColor = lightMode === "light" ? "bg-orange-500" : "bg-black";
  const textColor = lightMode === "light" ? "text-white" : "text-orange-500";
  
  return (
    <div className={`flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between ${bgColor} ${textColor}`}>
      <div className="font-bold text-3xl flex items-center">
        <a
          className="ml-2 hover:opacity-50"
          href="https://code-scaffold.vercel.app"
        >
          satGPT
        </a>
      </div>
    </div>
  );
};
