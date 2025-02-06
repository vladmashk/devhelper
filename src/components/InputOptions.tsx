import "./InputOptions.css";
import {DevHelperAction, DevHelperState} from "../types.ts";
import {ActionDispatch} from "react";

export default function InputOptions({state, dispatch}: {
    state: DevHelperState,
    dispatch: ActionDispatch<[action: DevHelperAction]>
}) {

    return (
        <div className="inputOptions">
            <button onClick={() => dispatch({type: "changeInput", input: ""})}>
                Clear Input
            </button>

            <label className="labeledInput inputSeparator">
                Input Separator
                <input value={state.inputSeparator.text} onChange={e => dispatch({
                    type: "changeInputSeparator",
                    changeInputSeparator: is => ({...is, text: e.target.value})
                })}/>
            </label>

            <div className="inputSeparatorRegex">
                <input id="inputSeparatorRegexCheckbox" type="checkbox" checked={state.inputSeparator.regex}
                       onChange={e => dispatch({
                           type: "changeInputSeparator",
                           changeInputSeparator: is => ({...is, regex: e.target.checked})
                       })}/>
                <label htmlFor="inputSeparatorRegexCheckbox">
                    Regex
                </label>
            </div>

            <button onClick={() => dispatch({
                type: "changeInputSeparator",
                changeInputSeparator: () => ({text: "\\n", regex: true})
            })}>
                Separate on newlines
            </button>
        </div>
    );
}
