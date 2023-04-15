import { FC } from "react";

interface Props {
  lightMode: "light" | "dark";
}

export const Footer: FC<Props> = ({ lightMode }) => {
  const textColor = lightMode === "light" ? "text-black" : "text-white";
  const hoverColor = lightMode === "light" ? "hover:text-gray-800" : "hover:text-gray-300";
  const bgColor = lightMode === "light" ? "bg-orange-200" : "bg-orange-500";

  return (
    <div className={`flex h-[30px] sm:h-[50px] py-2 px-8 items-center sm:justify-between justify-center ${bgColor}`}>
      <a
        href="https://twitter.com/garyjokeeffe"
        target="_blank"
        rel="noopener noreferrer"
        className={`text-center ${textColor} ${hoverColor}`}
      >
        Send me bugs on Twitter!
      </a>
    </div>
  );
};
