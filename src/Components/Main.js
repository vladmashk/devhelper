import React, {useState} from 'react';
import "./Main.css"
import TextAreas from "./TextAreas.js";
import Sidebar from "./Sidebar.js";

function Main(props) {

    const [input, setInput] = useState("")

    const [output, setOutput] = useState("")

    /**
     * @param {{separator: string, quoteType: string, outputNewlines: boolean}} settings
     */
    function convert(settings) {
        if (input === "") return;
        let items = input.split(settings.separator)
        const quote = settings.quoteType === "single" ? "'" : '"'
        setOutput(items.map(i => quote + i.trim().replace(/\n/g, "") + quote).join("," + (settings.outputNewlines ? "\n" : " ")))
    }

    return (
        <div id="main">
            <TextAreas input={input} setInput={setInput} output={output}/>
            <Sidebar convert={convert}/>
        </div>
    );
}

export default Main;