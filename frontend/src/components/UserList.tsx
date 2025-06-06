import React, { useState } from "react";
import { userApi, User } from "../services/api";
import Spinner from "./Spinner";
import { useUserContext } from "../context/UserContext";

export default function UserList() {
  const { users, loading, error, refreshUsers } = useUserContext();

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<Partial<User>>({});
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
  });
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError(null);
    try {
      await userApi.createUser(newUser);
      setNewUser({ firstName: "", lastName: "", email: "", age: 0 });
      await refreshUsers();
    } catch {
      setCreateError("Failed to create user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userApi.deleteUser(id);
      await refreshUsers();
    } catch {
      // Optionally handle error locally if needed
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUserId) return;
    try {
      await userApi.updateUser(editingUserId, editUser);
      setEditingUserId(null);
      setEditUser({});
      await refreshUsers();
    } catch {
      // Optionally handle error locally if needed
    }
  };

  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setEditUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
    });
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Create User Form */}
      <form onSubmit={handleCreateUser} className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        {createError && (
          <div className="text-red-500 mb-2" role="alert">
            {createError}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={newUser.age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, age: parseInt(e.target.value) })
            }
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </form>

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded">
            {editingUserId === user.id ? (
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={editUser.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditUser({ ...editUser, firstName: e.target.value })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={editUser.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditUser({ ...editUser, lastName: e.target.value })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editUser.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={editUser.age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditUser({
                        ...editUser,
                        age: parseInt(e.target.value),
                      })
                    }
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingUserId(null);
                      setEditUser({});
                    }}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">Age: {user.age}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}