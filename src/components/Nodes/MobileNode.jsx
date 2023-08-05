import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import "./mobile.css";

function MobileNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  console.log(data);
  return (
    <div>
      <div className="mobile-node">
      
        <Handle type="target" position={Position.Top} style={{ background: "white", border: "1px solid black", top: '-5px' }} id="a" />
        <div className="circlex"></div>
        <div className="square" >
        <div className="cuerpomm" >
          <h3 className="titulomm">{data.title}</h3>
          <p className="tipomm">[{data.type}]</p>
          <p className="descripcionmm">{data.description}</p>
        </div>
      </div>
      </div>
      <div className="topx"></div>
      <Handle type="source" position={Position.Bottom} id="b" />
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

export default MobileNode;
