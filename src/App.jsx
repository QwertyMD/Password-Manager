import { useState } from "react";
import AddCredentials from "./components/AddCredentials";
import StoredCredentials from "./components/StoredCredentials";

function App() {
  const [isAdd, setIsAdd] = useState(true);
  const [isStore, setIsStore] = useState(false);
  const [credentials, setCredentials] = useState([]);

  return (
    <div className="min-h-screen bg-blue-300 flex justify-center items-center">
      <div className="bg-[aliceblue] py-5 px-10 rounded-lg shadow-lg m-3">
        <div className="flex gap-20 text-lg font-semibold">
          <button
            onClick={() => {
              setIsAdd(true);
              setIsStore(false);
            }}
            className={`cursor-pointer ${
              isAdd && "text-blue-500 underline underline-offset-4"
            } ${!isAdd && "text-gray-500"}`}
          >
            Add New Credential
          </button>
          <button
            onClick={() => {
              setIsAdd(false);
              setIsStore(true);
            }}
            className={`cursor-pointer ${
              isStore && "text-blue-500 underline underline-offset-4"
            } ${!isStore && "text-gray-500"}`}
          >
            See Stored Credential
          </button>
        </div>
        <div className="mt-5">
          {isAdd && <AddCredentials credentials={credentials} setCredentials={setCredentials} />}
          {isStore && <StoredCredentials credentials={credentials} setCredentials={setCredentials} />}
        </div>
      </div>
    </div>
  );
}

export default App;
