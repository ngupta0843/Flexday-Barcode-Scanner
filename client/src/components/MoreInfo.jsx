import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { Search } from "@mui/icons-material";
import Ingredients from "./details/Ingredients";
import { sendProductdata, getIngredients } from "../Routes";
import { BarcodeContext } from "./contexts/Barcodecontext";
import { UPCcontext } from "./contexts/UPCcontext";

const fetchNutritionData = async (ingredient, weight) => {
  try {
    const response = await getIngredients({ ingredient, weight });
    console.log(response.data);
    return response.data.data;
  } catch (error) {}
};

//NLEA labelling - How labeling is done
const calculateHealthScore = (nutrientData) => {
  let score = 0;
  const factor = 100 / nutrientData?.totalWeight;

  score += nutrientData?.totalNutrients?.SUGAR?.quantity * factor < 5 ? 1 : -1;
  score += nutrientData?.totalNutrients?.NA?.quantity * factor < 140 ? 1 : -1;
  score += nutrientData?.totalNutrients?.FIBTG?.quantity * factor > 5 ? 1 : 0;
  score += nutrientData?.totalNutrients?.FASAT?.quantity * factor < 3 ? 1 : -1;
  score +=
    !nutrientData?.totalNutrients?.FATRN ||
    nutrientData?.totalNutrients?.FATRN?.quantity === 0
      ? 1
      : -1;
  score += nutrientData?.totalNutrients?.CHOLE?.quantity * factor < 20 ? 1 : -1;
  score +=
    nutrientData?.totalNutrients?.PROCNT?.quantity * factor >= 10 ? 1 : 0;
  score +=
    nutrientData?.totalNutrients?.ENERC_KCAL?.quantity * factor < 200 ? 1 : -1;

  return score;
};

export default function MoreInfo() {
  const { ingredients, setIngredients } = useContext(BarcodeContext);
  const [productInfo, setProductInfo] = useState(null);
  const {upc, setUpc} = useContext(UPCcontext);

  const isHealthy = (product) => {
    const ingredientsWithWeights = getIngredientWeights(product);
    Promise.all(
      ingredientsWithWeights.map((item) =>
        fetchNutritionData(item.name, item.weight)
      )
    ).then((results) => {
      const healthStatuses = results.map((data) => {
        const score = calculateHealthScore(data);
        return {
          label: data.ingredients[0].text,
          isHealthy: score >= 4,
        };
      });
      setIngredients(healthStatuses);
    });
  };

  const getIngredientWeights = (product) => {
    const servingInt = parseInt(
      product.serving_size.match(/\((\d+\.?\d*)\s*(\w+)\)/)[1],
      10
    );
    const unit = product.serving_size.match(/\((\d+\.?\d*)\s*(\w+)\)/)[2];
    const totalVolume = servingInt * product.serving_quantity;
    return product.ingredients.map((ingredient) => ({
      name: ingredient.text,
      weight:
        ((ingredient.percent_estimate / 100) * totalVolume).toFixed(2) +
        " " +
        unit,
    }));
  };

  const handleDetectedBarcode = async (barcode) => {
    try {
      const response = await sendProductdata({ barcode });
      console.log(response);
      const product = response.data.data;
      if (product) {
        console.log(product);
        isHealthy(product);
        console.log("running");
        setProductInfo(product);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (upc){
      handleDetectedBarcode(upc);
    }
  }, [upc])

  return (
    <Card sx={{ borderRadius: 3, padding: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            mb: 1,
          }}
        >
          {!productInfo && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                value={upc}
                onChange={(e) => {
                  setUpc(e.target.value);
                  upc && handleDetectedBarcode(upc);
                }}
                placeholder="Or enter manually"
                size="small"
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => handleDetectedBarcode(upc)}
              >
                <Search />
              </Button>
            </Box>
          )}
          {productInfo && (
            <Typography variant="h5" component="h2">
              {productInfo.product_name}
            </Typography>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        {productInfo && (
          <Ingredients productInfo={productInfo} ingredients={ingredients} />
        )}
      </CardContent>
    </Card>
  );
}
