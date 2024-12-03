'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Chip,
  SelectChangeEvent,
} from '@mui/material';

const services = [
  'Member Pricing for oPackaging & Products',
  'Marketing & Branding',
  'Billboard Advertising',
  'Ad Campaigns',
  'Web Design & Development',
];

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedServices(event.target.value as string[]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      name,
      phone,
      email,
      location,
      notes,
      selectedServices,
    });
    alert('Message sent successfully!');
  };

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Phone Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Email Address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='services-label'>Services</InputLabel>
              <Select
                labelId='services-label'
                multiple
                value={selectedServices}
                onChange={handleServiceChange}
                input={<OutlinedInput label='Services' />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {services.map((service) => (
                  <MenuItem key={service} value={service}>
                    <Checkbox
                      checked={selectedServices.indexOf(service) > -1}
                    />
                    <ListItemText primary={service} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Notes'
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUs;
