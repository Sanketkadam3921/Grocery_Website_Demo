import { Box } from "@mui/material";
import ProductHeader from "./ProductHeader";
import PriceSection from "./PriceSection";
import ProductDescription from "./ProductDescription";
import StockInfo from "./StockInfo";
import QuantitySelector from "./QuantitySelector";
import TotalPrice from "./TotalPrice";
import AddToCartButton from "./AddToCartButton";

const ProductDetailsSection = ({
  product,
  hasDiscount,
  discountPercentage,
  stock,
  isOutOfStock,
  quantity,
  onQuantityChange,
  maxQuantity,
  onAddToCart,
}) => {
  return (
    <Box
      sx={{
        flex: { xs: "0 0 auto", md: "1 1 0" },
        width: { xs: "100%", md: "50%" },
        display: "flex",
        flexDirection: "column",
        maxHeight: { xs: "none", md: "650px" },
        overflow: { xs: "visible", md: "visible" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.25, sm: 1.5 },
          height: "100%",
          overflowY: { xs: "visible", md: "visible" },
          overflowX: "hidden",
          pr: { xs: 0, md: 1 },
        }}
      >
        <ProductHeader name={product.name} category={product.category} />

        <PriceSection
          price={product.price}
          mrp={product.mrp}
          unit={product.unit}
          hasDiscount={hasDiscount}
          discountPercentage={discountPercentage}
        />

        <ProductDescription
          description={product.description}
          name={product.name}
        />

        <StockInfo stock={stock} isOutOfStock={isOutOfStock} />

        <QuantitySelector
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          maxQuantity={maxQuantity}
          isOutOfStock={isOutOfStock}
        />

        <TotalPrice price={product.price} quantity={quantity} />

        <AddToCartButton
          onAddToCart={onAddToCart}
          isOutOfStock={isOutOfStock}
          disabled={!product}
        />
      </Box>
    </Box>
  );
};

export default ProductDetailsSection;


