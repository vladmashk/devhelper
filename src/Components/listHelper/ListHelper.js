import React, {useState} from 'react';
import "./ListHelper.css"
import TextAreas from "./TextAreas.js";
import Sidebar, {outputType} from "./Sidebar.js";
import Presets from "./Presets.js";

export const macroChar = "%"

/**
 *
 * @param {string} replacement
 * @param {string} macro
 */
// function replaceInMacro(replacement, macro) {
//     for (let i = 0; i < macro.length; i++) {
//         if (macro[i] === macroChar)
//     }
// }

function ListHelper(props) {

    const [input, setInput] = useState("")

    const [output, setOutput] = useState("")

    const [macro, setMacro] = useState("")

    /**
     * @param {{separator: string, quoteType: string, outputNewlines: string, rows: number}} settings
     */
    function convert(settings) {
        if (input === "") return;
        let items = input.split(settings.separator)
        let quote;
        switch (settings.quoteType) {
            case "single":
                quote = "'"
                break
            case "double":
                quote = '"'
                break
            default:
                quote = ""
                break
        }
        items = items.map(i => quote + i.trim().replace(/\n/g, "") + quote)
        if (macro && macro.includes(macroChar)) {
            items = items.map(item => macro.replaceAll(/(?<!\\)%/g, item))
        }
        switch (settings.outputNewlines) {
            case outputType.NO_NEWLINES:
                items = items.join(", ")
                break
            case outputType.NEWLINES:
                items = items.join(",\n")
                break
            case outputType.ROWS:
                items = items.reduce((previous, current, index) => {
                    if (index === items.length - 1) {
                        return previous + current
                    } else if ((index + 1) % settings.rows === 0) {
                        return previous + current + ",\n"
                    } else {
                        return previous + current + ", "
                    }
                }, "")
                break
            default:
                items = items.join(", ")
                break
        }
        setOutput(items)
    }

    /**
     * @param {string} input
     */
    function presetInput(input) {
        setInput(input)
    }

    return (
        <div id="main">
            <Presets setInput={presetInput} macro={macro} setMacro={setMacro}/>
            <TextAreas input={input} setInput={setInput} output={output}/>
            <Sidebar convert={convert}/>
        </div>
    );
}

export default ListHelper;