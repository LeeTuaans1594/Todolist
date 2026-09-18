import { Button, Col, Row } from "antd";

export default function Todotoolbars({ filter, onFilterChange, onAdd }) {
  return (
    <Row align="middle" className="button-row">
      <Col span={12}>
        <Button
          className="add-todo-button"
          size="large"
          color="default"
          variant="filled"
          onClick={onAdd}
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
            onClick={() => onFilterChange("all")}
          >
            All
          </Button>
          <Button
            {...(filter === "todo"
              ? { type: "primary" }
              : { color: "default", variant: "filled" })}
            size="large"
            onClick={() => onFilterChange("todo")}
          >
            To do
          </Button>
          <Button
            {...(filter === "completed"
              ? { type: "primary" }
              : { color: "default", variant: "filled" })}
            size="large"
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </Button>
          /
        </div>
      </Col>
    </Row>
  );
}
