import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { octokit } from './utils/request';
import { endpoints } from './apis/datasource/endpoints';
import { MetaHead } from './utils/metahead';

export default function App() {
 const onSearchUser = async (value: string) => {
  const reqRepo = await octokit.request(`GET ${endpoints.SEARCH_USER}`, {
   q: `${value} in:name`,
   headers: {
    'X-GitHub-Api-Version': '2022-11-28'
   }
  });
 };

 return (
  <Fragment>
   <MetaHead title="Home" />
   <div className="App">
    <header className="App-header">
     <img src={logo} className="App-logo" alt="logo" />
     <p>
      Edit <code>src/App.tsx</code> and save to reload
     </p>
     <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
     >
      Learn React
     </a>
    </header>
   </div>
  </Fragment>
 );
}
