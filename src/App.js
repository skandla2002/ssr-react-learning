import React from "react";
import { Route } from "react-router-dom";
import Menu from "./components/Menu";
import loadable from "@loadable/component";

const RedPage = loadable(() => import("./pages/RedPage"));
const BluePage = loadable(() => import("./pages/BluePage"));
const UsersPage = loadable(() => import("./containers/UsersContainer"));

function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/red" component={RedPage}></Route>
      <Route path="/blue" component={BluePage}></Route>
      <Route path="/users" component={UsersPage}></Route>
    </div>
  );
}

export default App;
