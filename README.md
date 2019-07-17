# Protein Dashboard

This was my next project for code institute. This was an interactive project, in which I chose to focus on creating a data dashboard. The data is based around how much different people chose to spend on protein supplements, and which company this was spent with.

## Technologies Used

* HTML
* CSS
* Bootstrap
* Javascript
* D3.js
* DC.js

## UX/UI

The user is instantly shown the dashboard, which is fully interactive. You can choose and select different cells, aswell as choosing which year you would like to see data from, if not viewing all years.

Each chart has its own tooltip which is marked with :information_source:, to better help the user identify which chart does what in particular.

## Pages

### Dashboard
  * This page was the main focus of this project. This shows all the charts and will have all the functionality of choosing data and seeing the results. With the select box at the top right of the page, you can choose to view all data, or select a year to view specific results.

### Results
  * Here I detail the results of the dashboard, and what each chart shows. I briefly explain each chart and what the data represents.
  
### Data
  * This page simply shows the raw data from the dashboard. I have listed this out in a bootstrap table, so the user, should they wish to see it, can read all the data in text form rather than a dashboard.
  
### Help
  * This is not a page in itself. In fact, this would be a bootstrap modal which the user can call at any time should they need a little extra guidance or help when using the dashboard.
  
# Testing & Bugs

### Testing

With alot of data being used to display the charts, I first tested this on single lines of results to ensure I could in fact display the charts as I expected. I had different data which I was originally going to use, however this would not of worked well in chart form. In the end, I chose the below 4 charts/data, as I thought this would best represent the charts as a whole:
 * Company where the supplements were ordered from
 * Gender who purchased
 * Average spend per company
 * Correlation between Age and how much you spend

### Bugs

At first I could not get the data to sync with my project from an external file. I kept all testing with a local file, however needed to research further on D3.js and DC.js to ensure I could store all data in a separate file, and this to come through to the dashboard.

# Deployment

The final version of the project was deployed to Github.com using its free hosting feature “GitHub Pages” and can be viewed live [here](https://horne-d.github.io/protein_dashboard/).
