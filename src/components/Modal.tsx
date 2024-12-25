import React, { FC, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  task: { id: string; time: string; task: string } | null;
  onClose: () => void;
  onSave: (time: string, task: string) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, task, onClose, onSave }) => {
  // Always call useState hooks, even if the modal is not rendered
  const [editedTime, setEditedTime] = useState(task?.time || "09:00");
  const [editedTask, setEditedTask] = useState(task?.task || "");

  // Do not render the modal if it's not open or if no task is passed
  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave(editedTime, editedTask);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
        <div className="mb-4">
          <label className="block text-sm">Time</label>
          <select
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Task</label>
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
