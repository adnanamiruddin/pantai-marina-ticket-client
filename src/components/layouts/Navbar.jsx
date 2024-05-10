import { auth } from "@/api/config/firebase.config";
import { selectUser, setUser } from "@/redux/features/userSlice";
import Image from "next/image";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegAddressBook, FaTicketAlt } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdAccountCircle } from "react-icons/md";

const notLoggedInLinks = [
  {
    href: "/login",
    label: "Login",
    icon: <FiLogIn className="text-2xl me-1" />,
  },
  {
    href: "/register",
    label: "Register",
    icon: <FaRegAddressBook className="text-2xl me-1" />,
  },
];

const loggedInLinks = [
  {
    href: "/dashboard/profile",
    label: "Profil",
    icon: <MdAccountCircle className="text-2xl me-1" />,
  },
  {
    href: "/dashboard/my-tickets",
    label: "Tiket Saya",
    icon: <FaTicketAlt className="text-2xl me-1" />,
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);

  const router = useRouter();

  const handleDrawerClose = () => {
    document.getElementById("navbar_drawer").checked = false;
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(setUser(null));
      document.getElementById("navbar_drawer").checked = false;
      toast.info("Bye bye 👋");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    // <div className="bg-white text-black px-6 py-3 flex justify-between items-center fixed w-full shadow-lg z-50">
    //   <div className="navbar-start">
    //     <Image
    //       src="/logo_with_text.png"
    //       alt="Logo Pantai Marina"
    //       width={100}
    //       height={100}
    //       className="w-full md:w-[40%]"
    //     />
    //   </div>
    //   <div className="navbar-center hidden lg:flex">
    //     <ul className="menu menu-horizontal px-1">
    //       <li>
    //         <a>Item 1</a>
    //       </li>
    //       <li>
    //         <details>
    //           <summary>Parent</summary>
    //           <ul className="p-2">
    //             <li>
    //               <a>Submenu 1</a>
    //             </li>
    //             <li>
    //               <a>Submenu 2</a>
    //             </li>
    //           </ul>
    //         </details>
    //       </li>
    //       <li>
    //         <a>Item 3</a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="navbar-end">
    //     <a className="btn">Button</a>
    //   </div>
    // </div>
    <div className="bg-white px-6 py-3 flex justify-between items-center fixed w-full shadow-lg z-50">
      <Image
        src="/logo_with_text.png"
        alt="Logo Pantai Marina"
        width={100}
        height={100}
        className="w-[60%] md:w-[20%]"
      />

      <div className="drawer-end md:hidden">
        <input id="navbar_drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="navbar_drawer"
            className="border-2 px-1 py-0.5 flex justify-center items-center"
          >
            <IoMenu className="w-8 h-8 text-gray-500" />
          </label>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="navbar_drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-white text-black gap-3">
            <Image
              src="/logo_with_text.png"
              alt="Logo Pantai Marina"
              width={100}
              height={100}
              className="w-[70%] ms-2 mb-3"
            />
            <li>
              <Link
                href="/"
                onClick={handleDrawerClose}
                className={`text-lg font-semibold ${
                  router.pathname === "/" ? "bg-orange-400" : ""
                }`}
              >
                <FaHome className="text-2xl me-1" />
                Beranda
              </Link>
            </li>

            {!user ? (
              <>
                {notLoggedInLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleDrawerClose}
                      className={`text-lg font-semibold ${
                        router.pathname === link.href ? "bg-orange-400" : ""
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                {loggedInLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={handleDrawerClose}
                      className={`text-lg font-semibold ${
                        router.pathname === link.href ? "bg-orange-400" : ""
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-auto">
                  <button
                    onClick={handleLogout}
                    className="text-lg font-semibold bg-red-600 text-white"
                  >
                    <FiLogOut className="text-2xl me-1" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="hidden md:flex text-black">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <Link
              href="/"
              onClick={handleDrawerClose}
              className={`text-lg font-semibold focus:bg-orange-400 focus:text-black ${
                router.pathname === "/" ? "bg-orange-400" : ""
              }`}
            >
              Beranda
            </Link>
          </li>

          {!user ? (
            <>
              {notLoggedInLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleDrawerClose}
                    className={`text-lg font-semibold focus:bg-orange-400 focus:text-black ${
                      router.pathname === link.href ? "bg-orange-400" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <>
              {loggedInLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleDrawerClose}
                    className={`text-lg font-semibold focus:bg-orange-400 focus:text-black ${
                      router.pathname === link.href ? "bg-orange-400" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-auto">
                <button
                  onClick={handleLogout}
                  className="text-lg font-semibold bg-red-600 text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
