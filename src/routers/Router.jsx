import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";

import About from "../pages/About";
import Error from "../components/error/Error";
import Services from "../pages/services/Services";
import DashboardLayout from "../layout/DashboardLayout";

import PrivaterRoute from "../Route/PrivaterRouter";

import Users from "../pages/Dashboard/Users";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyBookings from "../pages/Dashboard/MyBookings";
import BookingCancellation from "../pages/Dashboard/BookingCancellation";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ServiceCard from "../pages/serviceCard/ServiceCard";
import ServiceDetails from "../pages/services/ServiceDetails";
import Payment from './../pages/Dashboard/Payment';
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import Decorator from "../pages/Dashboard/decorator/Decorator";
import ManageService from "../pages/Dashboard/Admin/manageService";
import ManageDecorators from "../pages/Dashboard/Admin/ManageDecorators";

import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import Analytics from "../pages/Dashboard/Admin/Analytics";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'coverage',
          Component: Coverage,
          loader: () => fetch('/servicesCenter.json').then(res => res. json())
        },
       
        {
          path: 'about',
          Component: About
        },
        {
          path: '*',
        element: <Error></Error>
       },
       {
        path: 'service',
        Component: Services
       },
       {
        path:'serviceCard',
        Component: ServiceCard
       },
       {
        path: "/services/:id", 
         element: <ServiceDetails></ServiceDetails>
       }
       
       
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
 {
  path: 'dashboard',
  element: <PrivaterRoute><DashboardLayout /></PrivaterRoute>,
  children: [
    { path: 'users', element: <Users /> },
    { path: 'profile', element: <MyProfile /> },
    { path: 'myBookings', element: <MyBookings /> },
    { path: 'bookingCancellation', element: <BookingCancellation /> },
    { path: 'paymentHistory', element: <PaymentHistory /> },
    {
       path: 'payment/:parcelId',
        element: <Payment />
    },
    {
      path:'payment-success',
      Component: PaymentSuccess
    },
    {
      path:'payment-cancelled',
      Component: PaymentCancelled
    },
    {
      path: 'admin',
      Component: AdminHome
    },
    {
      path:'decorator',
      Component: Decorator
    },
    {
      path: 'admin/manageServices',
      Component: ManageService
    },
    {
      path: "admin/manageDecorators",
      Component: ManageDecorators
    },
    {
      path: "admin/manageBookings",
      Component: ManageBookings
    },
    {
      path: 'admin/analytics',
      Component: Analytics
    }
    

  ]
},
{

}
]);