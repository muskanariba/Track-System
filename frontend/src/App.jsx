// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Route Guards
// import AdminRoutes from "./routes/AdminRoutes";
// import UserRoutes from "./routes/UserRoutes";
// import AgentRoutes from "./routes/AgentRoutes";

// // Auth Pages
// import Login from "./pages/Auth/Login";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";

// // Admin Layout + Dashboard
// import AdminLayout from "./pages/Admin/AdminLayout";
// import AdminDashboard from "./pages/Admin/Dashboard";

// // Setup Pages
// import AddUser from "./pages/setups/AddUser";
// import BusinessTypeSetup from "./pages/setups/BusinessTypeSetup";
// import ClassSetup from "./pages/setups/ClassSetup";
// import FileStatusSetup from "./pages/setups/FileStatusSetup";
// import TMFormsSetup from "./pages/setups/TMFormsSetup";
// import AgentRegistration from "./pages/setups/AgentRegistration";
// import CustomerRegistration from "./pages/setups/CustomerRegistration";   // ✅ NEW IMPORT
// import CountrySetup from "./pages/setups/CountrySetup";
// import CitySetup from "./pages/setups/CitySetup";
// import AgentListTM from "./pages/setups/AgentListTM";
// import ApplicationDetails from "./pages/trademark/ApplicationDetails";
// import TMFormEntries from "./pages/trademark/TMFormEntries";
// import Hearing from "./pages/trademark/Hearing";
// import UserDashboard from "./pages/User/Dashboard";
// import AgentDashboard from "./pages/Agent/Dashboard";
// import JournalDetails from "./pages/trademark/JournalDetails";
// import RenewalDetails from "./pages/trademark/RenewalDetails";
// import MonthlyJournal from "./pages/TradeMarkJournal/MonthlyJournal";
// import DateSetup from "./pages/Utility/DateSetup";
// import ChangePassword from "./pages/Utility/ChangePassword";
// import LogoSetup from "./pages/Utility/LogoSetup";
// import BasicSearchReport from "./pages/trademark/BasicSearchReport";
// import TMRenewalReport from "./pages/trademark/TMRenewalReport";
// import TMReminderReport from "./pages/trademark/TMReminderReport";
// import TMSingleQuery from "./pages/trademark/TMSingleQuery";
// import CompareJournal from "./pages/TradeMarkJournal/CompareJournal";
// import SearchManualJournal from "./pages/TradeMarkJournal/SearchManualJournal";
// import ApplicationForm from "./pages/opposition/ApplicationForm";
// import OppositionReminderReport from "./pages/opposition/OppositionReminderReport";
// import OppositionReport from "./pages/opposition/OppositionReport";


// // User & Agent Dashboards



// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* =====================
//              PUBLIC ROUTES
//         ===================== */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         {/* =====================
//              ADMIN ROUTES
//         ===================== */}
//         <Route element={<AdminRoutes />}>
//           <Route path="/admin" element={<AdminLayout />}>

//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="add-user" element={<AddUser />} />
//             <Route path="business-type" element={<BusinessTypeSetup />} />
//             <Route path="class" element={<ClassSetup />} />
//             <Route path="file-status" element={<FileStatusSetup />} />
//             <Route path="tm-forms" element={<TMFormsSetup />} />
//             <Route path="agent-registration" element={<AgentRegistration />} />
//             <Route path="country" element={<CountrySetup />} />
//             <Route path="city" element={<CitySetup />} /> 
//             <Route path="agent-list" element={<AgentListTM />} />
//             <Route path="application-details" element={<ApplicationDetails />} /> 
//             <Route path="tm-form-entries" element={<TMFormEntries />} />
//             <Route path="hearings" element={<Hearing />} />
//             <Route path="journal-details" element={<JournalDetails />} />
//             <Route path="renewal-details" element={<RenewalDetails />} />
//             <Route path="monthly-journal" element={<MonthlyJournal />} />
//             <Route path="date-format" element={<DateSetup />} />
//             <Route path="change-password" element={<ChangePassword />} />
//             <Route path="logo-setup" element={<LogoSetup />} />
//             <Route path="basic-search" element={<BasicSearchReport />} />
//             <Route path="tm-renewal-report" element={<TMRenewalReport />} />
//             <Route path="tm-reminder-report" element={<TMReminderReport />} />
//             <Route path="tm-single-query" element={<TMSingleQuery />} />
//             <Route path="/admin/compare-journal" element={<CompareJournal />} />
//             <Route path="/admin/search-journal" element={<SearchManualJournal />} />
//             <Route path="opposition-applications" element={<ApplicationForm />} />
//              <Route path="opposition-reminders" element={<OppositionReminderReport />}/>
//              <Route path="opposition-report" element={<OppositionReport />}




            

         
//             <Route
//               path="customer-registration"
//               element={<CustomerRegistration />}
//             />

       
//         </Route>

//         {/* =====================
//              USER ROUTES
//         ===================== */}
//         <Route element={<UserRoutes />}>
//           <Route path="/user/dashboard" element={<UserDashboard />} />
//         </Route>

