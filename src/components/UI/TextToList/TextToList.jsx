import React from 'react';

const TextToList = ({text}) => {

  return (
      <div>
        <ul>
          {text.split('.').map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </div>
  );
};

export default TextToList;