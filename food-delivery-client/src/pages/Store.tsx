import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Store } from "../interfaces/store";
import { StoreInfo } from "../components/StoreInfo";
import { IoArrowBack } from "react-icons/io5";

export function StorePage() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const navigate = useNavigate();
  const { stores } = useAppSelector((state) => state.stores);

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
  }, [id]);

  return (
    store && (
      <div>
        <Link to="/" className="text-reset">
          <IoArrowBack className="fs-3 mb-3" />
        </Link>
        <StoreInfo store={store} />
      </div>
    )
  );
}