//         {/* =====================
//              AGENT ROUTES
//         ===================== */}
//         <Route element={<AgentRoutes />}>
//           <Route path="/agent/dashboard" element={<AgentDashboard />} />
//         </Route>

//         {/* =====================
//              FALLBACK ROUTE
//         ===================== */}
//         <Route path="*" element={<Login />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Route Guards
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import AgentRoutes from "./routes/AgentRoutes";

// Auth Pages
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// Admin Layout + Dashboard
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";

// Setup Pages
import AddUser from "./pages/setups/AddUser";
import BusinessTypeSetup from "./pages/setups/BusinessTypeSetup";
import ClassSetup from "./pages/setups/ClassSetup";
import FileStatusSetup from "./pages/setups/FileStatusSetup";
import TMFormsSetup from "./pages/setups/TMFormsSetup";
import AgentRegistration from "./pages/setups/AgentRegistration";
import CustomerRegistration from "./pages/setups/CustomerRegistration";
import CountrySetup from "./pages/setups/CountrySetup";
import CitySetup from "./pages/setups/CitySetup";
import AgentListTM from "./pages/setups/AgentListTM";
import ApplicationDetails from "./pages/trademark/ApplicationDetails";
import TMFormEntries from "./pages/trademark/TMFormEntries";
import Hearing from "./pages/trademark/Hearing";
import UserDashboard from "./pages/User/Dashboard";
import AgentDashboard from "./pages/Agent/Dashboard";
import JournalDetails from "./pages/trademark/JournalDetails";
import RenewalDetails from "./pages/trademark/RenewalDetails";
import MonthlyJournal from "./pages/TradeMarkJournal/MonthlyJournal";
import DateSetup from "./pages/Utility/DateSetup";
import ChangePassword from "./pages/Utility/ChangePassword";
import LogoSetup from "./pages/Utility/LogoSetup";
import BasicSearchReport from "./pages/trademark/BasicSearchReport";
import TMRenewalReport from "./pages/trademark/TMRenewalReport";
import TMReminderReport from "./pages/trademark/TMReminderReport";
import TMSingleQuery from "./pages/trademark/TMSingleQuery";
import CompareJournal from "./pages/TradeMarkJournal/CompareJournal";
import SearchManualJournal from "./pages/TradeMarkJournal/SearchManualJournal";
import ApplicationForm from "./pages/opposition/ApplicationForm";
import OppositionReminderReport from "./pages/opposition/OppositionReminderReport";
import OppositionReport from "./pages/opposition/OppositionReport";
import OppositionSingleQuery from "./pages/opposition/OppositionSingleQuery";
import CustomerListTM from "./pages/setups/CustomerListTM";
import OppositionFormEntries from "./pages/opposition/OppositionFormEntries";
import OppositionDocuments from "./pages/opposition/OppositionDocuments";
import TMDocuments from "./pages/trademark/TMDocuments";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ADMIN ROUTES */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-user" element={<AddUser />} />
            <Route path="business-type" element={<BusinessTypeSetup />} />
            <Route path="class" element={<ClassSetup />} />
            <Route path="file-status" element={<FileStatusSetup />} />
            <Route path="tm-forms" element={<TMFormsSetup />} />
            <Route path="agent-registration" element={<AgentRegistration />} />
            <Route path="country" element={<CountrySetup />} />
            <Route path="city" element={<CitySetup />} />
            <Route path="agent-list" element={<AgentListTM />} />
            <Route path="application-details" element={<ApplicationDetails />} />
            <Route path="tm-form-entries" element={<TMFormEntries />} />
            <Route path="hearings" element={<Hearing />} />
            <Route path="journal-details" element={<JournalDetails />} />
            <Route path="renewal-details" element={<RenewalDetails />} />
            <Route path="monthly-journal" element={<MonthlyJournal />} />
            <Route path="date-format" element={<DateSetup />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="logo-setup" element={<LogoSetup />} />
            <Route path="basic-search" element={<BasicSearchReport />} />
            <Route path="tm-renewal-report" element={<TMRenewalReport />} />
            <Route path="tm-reminder-report" element={<TMReminderReport />} />
            <Route path="tm-single-query" element={<TMSingleQuery />} />
            <Route path="compare-journal" element={<CompareJournal />} />
            <Route path="search-journal" element={<SearchManualJournal />} />
            <Route path="opposition-applications" element={<ApplicationForm />} />
            <Route path="opposition-reminders" element={<OppositionReminderReport />} />
            <Route path="opposition-report" element={<OppositionReport />} />
             <Route path="opposition-single" element={<OppositionSingleQuery />} />
             <Route path="customer-list" element={<CustomerListTM/>} />
             <Route path="opposition-form-entries" element={<OppositionFormEntries />}/>
             <Route path="opposition-documents" element={<OppositionDocuments />} />
             <Route path="tm-documents"element={<TMDocuments />}/>


            <Route
              path="customer-registration"
              element={<CustomerRegistration />}
            />

          </Route>
        </Route>

        {/* USER ROUTES */}
        <Route element={<UserRoutes />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

        {/* AGENT ROUTES */}
        <Route element={<AgentRoutes />}>
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
