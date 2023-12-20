import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <div className="flex h-10  items-center">
    Loading
    <ReactLoading type={type} color={color} height={50} width={50} />
    </div>
);
 
export default Loading;