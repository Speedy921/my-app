import React, { Component } from "react";

interface CoctailsState {
  error: any;
  isLoaded: boolean;
  items: Array<{ name: string; strDrink: string }>;
}

export default class Coctails extends Component<{}, CoctailsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.drinks,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p>Error {error.message}</p>;
    } else if (!isLoaded) {
      return <p>Loading....</p>;
    } else {
      return (
        <ul>
          {items.map((item) => (
            <li key={item.name}>{item.strDrink}</li>
          ))}
        </ul>
      );
    }
  }
}
