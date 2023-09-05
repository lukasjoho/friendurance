import React from "react";
import Container from "./Container";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Activity, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { Icons } from "./Icons";

const ImportDataPopUp = () => {
  return (
    <Container>
      <Alert>
        <Activity className="w-4 h-4" />
        <div className="flex justify-between">
          <div>
            <AlertTitle>Connect Strava data</AlertTitle>
            <AlertDescription>
              You are logged in, but haven't connected your Strava data yet. Hit
              "Connect" to do so. You can revoke the data access at any time.
            </AlertDescription>
          </div>
          <Button className="flex gap-2 self-end" variant="brand">
            <Icons.stravaRaw className="w-auto h-5" />
            Connect
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ImportDataPopUp;
