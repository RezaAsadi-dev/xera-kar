import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Shop from "examples/Icons/Shop";
import { FaUserTie } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { RiUser2Fill } from "react-icons/ri";
import { MdNotificationsActive } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Users from "layouts/users";
import UsersDetails from "layouts/users/usersDetails";
import NotFound from "layouts/404";
import Inaccessibility from "layouts/inaccessibility";
import AddNotif from "layouts/notifications/addNotification/AddNotif";
import Support from "layouts/support";
import FetchNotif from "layouts/notifications/FetchNotif";
import Professionals from "layouts/professionals";
import { FaUsersCog } from "react-icons/fa";
import Category from "layouts/category";
import { BiSolidCategoryAlt } from "react-icons/bi";
// import Requests from "layouts/Requests/index";
import Requests from "./layouts/requests";
import { FaCodePullRequest } from "react-icons/fa6";
import Comments from "layouts/comments";
import { FaComments } from "react-icons/fa";
import { Slider } from "@nextui-org/react";
import { FaSliders } from "react-icons/fa6";
import Intro from "layouts/sliders/intro/intro";
import Advisement from "layouts/sliders/advisement/advisement";
import Managers from "layouts/managers";
import AddManagers from "layouts/managers/addManagers";
import EditManagers from "layouts/managers/editManagers";
import AddProfessional from "layouts/professionals/addProfessional";
import AddCat from "layouts/category/addCat";
import AddUser from "layouts/users/adduser";
import AddIntro from "layouts/sliders/intro/addIntro";
import AddAdvisement from "layouts/sliders/advisement/addAdvisement";
import EditUser from "layouts/users/editUser";
import CommentsDetails from "layouts/comments/commentsDetails";
import CategoryDetails from "layouts/category/categoryDetails";
import EditCategory from "layouts/category/editCategory";
import EditAdvisement from "layouts/sliders/advisement/editAdvisement/uploader";
import EditPro from "layouts/professionals/editpro";
import EditIntro from "layouts/sliders/intro/editIntro";
import IntroDetails from "layouts/sliders/intro/introDetails";
import ProDetails from "layouts/professionals/proDetails";
import Business from "layouts/business";
import { FaBusinessTime , FaCity  } from "react-icons/fa";
import AddBusiness from "layouts/business/addBusiness";
import EditBusiness from "layouts/business/editbusiness";
import BusinessDetails from "layouts/business/businessDetails";
import City from "layouts/city/city";
import AddCity from "layouts/city/addcity";
import EditCity from "layouts/city/editcity";
import UserNotif from "layouts/notifications/UserNotifications";
import ProNotif from "layouts/notifications/ProfessionalNotifications";
// import EditRequest from "layouts/Requests/editrequest/editRequest";
import EditRequest from "./layouts/requests/editrequest/editRequest";
import RequestDetail from "./layouts/requests/reqdetail";
import CompanyDetail from "layouts/company/companyDetails";
// import RequestDetail from "layouts/Requests/reqdetail";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="20px" />,
    component: <Dashboard />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Managers",
    key: "managers",
    route: "/managers",
    icon: <FaUserTie size="20px" />,
    component: <Managers />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <FaUsers size="20px" />,
    component: <Users />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Professionals",
    key: "professionals",
    route: "/professionals",
    icon: <FaUsersCog size="20px" />,
    component: <Professionals />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Business",
    key: "business",
    route: "/business",
    icon: <FaBusinessTime  size="20px" />,
    component: <Business />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "City",
    key: "city",
    route: "/city",
    icon: <FaCity  size="20px" />,
    component: <City />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    route: "/category",
    icon: <BiSolidCategoryAlt size="20px" />,
    component: <Category />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Requests",
    key: "requests",
    route: "/requests",
    icon: <FaCodePullRequest size="20px" />,
    component: <Requests />,
    noCollapse: true,
    show: true,
  },
  {
    type: "collapse",
    name: "Comments",
    key: "comments",
    route: "/comments",
    icon: <FaComments size="20px" />,
    component: <Comments />,
    noCollapse: true,
    show: true,
  },
  {
    type: "sub",
    name: "Slider",
    key: "slider",
    route: "/slider",
    icon: <FaSliders size="20px" />,
    component: <Slider />,
    noCollapse: true,
    show: true,
    sub: [
      {
        type: "sub",
        name: "Intro",
        key: "intro",
        route: "/slider/intro",
        icon: <FaUsers size="20px" />,
        component: <Intro />,
        noCollapse: true,
        show: true,
      },
      {
        type: "sub",
        name: "Advisement",
        key: "advisement",
        route: "/slider/advisement",
        icon: <FaUsers size="20px" />,
        component: <Advisement />,
        noCollapse: true,
        show: true,
      },
    ],
  },
  {
    type: "sub",
    name: "Notifications",
    key: "notifications",
    route: "/notifications",
    icon: <MdNotificationsActive size="20px" />,
    component: <FetchNotif />,
    noCollapse: true,
    show: true,
    sub: [
      {
        type: "sub",
        name: "UsersNotif",
        key: "users",
        route: "/notifications/user",
        icon: <FaUsers size="20px" />,
        component: <FetchNotif />,
        noCollapse: true,
        show: true,
      },
      {
        type: "sub",
        name: "ProfessionalsNotif",
        key: "professionals",
        route: "/notifications/professional",
        icon: <FaUsers size="20px" />,
        component: <FetchNotif />,
        noCollapse: true,
        show: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Support",
    key: "support",
    route: "/support",
    icon: <BiSupport size="20px" />,
    component: <Support />,
    noCollapse: true,
    show: true,
  },

  {
    type: "",
    name: " Profile ",
    key: "profile",
    route: "/profile",
    icon: <RiUser2Fill size="20px" />,
    component: <Profile />,
    noCollapse: true,
    show: false,
  },

  {
    type: "",
    name: "Add Manager",
    key: "addManagers",
    route: "/managers/addManagers",
    icon: <FaUserTie size="20px" />,
    component: <AddManagers />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: "Edit Manager",
    key: "editManagers",
    route: "/managers/editManagers/:id",
    icon: <FaUserTie size="20px" />,
    component: <EditManagers />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: " Add Notification ",
    key: "AddNotif",
    route: "/notifications/AddNotif",
    icon: <FaUserTie size="20px" />,
    component: <AddNotif />,
    noCollapse: true,
    show: false,
  },

  {
    type: "",
    name: " User Details ",
    key: "usersDetails",
    route: "/users/usersDetails/:id",
    icon: <FaUsers size="20px" />,
    component: <UsersDetails />,
    noCollapse: true,
    show: false,
  },
 

  {
    type: "",
    name: " Login page ",
    key: "login",
    route: "/login",
    icon: <FaUsersViewfinder size="12px" />,
    component: <SignIn />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: "  ",
    key: "not-found",
    route: "/not-found",
    icon: <FaUsersViewfinder size="12px" />,
    component: <NotFound />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: "  ",
    key: "inaccessibility",
    route: "/inaccessibility",
    icon: <FaUsersViewfinder size="12px" />,
    component: <Inaccessibility />,
    noCollapse: true,
    show: false,
  },

  {
    type: "",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="20px" />,
    component: <Dashboard />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Managers",
    key: "managers",
    route: "/managers",
    icon: <FaUserTie size="20px" />,
    component: <Managers />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <FaUsers size="20px" />,
    component: <Users />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Add User",
    key: "adduser",
    route: "/users/adduser",
    icon: <FaUsersCog size="20px" />,
    component: <AddUser />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Edit User",
    key: "editUser",
    route: "/users/editUser/:id",
    icon: <FaUsersCog size="20px" />,
    component: <EditUser />,
    noCollapse: true,
    show: true,
  },

  {
    type: "",
    name: "professionals",
    key: "professionals",
    route: "/professionals",
    icon: <FaUsersCog size="20px" />,
    component: <Professionals />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Add professional",
    key: "addprofessional",
    route: "/professionals/addprofessional",
    icon: <FaUsersCog size="20px" />,
    component: <AddProfessional />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Edit professional",
    key: "editprofessional",
    route: "/professionals/editprofessional/:id",
    icon: <FaUsersCog size="20px" />,
    component: <EditPro />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Professional Details",
    key: "professionaldetails",
    route: "/professionals/professionaldetails/:id",
    icon: <FaUsersCog size="20px" />,
    component: <ProDetails />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Company Details ",
    key: "copmanydetails ",
    route: "/companydetails/:id",
    icon: <FaUsersCog size="20px" />,
    component: <CompanyDetail />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Business",
    key: "business",
    route: "/business",
    icon: <FaBusinessTime  size="20px" />,
    component: <Business />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "AddBusiness",
    key: "addBusiness",
    route: "/business/addBusiness",
    icon: <FaBusinessTime size="20px" />,
    component: <AddBusiness />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Edit Business",
    key: "editbusiness",
    route: "/business/editbusiness/:id",
    icon: <FaBusinessTime size="20px" />,
    component: <EditBusiness />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Business Details",
    key: "businessdetails",
    route: "/business/businessdetails/:id",
    icon: <FaUsersCog size="20px" />,
    component: <BusinessDetails />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "City",
    key: "city",
    route: "/city",
    icon: <FaCity  size="20px" />,
    component: <City />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Add City",
    key: "addcity",
    route: "/city/addcity",
    icon: <FaCity  size="20px" />,
    component: <AddCity />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Edit City",
    key: "editcity",
    route: "/city/editcity/:id",
    icon: <FaCity  size="20px" />,
    component: <EditCity />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Category",
    key: "category",
    route: "/category",
    icon: <BiSolidCategoryAlt size="20px" />,
    component: <Category />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: " Add Category ",
    key: "addCat",
    route: "/category/addCat",
    icon: <FaUserTie size="20px" />,
    component: <AddCat />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: "Edit Category",
    key: "editCategory",
    route: "/category/editCategory/:id",
    icon: <FaUsersCog size="20px" />,
    component: <EditCategory />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: " Category Details ",
    key: "categoryDetails",
    route: "/category/categoryDetails/:id",
    icon: <FaUsers size="20px" />,
    component: <CategoryDetails />,
    noCollapse: true,
    show: false,
  },

  {
    type: "",
    name: "requests",
    key: "requests",
    route: "/requests",
    icon: <FaCodePullRequest size="20px" />,
    component: <Requests />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "editrequest",
    key: "editrequest",
    route: "/requests/editrequest/:id",
    icon: <FaCodePullRequest size="20px" />,
    component: <EditRequest />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: "requestsDetails",
    key: "requestsDetails",
    route: "/requests/requestsDetails/:id",
    icon: <FaCodePullRequest size="20px" />,
    component: <RequestDetail />,
    noCollapse: true,
    show: false,
  },
  {
    type: "",
    name: "Comments",
    key: "comments",
    route: "/comments",
    icon: <FaComments size="20px" />,
    component: <Comments />,
    noCollapse: true,
    show: true,
  },
 
  {
    type: "",
    name: "Intro",
    key: "intro",
    route: "/slider/intro",
    icon: <FaUsers size="20px" />,
    component: <Intro />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Add Intro",
    key: "addintro",
    route: "/slider/intro/addIntro",
    icon: <FaUsers size="20px" />,
    component: <AddIntro />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Edit Intro",
    key: "editIntro",
    route: "/slider/intro/editIntro/:id",
    icon: <FaUsers size="20px" />,
    component: <EditIntro />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Detail Intro",
    key: "detailIntro",
    route: "/slider/intro/introDetails/:id",
    icon: <FaUsers size="20px" />,
    component: <IntroDetails />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Advisement",
    key: "advisement",
    route: "/slider/advisement",
    icon: <FaUsers size="20px" />,
    component: <Advisement />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Add Advisement",
    key: "addadvisement",
    route: "/slider/advisement/addadvisement",
    icon: <FaUsers size="20px" />,
    component: <AddAdvisement />,
    noCollapse: true,
    show: true,
  },
  {
    type: "",
    name: "Edit Advisement",
    key: "editadvisement",
    route: "/slider/advisement/editadvisement/:id",
    icon: <FaUsers size="20px" />,
    component: <EditAdvisement />,
    noCollapse: true,
    show: true,
  },
  // {
  //   type: "",
  //   name: "Advisement Details",
  //   key: "advisementdetails",
  //   route: "/slider/advisement/advisementdetails/:id",
  //   icon: <FaUsers size="20px" />,
  //   component: <AdvisementDetails />,
  //   noCollapse: true,
  //   show: true,
  // },

  {
    type: "",
    name: "Notifications",
    key: "notifications",
    route: "/notifications",
    icon: <MdNotificationsActive size="20px" />,
    component: <FetchNotif />,
    noCollapse: true,
    show: true,
  },
  {
    name: "Users Notification",
    key: "user",
    route: "/notifications/user",
    icon: <FaUsers size="20px" />,
    component: <UserNotif />,
    noCollapse: true,
    show: true,
  },
  {
    name: "Professionals Notification",
    key: "professional",
    route: "/notifications/professional",
    icon: <FaUsers size="20px" />,
    component: <ProNotif />,
    noCollapse: true,
    show: true,
  },

  {
    type: "",
    name: "Support",
    key: "support",
    route: "/support",
    icon: <BiSupport size="20px" />,
    component: <Support />,
    noCollapse: true,
    show: true,
  },
];

export default routes;
