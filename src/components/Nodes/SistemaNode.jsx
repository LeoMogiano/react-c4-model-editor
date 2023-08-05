import { useCallback } from "react";
import { Handle, Position} from "reactflow";
import "./SistemaStyle.css";



function SistemaNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  console.log(data);
  return (<div>
    <div className="sistema-node">
  <Handle type="target" position={Position.Top} style={{background: 'white', border: '1px solid black'}} id="a" />
  
  <div className="cuerpo">
    <h3 className="titulo">{data.title}</h3>
    <p className="tipo">[{data.type}]</p>
    <p className="descripcion">{data.description}</p>
  </div>
  </div>
  <Handle type="source" position={Position.Bottom} id="b" />
  <Handle type="target" position={Position.Left} style={{background: 'white', border: '1px solid black'}} id="c" />
  <Handle type="source" position={Position.Right} id="d" />
</div>
  );
}

export default SistemaNode;
