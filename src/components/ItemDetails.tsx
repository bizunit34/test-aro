'use client';

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
import React, { useEffect } from 'react';

import { ItemModel } from '@/models';
import PacdoraServiceInstance from '@/services/pacdora.service';

import CatalogListCard from './CatalogListCard';

interface ItemDetailsProps {
  item: ItemModel;
  frequentlyPurchasedTogether: Array<ItemModel>;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  frequentlyPurchasedTogether,
}) => {
  useEffect(() => {
    const initializePacdora = async (): Promise<void> => {
      try {
        await PacdoraServiceInstance.initializePacdora();
      } catch (err) {
        console.error(
          'An error occurred while trying to initialize Pacdora: ',
          err,
        );
      }
    };

    initializePacdora().catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Container maxWidth='md' sx={{ mt: 4 }} className='flex'>
        {/* Item Image and Title */}
        <div style={{ width: '300px', marginRight: '20px' }}>
          <CatalogListCard key={item._id} item={item} />
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
                  modelId: item.modelId,
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
              <ListItem key={relatedItem._id} alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    src={relatedItem.image}
                    alt={relatedItem.name}
                    variant='square'
                    sx={{ width: 80, height: 80 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={relatedItem.name}
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
