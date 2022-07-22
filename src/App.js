import './App.css';
import ListHelper from "./Components/listHelper/ListHelper.js";
import {useState} from "react";
import Tabs from "./Tabs.js";

export const tabs = {
    LIST_HELPER: "lh",
    MACRO: "m"
}

function App() {

    const [shownTab, setShownTab] = useState(tabs.LIST_HELPER);

    function wrap(shownTab) {
        return (
            <div className="App">
                <h1>Dev helper</h1>
                <Tabs setShownTab={setShownTab}/>
                {shownTab}
            </div>
        )
    }

    if (shownTab === tabs.LIST_HELPER)  {
        return wrap(<ListHelper/>);
    } else {
        return "error";
    }
}

export default App;
