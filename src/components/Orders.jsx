import { useEffect, useState } from "react";
import useUserStore from "../hooks/useUserStore";

import Container from "./Container";
import axios from "axios";

export default function Orders() {
  const { user } = useUserStore();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://json-server-t23y.onrender.com/users/${user.id}`)
        .then((res) => setOrders(res.data.orders));
    }
  }, [user]);

  console.log(orders);

  if (!user)
    return (
      <Container className="py-16">
        <h1 className="text-center font-bold text-2xl">
          You need to be logged in to see your orders
        </h1>
      </Container>
    );

  return (
    <Container className="py-16">
      <h1 className="text-xl font-semibold">Your Orders 🧾</h1>
      {orders.length === 0 ? (
        <div className="mt-6">No orders till now 🙁</div>
      ) : (
        <div className="mt-6">
          {orders.map((order) => (
            <div key={order.date}>
              <h2 className="font-semibold">
                Ordered on: {new Date(order.date).toISOString()}
              </h2>
              <div className="flex flex-col gap-6 mt-8">
                {order.items.map((item) => (
                  <div key={item.id} className="flex bg-rose-100 p-4 gap-8">
                    <img src={item.image} className="h-20 w-20" />
                    <div>
                      <div className="font-bold text-xl">{item.name}</div>
                      <div className="">Quantity: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
