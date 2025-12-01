import '../App.css'

interface ICard {
    name: string;
    number: number;
    label:string;
    click?:boolean;
}
function Card({name,number,label,click}:ICard){

    const next = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="lucide lucide-step-forward-icon lucide-step-forward">
        <path d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>
        <path d="M3 4v16"/>
    </svg>)
    return (
        <div
            className=" lg:flex-row  lg:flex-wrap lg:w-80 flex flex-col border-1 w-[100vw] gap-y-10 rounded-xl p-6 shadow-sm shadow-gray-700 border-gray-400">
            <div className="flex flex-row gap-x-4 justify-between ">
                <p className="text-2xl justify-self-start text-gray-800 text-left">{name}</p>
                {click != false ? (<p className="self-center justify-self-end">{next}</p>) : null}

            </div>
            <div className="flex flex-row gap-x-4 gap-y-4">
            <h1 className="text-3xl font-bold text-shnp-orange">{number}</h1>
                <p className="text-lg font-bold text-gray-600 self-center">{label}</p>
            </div>
        </div>
    );
}

export default Card;