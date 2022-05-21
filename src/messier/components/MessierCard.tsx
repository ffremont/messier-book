import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import { MessierObject } from '../types/MessierObject'
import Brightness6Icon from '@mui/icons-material/Brightness6'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite';
import clsx from 'clsx'

interface MessierCardProps {
  object: MessierObject
  onSeeMore?: (o: MessierObject) => void,
  onFavori?: (o: MessierObject) => void
  readOnly?: boolean
}

export const MessierCard = ({
  object,
  onSeeMore = () => {},
  onFavori = () => {},
  readOnly = false,
}: MessierCardProps) => (
  <Card className={clsx('messier-card', {'messier-card-favori': object.favori})}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={`/messier/images/${object.number}.jpg`}
        alt={`m${object.number}`}
      />
      <CardContent>
        <Typography className="messier-card-state" component="div">
          <Chip
            icon={<Brightness6Icon />}
            label={`mag. ${object.magnitude}`}
            color="primary"
          />
          <Chip
            icon={<MyLocationIcon />}
            label={`${object.constellation}`}
            color="secondary"
          />
          <Chip icon={<AccessTimeIcon />} label={`${object.saison}`} />
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          M{object.number} -{' '}
          {object.commonName
            ? object.commonName
            : `${object.type} ${object.constellation}`}
        </Typography>
        {!readOnly && (
          <Typography
            className="messier-description"
            variant="body2"
            color="text.secondary"
          >
            {object.description.length > 120
              ? object.description.substr(0, 120) + '...'
              : object.description}
          </Typography>
        )}
        {readOnly && object.archive && (
          <Typography
            className="messier-archive"
            variant="body2"
            color="text.secondary"
          >
            {object.archive}
          </Typography>
        )}
        {readOnly && (
          <Typography
            className="messier-description"
            variant="body2"
            color="text.secondary"
          >
            {object.description}
          </Typography>
        )}
      </CardContent>
    </CardActionArea>
    {!readOnly && (
      <CardActions>
        <Button onClick={() => onFavori(object)} startIcon={object.favori ?<FavoriteIcon /> :  <FavoriteBorderIcon />}>Favori</Button>
        <Button size="small" onClick={() => onSeeMore(object)}>
          En savoir plus
        </Button>
      </CardActions>
    )}
  </Card>
)
