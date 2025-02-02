import React from "react";
import { Table, Tag, } from "antd";
import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

export default function UserTable(props) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => `${record.role.name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (record) => dayjs(record).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Confirmed",
      dataIndex: "confirmed",
      render: (confirmed) => (
        <Tag color={confirmed ? "green" : "red"}>
          {confirmed ? "Confirmed" : "Not Confirmed"}
        </Tag>
      ),
    },
  ];
  // console.log(props.data[0]);
  return <Table columns={columns} dataSource={props.data[0]} rowKey="id" />;
}
