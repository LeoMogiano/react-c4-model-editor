import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import "./webnode.css";

function WebNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  console.log(data);
  return (
    <div>
      <div className="web-node">
      
        <Handle type="target" position={Position.Top}  style={{ background: "white", border: "1px solid black", top: '-6px' }} id="a" />
        <div className="circlew"></div>
        <div className="circlef"></div>
        <div className="circleg"></div>
        <div className="squarew" >
        <div className="cuerpow" >
          <h3 className="titulow">{data.title}</h3>
          <p className="tipow">[{data.type}]</p>
          <p className="descripcionw">{data.description}</p>
        </div>
      </div>
      </div>
      <div className="topw"></div>
      <Handle type="source" position={Position.Bottom} style={{  bottom: '-5px' }} id="b" />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "white", border: "1px solid black", left: '-5px'  }}
        id="c"
      />
      
      <Handle type="source" position={Position.Right} style={{  right: '-5px' }} id="d" />
      
    </div>
  );
}

export default WebNode;
