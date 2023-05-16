import axios from "axios";
import CardGrid from "./CardGrid";
import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const extractToken = () => {
  try {
    let token: string | null = localStorage.getItem('token');
    if(!token) {
      console.error('No token found in local storage');
      return null;
    }
    return token;
  } catch (err) {
    console.error('Failed to decode token', err);
    return null;
  }
}


interface Subject {
  id: number;
  title: string;
  description: string;
  year: number;
  semester: number;
  credits: number;
}

function SubjectAlex() {
  const [cards, setCards] = useState<Subject[]>([]);
  const [isModified, setIsModified] = useState<boolean>(false);
  const {decodedToken}: any = useJwt(String(extractToken()));

  console.log(decodedToken);

  const fetchData = () => {
    console.log("fetching data");
    const token = extractToken();
    if(!token) {
      console.error('No token found in local storage');
      return;
    }
     const role = decodedToken?.role;
     console.log(role);

    axios
      .get<Subject[]>(`http://localhost:8082/api/v1/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`
          }
        })
      .then((response) => response.data)
      .then((data) => {
        setCards(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [isModified]);

  return (
    <>
      <div //className="=app-container"
        className="grid gap-8 px-8 py-8 items-center text-center"
      >
        <CardGrid
          cards={cards}
          setCards={setCards}
          isModified={isModified}
          setIsModified={setIsModified}
          role={decodedToken?.role}
        />
      </div>
    </>
  );
}

export default SubjectAlex;
