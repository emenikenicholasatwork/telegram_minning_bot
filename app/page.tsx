import BodyContainer from "@/components/body_container/BodyContainer";
import UserTopProgress from "@/components/user_progress/UserTopProgress";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-2">
      <p>Nicholas Emenike (CEO)</p>
      <UserTopProgress />
      <BodyContainer />
    </main>
  );
}
