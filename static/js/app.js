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

  function handleClick() {
    if (allUnchecked()) {
      alert("Please specify filter values!");
      return;
    }

    // Grab the filter values
    if (document.getElementById("filterDate")) {
      var date = d3.select("#filterDate"); 
    }

    if (document.getElementById("filterCity")) {
      var city = d3.select("#filterCity"); 
    }

    if (document.getElementById("filterState")) {
      var state = d3.select("#filterState"); 
    }

    if (document.getElementById("filterCountry")) {
      var country = d3.select("#filterCountry"); 
    }

    if (document.getElementById("filterShape")) {
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
        values += "Filter Date\n"
      }
    }
    if (city) {
      let cityValue = city.property("value");
      if (cityValue != "") {
        filteredData = filteredData.filter((row) => row.city === cityValue);
      }
      else {
        values += "Filter Date\n"
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
        values += "Filter Country\n"
      }
    }
    if(shape) {
      shapeValue = shape.property("value");
      if (shapeValue != "") {
        filteredData = filteredData.filter((row) => row.shape === shapeValue);
      }
      else {
        values += "Filter Shape\n"
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

    filterList = document.getElementById("filters");
    
    filterbtn = document.createElement("button");
    filterbtn.setAttribute("id",btnID);
    filterbtn.setAttribute("type","button");
    filterbtn.setAttribute("class","btn btn-dark");

    // g2 = document.createElement("li");
    // g2.setAttribute("class","bg-dark list-group-item");
    // g2.appendChild(filterbtn);
    
    label = document.createElement("label");
    label.setAttribute("for",forfield);
    label.innerHTML = labelInnerHTML;
    input = document.createElement("input"); 
    input.setAttribute("type","text");
    input.setAttribute("placeholder",placeholder);
    input.setAttribute("id",inputId);
    
    g1 = document.createElement("li");
    g1.setAttribute("class","bg-dark list-group-item");
    g1.appendChild(label);
    g1.append(document.createElement("br"));
    g1.appendChild(input);
    
    ul = document.createElement("ul"); 
    ul.appendChild(g1);
    // ul.appendChild(g2);

    li = document.createElement("li"); 
    li.setAttribute("id",listItemId);
    li.setAttribute("class","bg-dark list-list-group-item")
    li.appendChild(ul);
    
    filterList.appendChild(li);
    
  }

  function allUnchecked() {
    chkboxes = getCheckboxes();
    for (var i=0;i<chkboxes.length;i++){
      if ( chkboxes[i].checked ) {
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

    filter = document.getElementById(filterId);
    if (filter) {
      filters.removeChild(filter);
    }
    else {
      if (filterId == "filterByDate") {
        addFilter("Date");
      }
      else if (filterId == "filterByCity") {
        addFilter("City");
      }
      else if (filterId == "filterByState") {
        addFilter("State");
      }
      else if (filterId == "filterByCountry") {
        addFilter("Country");
      }
      else if (filterId == "filterByShape"){
        addFilter("Shape");
      }
    }
  }

  function getCheckboxes() {
    var checkboxes = []
    elements = document.getElementsByTagName("input")
    for(var i=0;i<elements.length;i++) {
      id = String(elements[i].id);
      
      if (elements[i].id.startsWith("chk")) {
         checkboxes.push(elements[i])
      }
    }  
    return checkboxes;
  }

// Attach an event to listen for the form button
checkboxes = getCheckboxes();
checkboxes.forEach((cb) => d3.selectAll("#"+cb.id).on("click", handleCheck));

// Build the table when the page loads
buildTable(tableData);

checkboxes.forEach((cb) => cb.checked = false);

filterBtn = document.getElementById("filter-btn");
d3.selectAll("#filter-btn").on("click", handleClick);