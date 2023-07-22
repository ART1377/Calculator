import React from "react";
import { ACTIONS } from "@/app/page";

interface BtnProps {
  children: string;
  btnType: string;
  dispatch: any;
  btnOperation: string;
}

const Button = ({ children, btnType, dispatch, btnOperation }: BtnProps) => {
  const typeCreator = () => {
    if (btnOperation === "digit") {
      return ACTIONS.ADD_DIGIT;
    } else if (btnOperation === "clear") {
      return ACTIONS.CLEAR;
    } else if (btnOperation === "delete") {
      return ACTIONS.DELETE;
    } else if (btnOperation === "evaluate") {
      return ACTIONS.EVALUATE;
    } else if (btnOperation === "operator") {
      return ACTIONS.OPERATOR;
    }
  };
  const classCreator = () => {
    if (btnType === "dark") {
      return "bg-slate-800 text-slate-200 rounded-full m-1 text-2xl shadow-[11px_11px_22px_#0a0f1b,-11px_-11px_22px_#141f39] active:shadow-[inset_11px_11px_22px_#0a0f1b,inset_-11px_-11px_22px_#141f39]";
    } else if (btnType === "light") {
      return "text-slate-900 bg-slate-200 mt-2 rounded-full text-3xl shadow-[1px_1px_1px_#c2c8ce,-1px_-1px_1px_#ffffff] active:shadow-[inset_5px_5px_8px_#c2c8ce,inset_-5px_-5px_8px_#ffffff]";
    } else if (btnType === "orange") {
      return "bg-orange-500 text-slate-200 mt-2 rounded-full text-3xl shadow-[1px_1px_1px_#d66313,-1px_-1px_1px_#ff8319] active:shadow-[inset_5px_5px_8px_#d66313,inset_-5px_-5px_8px_#ff8319]";
    }
  };

  return (
    <>
      <button
        onClick={() => dispatch({ type: typeCreator(), payload: { children } })}
        className={`${classCreator()} mx-auto flex justify-center items-center h-[55px] w-[55px] xxs:h-[70px] xxs:w-[70px]`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
