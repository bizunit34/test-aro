'use client';

import { Box, Container, Grid2, Pagination, Typography } from '@mui/material';
import React, { useState } from 'react';

import { Item } from '@/models';

import CatalogListCard from './CatalogListCard';

interface CatalogProps {
  items: Array<Item>;
  itemsPerPage?: number;
}

const CatalogList: React.FC<CatalogProps> = ({ items, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' gutterBottom>
        Catalog
      </Typography>
      <Grid2 container spacing={3}>
        {currentItems.map((item) => (
          <CatalogListCard key={item.id} item={item} />
        ))}
      </Grid2>
      <Box mt={4} display='flex' justifyContent='center'>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color='primary'
        />
      </Box>
    </Container>
  );
};

export default CatalogList;
