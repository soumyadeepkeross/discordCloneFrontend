import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { ThemeProvider } from "./components/theme-provider";
import { Login } from "./components/local/Login";
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Signup from "./components/local/Signup";
import { ToastContainer } from "react-toastify";


const client = new ApolloClient({
 
  uri: 'http://localhost:7000/graphql',

  cache: new InMemoryCache(),
});


const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ApolloProvider client={client}>
       <ToastContainer/>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
        </Routes>

      </BrowserRouter>
    </ApolloProvider>
  </ThemeProvider>

);
