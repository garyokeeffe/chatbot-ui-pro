import { OpenAIModel, OpenAIModelNames } from "@/types";
import { FC } from "react";

interface Props {
  model: OpenAIModel;
  onModelSelect: (model: OpenAIModel) => void;
  
}

export const ModelSelect: FC<Props> = ({ model, onModelSelect }) => {
  return (
    <div className="flex flex-col">
      <label className="text-left mb-2 dark:text-neutral-400 text-neutral-700">Assistant</label>
      <select
        className="w-[300px] p-3 dark:text-white dark:bg-[#343541] border border-neutral-500 rounded-lg appearance-none focus:shadow-outline text-neutral-900 cursor-pointer"
        placeholder="Select a model"
        value={model}
        onChange={(e) => onModelSelect(e.target.value as OpenAIModel)}
      >
        {Object.entries(OpenAIModelNames).map(([value, name]) => (
          <option
            key={value}
            value={value}
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
