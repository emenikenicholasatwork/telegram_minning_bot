"use client";
import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import avaters from "../../data/avater_data.json";
import { GiCancel } from "react-icons/gi";
import { useState } from "react";

const ProgressAvater = () => {
    const { isShowProgressPage, toggleProgressPage, formatNumber } = useGlobal();
    const [avaterIndex, setAvaterIndex] = useState(0);

    const handleLeftClick = () => {
        if (avaterIndex === 0) {
            return;
        } else {
            setAvaterIndex((prevIndex) => (prevIndex - 1) % avaters.length);
        }
    };

    const handleRightClick = () => {
        if (avaterIndex === 6) {
            return;
        } else {
            setAvaterIndex((prevIndex) => (prevIndex + 1) % avaters.length);
        }
    };

    const currentAvater = avaters[avaterIndex];

    return (
        <div className={`fixed left-0 right-0 bottom-0 overflow-hidden duration-200 bg-black shadow-top-green gap-5 rounded-3xl ${isShowProgressPage ? "h-[60%] pt-5" : "h-0"}`}>
            <div className="w-full flex px-5 items-center justify-end">
                <GiCancel className="font-bold text-3xl" onClick={toggleProgressPage} />
            </div>
            <div className="flex flex-row items-center justify-between px-3">
                <RiArrowLeftSLine className={`font-bold text-3xl ${avaterIndex === 0 ? "text-slate-500" : ""}`} onClick={handleLeftClick} />
                <Image className="w-52 h-60" src={currentAvater.image} width={500} height={500} alt="avater image" />
                <RiArrowRightSLine className={`font-bold text-3xl ${avaterIndex === 6 ? "text-slate-500" : ""}`} onClick={handleRightClick} />
            </div>
            <div className="w-full flex flex-col items-center gap-3 pt-20">
                <p className="font-bold text-lg">{currentAvater.name}</p>
                <p className="font-bold text-lg">{formatNumber(currentAvater.from)} ~ (currentAvater.to)</p>
            </div>
        </div>
    );
};

export default ProgressAvater;
