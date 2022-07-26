import * as React from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


const ResDMbio = (dm) => {
 return (
 <Card raised="true" sx={{ maxWidth: 450 }}>
   <CardContent sx={{ pt: 0.75, pb: 0.2, "&:last-child": { pb: 0 } }}>
     <Grid
       container
       direction="row"
       justifyContent="space-between"
       alignItems="center"
     >
       <Box>
         <Typography variant="cardmain" color="text.primary" marginRight={3}>
             {dm.name}
         </Typography>
         <Typography variant="subtitle2" color="text.secondary">
             {dm.superpower}
         </Typography>
         </Box>
         {/* just showing a conditional, ths block only shows if the DM has a favMonster */}
         {dm.favMonster && (
           <Typography variant="subtitle" color="text.primary" sx={{ mr: 1 }}>
              {dm.favMonster}
           </Typography>
         )}
     </Grid>
    </CardContent>
  </Card>
 );
  
};

export default ResDMbio;