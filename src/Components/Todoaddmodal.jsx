import { Form, Input, Modal } from "antd";

export default function Todoaddmodal({ open, form, onCancel, onOk, onSubmit }) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      okText="Add"
      cancelText="Cancel"
    >
      <Form
        id="add-todo-form"
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Form.Item
          name="Task"
          label="Task"
          rules={[{ required: true, message: "Please enter task" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Category"
          label="Category"
          rules={[{ required: true, message: "Please enter category" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="When"
          label="When"
          rules={[{ required: true, message: "Please enter when" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="Priority"
          label="Priority"
          rules={[{ required: true, message: "Please enter priority" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Fulfillment"
          label="Fulfillment"
          rules={[{ required: true, message: "Please enter fulfillment" }]}
        >
          <Input min={0} max={100} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
