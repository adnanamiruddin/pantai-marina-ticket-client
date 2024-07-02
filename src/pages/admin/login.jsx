import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/layouts/functions/Input";
import LoadingButton from "@/components/layouts/functions/LoadingButton";
import usersApi from "@/api/modules/users.api";
import { selectUser, setUser } from "@/redux/features/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { auth } from "@/api/config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdErrorOutline } from "react-icons/md";

export default function Login() {
  const { user } = useSelector(selectUser);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/admin");
  }, [user]);

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email harus diisi"),
      password: Yup.string()
        .min(8, "Setidaknya 8 karakter untuk password")
        .required("Password harus diisi"),
    }),
    onSubmit: async (values) => {
      if (isOnRequest) return;
      setIsOnRequest(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { response, error } = await usersApi.signIn({
          userUID: userCredential.user.uid,
        });
        if (response) {
          signInForm.resetForm();
          dispatch(setUser(response));
          toast.success(`Selamat datang kembali ${response.firstName}`);
          router.push("/admin");
        }
        if (error) setErrorMessage(error.message);
      } catch (error) {
        setErrorMessage("Login gagal. Pastikan email dan password benar");
      } finally {
        setIsOnRequest(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center pt-10 px-3 md:mx-64">
      <div className="w-full md:p-24 md:rounded-md md:bg-gray-100 md:border-2 md:border-gray-300 md:shadow-lg">
        <h3 className="text-2xl font-semibold mb-1">Masuk</h3>

        <div className="flex justify-center items-center gap-2 my-5">
          <div className="h-[1px] w-full bg-gray-300 mx-2"></div>
          <p className="text-gray-400">admin</p>
          <div className="h-[1px] w-full bg-gray-300 mx-2"></div>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={signInForm.handleSubmit}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={signInForm.values.email}
            onChange={signInForm.handleChange}
            error={
              signInForm.touched.email && signInForm.errors.email !== undefined
            }
            helperText={signInForm.touched.email && signInForm.errors.email}
          />
          <Input
            name="password"
            placeholder="Kata Sandi"
            type="password"
            value={signInForm.values.password}
            onChange={signInForm.handleChange}
            error={
              signInForm.touched.password &&
              signInForm.errors.password !== undefined
            }
            helperText={
              signInForm.touched.password && signInForm.errors.password
            }
          />
          <div></div>
          <LoadingButton loading={isOnRequest}>Masuk</LoadingButton>
        </form>

        {errorMessage ? (
          <div className="alert alert-error mt-4 text-white text-sm">
            <MdErrorOutline className="text-3xl" />
            <span>{errorMessage}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
