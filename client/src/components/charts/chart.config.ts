import { ApexOptions } from 'apexcharts';

export const TotalRevenueSeries = [
  // {
  //   name: 'Done',
  //   data: [95, 84, 72, 44],
  // },
  // {
  //   name: 'Pending',
  //   data: [108, 108, 47],
  // },
  {
    name: 'Done',
    data: [95, 84, 72, 44, 0, 0, 0],
    fillColor: '#475BE8',
  },
  {
    name: 'Pending',
    data: [0, 0, 0, 0, 108, 108, 47],
    fillColor: '#a9a9a9',
  },
];

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: [
    '#475BE8',
    '#a9a9a9',
  ],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
      distributed: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: ['First payment', 'Registration', 'Q3 \'23', 'Q4 \'23', 'Q1 \'24', 'Q2 \'24', 'Q3 \'24'],
  },
  yaxis: {
    title: {
      text: '₹ (Rupees)',
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `₹ ${val} Rupees`;
      },
    },
  },
};