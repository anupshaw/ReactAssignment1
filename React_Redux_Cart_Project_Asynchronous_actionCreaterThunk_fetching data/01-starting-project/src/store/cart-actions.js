import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://expensetracker-e406b-default-rtdb.firebaseio.com/cart1.json"
      );

      const data = await response.json();
      console.log(data);
      console.log(response);
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      //   const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      let items=[];
      let totalQuantity=0;
      if(cartData)
      {
        items=cartData.items;
        totalQuantity=cartData.totalQuantity;
        console.log('bye')
      }
      console.log("Hi",cartData);

      dispatch(
        cartActions.replaceCart({
          items: items ,
          totalQuantity: totalQuantity,
        })
      );
    } catch (error) {
      console.log("errora", error.message);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://expensetracker-e406b-default-rtdb.firebaseio.com/cart1.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sending cart successfully",
        })
      );
    };

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart failed!",
        })
      );
    }
  };
};
