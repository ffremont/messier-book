import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import FondEtoile from '../assets/fond.jpeg'

export const GeneralInformation = () => (
  <div className="general-information-card">
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={FondEtoile}
        alt="ciel étoilé    "
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          A la découverte du ciel profond !
        </Typography>
        <Typography variant="body2" color="text.secondary">
        AUTEUR DU CATALOGUE LE PLUS UTILISÉ PAR LES AMATEURS D'ASTRONOMIE
        </Typography>
       
        
      </CardContent>
      <CardActions>
        <Button href='https://www.cosmodixi.fr/generalites/objets-messier.php' size="small">En savoir plus</Button>
      </CardActions>
    </Card>
  </div>
)
