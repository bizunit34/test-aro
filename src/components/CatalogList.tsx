'use client';

import { Box, Container, Grid2, Pagination, Typography } from '@mui/material';
import equal from 'fast-deep-equal';
import React, { useState } from 'react';

import { ItemModel } from '@/models';

import CatalogListCard from './CatalogListCard';
import SearchBar from './SearchBar';

interface CatalogProps {
  items: Array<ItemModel>;
  itemsPerPage?: number;
}

const CatalogList: React.FC<CatalogProps> = ({ items, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    searchText: '',
    categories: [] as string[],
    subcategories: [] as string[],
    sortOption: '',
  });
  console.log('filters: ', filters);

  // Calculate the range of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    if (page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  const handleFilterChange = (updatedFilters: {
    searchText: string;
    categories: string[];
    subcategories: string[];
    sortOption: string;
  }): void => {
    console.log('Updated Filters:', updatedFilters);

    if (equal(filters, updatedFilters)) {
      return;
    }

    setFilters(updatedFilters);
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' gutterBottom>
        Catalog
      </Typography>
      <SearchBar onFilterChange={handleFilterChange} />
      <Grid2 container spacing={3}>
        {currentItems.map((item) => (
          <CatalogListCard key={item._id} item={item} />
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
