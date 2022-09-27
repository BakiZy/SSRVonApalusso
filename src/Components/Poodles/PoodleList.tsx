import React, { useContext } from "react";
import classes from "./PoodleList.module.css";
import { PoodleListProps } from "../../Interfaces/IPoodleModel";
import AuthContext from "../../Store/auth-context";
import { Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

const PoodleList: React.FC<PoodleListProps> = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <>
      {props.poodles.map((poodle) => {
        const parseDate = new Date(poodle.dateOfBirth).toLocaleDateString(
          "en-UK"
        );
        return (
          <section className={classes.container} key={poodle.id}>
            <div key={poodle.id} className={classes.cardProperty}>
              <Link href={`/poodles/${poodle.id}`}>
                <Image
                  src={poodle.imageUrl}
                  className={classes.imageProp}
                  alt={poodle.name}
                />
              </Link>

              <h2>{poodle.name}</h2>

              <p>Date of birth : {parseDate}</p>
              {authContext.isLoggedIn ? (
                <p>Pedigree number: {poodle.pedigreeNumber}</p>
              ) : null}
              {poodle.geneticTests ? (
                <p> Genetic testings : yes </p>
              ) : (
                <p> Genetic testings : no </p>
              )}
              <p>Gender: {poodle.sex}</p>
              <p>Size : {poodle.poodleSizeName}</p>
              <p>Color : {poodle.poodleColorName}</p>
              <Link className={classes.linkZ} href={`/poodles/${poodle.id}`}>
                <a>Interested in our poodle pups?</a>
              </Link>
            </div>
            <div className={classes.buttonDiv}>
              {authContext.isAdmin && (
                <Button
                  className="btn btn-danger"
                  onClick={() => props.onRemove(poodle.id)}
                  style={{
                    borderRadius: "1rem",
                    borderColor: "rgb(107, 14, 117)",
                    color: "#ffe2ed",
                    fontSize: "1.5rem",
                    marginBottom: "",
                  }}
                >
                  Remove
                </Button>
              )}
              {authContext.isAdmin && (
                <Link
                  className={classes.linkZ}
                  href={`/edit-poodle/${poodle.id}`}
                >
                  <a>Edit DB data</a>
                </Link>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default PoodleList;
