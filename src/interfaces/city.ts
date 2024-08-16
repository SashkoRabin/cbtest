export default interface ICity {
	name: string;
	lat: number;
	lon: number;
};

export interface ICityList {
  main: {
    temp: number,
    temp_max: number,
    temp_min: number,
  },
  weather: [{
    description: string,
    main: string,
    icon: string
  }]
}
