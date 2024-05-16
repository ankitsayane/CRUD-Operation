var arr = [
  { empid: 12, ename: "Satish", esal: 90000 },
  { empid: 23, ename: "Anuj", esal: 35500 },
  { empid: 7, ename: "Anil", esal: 12000 },
];

//display table function
function displayTable(lst = arr) {
  var str = `<table class="table table-striped"><tr><th>Emp ID</th><th>Emp Name</th><th>Emp Salary</th></tr>`;
  for (var v of lst) {
    str += `<tr><td>${v.empid}</td><td>${v.ename}</td><td>${v.esal}</td></tr>`;
  }
  str += "</table>";
  $("#result").html(str);
}

//clear field function
function clearField() {
  $("#empid").val("");
  $("#empname").val("");
  $("#empsal").val("");
  $("#empid").focus();
}

$(document).ready(function () {
  displayTable();

  //add employee function
  $("#add").click(function () {
    var empid = parseInt($("#empid").val());
    var ename = $("#empname").val();
    var esal = parseInt($("#empsal").val());
    var obj = { empid, ename, esal };
    arr.push(obj);
    displayTable();
    clearField();
  });

  //delete employee function
  $("#delete").click(function () {
    var empid = parseInt($("#empid").val());
    var pos = arr.findIndex((v) => v.empid === empid);
    if (pos != -1) {
      var c = confirm("Do you want to delete");
      if (c) {
        arr.splice(pos, 1);
      }
      displayTable();
    } else {
      alert("Emp Id not found in record");
    }
    clearField();
  });

  //modify employee function
  $("#mod").click(function () {
    var empid = parseInt($("#empid").val());
    var pos = arr.findIndex((v) => (v.empid = empid));
    if (pos != -1) {
      var ename = prompt("Enter Name");
      var esal = parseInt(prompt("Enter Salary"));
      arr[pos].ename = ename;
      arr[pos].esal = esal;
      displayTable();
    } else {
      alert("Emp Id not found in record");
    }
    clearField();
  });

  //search by employee name
  function empSearchByName() {
    $("#search").on("keyup", function () {
      var v = $("#search").val();
      if (v !== "") {
        var newarr = $.grep(arr, function (x) {
          return x.ename.includes(v);
        });
        displayTable(newarr);
      } else {
        displayTable();
      }
    });
  }

  //search by employee id
  function empSearchById() {
    $("#search").on("keyup", function () {
      var v = parseInt($("#search").val());
      if (!isNaN(v)) {
        var newarr = arr.filter((x) =>
          x.empid.toString().includes(v.toString())
        );
        displayTable(newarr);
      } else {
        displayTable();
      }
    });
  }

  //search by employee salary
  function empSearchSal() {
    $("#search").on("keyup", function () {
      var v = parseInt($("#search").val());
      if (!isNaN(v)) {
        var newarr = arr.filter((x) =>
          x.esal.toString().includes(v.toString())
        );
        displayTable(newarr);
      } else {
        displayTable();
      }
    });
  }

  //search employee function
  $("#searchopt").on("change", function () {
    var selectedIndex = $(this).prop("selectedIndex");
    // console.log("Selected Index: " + selectedIndex);
    switch (selectedIndex) {
      case 1:
        empSearchByName();
        break;
      case 2:
        empSearchById();
        break;
      case 3:
        empSearchSal();
        break;
    }
  });
});
