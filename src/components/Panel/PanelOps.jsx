import React, { useCallback, useState } from 'react';

import './panelStyle.css'

export const PanelOps = ({ selectedNode, nodes, setNodes, isPanelOpen, setIsPanelOpen }) => {
  const [editedFields, setEditedFields] = useState({});

  const handleFieldChange = useCallback(
    (field, event) => {
      setEditedFields((fields) => ({ ...fields, [field]: event.target.value }));
    },
    []
  );

  const handleSaveClick = useCallback(() => {
    const node = nodes.find((node) => node.id === selectedNode);
    const updatedNode = { 
      ...node, 
      data: { 
        ...node.data, 
        ...editedFields
      } 
    };
    setNodes((nodes) => nodes.map((node) => (node.id === selectedNode ? updatedNode : node)));
    setEditedFields({});
    setIsPanelOpen(false);
  }, [selectedNode, nodes, editedFields, setNodes]);

  const handleDeleteClick = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode));
    setIsPanelOpen(false);
  }, [selectedNode, setNodes]);

  const node = nodes.find((node) => node.id === selectedNode);

  if (!node || !isPanelOpen) return null;

  return (
    <div className="panel_c" style={{
      margin: '2px',
      border: 'solid 2px black',
      top: '72px'
    }}>
      <h2>Opciones de Elemento</h2>
      <label>
        Nombre:
        <input type="text" value={editedFields.title ?? node.data.title} onChange={(event) => handleFieldChange('title', event)} />
      </label>
      <label>
        Tipo:
        <input type="text" value={editedFields.type ?? node.data.type} onChange={(event) => handleFieldChange('type', event)} />
      </label>
      <label>
        Descripción:
        <input value={editedFields.description ?? node.data.description} onChange={(event) => handleFieldChange('description', event)} />
      </label>
      <button className='save'  onClick={handleSaveClick}>Guardar</button>
      <button className='del'  onClick={handleDeleteClick}>Eliminar</button>
      <button className="close-button"  onClick={() => setIsPanelOpen(false)}>X</button>
    </div>
  );
};
