import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

export default function ErrorPaymentPage() {
  const router = useRouter();
  const { order_id } = router.query;

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [order_id, router]);

  return (
    <>
      <div className="mt-2 flex flex-col items-center gap-4 bg-red-500 text-gray-100 p-4 rounded-md font-semibold">
        <MdOutlineCancel className="text-5xl" />
        <h1 className="text-lg text-center">Pembayaran gagal diproses</h1>
      </div>

      <p className="mt-4 text-sm font-semibold px-2">
        Anda akan dialihkan ke halaman utama...
      </p>
    </>
  );
}
