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
    path: 'dashboardLayout',
    element: <PrivaterRoute><DashboardLayout></DashboardLayout></PrivaterRoute>,
    children: [
      {
        path: 'dashboard/users',
        element: <Users></Users>
        
      },
      {
        path: 'profile',
        element: <MyProfile></MyProfile>
      },
      {
        path:'myBookings',
        element: <MyBookings></MyBookings>
      },
      {
        path:'bookingCancellation',
        element: <BookingCancellation></BookingCancellation>
      },
      {
        path:'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path:'payment',
        element: <Payment></Payment>
      }
     
    ]
  }
]);