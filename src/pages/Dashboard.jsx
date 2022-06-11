import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { getGames } from "../api/games";
import Button from "@mui/material/Button";
import { toLocalString } from "../utils/formatting";

const columns = [
  {
    field: "id",
    headerName: "Link",
    width: 80,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        href={`https://unseen-servant.digitaldemiplane.com/unseenservant/admin/core/game/${params.value}/change/`}
        target="_blank"
        rel="noreferrer"
      >
        Open
      </Button>
    ),
  },
  { field: "dm_name", headerName: "DM", width: 100 },
  { field: "module", headerName: "Adv Code", width: 150 },
  { field: "name", headerName: "Adv Name", width: 150 },
  {
    field: "datetime",
    headerName: "Game Time",
    width: 200,
    renderCell: (params) => toLocalString(params.value),
  },
  {
    field: "datetime_release",
    headerName: "Patreon Release",
    width: 200,
    renderCell: (params) => toLocalString(params.value),
  },
  {
    field: "datetime_open_release",
    headerName: "General Release",
    width: 200,
    renderCell: (params) => toLocalString(params.value),
  },
];

const gamesTableStyles = {
  height: "1080px",
};

const UserTable = ({ onError }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then((result) => {
      setGames(
        result.data.sort((a, b) => {
          return new Date(a.datetime) - new Date(b.datetime);
        })
      );
    });
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
