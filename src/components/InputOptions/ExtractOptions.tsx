import {DevHelperAction, ExtractMode} from "../../types.ts";
import {ActionDispatch} from "react";

export default function ExtractOptions({extractMode, dispatch}: {
    extractMode: ExtractMode,
    dispatch: ActionDispatch<[action: DevHelperAction]>
}) {
    return (
        <label className="labeledInput">
            Extraction regex
            <input type="search" value={extractMode.extractionRegex} onChange={e => dispatch({
                type: "changeMode",
                changeMode: mode => ({...mode, extractionRegex: e.target.value})
            })}/>
        </label>
    );
}
