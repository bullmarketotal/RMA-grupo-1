import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TogglePanel from "./TogglePanel";

const UsersDisclosure = ({ users, roles }) => {
  const [usersRoles, setUsersRoles] = useState(
    users.reduce((acc, user) => {
      acc[user.id] = roles.reduce((roleAcc, role) => {
        roleAcc[role.id] = false;
        return roleAcc;
      }, {});
      return acc;
    }, {})
  );

  const toggleRole = (userId, roleId) => {
    setUsersRoles((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        [roleId]: !prevState[userId][roleId],
      },
    }));

    if (!usersRoles[userId][roleId]) {
      console.log(`Assign role ${roleId} to user ${userId}`);
    } else {
      console.log(`Revoke role ${roleId} from user ${userId}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {users.map((user) => (
        <Disclosure key={user.id} as="div" className="p-6">
          {({ open }) => (
            <>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-900 group-hover:text-gray-700">
                  {user.username}
                </span>
                <ChevronDownIcon
                  className={`size-5 fill-gray-600 group-hover:fill-gray-400 ${open ? "rotate-180 transform" : ""}`}
                />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-gray-500">
                <TogglePanel
                  items={roles}
                  enabledItems={usersRoles[user.id]}
                  toggleItem={(roleId) => toggleRole(user.id, roleId)}
                />
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default UsersDisclosure;
