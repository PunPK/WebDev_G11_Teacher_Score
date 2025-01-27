import React from "react";
import { Button, Table, Space, Tag, Modal, Popconfirm } from "antd";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Edit the transaction"
            description="Are you sure to Edit this transaction?"
            onConfirm={() => props.onRowEdited(record)}
          >
            <Button
              // danger
              type="primary"
              shape="circle"
              icon={<EditOutlined twoToneColor="#eb2f96" />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={props.data[0]} rowKey="id" />;
}
