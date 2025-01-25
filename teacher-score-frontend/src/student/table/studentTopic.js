import React from "react";
import { Button, Table, Space, Modal } from "antd";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function TopicList(props) {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Topic Title",
      dataIndex: "topic_title",
      key: "topic_title",
    },
    {
      title: "Document ID",
      dataIndex: ["subject", "documentId"],
      key: "documentId",
    },
    {
      title: "Max Score",
      dataIndex: "max_score",
      key: "max_score",
      render: (max_score) => {
        if (max_score) {
          return max_score;
        }
        return "No max score";
      },
    },
    {
      title: "Score",
      dataIndex: "score_id",
      key: "score",
      render: (scoreId) => {
        if (scoreId && scoreId.length > 0) {
          return scoreId.map((item) => item.score).join(", ");
        }
        return "No score";
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => dayjs(updatedAt).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<BugOutlined />}
            onClick={() => {
              Modal.info({
                title: "Debug",
                content: JSON.stringify(record, null, 2),
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={props.data} rowKey="id" />;
}
