export type Action = {
  id: string
  icon: string | JSX.Element
  title: string
  description: string
}

export type HomeActions = Action[]

export type Carrier = "telesur" | "digicel"

export type Plan = {
  id: number
  duration: string
  data: number
  price: number
  code: string
}

export type Info = {
  version: string
}
