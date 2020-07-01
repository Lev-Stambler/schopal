import React, { useState } from 'react';
import './find-out-more.css';

interface FindOutMoreProps<T> {
  ExpandedComponent: React.ElementType<T>; //React.Component<T>;
  ExpandedComponentProps: T;
}

export function FindOutMore<T>(props: FindOutMoreProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="find-out-more-container">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Find out more'}
      </button>
      {isOpen && (props.ExpandedComponent as unknown)(props.ExpandedComponentProps)}
    </div>
  );
}
