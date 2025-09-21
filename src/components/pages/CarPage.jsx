import { useState } from "react";
import {
  Grid,
  Container,
  Pagination,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import CarCard from "../cards/CarCard";
import { useNavigate } from "react-router";

const ITEMS_PER_PAGE = 6;

const CarPage = ({ cars, onDelete }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [manufacturer, setManufacturer] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [volume, setVolume] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const unique = (key) => [...new Set(cars.map((car) => car[key]))];

  const filteredCars = cars.filter((car) => {
    return (
      (!manufacturer || car.manufacturer === manufacturer) &&
      (!year || car.year === Number(year)) &&
      (!color || car.color.toLowerCase() === color.toLowerCase()) &&
      (!volume || car.volume === Number(volume)) &&
      (!minPrice || car.price >= Number(minPrice)) &&
      (!maxPrice || car.price <= Number(maxPrice))
    );
  });

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  const currentCars = filteredCars.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const resetFilters = () => {
    setManufacturer("");
    setYear("");
    setColor("");
    setVolume("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  return (
    <Container sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Каталог автомобілів
      </Typography>
      <Box mb={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={() => navigate("/add")}>
          Додати авто
        </Button>
      </Box>

      <Box
        width="100%"
        mb={5}
        p={3}
        borderRadius={2}
        bgcolor="#f9f9f9"
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
        >
        <Typography variant="h6" mb={2} fontWeight="bold">
            Фільтри
        </Typography>

        <Grid container spacing={2} justifyContent="center">
            <Grid item>
            <TextField
                select
                label="Виробник"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                variant="outlined"
                sx={{ width: 250 }}
            >
                <MenuItem value="">Усі</MenuItem>
                {unique("manufacturer").map((m) => (
                <MenuItem key={m} value={m}>
                    {m}
                </MenuItem>
                ))}
            </TextField>
            </Grid>

            <Grid item>
            <TextField
                select
                label="Рік"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                variant="outlined"
                sx={{ width: 250 }}
            >
                <MenuItem value="">Усі</MenuItem>
                {unique("year").map((y) => (
                <MenuItem key={y} value={y}>
                    {y}
                </MenuItem>
                ))}
            </TextField>
            </Grid>

            <Grid item>
            <TextField
                select
                label="Обʼєм (л)"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                variant="outlined"
                sx={{ width: 250 }}
            >
                <MenuItem value="">Усі</MenuItem>
                {unique("volume").map((v) => (
                <MenuItem key={v} value={v}>
                    {v}
                </MenuItem>
                ))}
            </TextField>
            </Grid>

            <Grid item>
            <TextField
                label="Колір"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                variant="outlined"
                sx={{ width: 250 }}
            />
            </Grid>

            <Grid item>
            <TextField
                label="Мін. ціна"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                variant="outlined"
                sx={{ width: 250 }}
            />
            </Grid>

            <Grid item>
            <TextField
                label="Макс. ціна"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                variant="outlined"
                sx={{ width: 250 }}
            />
            </Grid>

            <Grid item xs={12} mt={2} textAlign="center">
            <Button onClick={resetFilters} variant="outlined" color="secondary">
                Очистити фільтри
            </Button>
            </Grid>
        </Grid>
        </Box>


      <Grid container spacing={4} justifyContent="center">
        {currentCars.map((car) => (
          <Grid key={car.id} item xs={12} sm={6} md={4}>
            <CarCard car={car} onEdit={handleEdit} onDelete={onDelete} />
          </Grid>
        ))}

        {currentCars.length === 0 && (
          <Typography variant="h6" color="text.secondary" mt={4}>
            Автомобілі не знайдено за вказаними фільтрами.
          </Typography>
        )}
      </Grid>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={6}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
            size="large"
            shape="rounded"
          />
        </Box>
      )}
    </Container>
  );
};

export default CarPage;
