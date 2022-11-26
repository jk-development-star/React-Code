import React, { Suspense } from "react"
import './App.css';
import Contact from './components/Contact';
import LoginForm from './components/login';
import EditContact from './components/EditContact';
import List from './components/List';
import ShowContact from './components/ShowContact';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ForgotPasswordEmail from './components/ForgotPasswordEmail';
import PrivateRoute from "./ProtectedRoute"
import Dashboard from './components/Dashboard';
import Lead from './components/leads/Lead';
import 'react-toastify/dist/ReactToastify.css';
// const ResetPassword = React.lazy(() => import('./components/login'))
import ResetPassword from "./components/ResetPassword"

function App() {


  return (

    <Router>
      {/* <div className="outer">
          <div className="inner"> */}
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/forgot/password" element={<ForgotPasswordEmail />} />
        <Route exact path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/list" element={<List />} />
          <Route exact path="/lead" element={<Lead />} />
          <Route exact path="contact" element={<Contact />} />
          <Route exact path="/edit/:id" element={<EditContact />} />
          <Route exact path="/show/:id" element={<ShowContact />} />

        </Route>

      </Routes>
      {/* </div>
        </div> */}

    </Router>


  );
}

export default App;
