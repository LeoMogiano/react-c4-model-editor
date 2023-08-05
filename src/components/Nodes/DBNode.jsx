import React from 'react';
import { Handle, Position } from 'reactflow';
import './DBNode.css';

const DatabaseNode = ({ data }) => {
  return (
    <div className="database-container">
        <Handle type="target" style={{background: 'white', border: '1px solid black'}}id="a"  />
      <div className="database-header"></div>
      <div className="database-content">
        <div className="bodydb">
          <h3 className="titledb">{data.title}</h3>
          <p className="typedb">[{data.type}]</p>
          <p className="descriptiondb">{data.description}</p>
        </div>
      
      </div>
      <Handle type="source"  position={Position.Bottom} style={{bottom: '-14px', zIndex:'5'}} id="b" />
      <Handle type="target"  position={Position.Left} id="c" style={{background: 'white', border: '1px solid black', zIndex:'5'}} />
      <Handle type="source"  position={Position.Right} style={{zIndex:'5'}}  id="d" />
    </div>
  );
};

export default DatabaseNode;