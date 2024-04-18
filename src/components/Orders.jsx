import useUserStore from "../hooks/useUserStore";

import Container from "./Container";

export default function Orders() {
  const { user } = useUserStore();

  if (!user)
    return (
      <Container className="py-16">
        <h1 className="text-center font-bold text-2xl">
          You need to be logged in to see your orders
        </h1>
      </Container>
    );

  return <div>Orders</div>;
}
