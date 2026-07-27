import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface SubjectLevelChartProps {
  categories: string[];
  series: { name: string; data: number[] }[];
  colors: string[];
  loading: boolean;
  error: string | null;
}

export default function SubjectLevelChart({
  categories,
  series,
  colors,
  loading,
  error,
}: SubjectLevelChartProps) {
  if (loading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Đang tải biểu đồ...
      </p>
    );
  }

  if (error) {
    return <p className="text-sm text-error-500">{error}</p>;
  }

  if (categories.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Chưa có dữ liệu thống kê.
      </p>
    );
  }

  const options: ApexOptions = {
    colors,
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'bar',
      height: 420,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Số lượng thí sinh',
      },
      labels: {
        formatter: (value: number) => `${Math.round(value)}`,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Outfit',
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} thí sinh`,
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[900px]">
        <Chart options={options} series={series} type="bar" height={420} />
      </div>
    </div>
  );
}
