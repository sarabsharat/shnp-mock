import '../App.css'
import { Link } from "react-router-dom";

interface ICard {
    name: string;
    number: number;
    label: string;
    click?: boolean;
}

function Card({ name, number, label, click }: ICard) {

    const next = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-step-forward-icon lucide-step-forward">
            <path d="M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>
            <path d="M3 4v16"/>
        </svg>
    );

    return (
        <div className="
            flex flex-col w-full gap-y-4 rounded-xl p-6 shadow-sm shadow-gray-700 border border-gray-400 bg-white
            sm:w-full  /* Fills space in sm:grid-cols-2 */
            lg:w-[calc(50%-1rem)] /* Takes just under 50% width on lg screens to allow two items + gap, essential for centering */
        ">

            <div className="flex flex-row gap-x-4 justify-between items-center">
                <p className="text-xl sm:text-2xl text-gray-800 text-left capitalize truncate">
                    {name}
                </p>

                {click !== false && (
                    <Link
                        to={`/${name}`}
                        className="flex items-center justify-self-end text-gray-800 hover:text-shnp-orange transition-colors shrink-0"
                    >
                        {next}
                    </Link>
                )}
            </div>

            <div className="flex flex-row gap-x-4 items-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-shnp-orange">{number}</h1>
                <p className="text-md sm:text-lg font-bold text-gray-600">{label}</p>
            </div>
        </div>
    );
}

export default Card;