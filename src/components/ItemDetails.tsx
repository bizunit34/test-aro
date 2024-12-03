import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Avatar,
} from '@mui/material';
import { Item } from '@/models';

interface ItemDetailsProps {
  item: Item;
  frequentlyPurchasedTogether: Array<Item>;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  frequentlyPurchasedTogether,
}) => {
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      {/* Item Image and Title */}
      <Card>
        <CardMedia
          component='img'
          height='300'
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography variant='h4' gutterBottom>
            {item.title}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {item.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Item Details Table */}
      <Box mt={4}>
        <Typography variant='h5' gutterBottom>
          Item Details
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {Object.entries([
                ['price', item.price],
                ['quantityOnHand', item.quantityOnHand],
                ['quantityOnOrder', item.quantityOnOrder],
                ['quantityOnBackOrder', item.quantityOnBackOrder],
              ]).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell variant='head' sx={{ fontWeight: 'bold' }}>
                    {key}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Frequently Purchased Together */}
      <Box mt={4}>
        <Typography variant='h5' gutterBottom>
          Frequently Purchased Together
        </Typography>
        <List>
          {frequentlyPurchasedTogether.map((relatedItem) => (
            <ListItem key={relatedItem.id} alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  src={relatedItem.image}
                  alt={relatedItem.title}
                  variant='square'
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={relatedItem.title}
                secondary='Click to view details'
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ItemDetails;
