import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import "../styles/Global.css";

const Policies = (policies) => {
  let order = policies.numbered === "yes" ? true : false;

  return (
    <div className="masonry-card">
      <Card
        raised={true}
        sx={{
          maxWidth: 500,
          border: `6px solid ${policies.color}`,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <div alignItems="center" className="staffCard">
            <div className="name">
              <Typography
                variant="h4"
                color="text.primary"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {policies.name}
              </Typography>
            </div>
            <Divider variant="middle" sx={{ my: 0.8 }} />
            <div>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Last Updated: {policies.updated}
              </Typography>
              <Divider variant="middle" sx={{ my: 0.8 }} />
            </div>
            <div className="responsibilities">
              {!order && (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textAlign: "center", mb: -3.5 }}
                >
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {policies.points.map((role) => (
                      <li style={{ paddingBottom: 5 }}>{role}</li>
                    ))}
                  </ul>
                </Typography>
              )}
              {order && (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textAlign: "center", mb: -5.5 }}
                >
                  <ol style={{ paddingLeft: 12 }}>
                    {policies.points.map((role) => (
                      <li style={{ paddingBottom: "1.5em" }}>{role}</li>
                    ))}
                  </ol>
                </Typography>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Policies;
