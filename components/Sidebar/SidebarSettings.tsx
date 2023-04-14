import { IconMoon, IconSun } from "@tabler/icons-react";
import { FC } from "react";
import { SidebarButton } from "./SidebarButton";

interface Props {
	lightMode: "light" | "dark";
	onToggleLightMode: (mode: "light" | "dark") => void;
}

export const SidebarSettings: FC<Props> = ({ lightMode, onToggleLightMode }) => {
	const themeClass = lightMode === "light" ? "orange-theme" : "black-theme";

	return (
		<div className={`flex flex-col items-center border-t border-neutral-500 py-4 ${themeClass}`}>
			<SidebarButton
				text={lightMode === "light" ? "orange-theme" : "black-theme"}
				icon={lightMode === "light" ? <IconMoon /> : <IconSun />}
				onClick={() => onToggleLightMode(lightMode === "light" ? "dark" : "light")}
			/>
		</div>
	);
};
