import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowOneSubject = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubject = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const u = JSON.parse(user);
          let response = await fetch(`http://localhost:8080/api/v1/predmet/${id}`, {
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            let subjectData = await response.json();
            setSubject(subjectData);
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

    getSubject();
  }, [id]);

  return (
    <Container>
      {isLoading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Card sx={{ marginBottom: 3 }} variant="outlined">
          <CardHeader sx={{ display: "flex", textAlign: "center" }} title={subject.name} />
          <CardMedia
            sx={{ height: 400 }}
            image="https://www.shutterstock.com/image-vector/illustration-school-subjects-doodles-drawn-600w-120055165.jpg"
            title={subject.name}
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

export default ShowOneSubject;
