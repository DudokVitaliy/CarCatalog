import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const AddCarPage = ({ onAdd }) => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    name: "",
    manufacturer: "",
    year: "",
    volume: "",
    price: "",
    color: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!car.name.trim()) newErrors.name = "Назва обов'язкова";
    if (!car.manufacturer.trim()) newErrors.manufacturer = "Виробник обов'язковий";
    if (!car.year || Number(car.year) <= 0) newErrors.year = "Вкажіть коректний рік";
    if (!car.volume || Number(car.volume) <= 0) newErrors.volume = "Вкажіть коректний об'єм";
    if (!car.price || Number(car.price) <= 0) newErrors.price = "Вкажіть коректну ціну";
    if (!car.color.trim()) newErrors.color = "Колір обов'язковий";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const newCar = {
      ...car,
      year: Number(car.year),
      volume: Number(car.volume),
      price: Number(car.price),
    };
    onAdd(newCar);
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" mb={3}>
        Додати авто
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {["name", "manufacturer", "year", "volume", "price", "color", "description", "image"].map((field) => (
          <TextField
            key={field}
            label={
              field === "name" ? "Назва" :
              field === "manufacturer" ? "Виробник" :
              field === "year" ? "Рік" :
              field === "volume" ? "Об'єм (л)" :
              field === "price" ? "Ціна ($)" :
              field === "color" ? "Колір" :
              field === "description" ? "Опис" :
              field === "image" ? "URL зображення" : field
            }
            name={field}
            value={car[field]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type={["year", "volume", "price"].includes(field) ? "number" : "text"}
            error={!!errors[field]}
            helperText={errors[field]}
            required={field !== "description" && field !== "image"}
          />
        ))}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" type="submit">
            Додати
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Скасувати
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddCarPage;
