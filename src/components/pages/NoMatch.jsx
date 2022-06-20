import React from "react"
import { useLocation } from "react-router-dom";
import { TbError404 } from 'react-icons/tb';

const NoMatch = () => {
  const location = useLocation();

  return (
    <div>
      <TbError404 size="15rem"/>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default NoMatch;
