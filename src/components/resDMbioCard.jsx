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
    <Card raised="true" sx={{ maxWidth: 600 }}>
      <CardContent>
        <div alignItems="center" className="resDMbioCard">
          <div className="name">
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ mb: 1, textAlign: "center" }}
            >
              {dm.name}
            </Typography>
          </div>
          <div className="image"></div>
          <div className="location">
            <Divider variant="middle" sx={{ my: 0.8 }} />
            <Typography variant="subtitle2" color="text.secondary">
              <strong>L:</strong> {dm.location}
            </Typography>
            <Divider variant="middle" sx={{ my: 0.8 }} />
          </div>
          <div className="superpowers">
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Known for:</strong> {dm.superpowers}
            </Typography>
            <Divider variant="middle" sx={{ my: 0.8 }} />
          </div>
          <div className="favMonster">
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Favourite Monster:</strong> {dm.favMonster}
            </Typography>
          </div>
          <div className="favMoment">
            <Divider variant="middle" sx={{ my: 0.8 }} />
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Favourite Moment:</strong> {dm.favMoment}
            </Typography>
            <Divider variant="middle" sx={{ my: 0.8 }} />
          </div>
          <div className="otherInterests">
            <Typography variant="subtitle2" color="text.secondary">
              <strong>Other Interests:</strong> {dm.otherInterests}
            </Typography>
          </div>
          <div className="links">
            {dm.links && (
              <Typography variant="subtitle2" color="text.secondary">
                {dm.link1}
                {dm.link2}
              </Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResDMbio;
