import React, { useState, useEffect } from "react";
import "./panelEdgeEs.css";

const PanelEdge = ({
  selectedEdge,
  edges,
  setEdges,
  isPanelEdge,
  setIsPanelEdge,
}) => {

  const [editedLabel, setEditedLabel] = useState("");

  const handleDelete = () => {
    setEdges((edges) => edges.filter((e) => e.id !== selectedEdge.id));
    setIsPanelEdge(false);
  };

  const handleSave = () => {
    const updatedEdges = edges.map((e) => {
      if (e.id === selectedEdge.id) {
        return { ...e, label: editedLabel };
      }
      return e;
    });
    setEdges(updatedEdges);
    setIsPanelEdge(false);
  };

  const handleLabelChange = (e) => {
    setEditedLabel(e.target.value);
  };

  useEffect(() => {
    if (selectedEdge) {
      setEditedLabel(selectedEdge.label);
    }
  }, [selectedEdge]);

  if (!selectedEdge || !isPanelEdge) return null;

  return (
    <div className="panel_a" style={{top: '430px'}} >
      <>
        <h3>Opciones de Relación</h3>
        <input type="text" value={editedLabel} onChange={handleLabelChange} />
        <button className="save" onClick={handleSave}>Guardar</button>
        <button className="del" onClick={handleDelete}>Eliminar</button>
        <button className="close-button" onClick={() => setIsPanelEdge(false)}>
          X
        </button>
      </>
    </div>
  );
};

export default PanelEdge;
