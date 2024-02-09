import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDc0NzMxMDksImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xzYmduZDQ1MDA3eTA4aTk1YW82MzBqOS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiZmY1NDcwMDctYjkyNi00Mjk3LWJlZGYtNjYzMWRmYzY1ZWIzIiwianRpIjoiY2xzZWhlaXZjMXBvYzAxdzNnZTB5OGZpcCJ9.DyiLfnXtZcnFl3QhizO4YYh-BGTRnmWo98CIHQQuO-aRH9qzyk_WadZjbn5E1YmrqzAcYLCEXF0uFybucLaV7c4CSQ1reDnjiuHrjM7ABIbeqybAgKqRESsUu3u1HYK_tkHwmm5MDxcm4p_KT6yfQOHLA9j5LwVSzT0atzMVKooN3LLsGXZP4OOp27t9IODMjKL-kvdkVTYFd6dF0-1S32jd2l3mcf4dxxi5Lc73TMHpzD-zUa-HR7szlvr9I2lknSc-rtnD9LWpSVJNNfOcr6a-Tlup90u9YbVBlDRApsrsp1gqcAnlGUyIs1I9xvv_bjioI6SeZPST3bpSG9fJr-La4_xKQdtDw0uu6HTWsXF4yOsWwoN2sedyF3vJ3NeksRtsKq3T4GtWIRX00THw-aKbdANiecZLQVB49M1cpUxn16d6FdoEjokhDJv3Si-VjcfIJu6XJETQq2-Zri-LlI2r3tk6CVqVVq_b6qd5GCI_np4KPhaQh07AceSKIOrjNMp2O0U8Y5aw2ZGZT5k1tmv5jeBoGkui23Dg60OUNV8Ngwmfsx-N1oA5IyNpyVwZcUMnrOAsDprqhmhxM1prcZH80Jc10N5gqSYMGM3faxTfW2dzhzFoJfFlIb2iynH3PIlsikU23WUkyq5HKqKTVVs1a0l7dEgLPLfhDGV6t8w';
const route = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clsbgnd45007y08i95ao630j9/master';

// Create a middleware to add the authorization header with the token
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Create a HTTP link for Apollo Client
const httpLink = createHttpLink({
  uri: route,
});

// Combine the HTTP link and auth middleware
const link = authLink.concat(httpLink);

// Create the Apollo Client
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
