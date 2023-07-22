"use client";
import { Reducer, useReducer } from "react";
import Button from "./components/Button";
import type { Metadata } from "next";

interface InitialArg {
  current: string | null;
  prev: string | null;
  operator: string | null;
}
interface ActionsType {
  type: string;
  payload: { children: string };
}

const initialArg: InitialArg = {
  current: null,
  prev: null,
  operator: null,
};
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  OPERATOR: "choose-operator",
  CLEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate",
};

const reducer: Reducer<InitialArg | any, ActionsType | any> = (
  state: InitialArg,
  { type, payload }: ActionsType
) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (
        state.current === "0" &&
        (payload.children === "0" || payload.children === "00")
      ) {
        return state;
      }
      if (state.current === "0" && payload.children !== ".") {
        return {
          ...state,
          current: payload.children,
        };
      }
      if (state.current == null && payload.children == "00") {
        return {
          ...state,
          current: "0",
        };
      }
      if (state.current?.includes(".") && payload.children === ".") {
        return state;
      }
      if (state.current == null && payload.children === ".") {
        return {
          ...state,
          current: "0.",
        };
      }
      return {
        ...state,
        current: `${state.current ? state.current : ""}${payload.children}`,
      };
    case ACTIONS.CLEAR:
      return {
        current: null,
        prev: null,
        operator: null,
      };
    case ACTIONS.DELETE:
      if (state.current == null && state.prev == null) {
        return state;
      }
      if (state.current == null && state.prev != null) {
        return {
          ...state,
          operator: null,
          prev: !state.prev?.length ? null : state.prev?.slice(0, -1) || null,
        };
      }

      return {
        ...state,
        current: !state.current?.length
          ? null
          : state.current?.slice(0, -1) || null,
      };
    case ACTIONS.OPERATOR:
      if (state.current === null) {
        return state;
      }

      return {
        prev: state.current.includes(",")
          ? state.current.replaceAll(",", "")
          : state.current,
        current: null,
        operator: payload.children,
      };
    case ACTIONS.EVALUATE:
      if (state.prev == null || state.current == null) {
        return state;
      }
      return {
        current: evaluator(state),
        prev: null,
        operator: null,
      };
  }
};

const evaluator = ({
  current: currentOperand,
  prev: prevOperand,
  operator,
}: InitialArg): string => {
  const prev = parseFloat(prevOperand as string);
  const current = parseFloat(currentOperand as string);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation: string | number = "";
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "%":
      computation = prev % current;
      break;
  }

  return computation.toLocaleString("en-US").toString();
};

export default function Home() {
  const [{ prev, current, operator }, dispatch] = useReducer(
    reducer,
    initialArg as InitialArg
  );
  return (
    <>
      <div className="bg-slate-800 w-screen h-screen overflow-hidden">
        <div className="header text-center">
          <h1 className="my-8 text-slate-100 font-bold border-b-4 w-fit mx-auto pb-1">
            Calculator
          </h1>
        </div>
        <div className="shadow-neumorphism xs:w-[450px]  mx-auto rounded-lg p-2 mt-4 overflow-hidden">
          <div className="display bg-slate-700 !xs:w-[430px]  mx-auto overflow-hidden rounded-t-lg rounded-b-none h-[150px] text-2xl text-slate-100 flex flex-col p-2 pe-4 items-end">
            {/* <div className="previous-value text-3xl text-slate-400">
              {prev}
              {operator}
            </div>
            <div className="current-value text-3xl text-slate-200">
              {current}
              <div className="curser"></div>
            </div> */}
            <div className="previous-value">
              <input
                className="text-3xl text-slate-400 bg-slate-700 focus:outline-none "
                type="text"
                value={`${prev && operator ? `${operator}${prev}` : ""}`}
                dir="rtl"
                disabled
              />
            </div>
            <div className="current-value">
              <input
                className="text-3xl text-slate-200 bg-slate-700 focus:outline-none "
                type="text"
                value={`${current ? current : ""}`}
                dir="rtl"
                disabled
              />
              <div className="curser"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 bg-slate-900 !xs:w-[430px]  mx-auto p-2 rounded-b-lg rounded-t-none">
            <Button dispatch={dispatch} btnOperation="clear" btnType="dark">
              AC
            </Button>
            <Button dispatch={dispatch} btnOperation="delete" btnType="dark">
              DEL
            </Button>
            <Button dispatch={dispatch} btnOperation="operator" btnType="dark">
              %
            </Button>
            <Button dispatch={dispatch} btnOperation="operator" btnType="light">
              /
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              7
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              8
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              9
            </Button>
            <Button dispatch={dispatch} btnOperation="operator" btnType="light">
              *
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              4
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              5
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              6
            </Button>
            <Button dispatch={dispatch} btnOperation="operator" btnType="light">
              -
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              1
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              2
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              3
            </Button>
            <Button dispatch={dispatch} btnOperation="operator" btnType="light">
              +
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              00
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              0
            </Button>
            <Button dispatch={dispatch} btnOperation="digit" btnType="dark">
              .
            </Button>
            <Button
              dispatch={dispatch}
              btnOperation="evaluate"
              btnType="orange"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
