import React, { useState } from 'react';
import "./MassFormatter.css"
import TextAreas from "./TextAreas.js";
import RightPanel, {outputCase, outputSeparation} from "./RightPanel/RightPanel";
import LeftPanel from "./LeftPanel.js";

export const macroChar = "%"

function MassFormatter() {

    const [input, setInput] = useState("")

    const [output, setOutput] = useState("")

    const [macro, setMacro] = useState("")

    /**
     * @param {{inputSeparator: string, inputRegex: boolean, extractRegex: string, quoteType: string, outputNewlines: string, rows: number, outputChangeCase: string, outputSeparator: string, activeInputActionTab: string}} settings
     */
    function convert(settings) {
        if (input === "") {
            setOutput("");
            return;
        }
        let outputSep = settings.outputSeparator;
        let items;
        let matches;
        let subitemsPresent = false;
        try {
            if (settings.activeInputActionTab === "Separate") {
                items = input.split(settings.inputRegex ? new RegExp(settings.inputSeparator) : settings.inputSeparator)
            } else if (settings.activeInputActionTab === "Extract") {
                matches = Array.from(input.matchAll(new RegExp(settings.extractRegex, "g")));
                subitemsPresent = matches.some(m => m[1]);
                items = matches.map(m => m[1] ?? m[0]);
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
        if (settings.outputChangeCase === outputCase.UPPER_CASE) {
            items = items.map(i => i.toUpperCase());
        } else if (settings.outputChangeCase === outputCase.LOWER_CASE) {
            items = items.map(i => i.toLowerCase());
        }
        if (macro && (macro.includes(macroChar) || /(?<!\\)\$\d/.test(macro))) {
            items = items.map((item, i) => {
                let result = macro.replaceAll(/(?<!\\)%/g, item) // replace % with item unless preceded by \
                                  .replaceAll(/(?<!\\)\\i/g, i.toString()) // replace \i with zero-based index unless preceded by \
                                  .replaceAll(/(?<!\\)\\k/g, (i + 1).toString()) // replace \k with one-based index unless preceded by \
                                  .replaceAll(/(?<!\\)\\n/g, "\n") // replace \n with newline unless preceded by \
                                  .replaceAll(/\\\\/g, "\\"); // replace \\ with \
                if (subitemsPresent) {
                    for (let j = 1; j < matches[i].length; j++) {
                        result = result.replaceAll(new RegExp("(?<!\\\\)\\$" + j, "g"), matches[i][j]); // replace $j with jth capture group unless preceded by \
                    }
                }
                return result;
            })
        }
        switch (settings.outputNewlines) {
            case outputSeparation.NO_NEWLINES:
                items = items.join(outputSep)
                break
            case outputSeparation.NEWLINES:
                items = items.join(outputSep + "\n")
                break
            case outputSeparation.ROWS:
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
            <LeftPanel setInput={presetInput} macro={macro} setMacro={setMacro} />
            <TextAreas input={input} setInput={setInput} output={output} />
            <RightPanel input={input} setInput={setInput} macro={macro} output={output} convert={convert} />
        </div>
    );
}

export default MassFormatter;