interface RawData {
  timestamp: number;
  field1: any;
  field2: any;
  price: number;
}

interface FormattedData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    fill: boolean;
  }[];
}

export const formatData = (data: RawData[]): FormattedData => {
  let finalData: FormattedData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
    ],
  };

  let dates = data.map((val) => {
    const ts: number = val.timestamp;
    let date = new Date(ts * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let final = `${month}-${day}-${year}`;
    return final;
  });

  let priceArr = data.map((val) => {
    return val.price;
  });

  priceArr.reverse();
  dates.reverse();
  finalData.labels = dates;
  finalData.datasets[0].data = priceArr;

  return finalData;
};
