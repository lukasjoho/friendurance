import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center grow justify-center">
        <div className="flex flex-col items-center gap-6">
          <Icons.logo className="w-[300px]" />
          <Link
            href={`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.STRAVA_REDIRECT_URI}/api/strava&response_type=code&scope=read_all,profile:read_all,activity:read_all`}
          >
            <Button className="w-32" variant="brand">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
