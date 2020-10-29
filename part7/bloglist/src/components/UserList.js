import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initUsers } from "../reducers/usersReducer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const url = useLocation();

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  const userRow = (user) => (
    <TableRow key={user.id}>
      <TableCell>
        <Link to={url.pathname + "/" + user.id}>{user.name}</Link>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  );

  return (
    <div>
      <Typography variant="h2">Users</Typography>
      <TableContainer>
        <Table className="users">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{users.map((user) => userRow(user))}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
