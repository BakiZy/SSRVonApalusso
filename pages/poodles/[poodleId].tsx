import { useRouter } from "next/router";

const Reservation = () => {
  const router = useRouter();
  const poodlesId = router.query.poodleId;

  return <div>test</div>;
};

export default Reservation;
