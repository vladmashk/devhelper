export interface DevHelperState {
    input: string,
    mode: Mode,
    outputFormatOptions: OutputFormatOptions,
    macro: string
}

export enum ModeType {
    SEPARATE = "Separate",
    EXTRACT = "Extract"
}

export interface SeparateMode {
    type: ModeType.SEPARATE,
    text: string,
    regex: boolean
}

export interface ExtractMode {
    type: ModeType.EXTRACT,
    extractionRegex: string
}

type Mode = SeparateMode | ExtractMode;

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
    type: "changeMode",
    changeMode: (mode: Mode) => Mode
} | {
    type: "setModeDefaults",
    modeType: ModeType
} | {
    type: "changeOutputFormatOptions",
    changeOutputFormatOptions: (outputFormatOptions: OutputFormatOptions) => OutputFormatOptions
} | {
    type: "changeMacro",
    macro: string
}
