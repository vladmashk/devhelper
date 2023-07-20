import './App.css';
import MassFormatter from "./Components/massFormatter/MassFormatter.js";
import {useState} from "react";
import Tabs from "./Tabs.js";

export const tabs = {
    MASS_FORMATTER: "mass formatter"
}

function App() {

    const [shownTab, setShownTab] = useState(tabs.MASS_FORMATTER);

    function wrap(shownTab) {
        return (
            <div className="App">
                <h1>Dev helper</h1>
                <Tabs setShownTab={setShownTab}/>
                {shownTab}
            </div>
        )
    }

    if (shownTab === tabs.MASS_FORMATTER)  {
        return wrap(<MassFormatter/>);
    } else {
        return "error";
    }
}

export default App;
