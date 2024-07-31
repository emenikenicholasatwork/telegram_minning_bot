import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import { GiCancel } from "react-icons/gi";


const ConfirmChangeExchange = () => {
    const { isConfirmChangeExchange, closeConfirmChangeExchange, changeCurrentLocation } = useGlobal();
    return (
        <div className={`fixed bottom-0 overflow-hidden z-10 left-0 right-0 duration-100 flex flex-col gap-3 bg-black shadow-top-green rounded-t-3xl ${isConfirmChangeExchange ? "h-[70%] pt-5" : "h-0"}`}>
            <div className="flex w-full justify-end px-5">
                <GiCancel className="font -bold text-xl" onClick={closeConfirmChangeExchange} />
            </div>
            <div className="flex flex-col items-center gap-5">
                <Image className="w-44 h-44" src={"/images/man.png"} width={500} height={500} alt="man image" />
                <p className="font-bold text-xl">Choose your exchange</p>
            </div>
            <div className="flex flex-col items-center px-5 gap-5">
                <button className="bg-blue-700 w-full rounded-xl font-bold text-xl p-5" onClick={() => { closeConfirmChangeExchange(); changeCurrentLocation("exchange"); }}>Choose</button>
                <div className="flex flex-row items-center gap-1">
                    <Image className="w-5 h-5" src={"/images/quick_coin.png"} width={100} height={100} alt="quick icon" />
                    <p className="font-bold text-sml">+5,000</p>
                </div>
            </div>
        </div>
    );
};
export default ConfirmChangeExchange;