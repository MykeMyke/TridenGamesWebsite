import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getGames } from "../api/games";

const columns = [
  // { field: "id", headerName: "ID", width: 80 },
  { field: "module", headerName: "Adv Code", width: 150 },
  { field: "name", headerName: "Adv Name", width: 150 },
  { field: "datetime", headerName: "Game Time", width: 200 },
];

const gamesTableStyles = {
  height: "650px",
};

const UserTable = ({ onError }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames()
      .then((result) => result.json())
      .then((json) => setGames(json))
      .catch(() => onError());
  }, []);

  return (
    <Card sx={{ mx: 2 }}>
      <CardContent>
        <DataTable
          rows={games}
          columns={columns}
          loading={!games.length}
          sx={gamesTableStyles}
        />
      </CardContent>
    </Card>
  );
};

export default UserTable;
