const API_KEY = "DEMO_KEY",
  API_URL = `https://pomber.github.io/covid19/timeseries.json`;
let contries = [];
let corona = [];
export const getData = () => {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const { ...corona } = data;
      //   console.log(corona);
      const temp = Object.entries(corona).map(([country, res]) => {
        // console.log(res[index]);
        return {
          country: country,
          cases: res,
          //   confirmed: res[index].confirmed,
          //   deaths: res[index].deaths,
          //   recoverd: res[index].recovered,
        };
      });
      //   console.log(typeof temp);
      console.log(temp);

      //   //   const { country, ...coronaData } = data;
      //   //   console.log(data.Tanzania);
      //   const temp = Object.entries(data).map(([country, data, index]) => {
      //     return {
      //       country,
      //       data,
      //     };
      //   });

      //   temp.forEach((result, index) => {
      //     // const contri = value.country;
      //     // const results = value[index];
      //     console.log(result[index], result[index]);
      //     // contries.push(result.country[0]);
      //     // corona.push(result.data[0]);
      //   });
      //   //   console.log(temp[0]);
      //   //   console.log(contries);
      //   //   console.log(corona);
    });
};
