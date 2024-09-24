import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminRegister";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import Sendlink from "./components/Forgot Password/Sendlink";
import Forgotpassword from "./components/Forgot Password/Forgotpassword";
import MobileAdd from "./components/admin/Add Product/MobileAdd";
import Electronicadd from "./components/admin/Add Product/Electronicadd";
import Menadd from "./components/admin/Add Product/Menadd";
import Womenadd from "./components/admin/Add Product/Womenadd";
import HomekitchenAdd from "./components/admin/Add Product/HomekitchenAdd";
import ManageProduct from "./components/admin/ManageProduct/ManageProduct";
import Deletemobile from "./components/admin/Delete Product/Deletemobile";
import DeleteElectronics from "./components/admin/Delete Product/DeleteElectronics";
import DeleteMens from "./components/admin/Delete Product/DeleteMens";
import DeleteWomen from "./components/admin/Delete Product/DeleteWomen";
import DeleteHomeKitchen from "./components/admin/Delete Product/DeleteHomeKitchen";
import EditMobile from "./components/admin/Edit Product/Edit Mobile/EditMobile";
import EditMobileData from "./components/admin/Edit Product/Edit Mobile/EditMobileData";
import EditElectronic from "./components/admin/Edit Product/Edit Electronic/EditElectronic";
import EditElectronicdata from "./components/admin/Edit Product/Edit Electronic/EditElectronicdata";
import EditMen from "./components/admin/Edit Product/Edit mens/EditMen";
import EditMenData from "./components/admin/Edit Product/Edit mens/EditMenData";
import EditWomenData from "./components/admin/Edit Product/Edit Women/EditWomenData";
import EditWomen from "./components/admin/Edit Product/Edit Women/EditWomen";
import EditHomeKitchen from "./components/admin/Edit Product/Edit HomeKitchen/EditHomeKitchen";
import EditHomeKitchenData from "./components/admin/Edit Product/Edit HomeKitchen/EditHomeKitchenData";
import Error from "./components/Error";
import Cart from "./UserSide/Pages/cart/Cart";
// import Forwardpage from "./components/admin/Forwardpage/Forwardpage";
import Buy from "./components/buy now/Buy";
import Feedback from "./components/Feedback/Feedback";
import Yourorder from "./components/Yourorder";
import NewManageProduct from "./components/admin/ManageProduct/NewManageProduct";
import AdminHeader from "./components/headers/AdminHeader";
import MainDashboard from "./components/admin/maindashboard/MainDashboard";
import HeaderComplate from "./UserSide/Components/Header/HeaderComplate";
import ProductDetail from "./UserSide/Pages/productDetail/ProductDetail";
import MobileList from "./UserSide/Pages/productListPages/MobileList";
import ElectronicList from "./UserSide/Pages/productListPages/ElectronicList";
import MenFashion from "./UserSide/Pages/productListPages/MenFashion";
import WomenFashion from "./UserSide/Pages/productListPages/WomenFashion";
import HomeKitchen from "./UserSide/Pages/productListPages/HomeKitchen";
import Home from "./UserSide/Pages/home/Home";
import Login from "./UserSide/Pages/Authontication/login/Login";
import Registration from "./UserSide/Pages/Authontication/registration/Registration";
import Address from "./UserSide/Pages/Address/Address";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HeaderComplate />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/sendlink" element={<Sendlink />} />
          <Route
            path="/forgotpassword/:id/:token"
            element={<Forgotpassword />}
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/address" element={<Address />} />
          <Route path="/mobile" element={<MobileList />} />
          <Route path="/electronic" element={<ElectronicList />} />
          <Route path="/men" element={<MenFashion />} />
          <Route path="/women" element={<WomenFashion />} />
          <Route path="/homekitchen" element={<HomeKitchen />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/yourorder" element={<Yourorder />} />
          <Route path="*" element={<Error />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />

        {/* <Route path="/maindashboard" element={<MainDashboard />} /> */}

        <Route path="/forwardpage" element={<AdminHeader />}>
          <Route index element={<MainDashboard />} />
        </Route>
      </Routes>
    </>
    // <>
    //   <Header />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/signin" element={<Signin />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/admin" element={<AdminLogin />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/sendlink" element={<Sendlink />} />
    //     <Route path="/forgotpassword/:id/:token" element={<Forgotpassword />} />
    //     <Route path="/address" element={<Address />} />
    //     <Route path="/mobile" element={<Mobile />} />
    //     <Route path="/electronic" element={<Electronics />} />
    //     <Route path="/men" element={<Men />} />
    //     <Route path="/women" element={<Women />} />
    //     <Route path="/homekitchen" element={<HomeKitchen />} />
    //     <Route path="/getproductsone/:id" element={<Productcart />} />
    //     <Route path="/getmobilesone/:id" element={<Mobilecart />} />
    //     <Route path="/getelectronicsone/:id" element={<Electroniccart />} />
    //     <Route path="/getmensone/:id" element={<Mencart />} />
    //     <Route path="/getwomensone/:id" element={<Womencart />} />
    //     <Route path="/gethomekitchensone/:id" element={<HomeKitchencart />} />
    //     <Route path="/mobileadd" element={<MobileAdd />} />
    //     <Route path="/electronicadd" element={<Electronicadd />} />
    //     <Route path="/menadd" element={<Menadd />} />
    //     <Route path="/womenadd" element={<Womenadd />} />
    //     <Route path="/homekitchenadd" element={<HomekitchenAdd />} />
    //     <Route path="/manageproduct" element={<ManageProduct />} />
    //     <Route path="/newmanageproduct" element={<NewManageProduct />} />
    //     <Route path="/deletemobile" element={<Deletemobile />} />
    //     <Route path="/deleteelectronics" element={<DeleteElectronics />} />
    //     <Route path="/deletemen" element={<DeleteMens />} />
    //     <Route path="/deletewomen" element={<DeleteWomen />} />
    //     <Route path="/deletehomekitchen" element={<DeleteHomeKitchen />} />
    //     <Route path="/editmobile" element={<EditMobile />} />
    //     <Route path="/editmobiledata/:id" element={<EditMobileData />} />
    //     <Route path="/editelectronic" element={<EditElectronic />} />
    //     <Route path="/forwardpage" element={<Forwardpage />} />
    //     <Route
    //       path="/editelectronicdata/:id"
    //       element={<EditElectronicdata />}
    //     />
    //     <Route path="/editmen" element={<EditMen />} />
    //     <Route path="/editmendata/:id" element={<EditMenData />} />
    //     <Route path="/editwomen" element={<EditWomen />} />
    //     <Route path="/editwomendata/:id" element={<EditWomenData />} />
    //     <Route path="/edithomekitchen" element={<EditHomeKitchen />} />
    //     <Route
    //       path="/edithomekitchendata/:id"
    //       element={<EditHomeKitchenData />}
    //     />
    //     <Route path="*" element={<Error />} />
    //     <Route path="/cart" element={<Cart />} />
    //     <Route path="/aregister" element={<AdminRegister />} />
    //     <Route path="/buy" element={<Buy />} />
    //     <Route path="/feedback" element={<Feedback />} />
    //     <Route path="/yourorder" element={<Yourorder />} />
    //   </Routes>
    //   <Footer />
    // </>
  );
}

export default App;
