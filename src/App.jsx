import { Form } from "antd";
import { useState } from "react";
import Todotable from "./Components/Todotable.jsx";
import Todotoolbars from "./Components/Todotoolbars.jsx";
import Todoaddmodal from "./Components/Todoaddmodal.jsx";
import Todoeditmodal from "./Components/Todoeditmodal.jsx";
import initialDataSource from "./data/initialDataSource.js";

function App() {
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [filter, setFilter] = useState("all");
  const [editingRecord, setEditingRecord] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const addTodo = (values) => {
    const newTodo = {
      ...values,
      key: Date.now().toString(),
    };
    setDataSource((currentData) => [...currentData, newTodo]);
    form.resetFields();
    setIsAddModalOpen(false);
  };

  const closeAddModal = () => {
    form.resetFields();
    setIsAddModalOpen(false);
  };

  const saveAdd = () => {
    form.submit();
  };

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

  const filteredData = dataSource.filter((item) => {
    const fulfillment = parseInt(item.Fulfillment, 10);

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

          <Todotoolbars
            filter={filter}
            onFilterChange={setFilter}
            onAdd={() => setIsAddModalOpen(true)}
          />
          <Todotable
            data={filteredData}
            onEdit={openEditModal}
            onDelete={deleteRecord}
          />
        </main>
      </div>

      <Todoeditmodal
        values={editValues}
        open={editingRecord !== null}
        onChange={setEditValues}
        onSave={saveEdit}
        onCancel={closeEditModal}
      />

      <Todoaddmodal
        open={isAddModalOpen}
        form={form}
        onCancel={closeAddModal}
        onOk={saveAdd}
        onSubmit={addTodo}
      />
    </div>
  );
}
export default App;
