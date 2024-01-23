import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
const CalendarGameControls = ({ game }) => {
  const navigate = useNavigate();
    if (game.is_dm) {
      return (
        <Button
          aria-describedby={`dm-edit${game.id}`}
          variant="contained"
          size="small"
          sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1, minWidth: "30px" }}
          color="secondary"
          onClick={() => navigate(`/members/games/edit/${game.id}`)}>✏️</Button>
      )
  }
  return null;
}

export default CalendarGameControls;