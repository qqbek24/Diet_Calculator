import * as React from "react";
// import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from '@mui/material/Box';


export default function resDateTimePicker(props) {

  function onChangeHandler(date) {
    props.onChange(date);
  } 

  return (
    <LocalizationProvider dateAdapter = {AdapterDayjs}>
      <Box
        sx = {{
          display: "block", // 'flex'
          position: 'sticky',
        }}
      >
        <DateTimePicker 
          disabled = {props.DisableState}
          border-color = "primary"
          value = {props.date}
          sx = {{ minWidth: '170px' }}
          format = "YYYY-MM-DD HH:mm:ss"
          // label="24 hours"
          ampm = {false}
          onChange = {onChangeHandler}
          slotProps = {{
            field: { 
              // clearable: true, 
              // onChange: {onChangeHandler},
              size: "small",
              focused: true,
            },
            // MultiSectionDigitalClock: {
            //     autoFocus: false,
            // },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}