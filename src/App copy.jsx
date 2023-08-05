import React, { useState, useCallback } from "react";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";

import ConnectionLine from "./ConecctionLine.jsx";

import ActorNode from "./Nodes/ActorNode";
import SistemaNode from "./Nodes/SistemaNode";
import ExSistemaNode from "./Nodes/ExSistemaNode";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "1" } },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "2" } },
  {
    id: "3",
    position: { x: 400, y: 400 },
    type: "actorNode",
    data: {
      title: `Nuevo Nodo`,
      type: "Prueba",
      description: "A customer of the bank, with personal bank accounts.",
    },
  },
];

const nodeTypes = {
  actorNode: ActorNode,
  sistemaNode: SistemaNode,
  exSistemaNode: ExSistemaNode,
};

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const flowKey = 'example-flow';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const getIdM = () => `node_${+new Date()}`;

  // SAVE O RESTORE
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  ///
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  
const onSave = useCallback(() => {
  const flow = rfInstance.toObject();
  localStorage.setItem(flowKey, JSON.stringify(flow));
}, [rfInstance]);

const onRestore = useCallback(() => {
  const flow = JSON.parse(localStorage.getItem(flowKey));
  if (flow) {
    setElements(flow.elements || []);
  }
}, []);

  const addNode = () => {
    const id = getIdM();

    const newNode = {
      id,
      position: { x: 0, y: 0 }, // Puedes cambiar la posición inicial a tu gusto
      data: {
        title: `Nuevo Nodo`,
        type: "Prueba",
        description: "A customer of the bank, with personal bank accounts.",
      },
      type: "actorNode",
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const addSistema = () => {
    const id = getIdM();

    const newNode = {
      id,
      position: { x: 0, y: 0 }, // Puedes cambiar la posición inicial a tu gusto
      data: {
        title: `Nuevo Nodo`,
        type: "Prueba",
        description: "A customer of the bank, with personal bank accounts.",
      },
      type: "sistemaNode",
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const addExSistema = () => {
    const id = getIdM();

    const newNode = {
      id,
      position: { x: 0, y: 0 }, // Puedes cambiar la posición inicial a tu gusto
      data: {
        title: `Nuevo Nodo`,
        type: "Prueba",
        description: "A customer of the bank, with personal bank accounts.",
      },
      type: "exSistemaNode",
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  return (
    
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={addNode}>Añadir Actor</button>
      <button onClick={addSistema}>Añadir Sistema</button>
      <button onClick={addExSistema}>Añadir Sistema Existente</button>
      <button onClick={onSave}>Guardar</button>
      <button onClick={onRestore}>Restaurar</button>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={ConnectionLine}
      >
        <Controls />

        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
    
  );
}


