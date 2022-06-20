export type SimpleVector2D = {
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
  move?: Function,
  stop?: Function
}

export type Velocity = {
  x: number,
  y: number
}

export type TimestampedLyrics = {
  time: number,
  words: string
}

export type State = {
  [key: string]: string | number | boolean
}

export type lyrics = {
  seconds?: number,
  lyric?: string
} | string

export type GenericObject = { 
  [key: string]: any 
}