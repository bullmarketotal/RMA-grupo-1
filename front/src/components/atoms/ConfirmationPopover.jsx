import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const ConfirmationPopover = ({ onConfirm, onCancel }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="px-4 py-2 bg-sky-600 text-neutral-50 rounded-md">
        Eliminar
      </PopoverButton>
      <PopoverPanel className="absolute z-10 mt-2 w-64 bg-neutral-50 border border-neutral-300 rounded-md shadow-lg">
        <div className="p-4">
          <h3 className="text-lg font-semibold">¿Estás seguro?</h3>
          <p className="text-sm text-neutral-600">mensaje acá....asd.</p>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-sm text-neutral-700 bg-neutral-200 rounded-md hover:bg-neutral-300"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1.5 text-sm text-neutral-50 bg-red-600 rounded-md hover:bg-red-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default ConfirmationPopover;
