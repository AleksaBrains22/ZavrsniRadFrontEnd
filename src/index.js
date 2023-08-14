import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import ShowSubjects from "./Subjects/ShowSubjects";
import Login from "./Login/Login";
import SubjectEdit from "./Subjects/SubjectEdit";
import ErrorDisplay from "./ErrorDisplay";
import ShowOneSubject from "./Subjects/ShowOneSubject";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/ShowSubjects",
//         element: <ShowSubjects />,
//         loader: async () => {
//           return fetch("http://localhost:8080/api/v1/predmet");
//         },
//         errorElement: <ErrorDisplay entity="subject" />,
//       },
//     ],
//   },
//   {
//     // putanja koja prikazuje jednu predmeta za izmenu
//     path: "edit_subject/:id",
//     element: <SubjectEdit />,
//     loader: async ({ params }) => {
//       return fetch(`http://localhost:8080/api/v1/predmet/izmenaPredmeta/${params.id}`);
//     },
//   },
//   {
//     path: "ShowOneSubject",
//     element: <ShowOneSubject />,
//     loader: async ({ params }) => {
//       return fetch(`http://localhost:8080/api/v1/predmet/${params.id}`);
//     },
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
