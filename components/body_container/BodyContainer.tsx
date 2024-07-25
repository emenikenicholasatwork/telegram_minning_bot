import React from "react";
import TapArea from "../tap_area/TapArea";

const BodyContainer: React.FC = () => {
  return (
    <div className="h-full w-full rounded-t-3xl shadow-top-green">
      <TapArea />
    </div>
  );
};

export default BodyContainer;
