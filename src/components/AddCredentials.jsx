import { Eye, EyeOff, Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useState } from "react";

const AddCredentials = ({ credentials, setCredentials }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()+-*/_=";
    let randomPassword = "";
    for (let i = 0; i < 16; i++) {
      randomPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(randomPassword);
  };

  const handleAddCredential = () => {
    const newCredential = { username, password, note };
    setCredentials([...credentials, newCredential]);
    setUsername("");
    setPassword("");
    setNote("");
    localStorage.setItem(
      "credentials",
      JSON.stringify([...credentials, newCredential])
    );
  };

  return (
    <div className="grid gap-10">
      <div>
        <Label>Username:</Label>
        <Input
          type="email"
          placeholder="sample@pwarden.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="h-5"></div>
        <Label>Password:</Label>
        <div className="relative flex">
          <Input
            type={!isVisible && "password"}
            className="pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="absolute top-1.5 right-12 text-gray-700"
          >
            {isVisible ? <Eye /> : <EyeOff />}
          </button>
          <HoverCard>
            <HoverCardTrigger>
              <button
                onClick={generateRandomPassword}
                className="absolute top-1.5 right-3 text-gray-700"
              >
                <Shuffle />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="py-1 text-sm text-center w-auto bg-[aliceblue]">
              Random Password
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="h-5"></div>
        <Label>Note:</Label>
        <textarea
          className="w-full h-36 py-1 px-2 rounded-md bg-[aliceblue] border shadow-sm resize-none focus:outline outline-1"
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>
      <Button
        className="bg-blue-600 hover:bg-blue-700"
        onClick={handleAddCredential}
      >
        Add to Stored Credential
      </Button>
    </div>
  );
};

export default AddCredentials;
