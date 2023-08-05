import React, { useState, useCallback } from "react";



import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  MarkerType
} from "reactflow";




import { ActorNode, SistemaNode, ExSistemaNode, ConnectionLine, DatabaseNode, MobileNode, WebNode } from "./components/Nodes/Nodes";
import { PanelOps } from "./components/Panel/PanelOps";
/* import C4Edge from "./components/EdgeTypes/C4Edge"; */

import "reactflow/dist/style.css";
import PanelEdge from "./components/PanelEdge/PanelEdge";
import * as htmlToImage from 'html-to-image';


const initialNodes = [
  {
    id: "1", position: { x: 100, y: 200 }, data: {
      title: `Nuevo Nodo`,
      type: "Prueba",
      description: "A customer of the bank, with personal bank accounts.",
    },
    type: "actorNode"
  },

];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = {
  actorNode: ActorNode,
  sistemaNode: SistemaNode,
  exSistemaNode: ExSistemaNode,
  databaseNode: DatabaseNode,
  mobileNode: MobileNode,
  webNode: WebNode
};

/* const edgeTypes = {
  c4Edge: C4Edge,
};
 */





const flowKey = 'example-flow';

const SaveApp = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelEdge, setIsPanelEdge] = useState(false);

  const [selectedEdge, setSelectedEdge] = useState(null);

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const getIdM = () => `node_${+new Date()}`;


  /* const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]); */

  const onConnect = useCallback((params) => {
    const edge = {
      ...params,
      type: 'straight',
      label: 'test',
      style: {   strokeDasharray: '5 5', stroke: '#808080' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#808080'
      },
      
      
    };
    setEdges((edges) => addEdge(edge, edges));
  }, [setEdges]);


  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);


  const addNode = useCallback(
    (nodeType) => {
      const newNode = {
        id: getIdM(),
        position: {
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * window.innerHeight,
        },
        data: {
          title: `Nuevo Nodo`,
          type: "Prueba",
          description: "A customer of the bank, with personal bank accounts.",
        },
        type: nodeType,
      };
      setNodes((nodes) => [...nodes, newNode]);
    },
    [setNodes]
  );


  const exportFlow = () => {
    const flow = document.getElementById('reactflow-wrapper');
    
    // Agregar la clase 'no-controls' al contenedor del flujo
    flow.classList.add('no-controls');
    
    htmlToImage.toPng(flow)
      .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'flow.png';
        link.href = dataUrl;
        link.click();
        
        // Eliminar la clase 'no-controls' del contenedor del flujo
        flow.classList.remove('no-controls');
      })
      .catch(function (error) {
        console.error('Error al exportar el flujo como imagen:', error);
        
        // Eliminar la clase 'no-controls' del contenedor del flujo
        flow.classList.remove('no-controls');
      });
  }
  
  
  

  

  
  return (

    <div style={{ width: "100vw", height: "100vh" }}>

      <ReactFlow id="reactflow-wrapper"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineComponent={ConnectionLine}
        onInit={setRfInstance}
       
        onNodeClick={(event, element) => {
          setSelectedNode(element.id);
          setIsPanelOpen(true);
          
        }}
        onEdgeClick={(event, element) => {
          setSelectedEdge(element);
          setIsPanelEdge(true);
        }}
        
      >
        
        <Controls />
        
        <Background variant="dots" gap={12} size={1} />
        <div className="button_topc">
          <button onClick={() => addNode('actorNode')}>Actor</button>
          <button onClick={() => addNode('sistemaNode')}>Sistema</button>
          <button onClick={() => addNode('exSistemaNode')}>Sistema Existente</button>
          <button onClick={() => addNode('databaseNode')}>Contenedor Base de datos</button>
          <button onClick={() => addNode('mobileNode')}>Contenedor Mobile App</button>
          <button onClick={() => addNode('webNode')}>Contenedor Web Browser</button>
          <button onClick={onSave}>Guardar</button>
          <button onClick={onRestore}>Restaurar</button>
          <button onClick={exportFlow} >DescargaIMG</button>
        </div>

        <PanelOps selectedNode={selectedNode} nodes={nodes} setNodes={setNodes}  isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
        <PanelEdge
          selectedEdge={selectedEdge}
          edges={edges}
          setEdges={setEdges}
          setSelectedEdge={setSelectedEdge}
          setIsPanelEdge={setIsPanelEdge}
          isPanelEdge={isPanelEdge}
        />

      </ReactFlow>
      
    </div>

  );
}


export default () => (
  <ReactFlowProvider>
    <SaveApp />
  </ReactFlowProvider>
);