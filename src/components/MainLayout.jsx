import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import usersApi from "@/api/modules/users.api";
import { setUser } from "@/redux/features/userSlice";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layouts/globals/Navbar";
import Footer from "@/components/layouts/globals/Footer";
import Carousel from "./layouts/Carousel";

import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isCarouselPassed, setIsCarouselPassed] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await usersApi.getProfile();
      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };
    if (localStorage.getItem("actkn")) authUser();
    else dispatch(setUser(null));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsCarouselPassed(true);
      } else {
        setIsCarouselPassed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Config React Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        z-index="9999"
        theme="light"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        limit={1}
      />
      {/* Config React Toastify END */}

      <div>
        <Navbar isCarouselPassed={isCarouselPassed} />
      </div>

      {router.asPath === "/" ? (
        <>
          <Carousel />

          <div className="bg-white text-black p-6 min-h-screen">{children}</div>
        </>
      ) : (
        <div className="bg-white text-black p-6 pt-24 min-h-screen">
          {children}
        </div>
      )}

      <Footer />
    </>
  );
}
