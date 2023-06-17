import React, { Fragment } from 'react';
import { octokit } from '../../utils/request';
import { endpoints } from '../../apis/datasource/endpoints';
import Base from '../../components/layout/base';
import { MetaHead } from '../../utils/metahead';

export function Home() {
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
   <Base>Hehehe</Base>
  </Fragment>
 );
}
