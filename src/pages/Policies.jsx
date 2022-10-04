import React from "react";
import { Typography } from "@mui/material";
import "../styles/Global.css";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { policies } from "../data/policies";
import Policies from "../components/policyCards";

function PoliciesPage() {
  return (
    <React.Fragment>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <div className="centraliser">
          <div></div>
          <div>
            <Typography variant="h2" sx={{ my: 1, textAlign: "center" }}>
              Triden Policies
            </Typography>
          </div>
          <div></div>
        </div>
        <Typography
          variant="body"
          color="text.primary"
          sx={{ px: 3, maxWidth: "1080px", alignSelf: "center" }}
        >
          We want to keep Triden a fantastic place to have fun. To that end, we
          have a few rules and policies that help keep everybody safe and things
          running smoothly. Collectively, the following constitute our Code of
          Conduct, which must be abided by to participate in games, events and
          other server activities.
        </Typography>
        <Divider variant="middle" sx={{ py: 1 }} />
        <div className="centraliser">
          <div></div>
          <div className="masonry-staff">
            {policies.map((policyInfo) => (
              <Policies {...policyInfo} key={`bio_${policyInfo.name}`} />
            ))}
          </div>
          <div></div>
        </div>
        <Divider variant="middle" sx={{ py: 1 }} />
      </Stack>
    </React.Fragment>
  );
}

export default PoliciesPage;
