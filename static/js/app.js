// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// filterTable()
// =============
// This function filters the search results that are displayed in the table.
//
// Arguments:
// None
//
// Returns:
// None
function filterTable() {
 
  // If Date checkbox is checked
  if (d3.select("#chkDate").property("checked")) {
    // grab the value in the corresponding text field
    var date = d3.select("#filterDate"); 
  }

  // If City checkbox is checked
  if (d3.select("#chkCity").property("checked")) {
    // grab the value in the corresponding text field
    var city = d3.select("#filterCity"); 
  }

  // If State checkbox is checked
  if (d3.select("#chkState").property("checked")) {
    // grab the value in the corresponding text field
    var state = d3.select("#filterState"); 
  }

  // If Country checkbox is checked
  if (d3.select("#chkCountry").property("checked")) {
    // grab the value in the corresponding text field
    var country = d3.select("#filterCountry"); 
  }

  // If Shape checkbox is checked
  if (d3.select("#chkShape").property("checked")) {
    // grab the value in the corresponding text field
    var shape = d3.select("#filterShape"); 
  }

  // Initialize filterData to the original data set
  let filteredData = tableData;

  // missing is the header of the alert box that will be displayed if any
  // of the search text fields are enabled but no value has been specified.
  let missing = "Missing Values:\n";

  // values is the new-line delimited list of empty fields
  let values = "";
  
  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    let dateValue = date.property("value");
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    if (dateValue != "") {
      filteredData = filteredData.filter(row => row.datetime === dateValue);
    }
    else {
    // If the date text field is empty, add "Filter Date" to the list of 
    // missing fields
      values += "Filter Date\n";
    }
  }

  // Check to see if a city was entered and filter the
  // data using that city.
  if (city) {
    let cityValue = city.property("value");
    if (cityValue != "") {
      filteredData = filteredData.filter((row) => row.city === cityValue);
    }
    else {
    // If the city text field is empty, add "Filter City" to the list of 
    // missing fields
      values += "Filter City\n";
    }
  }

  // Check to see if a state was entered and filter the 
  // data using that state.
  if (state) {
    let stateValue = state.property("value");
    if (stateValue != "") {
      filteredData = filteredData.filter((row) => row.state === stateValue);
    }
    else {
    // If the state text field is empty, add "Filter State" to the list of 
    // missing fields
      values += "Filter State\n"
    }
  }

  // Check to see if a country was entered and filter the
  // data using that country.
  if (country) {
    let countryValue = country.property("value");
    if (countryValue != "") {
      filteredData = filteredData.filter((row) => row.country === countryValue);
    }
    else {
    // If the country text field is empty, add "Filter Country" to the list of 
    // missing fields
      values += "Filter Country\n";
    }
  }

  // Check to see if a shape was entered and filter the
  // data using that shape.
  if(shape) {
    shapeValue = shape.property("value");
    if (shapeValue != "") {
      filteredData = filteredData.filter((row) => row.shape === shapeValue);
    }
    else {
    // If the shape text field is empty, add "Filter Shape" to the list of 
    // missing fields
      values += "Filter Shape\n";
    }
  }
  
  // If empty search text fields were found
  if (values != "") {
    // display alert box showing the user the list of empty fields
    alert(missing + "\n" + values);
  }
  else {
  // Rebuild the table using the filtered data
    buildTable(filteredData);
  }
}


// addFilter()
// ===========
// This function adds a search box for the field that is specified in the argument list.
// 
// Arguments:
// forfield - text - the field for which the filter should be displayed
//
// Returns:
// None

function addFilter(forfield) {
  var placeholder = ""; // value to place in search field to display expected data format
  var labelInnerHTML = ""; // text value to put in the search label
  var listItemId = ""; // ID of the new search item

  listItemId = "filterBy" + forfield;   // set the id of the search item
  labelInnerHTML = "Enter " + forfield; // set the text to put in the search label
  inputId = "filter" + forfield;        // set the id of the search text field

  // set the placeholder that is corresponds to the forfield field
  if ( forfield === "Date") {
    placeholder = "1/10/2010";
  }
  else if (forfield === "City") {
    placeholder = "london";
  }
  else if (forfield === "State") {
    placeholder = "ca";
  }
  else if (forfield === "Country") {
    placeholder = "us";
  }
  else if (forfield === "Shape") {
    placeholder = "circle";
  }

  // Add the listItem to the div whose ID is "filters"
  d3.select("#filters").append("li").attr("id","g1"+listItemId)
                          .attr("class","bg-dark list-group-item");
  
  // Add the search label to the listItem
  d3.select("#g1"+listItemId).append("label")
                              .attr("for",forfield)
                              .html(labelInnerHTML);
  
  // Add a line break to the listItem
  d3.select("#g1"+listItemId).append("br");
  
  // Add the search text field to the listItem. Specify the type,id,placeholder, and class attributes
  d3.select("#g1"+listItemId).append("input")
                              .attr("type","text")
                              .attr("id",inputId)
                              .attr("placeholder",placeholder)
                              .attr("class","btn btn-dark");

}

