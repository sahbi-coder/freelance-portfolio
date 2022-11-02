import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAppContext } from "../context/state";

export default function BasicSelect() {
  const { state, dispatch, ACTIONS } = useAppContext();

  const handleChange = (event) => {

    dispatch({ type: event.target.value });
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: 5,backgroundColor:'white',borderRadius:3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language:</InputLabel>
        <Select onChange={handleChange}>
          {state.language === ACTIONS.EN && (
        
            <MenuItem value={ACTIONS.EN}>english</MenuItem>
           
          )}
          {state.language === ACTIONS.EN && (
            <MenuItem value={ACTIONS.FR}>french</MenuItem>
          )}
          {state.language === ACTIONS.FR && (
            <MenuItem value={ACTIONS.EN}>anglais</MenuItem>
          )}
          {state.language === ACTIONS.FR && (
            <MenuItem value={ACTIONS.FR}>Français</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
