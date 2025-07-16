import Breadcrumbs from "@/components/breadcrumb";
import MyOrderList from "./_components/my-order-list";

const Orders = () => {
  return (
    <>
      <section className="bg-white h-10 mb-3 flex items-center px-4 rounded shadow">
        <Breadcrumbs
          items={[
            { label: "My Account", href: `/my-account` },
            { label: "Orders" },
          ]}
          className=""
        />
      </section>
      <section className="flex flex-col gap-4 px-2 bg-white rounded shadow">
        <MyOrderList />
      </section>
    </>
  );
};

export default Orders;
