import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { categories, products } from './common/constants';
import { totalPrice } from './common/common';
import { AuthContext } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const darkPalette = [
  "#011f4b", // dark
  "#03396c",
  "#005b96",
  "#6497b1",
  "#b3cde0", // light
]

const lightPalette = [
  "#484b6a", // dark
  "#9394a5",
  "#d2d3db",
  "#e4e5f1",
  "#fafafa", // light
]

export function GetDoughnut() {
  const { theme } = useContext(AuthContext);
  const getTotalForCategory = (category) => totalPrice(products.filter(item =>item.category === category));

  const dataPie = {
    labels: categories,
    datasets: [
      {
        label: '# of Votes',
        data: [
          getTotalForCategory('meat'),
          getTotalForCategory('dairy'),
          getTotalForCategory('vegetables'),
          getTotalForCategory('fat'),
          getTotalForCategory('seafood'),
          getTotalForCategory('drinks'),
          getTotalForCategory('berry'),
          getTotalForCategory('house staff'),
          getTotalForCategory('sweeties'),
          getTotalForCategory('fastfood'),
          getTotalForCategory('fruits'),
        ],
        backgroundColor: theme === 'light' ? lightPalette : darkPalette,
        // borderColor: [
        //   '#dd3313',
        //   '#00a3ce',
        //   '#167a17',
        //   '#de8d0d',
        //   '#0d89de',
        //   '#820dde',
        //   '#de0da2',
        //   '#726b70',
        //   '#f156a3',
        //   'red',
        //   'pink',
        // ],
        borderWidth: 1,
      },
    ],
  };

  return <div style={{ width: '385px', height: '385px' }}>
    <Doughnut
      data={dataPie}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Spend money:",
            font: {
              size: 18,
              family: 'Righteous',
            },
            color: theme === 'light' ? "#243949" : "#fff",
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              font: {
                size: 18,
                family: 'Righteous',
              },
              color: theme === 'light' ? "#243949" : "#fff",
            }
          }
        }
      }}
    />
  </div>;
}
