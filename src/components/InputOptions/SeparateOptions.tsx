import {DevHelperAction, SeparateMode} from "../../types.ts";
import {ActionDispatch, useMemo} from "react";

export default function SeparateOptions({separateMode, dispatch}: {
    separateMode: SeparateMode,
    dispatch: ActionDispatch<[action: DevHelperAction]>
}) {

    const showSeparateOnNewlines =
        useMemo(() => !(separateMode.regex && separateMode.text === "\\n"), [separateMode]);

    return (
        <>
            <label className="labeledInput">
                Input Separator
                <input type="search" value={separateMode.text} onChange={e => dispatch({
                    type: "changeMode",
                    changeMode: mode => ({...mode, text: e.target.value})
                })}/>
            </label>

            <div className="labeledInputInline">
                <input id="inputSeparatorRegexCheckbox" type="checkbox" checked={separateMode.regex}
                       onChange={e => dispatch({
                           type: "changeMode",
                           changeMode: mode => ({...mode, regex: e.target.checked})
                       })}/>
                <label htmlFor="inputSeparatorRegexCheckbox">
                    Regex
                </label>
            </div>

            {showSeparateOnNewlines && (
                <button onClick={() => dispatch({
                    type: "changeMode",
                    changeMode: mode => ({...mode, text: "\\n", regex: true})
                })}>
                    Separate on newlines
                </button>
            )}
        </>
    );
}
