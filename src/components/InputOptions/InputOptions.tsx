import "./InputOptions.css";
import {DevHelperAction, DevHelperState, ModeType} from "../../types.ts";
import {ActionDispatch, useMemo} from "react";
import SeparateOptions from "./SeparateOptions.tsx";
import ExtractOptions from "./ExtractOptions.tsx";

export default function InputOptions({state, dispatch}: {
    state: DevHelperState,
    dispatch: ActionDispatch<[action: DevHelperAction]>
}) {

    const shownTab = useMemo(() => {
        switch (state.mode.type) {
            case ModeType.SEPARATE:
                return <SeparateOptions separateMode={state.mode} dispatch={dispatch}/>
            case ModeType.EXTRACT:
                return <ExtractOptions extractMode={state.mode} dispatch={dispatch}/>
        }
    }, [state, dispatch]);

    return (
        <div className="inputOptions">
            <button onClick={() => dispatch({type: "changeInput", input: ""})}>
                Clear Input
            </button>

            <div className="tabs">
                {Object.values(ModeType).map(modeType => (
                    <label key={modeType} className={state.mode.type === modeType ? "active" : undefined}>
                        {modeType}
                        <input hidden type="radio" name="tab" value={modeType}
                               checked={state.mode.type === modeType}
                               onChange={e => e.target.checked && dispatch({type: "setModeDefaults", modeType})}/>
                    </label>
                ))}
            </div>

            <div className="tabContent">
                {shownTab}
            </div>
        </div>
    );
}
