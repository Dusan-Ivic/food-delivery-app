import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getProductsByStore,
  clearProducts,
} from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Store } from "../interfaces/store";
import { StoreInfo } from "../components/StoreInfo";
import { IoArrowBack } from "react-icons/io5";
import { ProductList } from "../components/ProductList";

export function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { stores } = useAppSelector((state) => state.stores);
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    const numberId = Number(id);

    if (!numberId) {
      console.error("Invalid  id");
      navigate("/");
    } else {
      const storeData = stores.find((x) => x.id === numberId);
      if (storeData == null) {
        console.error("Store not found");
        navigate("/");
      } else {
        setStore(storeData);
      }
    }

    return () => {
      dispatch(clearProducts());
    };
  }, [id]);

  useEffect(() => {
    if (store) {
      dispatch(getProductsByStore(store.id));
    }
  }, [store]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    store && (
      <>
        <div className="mb-4">
          <Link to="/" className="text-reset">
            <IoArrowBack className="fs-3 mb-3" />
          </Link>
          <StoreInfo store={store} />
        </div>
        <ProductList products={products} />
      </>
    )
  );
}
