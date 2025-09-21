import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import CarPage from "./components/pages/CarPage";
import AddCarPage from "./components/pages/AddCarPage";
import EditCarPage from "./components/pages/EditCarPage";

const defaultCars   = [
  { id: 1, name: "Model S", manufacturer: "Tesla", year: 2021, volume: 2.0, price: 79999, color: "White", description: "Електричний седан", image: "https://www.formulaimports.com/imagetag/2819/main/l/Used-2022-Tesla-Model-S-PLAID-VOSSEN-WHEELS-CARBON-FIBER-AUTOPILOT-WHITE-INTERIOR-1677075553.jpg" },
  { id: 2, name: "Corolla", manufacturer: "Toyota", year: 2019, volume: 1.8, price: 20000, color: "Silver", description: "Надійний компактний автомобіль", image: "https://cdn4.riastatic.com/photosnew/auto/photo/toyota_corolla__540610839f.jpg" },
  { id: 3, name: "Civic", manufacturer: "Honda", year: 2020, volume: 2.0, price: 22000, color: "Black", description: "Спортивний компактний автомобіль", image: "https://cdn0.riastatic.com/photosnew/auto/photo/honda_civic__611078745f.jpg" },
  { id: 4, name: "Mustang", manufacturer: "Ford", year: 2022, volume: 5.0, price: 55000, color: "Red", description: "Культовий мускул-кар", 
    image: "https://cdn4.riastatic.com/photosnew/auto/photo/ford_mustang__608244149bx.jpg" },
  { id: 5, name: "X5", manufacturer: "BMW", year: 2021, volume: 3.0, price: 60000, color: "Blue", description: "Розкішний позашляховик", 
    image: "https://cdn0.riastatic.com/photos/ir/new/auto/photo/bmw_x5__614616315-620x415x70.jpg" },
  { id: 6, name: "A6", manufacturer: "Audi", year: 2020, volume: 2.0, price: 45000, color: "Gray", description: "Представницький седан", 
    image: "https://cdn2.riastatic.com/photosnew/auto/photo/audi_a6__574444137f.jpg" },
  { id: 7, name: "Camaro", manufacturer: "Chevrolet", year: 2022, volume: 6.2, price: 62000, color: "Yellow", description: "Американський мускул-кар", 
    image: "https://cdn1.riastatic.com/photosnew/auto/photo/chevrolet_camaro__571432461f.jpg" },
  { id: 8, name: "Panamera", manufacturer: "Porsche", year: 2021, volume: 4.0, price: 90000, color: "White", description: "Розкішний спортивний седан", 
    image: "https://cdn2.riastatic.com/photosnew/auto/photo/porsche_panamera__590103392bx.jpg" },
  { id: 9, name: "CX-5", manufacturer: "Mazda", year: 2019, volume: 2.5, price: 30000, color: "Black", description: "Популярний кросовер", 
    image: "https://cdn.riastatic.com/photosnewr/auto/new_auto_storage/mazda-cx-5__2621638-620x465x70.jpg" }
];


function App() {
  const [cars, setCars] = useState(() => {
    const stored = localStorage.getItem("cars");
    return stored ? JSON.parse(stored) : defaultCars;
  });

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  const handleAddCar = (newCar) => {
    const id = cars.length ? Math.max(...cars.map(c => c.id)) + 1 : 1;
    setCars([...cars, { ...newCar, id }]);
  };

  const handleUpdateCar = (updatedCar) => {
    setCars(cars.map(c => (c.id === updatedCar.id ? updatedCar : c)));
  };

  const handleDeleteCar = (id) => {
    setCars(cars.filter(c => c.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <CarPage cars={cars} onDelete={handleDeleteCar} />
          }
        />
        <Route
          path="/add"
          element={<AddCarPage onAdd={handleAddCar} />}
        />
        <Route
          path="/edit/:id"
          element={<EditCarPage cars={cars} onUpdate={handleUpdateCar} />}
        />
      </Routes>
    </Router>
  );
}

export default App;