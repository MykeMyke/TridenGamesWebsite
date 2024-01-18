import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button, Paper } from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";

import { useGames } from "../../api/games";
import { toLocalString } from "../../utils/formatting";

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
        href={`/members/games/edit/${params.value}?created=false`}
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

export default function GamesList() {
  const navigate = useNavigate();
  const { data: games, isLoading } = useGames();
  const [pageSize, setPageSize] = useState(20);

  return (
    <Paper sx={{ padding: "1em" }}>
      <DataGrid
        rows={games ?? []}
        columns={columns}
        loading={isLoading}
        sx={{ minHeight: "calc(100vh - 10em)" }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 50, 100, 250]}
        components={{
          Footer: () => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid black",
              }}
            >
              <div style={{ alignSelf: "center", marginLeft: "0.4em" }}>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => navigate("/members/games/new")}>
                  Create Game
                </Button>
              </div>
              <GridPagination style={{ justifySelf: "center", alignSelf: "center" }} />
            </div>
          ),
        }}
      />
    </Paper>
  );
}
