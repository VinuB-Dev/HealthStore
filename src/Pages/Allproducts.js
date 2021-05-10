import "../styles.css";
import Filter from "../components/Filter/Filter";
import Product from "../components/Product/Product";
import { useCart } from "../context/dataContext";

export default function AllProducts() {
  const { filteredData } = useCart();
  return (
    <div>
      <div className="filter-space">
        <Filter />
      </div>
      <div className="grid">
        <Product value={filteredData} />
      </div>
    </div>
  );
}
