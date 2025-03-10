import "./App.css";
import {
    ChangeCase,
    DevHelperAction,
    DevHelperState,
    ExtractMode,
    ModeType,
    OutputNewlines,
    QuotesType,
    SeparateMode
} from "./types.ts";
import {useMemo, useReducer} from "react";
import Presets from "./components/Presets.tsx";
import LabeledTextArea from "./components/LabeledTextArea.tsx";
import Macro from "./components/Macro.tsx";
import InputOptions from "./components/InputOptions/InputOptions.tsx";
import OutputOptions from "./components/OutputOptions.tsx";
import {exhaustiveGuard} from "./util.ts";

function stateReducer(state: DevHelperState, action: DevHelperAction): DevHelperState {
    switch (action.type) {
        case "changeInput":
            return {...state, input: action.input};
        case "changeMode":
            return {...state, mode: action.changeMode(state.mode)};
        case "setModeDefaults":
            switch (action.modeType) {
                case ModeType.SEPARATE:
                    return {...state, mode: {type: ModeType.SEPARATE, text: ",", regex: false}};
                case ModeType.EXTRACT:
                    return {...state, mode: {type: ModeType.EXTRACT, extractionRegex: "\\w+"}}
                default:
                    return exhaustiveGuard(action.modeType);
            }
        case "changeOutputFormatOptions":
            return {...state, outputFormatOptions: action.changeOutputFormatOptions(state.outputFormatOptions)};
        case "changeMacro":
            return {...state, macro: action.macro};
    }
}

export default function App() {

    const [state, dispatch] = useReducer(stateReducer, {
        input: "",
        mode: {
            type: ModeType.SEPARATE,
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
    });

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

    let items: string[];
    let extractMatches: RegExpExecArray[] | undefined = undefined; // only filled in extract mode

    try {
        switch (state.mode.type) {
            case ModeType.SEPARATE:
                items = separate(state.input, state.mode);
                break;
            case ModeType.EXTRACT:
                [items, extractMatches] = extract(state.input, state.mode);
                break;
        }
    } catch (e) {
        if (e instanceof SyntaxError) { // invalid regex
            return e.message;
        }
        console.error(e);
        return state.input;
    }

    let outputSeparator = state.outputFormatOptions.outputSeparator;
    if (state.outputFormatOptions.newlines === OutputNewlines.NEWLINES) {
        outputSeparator += "\n";
    }

    return items.reduce((accumulated, item, index) => {
        item = item.trim();
        if (state.outputFormatOptions.changeCase === ChangeCase.LOWER) {
            item = item.toLowerCase();
        } else if (state.outputFormatOptions.changeCase === ChangeCase.UPPER) {
            item = item.toUpperCase();
        }

        item = applyMacro(item, state.macro, index, extractMatches ? extractMatches[index] : undefined);

        if (state.outputFormatOptions.quotesType !== QuotesType.NONE) {
            const quote = state.outputFormatOptions.quotesType === QuotesType.DOUBLE ? '"' : "'";
            item = quote + item + quote;
        }

        if (index !== items.length - 1) {
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

/**
 * @throws SyntaxError if regex invalid
 */
function separate(input: string, separateMode: SeparateMode): string[] {
    const inputSeparator = separateMode.regex ? new RegExp(separateMode.text) : separateMode.text;
    return input.split(inputSeparator);
}

/**
 * @throws SyntaxError if regex invalid
 */
function extract(input: string, extractMode: ExtractMode): [string[], RegExpExecArray[]] {
    if (extractMode.extractionRegex === "") return [[], []];
    const matches: RegExpExecArray[] = [];
    const items =  [...input.matchAll(new RegExp(extractMode.extractionRegex, "g")).map((array, index) => {
        matches[index] = array;
        return array[0];
    })];
    return [items, matches];
}

function applyMacro(item: string, macro: string, index: number, extractMatch: RegExpExecArray | undefined): string {
    if (macro === "") return item;
    const matchRegex = /\\?(?:%\d*|\\i|\\k)/g;
    return macro.replaceAll(matchRegex, match => {
        switch (match) {
            case "%":
                return item;
            case "\\i":
                return index.toString();
            case "\\k":
                return (index + 1).toString();
            default:
                // handle %\d+ case
                if (!match.startsWith("%")) break;
                if (!extractMatch) {
                    throw new Error();
                }
                return extractMatch[parseInt(match.substring(1))] ?? match;
        }
        return match.substring(1);
    });
}
