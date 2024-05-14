import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const shoowCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending...",
          title: "sending...",
          message: "Sending cart data!",
        })
      );
      const res = await fetch(
        "https://expense-tracker-real-time-data-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!res.ok) {
        throw new Error("Sending cart data failed!!");
      }

      dispatch(
        uiActions.showNotification({
          status: "Success",
          title: "Success!",
          message: "Sent cart data successfully !!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed !!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {shoowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
