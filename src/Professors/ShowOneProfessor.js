import { Card, CardContent, CardHeader, CardMedia, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowOneProfessor = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfessor = async () => {
      try {
        const user = localStorage.getItem("user");
        console.log(user);
        if (user) {
          const u = JSON.parse(user);
          let response = await fetch(`http://localhost:8080/api/v1/nastavnik/${id}`, {
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          });

          if (response.ok) {
            let professorData = await response.json();
            setProfessor(professorData);
          } else {
            setError("Something went wrong.");
          }
        } else {
          setError("User not found.");
        }
      } catch (error) {
        setError("Error: " + error.message);
      }

      setIsLoading(false);
    };

    getProfessor();
  }, [id]);

  return (
    <Container>
      {isLoading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Card sx={{ marginBottom: 3 }} variant="outlined">
          <CardHeader sx={{ display: "flex", textAlign: "center" }} title={`${professor.ime} ${professor.prezime}`} />
          <CardMedia
            sx={{ height: 400 }}
            image="https://media.istockphoto.com/id/1093522584/photo/rear-view-of-mature-teacher-giving-a-lecture-in-a-classroom.jpg?s=612x612&w=0&k=20&c=P0kitBcsARYjAk-bXRTu0XVjtq74Kthq6zgjdw0WGkE="
            title={`${professor.ime} ${professor.prezime}`}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ padding: "5px", maxWidth: "50%" }}
            >
              <Grid item xs={22}>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius; dignissim
                elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare. Hendrerit parturient
                habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit sodales taciti duis praesent id.
                Consequat urna vitae morbi nunc congue.
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ShowOneProfessor;
