import { FC } from "react";

interface Props {
  text: string;
  lightMode: "light" | "dark";
  icon: JSX.Element;
  onClick: () => void;
}

export const SidebarButton: FC<Props> = ({ text, lightMode, icon, onClick }) => {
  const textColor = lightMode === "light" ? "bg-orange-500" : "bg-black";
  const borderColor = lightMode === "light" ? "border-orange-500" : "border-black";
  const hoverBgColor = lightMode === "light" ? "hover:bg-black" : "hover:bg-orange-500";
  const hoverTextColor = lightMode === "light" ? "hover:text-orange-500" : "hover:text-black";

  return (
    <div
      className={`flex py-2 px-4 rounded-md cursor-pointer w-[200px] items-center text-white border-2 ${borderColor} ${textColor} ${hoverBgColor} ${hoverTextColor}`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <div>{text}</div>
    </div>
  );
};
