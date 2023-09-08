# Documentation
This project consists in a view Home.vue who has two tabs, the first for PokeApi exercise and second for Coupons exercise

## PokeApi
The PokeApi component show a list of pokemon obtained throug an API called it for get the pokemons in the page in the screen.
When you click in a Pokemon in the table, it show the data (name and image) on the right part of the screen, if you click n the image you the app adds 1 to the Total of clicks displayed below the image, if you change the pokemon it will restart the total of clicks of the pokemon, but no the total of clicks overall.

### Coupons
The Coupons component read the "coupons.json" file and displays the specified data on the screen with charts.
The screen has a selector where you can choose between displaying all data or the data for a specific retailer.
Below this selector the screen has 3 panels that display the following data in inputs and on a chart:
1. The quantity of coupons by type.
2. The total of coupons, along with the minimum, maximum and average discount for "percent-off" coupons.
3. The total of coupons, along with e minimum, maximum and average discount for "dollar-off" coupons.
