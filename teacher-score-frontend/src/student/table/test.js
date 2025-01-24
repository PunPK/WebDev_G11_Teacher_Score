import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Edit, BugReport } from "@mui/icons-material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const SubjectList = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 2, boxShadow: 3 }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
          ตารางวิชา
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Lecturer IDs
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Topics
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                UpdatedAt
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#1976d2" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((subject) => (
              <TableRow
                key={subject.id}
                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell>{subject.title}</TableCell>
                <TableCell>{subject.description}</TableCell>
                <TableCell>
                  {subject.lecturer_owners
                    .map((owner, index) => `${index + 1}. ${owner.lecturer_id}`)
                    .join(", ")}
                </TableCell>
                <TableCell>{subject.topics.join(", ")}</TableCell>
                <TableCell>
                  {dayjs(subject.updatedAt).format("DD/MM/YYYY - HH:mm")}
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => alert("Debug")}>
                    <BugReport />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => navigate(`/topic/${subject.documentId}`)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default SubjectList;
