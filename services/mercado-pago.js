import { MP_ACCESS_TOKEN } from "./config";

export const handleIntegrationMP = async (suscriptionData) => {
  const { price } = suscriptionData;
  const preferencia = {
    items: [
      {
        title: "Suscripción a Despierta Tu Alma Universal",
        description: "Suscripción a Despierta Tu Alma Universal",
        picture_url: "",
        category_id: "suscripcion",
        quantity: 1,
        currency_id: "$",
        unit_price: price,
      },
    ],
    back_urls: {
      success: "despiertatualmauniversal://SuscriptionSuccess",
    },
    auto_return: "approved",
  };

  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencia),
      }
    );

    const data = await response.json();
    return data.init_point;
  } catch (error) {
    console.log(error);
  }
};
