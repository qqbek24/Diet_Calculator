import React from 'react';
import { Paper, Box } from "@mui/material";

function ChatBotComp(props) {
    return(
      <Box>
        <Paper square = {false} elevation = {16} sx = {{ width: 350, height: 550}} >
          <div>  
            {/* src - source of power platform chat (named PVA or Copilot) */}
            <iframe src="https://web.powerva.microsoft.com/environments/06f6b975-aa10-eb4c-b9a1-7f181b0efd43/bots/crcb5_rpaBcoeTestChat/webchat?__version__=2"
              style={{ border: 'none',
              width: '100%', 
              height: 545,
              frameborder:0}}>
            </iframe>                                                                                                                              
          </div>
        </Paper>
      </Box>
    );
}
export default ChatBotComp;