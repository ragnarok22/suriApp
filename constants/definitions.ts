export type Action = {
  id: string
  icon: string
  title: string
  description: string
}

export type HomeActions = Action[]

export type Carrier = "telesur" | "digicel"

export type Plan = {
  id: number
  duration: string
  data: string
  price: number
  code: string
}

export type Info = {
  version: string
}
