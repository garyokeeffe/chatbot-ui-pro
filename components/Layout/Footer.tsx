import { FC } from "react";

interface Props {
  lightMode: "light" | "dark";
}

export const Footer: FC<Props> = ({ lightMode }) => {
  const textColor = lightMode === "light" ? "text-blue-500" : "text-blue-300";
  const hoverColor = lightMode === "light" ? "hover:text-blue-600" : "hover:text-blue-400";

  return (
    <div className="flex h-[30px] sm:h-[50px] border-t border-neutral-300 py-2 px-8 items-center sm:justify-between justify-center">
      <a
        href="https://twitter.com/garyjokeeffe"
        target="_blank"
        rel="noopener noreferrer"
        className={`${textColor} ${hoverColor}`}
      >
        Follow me on Twitter
      </a>
    </div>
  );
};
