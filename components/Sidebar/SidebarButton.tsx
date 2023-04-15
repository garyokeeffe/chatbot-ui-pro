import { FC } from "react";

interface Props {
  text: string;
	lightMode: "light" | "dark";
  icon: JSX.Element;
  onClick: () => void;
}

export const SidebarButton: FC<Props> = ({ text, lightMode, icon, onClick }) => {
  const textColor = lightMode === "light" ? "text-orange-500" : "text-black";
  const borderColor = lightMode === "light" ? "border-orange-500" : "border-black";
  const hoverBgColor = lightMode === "light" ? "hover:bg-black" : "hover:bg-orange-500";
  const hoverTextColor = lightMode === "light" ? "hover:text-orange-500" : "hover:text-black";

	const themeClass = lightMode === "light" ? "orange-theme" : "black-theme";
  return (
    <div
      className={`flex py-2 px-4 rounded-md cursor-pointer w-[200px] items-center  ${borderColor} ${textColor} ${hoverBgColor} ${hoverTextColor}`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <div>{text}</div>
    </div>
  );
};
