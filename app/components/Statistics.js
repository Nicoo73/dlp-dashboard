"use client";

import { compress } from "@/next.config";
import axios from "axios";
import React, { useEffect, useState } from "react";

function StatBox({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default function Statistics() {
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response2 = await axios.get("https://api.thecatapi.com/v1/images/search",  {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        let res2 = response2.data;
        console.log(res2);
        const response = await axios.get("https://dlp-api.vercel.app/prestamos",  {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        res = response.data;

        const borrowedCount = res.prestamos.length;
        setTotalBorrowedBooks(borrowedCount);
        //console.log(response.data);
      } catch (error) {
        console.log("error detectado");
        console.log(error);
      }
    }

    fetchData();
  }, []);
}


export default function Statistics(props) {
  console.log("a", props)
  return (
    <>
      <StatBox title="Total de libros" value={"a"} />
      <StatBox title="Libros prestados" value={totalBorrowedBooks} />
      <StatBox title="Total de donantes" value="X" />
    </>
  );
}
