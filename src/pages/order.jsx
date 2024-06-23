import { useRouter } from "next/router";
import { useEffect } from "react";
import GlobalLoading from "@/components/layouts/GlobalLoading";

export default function OrderPage() {
  const router = useRouter();
  const { order_id, transaction_status } = router.query;

  useEffect(() => {
    setTimeout(() => {
      if (transaction_status === "settlement") {
        router.push(`/thanks?order_id=${order_id}`);
        return;
      } else {
        router.push(`/error?order_id=${order_id}`);
        return;
      }
    }, 1000);
  }, [order_id, transaction_status, router]);

  return <GlobalLoading />;
}
