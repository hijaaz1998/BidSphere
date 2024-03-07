import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../../slices/userSlice";
import { selectAdmin } from "../../../slices/adminSlice/adminSlice";


export const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export const AdminPrivateRoutes = () => {
  const admin = useSelector(selectAdmin);  
  return admin ? <Outlet /> : <Navigate to="/admin" />;
}