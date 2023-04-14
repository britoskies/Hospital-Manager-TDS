import React from 'react';

// Components
import { SearchBar } from '../../'

// Mui
import { Paper } from '@mui/material'

type Props = {
  title: string,
  withSearchBar?: boolean,
  searchTerm?: string,
  setSearchTerm: (e: any) => void
};

function ViewTitle({ title, withSearchBar, searchTerm, setSearchTerm }: Props) {
  return (
    <React.Fragment>
      <Paper
        elevation={0}
        sx={{
          height: 80,
          background: 'linear-gradient(90deg, #1D3557 0%, #457B9D 91%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          color: 'white'
        }}
      >
        <h3>{title}</h3>
        {withSearchBar && <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
      </Paper>
    </React.Fragment>
  );
}

export default ViewTitle;