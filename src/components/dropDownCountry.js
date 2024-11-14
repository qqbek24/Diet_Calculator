import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import countriesListJson from '../data/Countries_List.json'
import { useCountry } from '../components/DataContextCountry';

export default function CountrySelect() {
  // eslint-disable-next-line
  const { sharedCountry, setSharedCountry } = useCountry();

  const handleChange = (event)  => {
    const SelectedCountry = (event.target.textContent);

    countriesListJson
      .filter((data) => {
        const Countries = (data.CountryNames).toLowerCase();
        const selectedVal = (SelectedCountry.substring(0, SelectedCountry.lastIndexOf(" ")).toLowerCase());

        return Countries.includes(selectedVal);
      })
      .map((item) => (
        setSharedCountry(item.Country_EN)
      ));
  };


  return (
  
    <Autocomplete
      id = "country-select"
      size = "small"
      sx = {{ width: 300 }}
      options = {countriesListJson} //{countries}
      autoHighlight
      onChange = {handleChange}
      getOptionLabel = {(option) => option.Country_EN}  //search in
      renderOption = {(props, option) => (
        <Box
          component = "li"
          sx = {{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading = "lazy"
            width = "20"
            srcSet = {`https://flagcdn.com/w40/${option.Code_ISO.toLowerCase()}.png 2x`}
            src = {`https://flagcdn.com/w20/${option.Code_ISO.toLowerCase()}.png`}
            alt = ""
          />
          {option.CountryNames} ({option.Code_ISO})
        </Box>
      )}
      renderInput = {(params) => (
        <TextField
          {...params}
          label = "Choose a country"
          inputProps = {{
            ...params.inputProps,
            //autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
