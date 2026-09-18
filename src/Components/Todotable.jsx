import { Button, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
export default function Todotable({ data, onEdit, onDelete }) {
  const columns = [
    {
      title: "Task",
      dataIndex: "Task",
      key: "Task",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
    },
    {
      title: "When",
      dataIndex: "When",
      key: "When",
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      key: "Priority",
    },
    {
      title: "Fulfillment",
      dataIndex: "Fulfillment",
      key: "Fulfillment",
    },
  ];

  const tableColumns = [
    ...columns,
    {
      title: "",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <div className="row-actions">
          <Button
            type="text"
            className="row-action-button"
            aria-label={`Edit ${record.Task}`}
            title="Edit"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title="Delete this task?"
            description="This action cannot be undone."
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => onDelete(record.key)}
          >
            <Button
              type="text"
              danger
              className="row-action-button"
              aria-label={`Delete ${record.Task}`}
              title="Delete"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={tableColumns}
      dataSource={data}
      pagination={false}
      rowKey="key"
      className="todo-table"
    />
  );
}
