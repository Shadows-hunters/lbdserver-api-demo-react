import React from 'react'
import AuthComponent from './components/login/LoginComponent';
import Project from './pages/Project';
// import {useSession} from '@inrupt/solid-ui-react'
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import { getAuthentication } from './components/login/functions';
import { useEffect, useState } from 'react';
import { propagate, sessionTrigger as t } from './atoms';
import conf from "./util/config"
import { useRecoilState, useRecoilValue } from 'recoil'
import Dashboard from './util/Dashboard'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useNavigate
} from "react-router-dom";
import Header from "./components/header"
import { v4 } from "uuid"
import SdkDemo from './pages/Documentation';
import DemoPage from './pages/DemoPage'

import creds from '../devCredentials'

import Viewer from './components/Viewer/3dviewer'
import './components/Viewer/ViewerLayout.css'


function App() {

  const [trigger, setTrigger] = useRecoilState(t)
  const config = useRecoilValue(conf)
  const [update, setUpdate] = useRecoilState(propagate)

  const pages = [
    {label: "demo", path: "/", component: DemoPage, props: {}},
    // { label: "experimental", path: "/", component: Project, props: { initialLayout: config } },
    { label: "documentation", path: "/documentation", component: SdkDemo, props: {} },
    // { label: "project", path: "/project", component: Project, props: {} }
    
  ]

  useEffect(() => {
    getAuthentication().then(() => {
      setUpdate(v4())
    }).catch((error) => {
      console.log('error', error)
      // window.location = window.location.pathname
    })
  }, [trigger])


  return (
    <div id={update}>
        <Header pages={pages} />
        {/* <Viewer className="container"/> */}
        <Routes>
          {pages.map(page => {
            const Element = page.component
            return <Route key={page.label} exact path={page.path} element={<Element {...page.props} />} />
          })}
        </Routes>
      {/* <AuthComponent/>
      <Child/> */}
    </div>
  );
}

export default App;
