import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="box box1">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box3">
        <TopBox />
      </div>
      <div className="box box4">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box6">
        <BigChartBox />
      </div>
      <div className="box box7">
        <BarChartBox {...barChartBoxVisit} />
      </div>
    </div>
  );
};

export default Dashboard;
