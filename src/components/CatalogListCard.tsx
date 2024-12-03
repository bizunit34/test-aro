import React from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import { Grid2 } from '@mui/material';
import { Item } from '@/models';
import { useRouter } from 'next/navigation';

interface CatalogProps {
  item: Item;
}

const CatalogListCard: React.FC<CatalogProps> = ({ item }) => {
  const router = useRouter();
  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
      <Card>
        <CardMedia
          component='img'
          height='140'
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5'>
            {item.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => handleNavigation(`/catalog/${item.id}`)}
          >
            View
          </Button>
          <Button size='small' color='primary'>
            Customize
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default CatalogListCard;
