import {
  Avatar,
  Box,
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
} from '@mui/material';
import React from 'react';

import { Item } from '@/models';

import CatalogListCard from './CatalogListCard';

interface ItemDetailsProps {
  item: Item;
  frequentlyPurchasedTogether: Array<Item>;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  frequentlyPurchasedTogether,
}) => {
  return (
    <div>
      <Container maxWidth='md' sx={{ mt: 4 }} className='flex'>
        {/* Item Image and Title */}
        <div style={{ width: '300px', marginRight: '20px' }}>
          <CatalogListCard key={item.id} item={item} />
        </div>

        {/* Item Details Table */}
        <Box mt={4}>
          <Typography variant='h5' gutterBottom>
            Item Details
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                {Object.entries({
                  price: item.price,
                  quantityOnHand: item.quantityOnHand,
                  quantityOnOrder: item.quantityOnOrder,
                  quantityOnBackOrder: item.quantityOnBackOrder,
                }).map(([key, value]) => (
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
      </Container>

      <Container maxWidth='md' sx={{ mt: 4 }} className='flex'>
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
    </div>
  );
};

export default ItemDetails;
