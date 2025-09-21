import { Card, CardContent, Typography, CardMedia, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CarCard = ({ car, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image={car.image || "https://via.placeholder.com/400x250.png?text=No+Image"}
        alt={car.name}
        sx={{
          height: 200,
          objectFit: "cover",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" fontWeight="bold" sx={{ color: "primary.main" }}>
          {car.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"><b>Виробник:</b> {car.manufacturer}</Typography>
        <Typography variant="body2" color="text.secondary"><b>Рік:</b> {car.year}</Typography>
        <Typography variant="body2" color="text.secondary"><b>Об'єм:</b> {car.volume} L</Typography>
        <Typography variant="body2" color="text.secondary"><b>Ціна:</b> ${car.price}</Typography>
        <Typography variant="body2" color="text.secondary"><b>Колір:</b> {car.color}</Typography>
        {car.description && (
          <Box mt={1}>
            <Typography variant="body2" color="text.secondary">{car.description}</Typography>
          </Box>
        )}
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          p: 1,
        }}
      >
        <Tooltip title="Редагувати">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEdit(car.id)}
            aria-label="edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Видалити">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(car.id)}
            aria-label="delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      </CardContent>
    </Card>
  );
};

export default CarCard;
