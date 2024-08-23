import { Link } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

// Componente ExpandableCell para manejar contenido expandible en celdas
const ExpandableCell = ({ value }) => {
  const [expanded, setExpanded] = useState(false);

  // Asegúrate de que el valor es una cadena, si no, utiliza una cadena vacía
  const displayValue = typeof value === "string" ? value : "";

  return (
    <div>
      {expanded ? displayValue : displayValue.slice(0, 70)}&nbsp;
      {displayValue.length > 70 && (
        <Link
          type="button"
          component="button"
          sx={{ fontSize: "inherit" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos" : "... Ver más"}
        </Link>
      )}
    </div>
  );
};

ExpandableCell.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ExpandableCell;