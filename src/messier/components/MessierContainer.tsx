import { useEffect, useState } from 'react'
import { MessierCard } from './MessierCard'
import { MessierObject } from '../types/MessierObject'
import { DetailModal } from './DetailModal'
import { FilterDialog } from './FilterDialog'
import { useMessierContext } from '../hooks/useMessierContext'
import { Fab } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const LOCALSTORAGE_KEY = 'messier';

export const MessierContainer = () => {
  const ctx = useMessierContext()
  const [object, setObject] = useState<MessierObject | null>(null)
  useEffect(() => {
    const favoris = localStorage[LOCALSTORAGE_KEY] ? JSON.parse(localStorage[LOCALSTORAGE_KEY]) : [];

    fetch('/messier/messier-book-all.json')
      .then((r) => r.json())
      .then((data) =>
        ctx.changeObjects(
          data.map((d: MessierObject) => ({
            ...d,
            magnitude: d.magnitude||0,
            favori: favoris.indexOf(d.number) > -1,
            weight: d.number,
          }))
        )
      )
  }, []);

  const handleFavori = (m: MessierObject) => {
    const favoris = localStorage[LOCALSTORAGE_KEY] ? JSON.parse(localStorage[LOCALSTORAGE_KEY]) : [];
    if(favoris.indexOf(m.number) > -1){
      favoris.splice(favoris.indexOf(m.number),1);
    }else{
      favoris.push(m.number);
    }
    localStorage[LOCALSTORAGE_KEY] = JSON.stringify(favoris);
    ctx.changeObjects(
      ctx.objects.map((d: MessierObject) => ({
        ...d,
        favori: favoris.indexOf(d.number) > -1,
      }))
    )
  }

  return (
    <div className="messier-container">
      <div className="messier-card-list">
        {ctx.objects && ctx.objects
          .sort((a, b) => {
            return a.weight - b.weight
          })
          .map((o) => (
            <MessierCard
              key={o.number}
              object={o}
              onSeeMore={(m) => setObject(m)}
              onFavori={handleFavori}
            />
          ))}
      </div>

      <FilterDialog
        onClose={() => {
          ctx.changeOpenFilter(false)
        }}
        open={ctx.openFilter}
      />

      <Fab  className="fab-to-top" onClick={() => window.scrollTo(0,0)} aria-label="totop">
        <ArrowUpwardIcon />
      </Fab>

      {object && (
        <DetailModal
          object={object}
          title={
            object.commonName
              ? object.commonName
              : `${object.type} ${object.constellation}`
          }
          onClose={() => setObject(null)}
        />
      )}
    </div>
  )
}
