import { useState } from "react";

import SearchBar from "../components/hierarchy/SearchBar";
import Loader from "../components/common/Loader";

import { getHierarchy } from "../services/hierarchyService";
import AgentCard from "../components/hierarchy/AgentCard";
import HierarchyTable from "../components/hierarchy/HierarchyTable";

const Home = () => {
  const [salesCode, setSalesCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [data, setData] = useState<any>(null);
  const [environment, setEnvironment] = useState("dev");



  const clearResult = () => {
    setData(null);
    setError("");
  };
  const handleSearch = async () => {
    setError("");

    if (!salesCode.trim()) {
      setData(null);
      setError("Sales Code is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await getHierarchy(
        salesCode,
        environment
      );

      if (response.success) {
        setData(response.data);
        setError("");
      } else {
        setData(null);
        setError(response.message);
      }
    } catch (err: any) {
      setData(null);
      //setError("Unable to connect to server.");
      const errorMessage =
        err?.response?.data?.message || "Unable to connect to server.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <SearchBar
        salesCode={salesCode}
        setSalesCode={setSalesCode}
        onSearch={handleSearch}
        loading={loading}
        clearResult={clearResult}
        environment={environment}
        setEnvironment={setEnvironment}
      />

      {error && (
        <div className="mt-6 bg-red-500 text-white p-4 rounded-xl text-center shadow-lg">
          {error}
        </div>
      )}

      {loading && <Loader />}


      {data &&

        <>

          <AgentCard

            data={data}

          />

          <HierarchyTable

            data={data}

          />

        </>

      }

    </div>
  );
};

export default Home;