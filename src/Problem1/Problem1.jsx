import { useState } from 'react';
import './styles.css'; // Import your CSS file

const Problem1 = () => {
  const [layout, setLayout] = useState([{ id: 1, children: [] }]);

  const handleSplit = (partitionId, direction) => {
    setLayout((prevState) => {
      const updatedLayout = [...prevState];
      const partitionIndex = updatedLayout.findIndex(
        (p) => p.id === partitionId
      );
      const newPartition = { id: Date.now(), children: [] };

      if (direction === "vertical") {
        updatedLayout.splice(partitionIndex + 1, 0, newPartition);
      } else {
        updatedLayout[partitionIndex].children.push(newPartition);
      }

      return updatedLayout;
    });
  };

  const handleRemove = (partitionId) => {
    setLayout((prevState) => {
      const updatedLayout = [...prevState];
      const partitionIndex = updatedLayout.findIndex(
        (p) => p.id === partitionId
      );

      if (partitionIndex === 0 || updatedLayout.length === 1) return prevState;

      if (partitionIndex > 0) {
        // Check if removing from parent partition or main layout
        if (updatedLayout[partitionIndex - 1].children.includes(partitionId)) {
          const parentPartitionIndex = partitionIndex - 1;
          updatedLayout[parentPartitionIndex].children = updatedLayout[
            parentPartitionIndex
          ].children.filter((childId) => childId !== partitionId);
        } else {
          updatedLayout.splice(partitionIndex, 1);
        }
      }

      return updatedLayout;
    });
  };

  const renderPartitions = (partition) => (
    <div key={partition.id} className="partition">
      {partition.children.map(renderPartitions)}
      <button onClick={() => handleSplit(partition.id, "vertical")}>V</button>
      <button onClick={() => handleSplit(partition.id, "horizontal")}>H</button>
      <button onClick={() => handleRemove(partition.id)}>Remove</button>
    </div>
  );
  return (
    <div className="layout-container">
      <button onClick={() => setLayout([{ id: 1, children: [] }])}>
        Start Challenge
      </button>
      {layout.map(renderPartitions)}
    </div>
  );
};

export default Problem1;
