import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";


const InviteThreeFriendsCheck = () => {
    const { isConfirmChangeExchange, closeConfirmChangeExchange, changeCurrentLocation } = useGlobal();
    return (
        <div className={`fixed bottom-0 overflow-hidden z-10 left-0 right-0 duration-200 flex flex-col gap-10 bg-black shadow-top-green rounded-t-3xl ${isConfirmChangeExchange ? "h-[70%] pt-10" : "h-0"}`}>
            <div className="flex w-full justify-end px-5">
                <GiCancel className="font -bold text-3xl" onClick={closeConfirmChangeExchange} />
            </div>
            <div className="flex flex-col items-center gap-5">
                <Image className="w-44 h-44" src={"/images/man.png"} width={500} height={500} alt="man image" />
                <p className="font-bold text-2xl">Check</p>
            </div>
            <div className="flex flex-col items-center px-5 gap-5">
                <button className="bg-blue-700 w-full rounded-xl font-bold text-xl p-5" onClick={() => { closeConfirmChangeExchange(); changeCurrentLocation("exchange"); }}>Choose</button>
                <div className="flex flex-row items-center gap-3">
                    <Image className="w-8 h-8" src={"/images/quick_coin.png"} width={100} height={100} alt="quick icon" />
                    <p className="font-bold text-xl">+5,000</p>
                </div>
            </div>
        </div>
    );
};
export default InviteThreeFriendsCheck;