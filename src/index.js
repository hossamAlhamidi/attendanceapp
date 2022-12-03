import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { customeTheme } from './styles/thems';
const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 600_000,
    },
  },
});
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ChakraProvider theme={customeTheme}>
    <App />
    </ChakraProvider>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

