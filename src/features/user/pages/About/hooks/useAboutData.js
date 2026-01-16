// Data hook for About page - returns data objects without JSX

export const useAboutData = () => {
  // Categories data
  const categories = [
    {
      iconName: "Restaurant",
      iconSize: 48,
      title: "Fresh Fruits & Vegetables",
      description: "Farm-fresh produce delivered daily to your doorstep",
    },
    {
      iconName: "BakeryDining",
      iconSize: 48,
      title: "Dairy & Bakery",
      description: "Fresh dairy products and freshly baked goods",
    },
    {
      iconName: "Kitchen",
      iconSize: 48,
      title: "Staples & Pantry Essentials",
      description: "All your kitchen essentials in one place",
    },
    {
      iconName: "LocalCafe",
      iconSize: 48,
      title: "Snacks & Beverages",
      description: "Wide variety of snacks and refreshing beverages",
    },
  ];

  // Features data
  const features = [
    {
      iconName: "Restaurant",
      iconSize: 40,
      title: "Farm-fresh quality",
      description: "We source directly from trusted farmers and suppliers",
    },
    {
      iconName: "LocalShipping",
      iconSize: 40,
      title: "Fast & reliable delivery",
      description: "Quick delivery within 24-48 hours of your order",
    },
    {
      iconName: "Security",
      iconSize: 40,
      title: "Secure payments",
      description: "Multiple secure payment options for your convenience",
    },
    {
      iconName: "SupportAgent",
      iconSize: 40,
      title: "Customer-first support",
      description: "24/7 customer support to assist you anytime",
    },
  ];

  // How it works steps
  const steps = [
    {
      number: "1",
      iconName: "ShoppingCart",
      iconSize: 32,
      title: "Browse groceries",
      description: "Explore our wide range of fresh products",
    },
    {
      number: "2",
      iconName: "ShoppingCart",
      iconSize: 32,
      title: "Add to cart",
      description: "Select your favorite items and add them to cart",
    },
    {
      number: "3",
      iconName: "CheckCircle",
      iconSize: 32,
      title: "Place order",
      description: "Complete your order with secure payment",
    },
    {
      number: "4",
      iconName: "LocalShipping",
      iconSize: 32,
      title: "We deliver fresh to your door",
      description: "Get fresh groceries delivered right to your doorstep",
    },
  ];

  return {
    categories,
    features,
    steps,
  };
};
