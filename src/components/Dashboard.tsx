import React from 'react';
import CasesLineGraph from './CasesLineGraph';
import CovidMap from './CovidMap';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-6 p-4">
      <CasesLineGraph />
      <CovidMap />
    </div>
  );
};

export default Dashboard;
