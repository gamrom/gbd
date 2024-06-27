"use client";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  Tooltip,
  visuallyHidden,
  Modal,
} from "@mui/material";
import { Button } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { getUsers, patchRole, deleteUser } from "../api";
import { parse } from "json2csv";
import { UserEditForm } from "./userEditForm";
import dayjs from "dayjs";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "userEdit",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: true,
    label: "회원등급",
  },
  {
    id: "isMarketing",
    numeric: false,
    disablePadding: false,
    label: "마케팅동의",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "이름",
  },
  {
    id: "birth",
    numeric: false,
    disablePadding: false,
    label: "생년월일",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "성별",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "전화번호",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "이메일",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected } = props;
  const [selectedRole, setSelectedRole] = useState("");

  const handleClickEditRole = () => {
    //role "admin manage member guest"
    if (selectedRole === null) {
      return;
    }
    if (selectedRole === "") {
      alert("회원등급을 선택하세요");
      return;
    }

    selected.map((item) => {
      patchRole({ uid: item, role: selectedRole }).then((res) => {
        if (res.status === 200) {
          alert("회원등급이 변경되었습니다.");
        }
      });
    });
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} 선택됨
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          회원관리
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="mr-2"
          >
            <option value="">등급 선택</option>
            <option value="manager">매니저</option>
            <option value="member">멤버</option>
            <option value="guest">게스트</option>
          </select>
          <Tooltip title="Edit">
            <Button
              color="primary"
              onClick={() => handleClickEditRole()}
              className="shrink-0"
            >
              수정하기
            </Button>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const Content = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("role");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(200);

  const [rows, setRows] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.uid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const { data: currentUser, loading } = useGetCurrentUser();

  useEffect(() => {
    getUsers().then((res) => {
      setRows(res.data);
    });
  }, []);

  const downloadCSV = () => {
    const fields = Object.keys(rows[0]);
    const csvData = parse(rows, { fields });

    // Specify encoding type (UTF-8)
    const csvContent = `\uFEFF${csvData}`; // Add BOM character for Excel compatibility

    // Create Blob with specified encoding
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "exported_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingUserData, setEditingUserData] = React.useState(null);
  const handleEditUser = ({ e: e, data: user }) => {
    e.preventDefault();
    setIsModalOpen(true);
    setEditingUserData(user);
  };

  const modalClose = () => setIsModalOpen(false);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "72px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table sx={{ minWidth: 900 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.uid);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.uid}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, row.uid)}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    {currentUser && currentUser.data.role === "admin" && (
                      <TableCell className="shrink-0">
                        <Button
                          color="primary"
                          type="button"
                          onClick={(e) => handleEditUser({ e: e, data: row })}
                        >
                          정보수정
                        </Button>
                        <Button
                          className="ml-2"
                          color="danger"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm("정말로 탈퇴시키겠습니까?")) {
                              deleteUser({ uid: row.uid }).then((res) => {
                                if (res.status === 200) {
                                  fetch("/api/deleteUser", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      uid: row.uid,
                                    }),
                                  })
                                    .then(() => {
                                      alert("회원이 탈퇴되었습니다.");
                                    })
                                    .error(() => {
                                      alert(
                                        "문제가 생겼습니다. 관리자에게 문의 해주세요.",
                                      );
                                    });
                                }
                              });
                            }
                          }}
                        >
                          회원탈퇴
                        </Button>
                      </TableCell>
                    )}
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.role === "admin" && "관리자"}
                      {row.role === "manager" && "매니저"}
                      {row.role === "member" && "멤버"}
                      {row.role === "guest" && "게스트"}
                    </TableCell>

                    <TableCell>
                      {row.is_marketing === true ? "동의" : "비동의"}
                    </TableCell>

                    <TableCell>{row.name}</TableCell>

                    <TableCell>{dayjs(row.birth).format("YY-MM-DD")}</TableCell>
                    <TableCell>
                      {row.gender === "male" && "남성"}
                      {row.gender === "female" && "여성"}
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[200]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Button color="primary" onClick={downloadCSV}>
        액셀 다운로드
      </Button>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <>
          <UserEditForm user={editingUserData} close={modalClose} />
        </>
      </Modal>
    </Box>
  );
};
