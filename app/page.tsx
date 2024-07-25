import BodyContainer from "@/components/body_container/BodyContainer";
import FootNavigator from "@/components/foot_nav/FootNavigator";
import UserTopProgress from "@/components/user_progress/UserTopProgress";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen pt-3">
      <p className="ps-2 font-bold">Nicholas Emenike (CEO)</p>
      <div className="flex flex-col gap-10">
        <UserTopProgress />
        <BodyContainer />
      </div>
      <FootNavigator />
    </main>
  );
}
