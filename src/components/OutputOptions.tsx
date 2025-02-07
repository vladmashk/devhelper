import "./OutputOptions.css";
import {ChangeCase, DevHelperAction, DevHelperState, OutputNewlines, QuotesType} from "../types.ts";
import {ActionDispatch} from "react";

export default function OutputOptions({state, dispatch, output}: {
    state: DevHelperState,
    dispatch: ActionDispatch<[action: DevHelperAction]>,
    output: string
}) {

    return (
        <div className="outputOptions">
            <fieldset className="quotesType">
                <legend>Quotes Type</legend>
                {Object.values(QuotesType).map(qt => (
                    <label className="radioOption" key={qt}>
                        <input type="radio" name="quotesType" value={qt}
                               checked={state.outputFormatOptions.quotesType === qt} onChange={e => dispatch({
                            type: "changeOutputFormatOptions",
                            changeOutputFormatOptions: ofo => ({...ofo, quotesType: e.target.value as QuotesType})
                        })}/>
                        {qt}
                    </label>
                ))}
            </fieldset>

            <fieldset className="outputNewlines">
                {Object.values(OutputNewlines).map(nl => (
                    <label className="radioOption" key={nl}>
                        <input type="radio" name="outputNewlines" value={nl}
                               checked={state.outputFormatOptions.newlines === nl} onChange={e => dispatch({
                            type: "changeOutputFormatOptions",
                            changeOutputFormatOptions: ofo => ({...ofo, newlines: e.target.value as OutputNewlines})
                        })}/>
                        {nl}
                    </label>
                ))}

                {state.outputFormatOptions.newlines === OutputNewlines.COLUMNS && (
                    <label className="labeledInput columns">
                        Amount of columns
                        <input type="number" min={1} value={state.outputFormatOptions.columns} onChange={e => dispatch({
                            type: "changeOutputFormatOptions",
                            changeOutputFormatOptions: ofo => ({...ofo, columns: parseInt(e.target.value)})
                        })}/>
                    </label>
                )}
            </fieldset>

            <fieldset className="changeCase">
                <legend>Change Case</legend>
                {Object.values(ChangeCase).map(cc => (
                    <label className="radioOption" key={cc}>
                        <input type="radio" name="changeCase" value={cc}
                               checked={state.outputFormatOptions.changeCase === cc} onChange={e => dispatch({
                            type: "changeOutputFormatOptions",
                            changeOutputFormatOptions: ofo => ({...ofo, changeCase: e.target.value as ChangeCase})
                        })}/>
                        {cc}
                    </label>
                ))}
            </fieldset>

            <label className="labeledInput outputSeparator">
                Output Separator
                <input value={state.outputFormatOptions.outputSeparator} onChange={e => dispatch({
                    type: "changeOutputFormatOptions",
                    changeOutputFormatOptions: ofo => ({...ofo, outputSeparator: e.target.value})
                })}/>
            </label>

            <button onClick={() => window.navigator.clipboard.writeText(output)}>
                Copy Output
            </button>
        </div>
    );
}
