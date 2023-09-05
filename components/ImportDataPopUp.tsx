"use client";
import React, { useState } from "react";
import Container from "./Container";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Activity, Loader2, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { Icons } from "./Icons";
import { toast } from "react-hot-toast";
import ToastBody from "./ToastBody";

const ImportDataPopUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleImport = async () => {
    setIsLoading(true);
    const res = await fetch("/api/strava/import");
    if (res.ok) {
      toast.success(
        <ToastBody title="Success" message="Data successfully connected." />
      );
    } else {
      toast.success(
        <ToastBody title="Error" message="Data connection failed." />
      );
    }
    setIsLoading(false);
  };
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
          <Button
            className="flex gap-2 self-end"
            variant="brand"
            onClick={handleImport}
            disabled={isLoading}
          >
            {!isLoading && (
              <>
                <Icons.stravaRaw className="w-auto h-5" />
                <span>Connect</span>
              </>
            )}
            {isLoading && (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Connecting...</span>
              </>
            )}
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ImportDataPopUp;
