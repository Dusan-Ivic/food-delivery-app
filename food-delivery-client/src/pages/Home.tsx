import stores from "../data/dummyStores.json";
import { StoreList } from "../components/StoreList";

export function Home() {
  return (
    <div>
      <h1 className="text-center mt-3 mb-4">Stores</h1>
      <StoreList stores={stores} />
    </div>
  );
}
