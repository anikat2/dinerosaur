import React, { useState } from "react";

// Sample companies for now; later you can fetch from an API
const sampleCompanies = [
  { name: "Apple", ticker: "AAPL" },
  { name: "Tesla", ticker: "TSLA" },
  { name: "Microsoft", ticker: "MSFT" },
  { name: "Amazon", ticker: "AMZN" },
  { name: "Google", ticker: "GOOGL" },
  { name: "Netflix", ticker: "NFLX" },
];

function InvestmentBox({ onInvest }) {
  const [search, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const filteredCompanies = sampleCompanies.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase()) ||
    company.ticker.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvest = (company) => {
    if (!selectedCompanies.find(c => c.ticker === company.ticker)) {
      setSelectedCompanies([...selectedCompanies, company]);
      if (onInvest) onInvest(company);
    }
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      width: "300px",
      height: "400px",
      padding: "10px",
      overflowY: "auto"
    }}>
      <h3>Invest in Companies</h3>

      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "5px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />

      {filteredCompanies.map(company => (
        <div key={company.ticker} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 0",
          borderBottom: "1px solid #eee"
        }}>
          <span>{company.name} ({company.ticker})</span>
          <button
            onClick={() => handleInvest(company)}
            disabled={selectedCompanies.find(c => c.ticker === company.ticker)}
            style={{ padding: "3px 8px", borderRadius: "4px", cursor: "pointer" }}
          >
            Invest
          </button>
        </div>
      ))}

      {selectedCompanies.length > 0 && (
        <div style={{ marginTop: "15px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
          <h4>Your Investments:</h4>
          <ul>
            {selectedCompanies.map(c => (
              <li key={c.ticker}>{c.name} ({c.ticker})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InvestmentBox;
