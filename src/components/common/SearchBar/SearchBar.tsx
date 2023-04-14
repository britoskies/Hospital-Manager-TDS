// Mui
import { alpha, InputBase, styled } from "@mui/material"
import { Search as SearchIcon } from '@mui/icons-material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // width: '20ch',
      // '&:focus': {
      //   width: '30ch',
      // },
      width: '40ch'
    },
  },
}));

type Props = {
  searchTerm: string | undefined,
  setSearchTerm: ((e: any) => void)
};

function SearchBar({ searchTerm, setSearchTerm }: Props) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase 
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e)}
        placeholder="Buscar…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}

export default SearchBar;
