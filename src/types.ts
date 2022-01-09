export type Position = {
    x: number,
    y: number
}

export type Size = {
    h: number,
    w: number
}

export type ControllerKeys = {
    [key: string]: ControllerHandler
}

export type ControllerHandler = {
    pressed: boolean,
    func: any
}

export type Velocity = {
    x: number,
    y: number
}