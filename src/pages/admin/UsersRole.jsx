import { useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full access to the administration panel.",
      users: 2,
    },
    {
      id: 2,
      name: "Manager",
      description: "Can manage users and compliance data.",
      users: 5,
    },
    {
      id: 3,
      name: "User",
      description: "Standard user access.",
      users: 25,
    },
  ]);

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Roles</h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage user roles and permissions.
          </p>
        </div>

        <button className="bg-[#091122] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800">
          + Add Role
        </button>
      </div>

      {/* Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white border border-slate-200 rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center">
                <span className="text-lg font-bold text-slate-700">
                  {role.name.charAt(0)}
                </span>
              </div>

              <button className="text-slate-400 hover:text-slate-700">
                •••
              </button>
            </div>

            <h2 className="font-semibold text-lg text-slate-900 mt-5">
              {role.name}
            </h2>

            <p className="text-sm text-slate-500 mt-2 min-h-[40px]">
              {role.description}
            </p>

            <div className="border-t mt-5 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Users</p>

                <p className="font-semibold text-slate-800">{role.users}</p>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1.5 border rounded-lg text-xs">
                  Edit
                </button>

                {role.name !== "Admin" && (
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
