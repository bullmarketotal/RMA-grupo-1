import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const ConfirmationPopover = ({ children, onConfirm, onCancel }) => {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="focus:outline-none flex items-center justify-center">
            {children}
          </PopoverButton>
          <PopoverPanel className="absolute z-10 mt-2 w-64 normal-bg border-neutral-300 rounded-md shadow-lg">
            <div className="p-4">
              <h3 className="normal-text text-lg font-semibold">
                ¿Estás seguro de eliminar el elemento?
              </h3>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => {
                    onCancel();
                    close();
                  }}
                  className="px-3 py-1.5 text-sm text-neutral-700 bg-neutral-200 rounded-md hover:bg-neutral-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    close();
                  }}
                  className="px-3 py-1.5 text-sm text-neutral-50 bg-red-600 rounded-md hover:bg-red-700"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default ConfirmationPopover;
