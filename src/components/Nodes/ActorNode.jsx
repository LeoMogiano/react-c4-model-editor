import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import './actorStyle.css';

function ActorNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  console.log(data);
  return (
    <div>
      <div className="actor-node">
        <Handle type="target" className="arribaHandle" id="a" style={{background: 'white', border: '1px solid black', top: '-60px'}} />
        <div className="head">
          <div className="circle" />
        </div>
        <div className="body">
          <h3 className="title">{data.title}</h3>
          <p className="type">[{data.type}]</p>
          <p className="description">{data.description}</p>
        </div>
      </div>
      <Handle type="source" className="abajoHandle" position={Position.Bottom} id="b" />
      <Handle type="target" className="izqHandle" position={Position.Left} id="c" style={{background: 'white', border: '1px solid black'}} />
      <Handle type="source" className="derHandle" position={Position.Right} id="d" />
    </div>
  );
}

export default ActorNode;