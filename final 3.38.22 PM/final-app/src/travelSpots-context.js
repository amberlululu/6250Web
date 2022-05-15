import React from 'react';

const todosContext = React.createContext({
default: 'Overridden by provider value'
})

export default todosContext;