import { Routes, Route } from "react-router-dom";

// Auth
import Login from "../UserSide/Pages/Authontication/login/Login";
import Registration from "../UserSide/Pages/Authontication/registration/Registration";
import AdminLogin from "../components/admin/AdminLogin";
import AdminRegister from "../components/admin/AdminRegister";

// Admin Pages
import Dashboard from "../components/admin/Dashboard/Dashboard";
import MainDashboard from "../components/admin/maindashboard/MainDashboard";
import MobileAdd from "../components/admin/Add Product/MobileAdd";
import Electronicadd from "../components/admin/Add Product/Electronicadd";
import Menadd from "../components/admin/Add Product/Menadd";
import Womenadd from "../components/admin/Add Product/Womenadd";
import HomekitchenAdd from "../components/admin/Add Product/HomekitchenAdd";
import ManageProduct from "../components/admin/ManageProduct/ManageProduct";
import NewManageProduct from "../components/admin/ManageProduct/NewManageProduct";
import Deletemobile from "../components/admin/Delete Product/Deletemobile";
import DeleteElectronics from "../components/admin/Delete Product/DeleteElectronics";
import DeleteMens from "../components/admin/Delete Product/DeleteMens";
import DeleteWomen from "../components/admin/Delete Product/DeleteWomen";
import DeleteHomeKitchen from "../components/admin/Delete Product/DeleteHomeKitchen";
import EditMobile from "../components/admin/Edit Product/Edit Mobile/EditMobile";
import EditMobileData from "../components/admin/Edit Product/Edit Mobile/EditMobileData";
import EditElectronic from "../components/admin/Edit Product/Edit Electronic/EditElectronic";
import EditElectronicdata from "../components/admin/Edit Product/Edit Electronic/EditElectronicdata";
import EditMen from "../components/admin/Edit Product/Edit mens/EditMen";
import EditMenData from "../components/admin/Edit Product/Edit mens/EditMenData";
import EditWomen from "../components/admin/Edit Product/Edit Women/EditWomen";
import EditWomenData from "../components/admin/Edit Product/Edit Women/EditWomenData";
import EditHomeKitchen from "../components/admin/Edit Product/Edit HomeKitchen/EditHomeKitchen";
import EditHomeKitchenData from "../components/admin/Edit Product/Edit HomeKitchen/EditHomeKitchenData";

// User Pages
import Home from "../UserSide/Pages/home/Home";
import MobileList from "../UserSide/Pages/productListPages/MobileList";
import ElectronicList from "../UserSide/Pages/productListPages/ElectronicList";
import MenFashion from "../UserSide/Pages/productListPages/MenFashion";
import WomenFashion from "../UserSide/Pages/productListPages/WomenFashion";
import HomeKitchen from "../UserSide/Pages/productListPages/HomeKitchen";
import ProductDetail from "../UserSide/Pages/productDetail/ProductDetail";
import Cart from "../UserSide/Pages/cart/Cart";
import Address from "../UserSide/Pages/Address/Address";
import Buy from "../UserSide/Pages/buy/Buy";
import Feedback from "../UserSide/Pages/Feedback/Feedback";
import Yourorder from "../UserSide/Pages/yourOrder/Yourorder";

// Forgot Password
import Sendlink from "../components/Forgot Password/Sendlink";
import Forgotpassword from "../components/Forgot Password/Forgotpassword";

// Other
import Error from "../components/Error";

// Private and Public Routes
import PrivateRoute from "./PrivateRoute";
import UserLayout from "../UserSide/UserLayout";

function PagesRoutes() {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route element={<UserLayout />}>
        {/* Public routes */}
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/mobile" element={<MobileList />} />
        <Route path="/electronic" element={<ElectronicList />} />
        <Route path="/men" element={<MenFashion />} />
        <Route path="/women" element={<WomenFashion />} />
        <Route path="/homekitchen" element={<HomeKitchen />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/sendlink" element={<Sendlink />} />
        <Route path="/forgotpassword/:id/:token" element={<Forgotpassword />} />

        {/* Private user routes */}
        <Route element={<PrivateRoute role="user" />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/orders" element={<Yourorder />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route>
        {/* Public routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/aregister" element={<AdminRegister />} />

        {/* Private admin routes */}
        <Route element={<PrivateRoute role="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/mobileadd" element={<MobileAdd />} />
          <Route path="/electronicadd" element={<Electronicadd />} />
          <Route path="/menadd" element={<Menadd />} />
          <Route path="/womenadd" element={<Womenadd />} />
          <Route path="/homekitchenadd" element={<HomekitchenAdd />} />
          <Route path="/manageproduct" element={<ManageProduct />} />
          <Route path="/newmanageproduct" element={<NewManageProduct />} />
          <Route path="/deletemobile" element={<Deletemobile />} />
          <Route path="/deleteelectronics" element={<DeleteElectronics />} />
          <Route path="/deletemen" element={<DeleteMens />} />
          <Route path="/deletewomen" element={<DeleteWomen />} />
          <Route path="/deletehomekitchen" element={<DeleteHomeKitchen />} />
          <Route path="/editmobile" element={<EditMobile />} />
          <Route path="/editmobiledata/:id" element={<EditMobileData />} />
          <Route path="/editelectronic" element={<EditElectronic />} />
          <Route
            path="/editelectronicdata/:id"
            element={<EditElectronicdata />}
          />
          <Route path="/editmen" element={<EditMen />} />
          <Route path="/editmendata/:id" element={<EditMenData />} />
          <Route path="/editwomen" element={<EditWomen />} />
          <Route path="/editwomendata/:id" element={<EditWomenData />} />
          <Route path="/edithomekitchen" element={<EditHomeKitchen />} />
          <Route
            path="/edithomekitchendata/:id"
            element={<EditHomeKitchenData />}
          />
        </Route>
      </Route>

      {/* ERROR ROUTE */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default PagesRoutes;
