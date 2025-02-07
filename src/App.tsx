import "./App.css";
import {ChangeCase, DevHelperAction, DevHelperState, OutputNewlines, QuotesType} from "./types.ts";
import {useEffect, useMemo, useReducer} from "react";
import Presets from "./components/Presets.tsx";
import LabeledTextArea from "./components/LabeledTextArea.tsx";
import Macro from "./components/Macro.tsx";
import InputOptions from "./components/InputOptions.tsx";
import OutputOptions from "./components/OutputOptions.tsx";

const STORED_STATE_KEY = "stored-state";
const latestStateVersion = 1;

function stateReducer(state: DevHelperState, action: DevHelperAction): DevHelperState {
    switch (action.type) {
        case "changeInput":
            return {...state, input: action.input};
        case "changeInputSeparator":
            return {...state, inputSeparator: action.changeInputSeparator(state.inputSeparator)};
        case "changeOutputFormatOptions":
            return {...state, outputFormatOptions: action.changeOutputFormatOptions(state.outputFormatOptions)};
        case "changeMacro":
            return {...state, macro: action.macro};
    }
}

function initializeDevHelperState(): DevHelperState {
    const storedState = localStorage.getItem(STORED_STATE_KEY);
    if (storedState) {
        const parsedState = JSON.parse(storedState) as DevHelperState;
        if (parsedState.version === latestStateVersion) {
            return parsedState;
        }
    }
    return {
        version: latestStateVersion,
        input: "",
        inputSeparator: {
            text: ",",
            regex: false
        },
        outputFormatOptions: {
            quotesType: QuotesType.DOUBLE,
            newlines: OutputNewlines.NEWLINES,
            columns: 5,
            changeCase: ChangeCase.NO,
            outputSeparator: ", "
        },
        macro: ""
    };
}

export default function App() {

    const [state, dispatch] = useReducer(stateReducer, null, initializeDevHelperState);

    // store state in localStorage when page becomes hidden
    useEffect(() => {
        const abortController = new AbortController();
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                localStorage.setItem(STORED_STATE_KEY, JSON.stringify(state));
            }
        }, {signal: abortController.signal});
        return () => abortController.abort();
    }, [state]);

    const output = useMemo(() => convert(state), [state]);

    return (
        <>
            <div className="heroTitle">DevHelper</div>
            <main>
                <Presets dispatch={dispatch}/>
                <LabeledTextArea label="Input" readOnly={false} value={state.input}
                                 onChange={value => dispatch({type: "changeInput", input: value})}/>
                <Macro macro={state.macro} dispatch={dispatch}/>
                <LabeledTextArea label="Output" readOnly={true} value={output}/>
                <div className="options">
                    <InputOptions state={state} dispatch={dispatch}/>
                    <OutputOptions state={state} dispatch={dispatch} output={output}/>
                </div>
            </main>
        </>
    );
}

function convert(state: DevHelperState): string {
    if (state.input === "") return "";

    let inputSeparator;
    try {
        inputSeparator = state.inputSeparator.regex ? new RegExp(state.inputSeparator.text) : state.inputSeparator.text;
    } catch (e) { // invalid regex
        return state.input;
    }
    const splitInput = state.input.split(inputSeparator);

    let outputSeparator = state.outputFormatOptions.outputSeparator;
    if (state.outputFormatOptions.newlines === OutputNewlines.NEWLINES) {
        outputSeparator += "\n";
    }

    return splitInput.reduce((accumulated, item, index) => {
        item = item.trim();
        if (state.outputFormatOptions.changeCase === ChangeCase.LOWER) {
            item = item.toLowerCase();
        } else if (state.outputFormatOptions.changeCase === ChangeCase.UPPER) {
            item = item.toUpperCase();
        }

        item = applyMacro(item, state.macro, index);

        if (state.outputFormatOptions.quotesType !== QuotesType.NONE) {
            const quote = state.outputFormatOptions.quotesType === QuotesType.DOUBLE ? '"' : "'";
            item = quote + item + quote;
        }

        if (index !== splitInput.length - 1) {
            item += outputSeparator;
            if (state.outputFormatOptions.newlines === OutputNewlines.COLUMNS) {
                const columns = state.outputFormatOptions.columns;
                if (index % columns === columns - 1) {
                    item += "\n";
                }
            }
        }
        return accumulated + item;
    }, "");
}

function applyMacro(item: string, macro: string, index: number): string {
    if (macro === "") return item;
    const matchRegex = /\\?(%|\\i|\\k)/g;
    return macro.replaceAll(matchRegex, match => {
        switch (match) {
            case "%":
                return item;
            case "\\i":
                return index.toString();
            case "\\k":
                return (index + 1).toString();
            default:
                return match.substring(1);
        }
    });
}
