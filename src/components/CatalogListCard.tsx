import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { ItemModel } from '@/models';

interface CatalogProps {
  item: ItemModel;
}

const CatalogListCard: React.FC<CatalogProps> = ({ item }) => {
  const router = useRouter();
  const handleNavigation = (route: string): void => {
    router.push(route);
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item._id}>
      <Card>
        <CardMedia
          component='img'
          height='140'
          image={item.image}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5'>
            {item.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => handleNavigation(`/catalog/${item._id}`)}
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
