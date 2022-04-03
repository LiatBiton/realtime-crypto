import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppBar } from '@mui/material';
import { AddCmp } from '../AddSymbol/index.jsx'
import "./index.scss";

export const EnhancedTableToolbar = (props) => {
    const { numSelected, onRemove, missingSymbols, onAdd, isLoading } = props;
  
    return (
      <Toolbar id={'tool-bar'}
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography 
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <AddCmp addOptions={missingSymbols} onAdd={onAdd} isLoading={isLoading}/>
        )
    }
        {numSelected > 0 ? (
          <Tooltip title="Delete" onClick={onRemove}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ''
        )}
      </Toolbar>
    );
  };

//   EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired,
//   };