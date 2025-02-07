export interface DevHelperState {
    version: number,
    input: string,
    inputSeparator: InputSeparator,
    outputFormatOptions: OutputFormatOptions,
    macro: string
}

interface InputSeparator {
    text: string,
    regex: boolean
}

interface OutputFormatOptions {
    quotesType: QuotesType,
    newlines: OutputNewlines,
    columns: number,
    changeCase: ChangeCase,
    outputSeparator: string
}

export enum QuotesType {
    DOUBLE = "Double",
    SINGLE = "Single",
    NONE = "None"
}

export enum OutputNewlines {
    NONE = "No newlines between items",
    NEWLINES = "Newlines between items",
    COLUMNS = "In columns"
}

export enum ChangeCase {
    NO = "No",
    UPPER = "Upper case",
    LOWER = "Lower case"
}

export type DevHelperAction = {
    type: "changeInput",
    input: string
} | {
    type: "changeInputSeparator",
    changeInputSeparator: (inputSeparator: InputSeparator) => InputSeparator
} | {
    type: "changeOutputFormatOptions",
    changeOutputFormatOptions: (outputFormatOptions: OutputFormatOptions) => OutputFormatOptions
} | {
    type: "changeMacro",
    macro: string
}
