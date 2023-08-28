import React, { useEffect, useState } from "react";
import { Course } from "./Courses";

export default function PurchaseCourses({ client }) {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    client
      .get("/users/purchasedCourses", {
        headers: { authorization: "Beared " + localStorage.getItem("token") },
      })
      .then((response) => {
        setPurchasedCourses(response.data.purchasedCourses);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {purchasedCourses.map((course) => (
        <div key={course._id}>
          <Course
            title={course.title}
            description={course.description}
            image={course.imageLink}
            courseId={course._id}
            price={course.price}
            edit={false}
          />
        </div>
      ))}
    </div>
  );
}
