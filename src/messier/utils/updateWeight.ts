import { MessierObject } from '../types/MessierObject'

const filters: {[index: string]:any} = {
  DEFAULT: (o: MessierObject): number => o.favori ? o.number : 1000 + o.number,
  MAGNITUDE: (o: MessierObject): number => o.favori ? o.magnitude + 30 : 1000 + 30 + o.magnitude,
}

export const updateWeight = (
  filter = 'DEFAULT',
  objects: MessierObject[]
) =>
  objects.map((o) => ({
    ...o,
    weight: (filters[filter] || filters.DEFAULT)(o),
  }))
