import { Routes, Route } from "react-router-dom"


import { Dashboard, Schedules, Forecast, Histories, Users, NewSchedule, EditSchedule, NewUser, Settings, Login } from "./pages";

import Admin from './layouts/Admin';



function App() {

  return (
    <Routes>
      <Route path="/rurban/"                       element={<Admin />}>
        <Route index                        element={<Dashboard />} />
        <Route path="schedules"             element={<Schedules />} />
        <Route path="schedule/new"          element={<NewSchedule />} />
        <Route path="schedule/edit/:id"     element={<EditSchedule />} />
        <Route path="forecasts"             element={<Forecast />} />
        <Route path="history"               element={<Histories />} />
        <Route path="users"                 element={<Users />} />
        <Route path="user/new"              element={<NewUser />} />
        <Route path="settings"              element={<Settings />} />
      </Route>
      <Route path="/rurban/login"                 element={<Login />} />
    </Routes>
  )
}

export default App
