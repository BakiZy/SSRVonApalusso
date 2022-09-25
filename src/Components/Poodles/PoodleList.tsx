import React, { useContext } from "react";
import classes from "./PoodleList.module.css";
import { PoodleListProps } from "../../Interfaces/IPoodleModel";
import AuthContext from "../../Store/auth-context";
import { Card, Col, Row, Button } from "react-bootstrap";
import Link from "next/link";

const PoodleList: React.FC<PoodleListProps> = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <Row lg={3} className={classes.rowContent}>
      {props.poodles.map((poodle) => {
        const parseDate = new Date(poodle.dateOfBirth).toLocaleDateString(
          "en-UK"
        );

        //change date format from yyyy-mm-dd to dd-mm-yyyy

        return (
          <Col key={poodle.id}>
            <Card key={poodle.id} className={classes.cardProperty}>
              <Card.Body>
                <Link href={`/poodles/${poodle.id}`}>
                  <Card.Img
                    src={poodle.imageUrl}
                    className={classes.imageProp}
                    alt={poodle.name}
                  />
                </Link>
                <Card.Title>
                  <h2>{poodle.name}</h2>
                </Card.Title>
                <Card.Text>Date of birth : {parseDate}</Card.Text>
                {authContext.isLoggedIn ? (
                  <Card.Text>
                    Pedigree number: {poodle.pedigreeNumber}
                  </Card.Text>
                ) : null}
                {poodle.geneticTests ? (
                  <Card.Text> Genetic testings : yes </Card.Text>
                ) : (
                  <Card.Text> Genetic testings : no </Card.Text>
                )}
                <Card.Text>Gender: {poodle.sex}</Card.Text>
                <Card.Text>Size : {poodle.poodleSizeName}</Card.Text>
                <Card.Text>Color : {poodle.poodleColorName}</Card.Text>
                <Link className={classes.linkZ} href={`/poodles/${poodle.id}`}>
                  <a>Interested in our poodle pups?</a>
                </Link>
              </Card.Body>
              <Card.Body className={classes.buttonDiv}>
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
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default PoodleList;
