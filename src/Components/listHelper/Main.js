import React, {useState} from 'react';
import "./Main.css"
import TextAreas from "./TextAreas.js";
import Sidebar, {outputType} from "./Sidebar.js";
import Presets from "./Presets.js";

function Main(props) {

    const [input, setInput] = useState("")

    const [output, setOutput] = useState("")

    /**
     * @param {{separator: string, quoteType: string, outputNewlines: string, rows: number}} settings
     */
    function convert(settings) {
        if (input === "") return;
        let items = input.split(settings.separator)
        const quote = settings.quoteType === "single" ? "'" : '"'
        items = items.map(i => quote + i.trim().replace(/\n/g, "") + quote)
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
            <Presets setInput={presetInput}/>
            <TextAreas input={input} setInput={setInput} output={output}/>
            <Sidebar convert={convert}/>
        </div>
    );
}

export default Main;