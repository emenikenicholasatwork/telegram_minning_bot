import React from "react";
import HomeTopMode from "../home_mode/HomeTopMode";
import TapArea from "../tap_area/TapArea";

const BodyContainer: React.FC = () => {
  return (
    <div className="h-full w-full rounded-t-3xl pt-5 flex flex-col gap-8 shadow-top-green">
      <HomeTopMode />
      <TapArea />
    </div>
  );
};

export default BodyContainer;
