import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { NotFound } from '../pages/notfound';

export function RoutesApp() {
 return (
  <Routes>
   <Fragment>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Home />} />
   </Fragment>
  </Routes>
 );
}
