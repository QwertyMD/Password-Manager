import { Delete, Eye, EyeOff, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const StoredCredentials = ({ credentials, setCredentials }) => {
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    password: "",
    note: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("credentials");
    if (data) {
      setCredentials(JSON.parse(data));
    }
  }, []);

  const handleDelete = (index) => {
    const deleted = credentials[index];
    const newCredentials = credentials.slice();
    newCredentials.splice(index, 1);
    setCredentials(newCredentials);
    localStorage.setItem("credentials", JSON.stringify(newCredentials));
    setVisibleIndexes((prev) => prev.filter((_, i) => i !== index));
    toast.error(
      `Deleted credentials for ${deleted.username || "(no username)"}`
    );
  };

  const toggleVisibility = (index) => {
    setVisibleIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData({ ...credentials[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = (index) => {
    if (!editData.username.trim() || !editData.password.trim()) {
      toast.error("Username and password cannot be empty.");
      return;
    }
    const newCredentials = credentials.slice();
    newCredentials[index] = { ...editData };
    setCredentials(newCredentials);
    localStorage.setItem("credentials", JSON.stringify(newCredentials));
    setEditIndex(null);
    toast.success(`Updated credentials for ${editData.username}`);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
  };

  return (
    <div
      className="space-y-3 overflow-y-scroll h-[50vh]"
      style={{ scrollbarWidth: "none" }}
    >
      {credentials.map((e, index) => (
        <div
          className="relative bg-blue-100 rounded-lg text-sm py-2 p-3 mr-1"
          key={index}
        >
          <button
            onClick={() => handleDelete(index)}
            className="text-red-600 absolute top-1 right-2"
          >
            <Delete size={20} />
          </button>
          <button
            onClick={() => handleEdit(index)}
            className="text-gray-700 absolute bottom-1 right-2"
            title="Edit"
          >
            <Pencil size={20} />
          </button>
          {editIndex === index ? (
            <div className="space-y-2">
              <div>
                <label className="block font-semibold">Username:</label>
                <input
                  className="w-full rounded px-2 py-1 border"
                  name="username"
                  value={editData.username}
                  onChange={handleEditChange}
                />
              </div>
              <div className="flex items-center gap-3 relative">
                <label className="block font-semibold">Password:</label>
                <input
                  className="w-full rounded px-2 py-1 border"
                  name="password"
                  value={editData.password}
                  onChange={handleEditChange}
                  type={visibleIndexes.includes(index) ? "text" : "password"}
                />
                <button
                  onClick={() => toggleVisibility(index)}
                  className="text-gray-700 absolute -right-1.5"
                  type="button"
                >
                  {visibleIndexes.includes(index) ? <Eye /> : <EyeOff />}
                </button>
              </div>
              <div>
                <label className="block font-semibold">Note:</label>
                <textarea
                  className="w-full rounded px-2 py-1 border"
                  name="note"
                  value={editData.note}
                  onChange={handleEditChange}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleEditSave(index)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                  onClick={handleEditCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>Username: {e.username}</p>
              <div className="flex items-center gap-3 relative">
                <p>
                  Password:{" "}
                  {visibleIndexes.includes(index)
                    ? e.password
                    : "•".repeat(e.password.length)}
                </p>
                <button
                  onClick={() => toggleVisibility(index)}
                  className="text-gray-700 absolute -right-1.5"
                >
                  {visibleIndexes.includes(index) ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
              <p>Note: {e.note}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StoredCredentials;
