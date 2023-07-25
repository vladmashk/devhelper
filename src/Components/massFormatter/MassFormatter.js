import React, {useState} from 'react';
import "./MassFormatter.css"
import TextAreas from "./TextAreas.js";
import RightPanel, {outputType} from "./RightPanel/RightPanel";
import LeftPanel from "./LeftPanel.js";

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

function MassFormatter(props) {

    const [input, setInput] = useState("")

    const [output, setOutput] = useState("")

    const [macro, setMacro] = useState("")

    /**
     * @param {{inputSeparator: string, inputRegex: boolean, extractRegex: string, quoteType: string, outputNewlines: string, rows: number, outputSeparator: string, activeInputActionTab: string}} settings
     */
    function convert(settings) {
        if (input === "") {
            setOutput("");
            return;
        }
        let outputSep = settings.outputSeparator;
        let items;
        try {
            if (settings.activeInputActionTab === "Separate") {
                items = input.split(settings.inputRegex ? new RegExp(settings.inputSeparator) : settings.inputSeparator)
            } else if (settings.activeInputActionTab === "Extract") {
                items = Array.from(input.matchAll(new RegExp(settings.extractRegex, "g"))).map(m => m[1] ?? m[0])
            } else {
                throw new Error(`Unknown settings.activeInputActionTab: ${settings.activeInputActionTab}`);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                return
            } else {
                throw error
            }
        }
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
            items = items.map((item, i) => macro.replaceAll(/(?<!\\)%/g, item) // replace % with item unless preceded by \
                                                .replaceAll(/(?<!\\)\\i/g, i) // replace \i with zero-based index unless preceded by \
                                                .replaceAll(/(?<!\\)\\k/g, i + 1) // replace \k with one-based index unless preceded by \
                                                .replaceAll(/(?<!\\)\\n/g, "\n") // replace all \n with newline unless preceded by \
                                                .replaceAll(/\\\\/g, "\\") // replace all \\ with \
            )
        }
        switch (settings.outputNewlines) {
            case outputType.NO_NEWLINES:
                items = items.join(outputSep)
                break
            case outputType.NEWLINES:
                items = items.join(outputSep + "\n")
                break
            case outputType.ROWS:
                items = items.reduce((previous, current, index) => {
                    if (index === items.length - 1) {
                        return previous + current
                    } else if ((index + 1) % settings.rows === 0) {
                        return previous + current + outputSep + "\n"
                    } else {
                        return previous + current + outputSep
                    }
                }, "")
                break
            default:
                items = items.join(outputSep)
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
            <LeftPanel setInput={presetInput} macro={macro} setMacro={setMacro}/>
            <TextAreas input={input} setInput={setInput} output={output}/>
            <RightPanel input={input} setInput={setInput} macro={macro} output={output} convert={convert}/>
        </div>
    );
}

export default MassFormatter;