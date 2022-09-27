import { PoodleModel, PoodleListProps } from "../src/Interfaces/IPoodleModel";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import styles from "index.module.css";
import ErrorModal from "../src/Components/UI/ErrorModal";
import PoodleList from "../src/Components/Poodles/PoodleList";

const HomePage: React.FC<PoodleListProps> = ({ poodles }) => {
  const [poodleList, setPoodleList] = useState<PoodleModel[]>([]);
  const [error, setError] = useState({
    message: "",
    title: "",
    popup: false,
  });

  const onRemoveHandler = async (id: number) => {
    await axios
      .delete(`https://poodlesvonapalusso.dog/api/poodles/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then(() => {
        setPoodleList(poodles.filter((poodle) => poodle.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const errorHandler = () => {
    setError({
      message: "",
      title: "",
      popup: false,
    });
  };
  return (
    <>
      {error.popup && (
        <ErrorModal
          message={error!.message}
          title={error!.title}
          onConfirm={errorHandler}
        />
      )}
      <PoodleList poodles={poodleList} onRemove={onRemoveHandler} />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const response = await axios.get<PoodleModel[]>(
    "https://poodlesvonapalusso.dog/api/poodles"
  );
  const poodles = response.data;
  poodles.map((x) => {
    x.id,
      x.name,
      x.dateOfBirth,
      x.geneticTests,
      x.sex,
      x.imagePedigreeUrl,
      x.imageUrl,
      x.pedigreeNumber,
      x.poodleColorName,
      x.poodleSizeName;
  });
  console.log(poodles);
  return {
    props: {
      poodles: poodles,
    },
  };
}
