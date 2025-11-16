import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TempEr({ balance, setBalance, onNegativeChange }) {
  const [portfolioData, setPortfolioData] = useState([]);
  const [latestPercentChange, setLatestPercentChange] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNextDay = async () => {
    setLoading(true);

    // Optimistic update
    const lastPercent = portfolioData.length > 0
      ? portfolioData[portfolioData.length - 1].percentChange
      : 0;
    setPortfolioData(prev => [
      ...prev,
      { date: `Day ${prev.length + 1}`, percentChange: lastPercent }
    ]);

    try {
      const res = await fetch("http://localhost:8000/next_day");
      const json = await res.json();

      if (json.status === "success") {
        const totalPercent = json.user_stocks.length > 0
          ? json.user_stocks.reduce((sum, stock) => sum + stock.total_percent_change, 0) / json.user_stocks.length
          : 0;
        const totalBalance = json.user_stocks.reduce((sum, stock) => sum + stock.current_value, 0);

        setPortfolioData(prev => {
          const newArr = [...prev];
          newArr[newArr.length - 1] = { date: json.new_date, percentChange: totalPercent };
          return newArr;
        });

        // Update the SHARED balance
        setBalance(totalBalance);
        setLatestPercentChange(totalPercent);
        
        // If percent change is negative, trigger asteroid movement
        if (totalPercent < 0) {
          onNegativeChange();
        }
      } else {
        alert(json.message || "No more days available");
      }
    } catch (err) {
      console.error("Error fetching next day:", err);
      // Demo mode fallback
      const randomChange = (Math.random() - 0.5) * 10;
      setPortfolioData(prev => {
        const newArr = [...prev];
        const lastData = prev[prev.length - 1];
        const newPercent = (lastData?.percentChange || 0) + randomChange;
        newArr[newArr.length - 1] = { 
          date: `Day ${prev.length}`, 
          percentChange: newPercent 
        };
        return newArr;
      });
      // Update the SHARED balance in demo mode too
      setBalance(prev => prev + randomChange * 10);
      const finalPercent = (portfolioData[portfolioData.length - 1]?.percentChange || 0) + randomChange;
      setLatestPercentChange(finalPercent);
      
      // If percent change is negative, trigger asteroid movement
      if (finalPercent < 0) {
        onNegativeChange();
      }
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const data = {
    labels: portfolioData.map(d => d.date),
    datasets: [
      {
        label: "Portfolio % Change",
        data: portfolioData.map(d => d.percentChange),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Portfolio Percent Change Over Time' }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: '%' } },
      x: { title: { display: true, text: 'Date' } }
    }
  };

  return (
    <div style={{ padding: "20px", background: "white", borderBottom: "2px solid #ddd" }}>
      <h1 style={{ textAlign: "center", margin: "10px 0" }}>
        Portfolio: ${balance.toFixed(2)}{" "}
        {latestPercentChange > 0 ? "▲" : latestPercentChange < 0 ? "▼" : ""}
        {latestPercentChange !== 0 && (
          <span style={{ 
            fontSize: "18px", 
            marginLeft: "10px", 
            color: latestPercentChange > 0 ? "green" : "red" 
          }}>
            ({latestPercentChange.toFixed(2)}%)
          </span>
        )}
      </h1>
      
      {portfolioData.length > 0 ? (
        <div style={{ width: '80%', maxWidth: '800px', margin: '20px auto', height: '300px' }}>
          <Line data={data} options={options} />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666", margin: "20px 0" }}>
          Click "Next Day" to start tracking your portfolio
        </p>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleNextDay}
          disabled={loading}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            background: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Loading..." : "Next Day +"}
        </button>
      </div>
    </div>
  );
}