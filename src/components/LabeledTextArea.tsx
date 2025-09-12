import "./LabeledTextArea.css";

export default function LabeledTextArea({label, readOnly, value, onChange}: {
    label: string,
    readOnly: boolean,
    value: string,
    onChange?: (value: string) => void
}) {

    return (
        <label className="labeledTextArea">
            {label}
            <textarea readOnly={readOnly} value={value} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                      onChange={onChange ? e => onChange(e.target.value) : undefined}/>
        </label>
    );
}
