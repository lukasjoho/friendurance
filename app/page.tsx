import Container from "@/components/Container";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col items-center grow justify-center w-full">
        <Container>
          <div className="flex flex-col items-center gap-6 relative">
            <Icons.logo className="w-[90%] md:w-1/2" />

            <img
              src="friendurance_intro.png"
              alt=""
              className="w-full md:w-1/3 -translate-y-[15%] -mb-8 md:-mb-12"
            />
            <Link
              href={`https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.HOST_URL}/api/strava&response_type=code&scope=read,activity:read`}
            >
              <Button className="w-32" variant="brand">
                Login
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
