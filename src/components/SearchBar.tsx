import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  onFilterChange: (filters: {
    searchText: string;
    categories: string[];
    subcategories: string[];
    sortOption: string;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilterChange }) => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState<
    string[]
  >([]);

  const categorySubcategoryMap: Record<string, string[]> = {
    Boxes: ['Cardboard Boxes', 'Gift Boxes', 'Shipping Boxes'],
    Bottles: ['Glass Bottles', 'Plastic Bottles', 'Water Bottles'],
    Tubes: ['Paper Tubes', 'Plastic Tubes', 'Metal Tubes'],
  };

  const sortOptions = [
    'Price: Low to High',
    'Price: High to Low',
    'Popularity',
    'Newest',
  ];

  useEffect(() => {
    // Update available subcategories based on selected categories
    let updatedSubcategories = categories.flatMap(
      (category) => categorySubcategoryMap[category] || [],
    );

    if (categories.length === 0 && updatedSubcategories.length === 0) {
      updatedSubcategories = Object.values(categorySubcategoryMap).flat();
    }

    setAvailableSubcategories(updatedSubcategories);

    // Remove any currently selected subcategories that are no longer valid
    setSubcategories((current) =>
      current.filter((subcategory) =>
        updatedSubcategories.includes(subcategory),
      ),
    );
  }, [categories]);

  const resetFilters = (): void => {
    setSearchText('');
    setCategories([]);
    setSubcategories([]);
    setSortOption('');
  };

  useEffect(() => {
    // Notify parent component of filter changes
    onFilterChange({ searchText, categories, subcategories, sortOption });
  }, [searchText, categories, subcategories, sortOption, onFilterChange]);

  return (
    <Box display='flex' flexWrap='wrap' gap={2} mb={4}>
      <TextField
        label='Search'
        variant='outlined'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        sx={{ maxWidth: 300 }}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='categories-label'>Categories</InputLabel>
        <Select
          labelId='categories-label'
          multiple
          value={categories}
          onChange={(e) => setCategories(e.target.value as string[])}
          renderValue={(selected) => selected.join(', ')}
        >
          {Object.keys(categorySubcategoryMap).map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categories.includes(category)} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='subcategories-label'>Subcategories</InputLabel>
        <Select
          labelId='subcategories-label'
          multiple
          value={subcategories}
          onChange={(e) => setSubcategories(e.target.value as string[])}
          renderValue={(selected) => selected.join(', ')}
        >
          {availableSubcategories.map((subcategory) => (
            <MenuItem key={subcategory} value={subcategory}>
              <Checkbox checked={subcategories.includes(subcategory)} />
              <ListItemText primary={subcategory} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='sort-label'>Sort By</InputLabel>
        <Select
          labelId='sort-label'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant='contained' color='secondary' onClick={resetFilters}>
        Reset
      </Button>
    </Box>
  );
};

export default SearchBar;
