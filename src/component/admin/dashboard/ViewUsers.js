import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  {
    id: "fullname",
    label: "Fullname",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "cn", label: "Citizenship No.", minWidth: 100 },
  {
    id: "contact",
    label: "Contact No.",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "dob",
    label: "DOB",
    minWidth: 170,
    align: "right",
  },

  {
    id: "paddress",
    label: "Parent Address",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "pcontact",
    label: "Parent Contact",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "petName",
    label: "Pet Name",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "pname",
    label: "Parent name",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function ViewUsers({ users }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = users;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
