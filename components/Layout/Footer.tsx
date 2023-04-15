import { FC } from "react";

interface Props {
  lightMode: "light" | "dark";
}

export const Footer: FC<Props> = ({ lightMode }) => {
  const textColor = lightMode === "light" ? "text-blue-900" : "text-blue-100";
  const hoverColor = lightMode === "light" ? "hover:text-blue-800" : "hover:text-blue-200";
  const bgColor = lightMode === "light" ? "bg-orange-200" : "bg-orange-700";

  return (
    <div className={`flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center justify-center ${bgColor}`}>
      <a
        href="https://twitter.com/garyjokeeffe"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor} text-center`}
      >
        Report bad advice on Twitter!
      </a>
    </div>
  );
};

