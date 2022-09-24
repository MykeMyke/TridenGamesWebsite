import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const Staff = (staff) => {
  return (
    <div className="masonry-card">
      <Card
        raised={true}
        sx={{
          maxWidth: 500,
          border: `6px solid ${staff.color}`,
          borderRadius: 8,
        }}
      >
        <CardContent>
          <div alignItems="center" className="staffCard">
            <div className="position">
              <Typography
                variant="h4"
                color="text.primary"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {staff.position}
              </Typography>
            </div>
            <div className="name">
              <Typography variant="subtitle2" color="text.secondary">
                {staff.name}
              </Typography>
              <Divider variant="middle" sx={{ my: 0.8 }} />
            </div>
            <div className="responsibilities">
              <Typography variant="subtitle2" color="text.secondary">
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {staff.responsibilities.map((role) => (
                    <li style={{ paddingBottom: 5 }}>{role}</li>
                  ))}
                </ul>
              </Typography>
            </div>
            <div className="quote">
              <Divider variant="middle" sx={{ my: 0.8 }} />
              <Typography variant="subtitle2" color="text.secondary">
                {staff.quote}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
