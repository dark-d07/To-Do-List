import React from 'react';
import Draggable from 'react-draggable';

const DraggableComponent = ({ children }) => {
  return (
    <Draggable>
      <div>{children}</div>
    </Draggable>
  );
};

export default DraggableComponent;
