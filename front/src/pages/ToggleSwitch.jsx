import React from "react";
import { Switch } from "@headlessui/react";

const ToggleSwitch = ({ item, isEnabled, toggleItem }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span>{item.name}</span>
      <Switch
        checked={isEnabled}
        onChange={() => toggleItem(item.id)}
        className={`${isEnabled ? "bg-blue-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Toggle item</span>
        <span
          className={`${isEnabled ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full transition`}
        />
      </Switch>
    </div>
  );
};

export default ToggleSwitch;
