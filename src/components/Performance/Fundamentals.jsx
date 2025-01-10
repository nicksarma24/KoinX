import { IoMdInformationCircle } from "react-icons/io";
import { H3 } from "../shared/Typography";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  PositiveTrend,
  formatDateAllTime,
  formattedNum,
} from "../../utils/index";

const Fundamentals = () => {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/search/trending");
        const data = await response.json();
        setCoinData(data?.coins || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!coinData || coinData.length === 0) {
    return <div>No coin data available</div>;
  }

  const coin = coinData[1];

  const {
    price,
    low_24h,
    high_24h,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    market_cap,
    total_volume,
    market_cap_rank,
    total_market_cap,
  } = coin?.item?.data || {};

  const marketCapDominance = "0.67";
  const volumeMarketCapRatio = market_cap && total_volume ? total_volume / market_cap : 0;

  return (
    <>
      <span className="inline-flex items-center gap-2">
        <H3 value="Fundamentals" />
        <IoMdInformationCircle
          className="text-slate-500 size-5 cursor-pointer"
          title="fundamentals"
        />
      </span>

      <div className="flex md:gap-20 justify-between flex-wrap md:flex-nowrap">
        <div className="grid-row-5 grid grid-cols-1 max-w-md w-full font-semibold">
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            Price
            <span className="text-black text-right">
              ${price.toFixed(4)}
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            24h Low / 24h High
            <span className="text-black text-right">
              {` $$16,300/$/16,800`}
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            All Low / All High
            <span className="text-black text-right">
              {` $$16,300/$/16,800`}
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            Trading Volume
            <span className="text-black text-right">
              {"$20,400,720"}
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            Market Cap Rank
            <span className="text-black text-right">
              {"#3"}
            </span>
          </div>
        </div>
        <div className="grid-row-5 grid grid-cols-1 max-w-md w-full font-semibold">
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            Market Cap
            <span className="text-black text-right">
              ${market_cap}
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            Market Cap Dominance
            <span className="text-black text-right">
              {marketCapDominance}%
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between">
            Volume / Market Cap
            <span className="text-black text-right">
              {"0.081"}
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between items-center">
            All Time High
            <span className="flex flex-col">
              <span className="text-black text-right flex justify-end gap-2">
                ${ath?.toFixed(2)}
                <span
                  className={clsx(
                    PositiveTrend(ath_change_percentage)
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {ath_change_percentage?.toFixed(2)}%
                </span>
              </span>
              <span className="text-black text-right text-xs">
                {formatDateAllTime(ath_date)}
              </span>
            </span>
          </div>
          <div className="text-slate-600/80 text-sm py-3 border-b-slate-700/20 border-b-2 flex justify-between items-center">
            All Time Low
            <span className="flex flex-col">
              <span className="text-black text-right flex justify-end gap-2">
                ${atl?.toFixed(2)}
                <span
                  className={clsx(
                    PositiveTrend(atl_change_percentage)
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {atl_change_percentage?.toFixed(2)}%
                </span>
              </span>
              <span className="text-black text-right text-xs">
                {formatDateAllTime(atl_date)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fundamentals;