// allUnchecked()
// ==============
// This function determines if all the search checkboxes are unchecked
//
// Arguments:
// None
//
// Return:
// true, if all the checkboxes are unchecked. Otherwise, false.
function allUnchecked() {
  // Retrieve the array of search checkbox objects
  chkboxes = getCheckboxes();
  
  // Iterate through the checkboxes.
  // If the current checkbox status is true, return false, indicating that
  // not all the checkboxes are unchecked.
  chkboxes.forEach((chk) => {if (chk.checked) return false});

  // If none of the checkboxes have a checked status of false, return true, indicating
  // that all the checkboxes are unchecked.
  return true;
}


// handleCheck()
// =============
// This function is invoked by the checking or unchecking of search checkboxes. It then 
// adds the search filter that corresponds to the check box if the box was checked, and
// removes the search filter if the box was unchecked.
//
// Arguments:
// None
//
// Return:
// None
function handleCheck() {
  
  // Determine which checkbox is invoking this handler
  src = event.target;

  // Determine the value of "filterId" based on the id of src checkbox
  switch(src.id) {
    case "chkDate": filterId = "filterByDate"; break;
    case "chkCity": filterId = "filterByCity"; break;
    case "chkState": filterId = "filterByState"; break;
    case "chkCountry": filterId = "filterByCountry"; break;
    case "chkShape": filterId = "filterByShape"; break;
  }

  // If the checkbox was unchecked
  if (!src.checked) {
    // Remove the search filter from the available filters
    d3.select("#filters").select("#g1" + filterId).remove();
  }
  else {
    // if the Date checkbox was checked
    if (filterId === "filterByDate") {
    // Add the Date search filter
        addFilter("Date");
    }
    // if the City checkbox was checked
    else if (filterId === "filterByCity") {
    // Add the City search filter
      addFilter("City");
    }
    // if the State checkbox was checked
    else if (filterId === "filterByState") {
    // Add the State search filter
      addFilter("State");
    }
    // if the Country checkbox was checked
    else if (filterId === "filterByCountry") {
    // Add the Country search filter
      addFilter("Country");
    }
    // if the Shape checkbox was checked
    else if (filterId === "filterByShape"){
    // Add the Shape search filter
      addFilter("Shape");
    }
  }
}

// getCheckboxes()
// ===============
// This function retrieves the list of search checkboxes
//
// Arguments:
// None
//
// Returns:
// checkboxes - array of search checkbox nodes
function getCheckboxes() {

  // Initialise checkboxes list to blank list
  var checkboxes = []
  
  // Get the list of nodes contained in the search check boxes
  elements = d3.selectAll(".fil-box").nodes();

  // Iterate through the list of nodes
  for(var i=0;i<elements.length;i++) {
  // Add the nodes to the checkboxes array 
    checkboxes.push(elements[i])
  }  
  // return the checkboxes array
  return checkboxes;
}

// resetForm()
// ===========
// This function resets the search form. It unchecks the search checkboxes, removes the search items, 
// and refreshes the search table with the entire data set. 
//
// Arguments:
// None
//
// Returns:
// None
function resetForm() {
  // Retrieve the list of search checkboxes
  chkboxes = getCheckboxes();

  // Uncheck all the search checkboxes
  chkboxes.forEach((chk) => chk.checked = false);

  // Clear the filters. Remove all the search items
  d3.select("#filters").html("");

  // Refresh the results table - show entire data set
  buildTable(tableData);
}

// Add an event listener for the checkboxes
checkboxes = getCheckboxes();
checkboxes.forEach((cb) => d3.selectAll("#"+cb.id).on("click", handleCheck));

// Build the table when the page loads
buildTable(tableData);

// Uncheck the search checkboxes
checkboxes.forEach((cb) => cb.checked = false);

// Add an event listener to the "Filter Date" button
// filterBtn = document.getElementById("filter-btn");
d3.selectAll("#filter-btn").on("click", filterTable);

// Add an event listener to the "Reset Form" button
// resetBtn = document.getElementById("reset-btn");
d3.selectAll("#reset-btn").on("click", resetForm);