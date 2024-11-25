import React from "react";
import { Switch } from "@headlessui/react";

const TogglePanel = ({ items, enabledItems, toggleItem }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center py-2">
          <div className="flex items-center w-full">
            {" "}
            <span className="block font-medium mr-2">{item.descripcion}</span>
            <Switch
              checked={enabledItems[item.id]}
              onChange={() => toggleItem(item.id)}
              className={`${enabledItems[item.id] ? "bg-sky-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Toggle item</span>
              <span
                className={`${enabledItems[item.id] ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TogglePanel;
