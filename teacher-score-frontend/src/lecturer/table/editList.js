import { React } from "react";
import { Button, Table, Space, Tag, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function EditDataList(props) {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Lecturer",
      dataIndex: "users_owner",
      key: "users_owner",
      render: (users_owner) =>
        users_owner
          .filter((owner) => owner.role.name === "Lecturer")
          .map((owner, index) => `${index + 1}. ${owner.username}`)
          .map((text, index) => <div key={index}>{text}</div>),
    },
    {
      title: "Topics",
      dataIndex: "topics",
      key: "topics",
      render: (topics) =>
        topics.map((owner, index) => owner.topic_title).join(", "),
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_, record) =>
        dayjs(record.updatedAt).format("DD/MM/YYYY - HH:mm"),
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
          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => props.onRowDeleted(record.id)}
          >
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={props.data} />
      {/* <td>
        <input
          value={transition.note}
          onChange={(evt) => {
            props.onNoteChanged(transition.id, evt.target.value);
          }}
        />
      </td> */}
    </>
  );
}
