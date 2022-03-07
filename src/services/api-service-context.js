import React from "react";

const { Provider : GetGenresProvider,
        Consumer : GetGenresConsumer
} = React.createContext();

export {
    GetGenresProvider,
    GetGenresConsumer
};