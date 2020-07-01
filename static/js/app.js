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

// function handleClick() {
function filterTable() {
 
  // Grab the filter values
  if (d3.select("#chkDate").property("checked")) {
    var date = d3.select("#filterDate"); 
  }

  if (d3.select("#chkCity").property("checked")) {
    var city = d3.select("#filterCity"); 
  }

  if (d3.select("#chkState").property("checked")) {
    var state = d3.select("#filterState"); 
  }

  if (d3.select("#chkCountry").property("checked")) {
    var country = d3.select("#filterCountry"); 
  }

  if (d3.select("#chkShape").property("checked")) {
    var shape = d3.select("#filterShape"); 
  }

  let filteredData = tableData;
  let missing = "Missing Values:\n";
  let values = "";
    // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    console.log(date);
    let dateValue = date.property("value");
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    if (dateValue != "") {
      filteredData = filteredData.filter(row => row.datetime === dateValue);
    }
    else {
      values += "Filter Date\n";
    }
  }
  if (city) {
    let cityValue = city.property("value");
    if (cityValue != "") {
      filteredData = filteredData.filter((row) => row.city === cityValue);
    }
    else {
      values += "Filter City\n";
    }
  }
  if (state) {
    let stateValue = state.property("value");
    if (stateValue != "") {
      filteredData = filteredData.filter((row) => row.state === stateValue);
    }
    else {
      values += "Filter State\n"
    }
  }
  if (country) {
    let countryValue = country.property("value");
    if (countryValue != "") {
      filteredData = filteredData.filter((row) => row.country === countryValue);
    }
    else {
      values += "Filter Country\n";
    }
  }
  if(shape) {
    shapeValue = shape.property("value");
    if (shapeValue != "") {
      filteredData = filteredData.filter((row) => row.shape === shapeValue);
    }
    else {
      values += "Filter Shape\n";
    }
  }
  
  if (values != "") {
    alert(missing + "\n" + values);
  }
  else {
    // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
    buildTable(filteredData);
  }
}

function addFilter(field) {
  var btnID = "";
  var forfield = "";
  var placeholder = "";
  var labelInnerHTML = "";
  var listItemId = "";

  listItemId = "filterBy" + field;
  btnID = "btnFilterBy" + field;
  forfield = field;
  labelInnerHTML = "Enter " + field;
  inputId = "filter" + field;

  if ( field == "Date") {
    placeholder = "1/10/2010";
  }
  else if (field == "City") {
    placeholder = "Toronto";
  }
  else if (field == "State") {
    placeholder = "Ontario";
  }
  else if (field == "Country") {
    placeholder = "Canada";
  }
  else if (field == "Shape") {
    placeholder = "circle";
  }

  d3.select("#filters").append("li").attr("id","g1"+listItemId)
                          .attr("class","bg-dark list-group-item");
  
  d3.select("#g1"+listItemId).append("label")
                              .attr("for",forfield)
                              .html(labelInnerHTML);
  
  d3.select("#g1"+listItemId).append("br");                         
  d3.select("#g1"+listItemId).append("input")
                              .attr("type","text")
                              .attr("id",inputId)
                              .attr("placeholder",placeholder)
                              .attr("class","btn btn-dark");
}

function allUnchecked() {
  chkboxes = getCheckboxes();
  for (var i=0;i<chkboxes.length;i++){
    if ( chkboxes[i].checked )  {
      return false;
    }
  }
  return true;
}

function handleCheck() {
  var filterName=null;

  src = event.target;

  switch(src.id) {
    case "chkDate": filterId = "filterByDate"; break;
    case "chkCity": filterId = "filterByCity"; break;
    case "chkState": filterId = "filterByState"; break;
    case "chkCountry": filterId = "filterByCountry"; break;
    case "chkShape": filterId = "filterByShape"; break;
  }

  if (!src.checked) {
    console.log("Removing filter");
    d3.select("#filters").select("#g1" + filterId).remove();
  }
  else {
    if (filterId === "filterByDate") {
      g1filterByDate = d3.select("#g1filterByDate");
      console.log("g1filterByDate.id = " + g1filterByDate["id"]);
      if (g1filterByDate.id) {
        d3.select("#filters").append(g1filterByDate);
      }
      else {
        addFilter("Date");
      }
    }
    else if (filterId === "filterByCity") {
      addFilter("City");
    }
    else if (filterId === "filterByState") {
      addFilter("State");
    }
    else if (filterId === "filterByCountry") {
      addFilter("Country");
    }
    else if (filterId === "filterByShape"){
      addFilter("Shape");
    }
  }
}

function getCheckboxes() {
  var checkboxes = []
  // elements = document.getElementsByTagName("input")
  elements = d3.selectAll(".fil-box").nodes();

  for(var i=0;i<elements.length;i++) {
   //  if (elements[i].property("id").startsWith("chk")) {
        checkboxes.push(elements[i])
   // }
  }  
  return checkboxes;
}

function resetForm() {
  chkboxes = getCheckboxes();
  chkboxes.forEach((chk) => chk.checked = false);

  // filters = document.getElementById("filters");
  // filters.innerHTML = "";
  d3.select("#filters").html("");

  buildTable(tableData);
}

// Attach an event to listen for the form button
checkboxes = getCheckboxes();
checkboxes.forEach((cb) => d3.selectAll("#"+cb.id).on("click", handleCheck));

// Build the table when the page loads
buildTable(tableData);

checkboxes.forEach((cb) => cb.checked = false);

filterBtn = document.getElementById("filter-btn");
//d3.selectAll("#filter-btn").on("click", handleClick);
d3.selectAll("#filter-btn").on("click", filterTable);

resetBtn = document.getElementById("reset-btn");
d3.selectAll("#reset-btn").on("click", resetForm);