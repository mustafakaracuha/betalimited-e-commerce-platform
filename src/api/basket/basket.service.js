import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getMyBasketProducts = async () => {
  return await axios
    .get(API_URL + `/view-cart`, {
      headers: {
        "Session-Id": sessionStorage.getItem("Session-ID"),
      },
    })
    .then((response) => {
      return response.data;
    });
};

// export const addMyBasketProducts = async (product) => {
//   const {id , quantity } = product

//   return await axios
//     .post(
//       API_URL + `/add-to-cart?id=${id}`, quantity,
//       {
//         headers: {
//           "Session-Id": sessionStorage.getItem("Session-ID"),
//         },
//       }
//     )
//     .then((response) => {
//       return response.data;
//     });
// };

export const addMyBasketProducts = async (product) => {
  const { id, quantity } = product;

  try {
    for (let i = 0; i < quantity; i++) {
      await axios.post(
        `${API_URL}/add-to-cart?id=${id}`,
        {},
        {
          headers: {
            "Session-Id": sessionStorage.getItem("Session-ID"),
          },
        }
      );
    }

    return { success: true, message: "Ürünler sepete eklendi." };
  } catch (error) {
    console.error("Hata oluştu:", error);
    throw error;
  }
};


export const deleteMyBasketProducts = async (id) => {
  return await axios
    .post(
      API_URL + `/subtract-from-cart?id=${id}`,
      {},
      {
        headers: {
          "Session-Id": sessionStorage.getItem("Session-ID"),
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};
