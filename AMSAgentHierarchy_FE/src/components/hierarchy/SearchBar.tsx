interface Props {
  salesCode: string;
  setSalesCode: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
  clearResult: () => void;

  environment: string;
  setEnvironment: (value: string) => void;
}

const SearchBar = ({
  salesCode,
  setSalesCode,
  onSearch,
  loading,
  clearResult,
  environment,
  setEnvironment,
}: Props) => {
  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

        {/* Environment */}

        <div className="md:col-span-3">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Environment{" "}
            <span className="text-red-600">(Dev/Test)</span>
          </label>

          <select
            value={environment}
            onChange={(e) => { setEnvironment(e.target.value); clearResult(); }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dev">Development</option>
            <option value="test">Testing</option>
          </select>

        </div>

        {/* Sales Code */}

        <div className="md:col-span-6">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search by Sales Code
          </label>

          <input
            type="text"
            value={salesCode}
            onChange={(e) => {
              setSalesCode(e.target.value.toUpperCase());
              clearResult();
            }}
            placeholder="Enter Sales Code"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Search Button */}

        <div className="md:col-span-3">

          <button
            onClick={onSearch}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "🔍 Search"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default SearchBar;