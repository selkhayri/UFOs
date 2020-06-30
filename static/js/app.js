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
    // console.log("CLICK!!");
    // Grab the datetime value from the filter
    if (document.getElementById("filterDate")) {
      var date = d3.select("#filterDate"); // .property("value");
    }
    if (document.getElementById("filterCity")) {
      var city = d3.select("#filterCity"); // .property("value");
    }
    if (document.getElementById("filterState")) {
      var state = d3.select("#filterState"); // .property("value");
    }
    if (document.getElementById("filterCountry")) {
      var country = d3.select("#filterCountry"); // .property("value");
    }
    if (document.getElementById("filterShape")) {
      var shape = d3.select("#filterShape"); // .property("value");
    }

    let filteredData = tableData;
    
     // Check to see if a date was entered and filter the
    // data using that date.
    if (date) {
      console.log(date);
      date = date.property("value");
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => row.datetime === date);
    }
    if (city) {
      city = city.property("value");
      filteredData = filteredData.filter((row) => row.city === city);
    }
    if (state) {
      state = state.property("value");
      filteredData = filteredData.filter((row) => row.state === state);
    }
    if (country) {
      country = country.property("value");
      filteredData = filteredData.filter((row) => row.country === country);
    }
    if(shape) {
      shape = shape.property("value");
      filteredData = filteredData.filter((row) => row.shape === shape);
    }
    
     // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
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

  function handleCheck() {
    var filterName=null;

    src = event.target;
    console.log(src.id);

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