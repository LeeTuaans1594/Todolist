import { Input, Modal } from "antd";

export default function Todoeditmodal({
  values,
  open,
  onChange,
  onSave,
  onCancel,
}) {
  const fields = [
    ["Task", "Task"],
    ["Description", "Description"],
    ["Category", "Category"],
    ["When", "When"],
    ["Priority", "Priority"],
    ["Fulfillment", "Fulfillment"],
  ];

  return (
    <Modal
      title="Edit task"
      open={open}
      onOk={onSave}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <div className="edit-form">
        {fields.map(([label, field]) => (
          <label key={field}>
            {label}

            <Input
              value={values[field] || ""}
              onChange={(event) =>
                onChange({
                  ...values,
                  [field]: event.target.value,
                })
              }
            />
          </label>
        ))}
      </div>
    </Modal>
  );
}
