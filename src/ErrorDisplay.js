import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

// komponenta koja ce se prikazati ako dodje do greske prilikom dobavljanja podataka ili ako neki korisnik nije ulogovan, tj greska koja se pojavi prilikom prikaza odredjene komponente
const ErrorDisplay = ({ entity }) => {
  const error = useRouteError(); //hook koji vraca gresku ukoliko dodje do greske prilikom prikaza stranice
  // mozemo i sami da definisemo i 'izbacujemo' svoj greske (vracamo greske)
  // ovde greske su vezane za korisnike, ako nije ulogovan odgovarajuci korisnik ili ako korisnik uopste nije ulogovan
  if (error.cause == "security" || error.cause == "login") {
    return (
      <Container>
        <Typography> {error.message} </Typography>
      </Container>
    );
  }

  // ako je doslo do neke druge greske koja nije vezana za korisnika onda se prikaze sledeci element
  return (
    <Container>
      <Stack>
        <Typography> Desila se greska prilikom ucitavanja {entity} </Typography>
        <Typography> Jako nam je zao. Da li ste pokrenuli back-end server?</Typography>

        <Typography> Interna greska je: </Typography>
        <Box>
          <pre>{error.message}</pre>
        </Box>
      </Stack>
    </Container>
  );
};

export default ErrorDisplay;
