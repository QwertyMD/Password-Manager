import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const AddCredentials = () => {
  return (
    <div className="grid gap-10">
      <div>
        <Label>Username:</Label>
        <Input type="email" placeholder="sample@pwarden.com" />
        <div className="h-5"></div>
        <Label>Password:</Label>
        <div className="relative flex">
          <Input type="password" className="pr-12" />
          <HoverCard>
            <HoverCardTrigger>
              <button>
                <Shuffle className="absolute top-1.5 right-3 text-gray-700" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="py-1 text-center w-auto bg-[aliceblue]">
              Random Password
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="h-5"></div>
        <Label>Note:</Label>
        <textarea
          className="w-full h-36 py-1 px-2 rounded-md bg-[aliceblue] border shadow-sm resize-none focus:outline outline-1"
          placeholder="Add a note..."
        ></textarea>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        Add to Stored Credential
      </Button>
    </div>
  );
};

export default AddCredentials;
