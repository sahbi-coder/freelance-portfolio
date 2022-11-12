import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import  { useRouter } from "next/router";
import Link from "next/link";

export default function BasicSelect({ t }) {
  const {pathname} = useRouter()



  return (
    <Box
      sx={{
        minWidth: 120,
        marginTop: 2,
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {t("navbar:language")}
        </InputLabel>

        <Select>
          <Link
            href={
        
            
              pathname
            }
            locale='en'
          >
            <MenuItem value="/en" name="en">
              {t("navbar:english")}
            </MenuItem>
          </Link>
          <Link
            href={
              pathname
            }
            locale='fr'
          >
            <MenuItem value="/fr" name="fr">
              {t("navbar:french")}
            </MenuItem>
          </Link>
        </Select>
      </FormControl>
    </Box>
  );
}
