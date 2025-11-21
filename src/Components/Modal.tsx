import {type ReactNode} from 'react';
type Props = {
    onClose: () => void;
    children?: ReactNode;
    text?: string;
}

function Modal  ({onClose, children,text}:Props) {
    const mark = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 2xl:size-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

    );
  return (
      <>
          <div className="w-screen h-full bg-gray-950/50 flex inset-0 items-center justify-evenly fixed"
               onClick={onClose}>
              <div className="flex flex-wrap bg-white z-100 rounded-lg shadow-xl   p-4 w-[85%]"
                   onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-row justify-between pb-2 border-b-1 w-full"><p
                      className="text-sm text-shnp-orange 2xl:text-5xl">{text}</p>
                      <button className=" text-2xl text-shnp-orange " onClick={onClose}>{mark} </button>
                  </div>
                  <div className="mt-2 mb-2 w-full"> {children ? children : ""}</div>
              </div>

      </div>
      </>
  );
}

export default Modal;