import "./InputActionTab.css";

export default function InputActionTab(props) {

    return (
        <div className={`inputActionTab ${props.activeTab === props.name ? 'active' : ''}`} onClick={() => props.setActiveTab(props.name)}>
            {props.name}
        </div>
    )
}
