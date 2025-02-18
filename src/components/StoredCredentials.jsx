import { Delete, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

const StoredCredentials = ({ credentials, setCredentials }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("credentials");
    if (data) {
      setCredentials(JSON.parse(data));
    }
  }, []);

  const handleDelete = (index) => {
    const newCredentials = credentials.slice();
    newCredentials.splice(index, 1);
    setCredentials(newCredentials);
    localStorage.setItem("credentials", JSON.stringify(newCredentials));
  };

  return (
    <div className="space-y-3 overflow-y-auto h-[50vh]">
      {credentials.map((e, index) => (
        <div
          className="relative bg-blue-100 rounded-lg text-sm py-2 p-3 mr-1"
          key={index}
        >
          <button
            onClick={() => handleDelete(index)}
            className="text-red-600 absolute top-1 right-2"
          >
            <Delete />
          </button>
          <p>Username: {e.username}</p>
          <div className="flex items-center gap-3 relative">
            <p>
              Password:{" "}
              {!isVisible ? "•".repeat(e.password.length) : e.password}
            </p>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="text-gray-700 absolute -right-1.5"
            >
              {isVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <p>Note: {e.note}</p>
        </div>
      ))}
    </div>
  );
};

export default StoredCredentials;
