import { Row, Col, Button, Table, Modal, Input, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const initialDataSource = [
  {
    key: "1",
    Task: "Learn React",
    Description: "Learn React from scratch",
    Categrory: "Education",
    When: "2024-06-01",
    Priority: "High",
    Fullfillment: "30%",
  },
  {
    key: "2",
    Task: "Learn Ant Design",
    Description: "Learn Ant Design from scratch",
    Categrory: "Education",
    When: "2024-06-02",
    Priority: "Medium",
    Fullfillment: "20%",
  },
  {
    key: "3",
    Task: "Learn JavaScript",
    Description: "Learn JavaScript from scratch",
    Categrory: "Education",
    When: "2024-06-03",
    Priority: "Low",
    Fullfillment: "100%",
  },
];

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
    dataIndex: "Categrory",
    key: "Categrory",
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
    dataIndex: "Fullfillment",
    key: "Fullfillment",
  },
];

function App() {
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [filter, setFilter] = useState("all");
  const [editingRecord, setEditingRecord] = useState(null);
  const [editValues, setEditValues] = useState({});

  const openEditModal = (record) => {
    setEditingRecord(record);
    setEditValues(record);
  };

  const closeEditModal = () => {
    setEditingRecord(null);
    setEditValues({});
  };

  const saveEdit = () => {
    setDataSource((currentData) =>
      currentData.map((item) =>
        item.key === editingRecord.key ? { ...item, ...editValues } : item,
      ),
    );
    closeEditModal();
  };

  const deleteRecord = (recordKey) => {
    setDataSource((currentData) =>
      currentData.filter((item) => item.key !== recordKey),
    );
  };

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
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title="Delete this task?"
            description="This action cannot be undone."
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => deleteRecord(record.key)}
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

  const filteredData = dataSource.filter((item) => {
    const fulfillment = parseInt(item.Fullfillment, 10);

    if (filter === "todo") {
      return fulfillment < 100;
    }

    if (filter === "completed") {
      return fulfillment === 100;
    }

    return true;
  });

  return (
    <div className="App">
      <div className="content-wrapper">
        <main>
          <h1>React Todo List</h1>

          <Row align="middle" className="button-row">
            <Col span={12}>
              <Button
                className="add-todo-button"
                size="large"
                color="default"
                variant="filled"
              >
                Add new to do
              </Button>
            </Col>

            <Col span={12}>
              <div className="action-buttons">
                <Button
                  {...(filter === "all"
                    ? { type: "primary" }
                    : { color: "default", variant: "filled" })}
                  size="large"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  {...(filter === "todo"
                    ? { type: "primary" }
                    : { color: "default", variant: "filled" })}
                  size="large"
                  onClick={() => setFilter("todo")}
                >
                  To do
                </Button>
                <Button
                  {...(filter === "completed"
                    ? { type: "primary" }
                    : { color: "default", variant: "filled" })}
                  size="large"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
              </div>
            </Col>

            <Table
              columns={tableColumns}
              dataSource={filteredData}
              pagination={false}
              rowKey="key"
              className="todo-table"
            />
          </Row>
        </main>
      </div>

      <Modal
        title="Edit task"
        open={editingRecord !== null}
        onOk={saveEdit}
        onCancel={closeEditModal}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="edit-form">
          {[
            ["Task", "Task"],
            ["Description", "Description"],
            ["Category", "Categrory"],
            ["When", "When"],
            ["Priority", "Priority"],
            ["Fulfillment", "Fullfillment"],
          ].map(([label, field]) => (
            <label key={field}>
              {label}
              <Input
                value={editValues[field] || ""}
                onChange={(event) =>
                  setEditValues({
                    ...editValues,
                    [field]: event.target.value,
                  })
                }
              />
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
}
export default App;
