'use client'

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Pagination,
} from '@mui/material';
import {Grid2} from '@mui/material'; // Import Grid2

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface CatalogProps {
  items: Item[];
  itemsPerPage?: number;
}

const CatalogList: React.FC<CatalogProps> = ({ items, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Catalog
      </Typography>
      <Grid2 container spacing={3}>
        {currentItems.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="secondary">
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default CatalogList;
