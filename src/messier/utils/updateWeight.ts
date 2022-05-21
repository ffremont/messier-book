import { MessierObject } from '../types/MessierObject'

const filters: {[index: string]:any} = {
  DEFAULT: (o: MessierObject): number => o.number + (o.favori ? -1000 : 0),
  MAGNITUDE: (o: MessierObject): number => o.magnitude*(-1) + (o.favori ? -1000 : 0),
}

export const updateWeight = (
  filter = 'DEFAULT',
  objects: MessierObject[]
) =>
  objects.map((o) => ({
    ...o,
    weight: (filters[filter] || filters.DEFAULT)(o),
  }))
