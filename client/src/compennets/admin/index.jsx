import React from 'react';
import NavBar from './navBar';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function Test() {
  return (
    <div>
      <NavBar />
      <Card>
        <CardHeader title="Card Title" />
        <CardContent>
          <Typography>Contenu de la carte</Typography>
        </CardContent>
      </Card>
    </div>
  );
}