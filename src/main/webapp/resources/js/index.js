'use strict';

$('#item'); // <= just works
jQuery('#item');

module.exports = function MainController(config) {
    var context = config.context;
    var depID = config.depID;
    var empID = config.empID;

    var initApp = function () {
        console.log('start');
        router('depList');

    };

    var router = function (state) {
        switch (state) {
            case 'depList':1
                var depList = new ListDep(config, router);
                return depList;
                break;

            case 'depEdit':
                var editDep = new EditDepartment(config, router);
                return editDep;
                break;

            case  'deleteDep':
                var deleteDep = new DeleteDep(config, router);
                return deleteDep;
                break;

            case 'empList':
                var empList = new EmpList(config, router);
                return empList;
                break;

            case 'employeeEdit':
                var employeeEdit = new EmployeeEdit(config, router);
                return employeeEdit;
                break;

            case 'empDelete':
                var empDelete = new EmpDelete(config, router);
                return;
                break;
        }
    };
    return {
        init: initApp
    }
}

function ListDep (config, callBack) {
    var configDep = config;
    var changeState = callBack;
    var depID = config.depID;


    $.ajax({
        type: "GET",
        url: "/deps",
        dataType: 'json',
        success: function (data) {
            if (data) {
                depTable(data);
            }
        }
    });

    var depTable = (function (data) {
        //clear black
        $('#name').val('');
        $('#id').val('');
        $("#content").empty();

        var myButton = $('<table id="formButton">' + '</table>');
        var rowButton = $('<tr></tr>');
        rowButton.append('<th>' + '<input id="butNewDep" class="submit" type="button" value="new Department">' + '</th>');
        myButton.append(rowButton);
        $('#content').append(myButton);

        var table = $('<table id="depTable">' + '<caption>' + '<h2>' + 'Departments' + '</h2>' + '</caption>' + '</table>');
        var row = $('<tr></tr>');
        row.append('<th>' + " id " + '</th>');
        row.append('<th>' + " name " + '</th>');
        row.append('<th>' + "select" + '</th>');
        row.append('<th>' + "edit" + '</th>');
        row.append('<th>' + "delete" + '</th>');
        table.append(row);
        $.each(data, function (k, v) {

            $.each(v, function (key, value) {
                var idDep;
                if (key == 'id') {
                    row = $('<tr>').attr('id', value);
                    row.append('</tr>');
                    row.append('<td>' + value + '</td>');
                }
                if (key == 'name') {
                    row.append('<td>' + value + '</td>');
                    row.append('<td id="select">' + 'select' + '</td>');
                    row.append('<td id="edit">' + 'edit' + '</td>');
                    row.append('<td id="delete">' + 'delete' + '</td>');
                }
            });
            table.append(row);

        });
        $('#content').append(table);
    });

    $("#content").on("click", "#depTable td", function () {
        depID = $(this).closest('tr').attr('id');// table row ID
        config.depID = depID;
        window.depID = $(this).depID;
        $("#content").off();
        if ($(this).attr('id') === "select") changeState('empList');
        if ($(this).attr('id') === "edit") changeState('depEdit');//editDepartment(depID);
        if ($(this).attr('id') === "delete") changeState('deleteDep');
    });

    $("#content").on("click", "#butNewDep", function () {
        $("#content").off();
        config.depID = '';
        changeState('depEdit');
    });
}

function EditDepartment(config, callBack) {
    var depID = config.depID;
    var changeState = callBack;

    $("#content").empty();

    var rowForm = $('<form id="depSave" onsubmit = "return false">');
    var child = $('<div></div>');
    child.append('<input id="name" type="text" name="name" placeholder="Enter department" value=""/><br>')
    child.append('<input id="id" type="hidden" name="id"  value=""/><br>');
    child.append('<input id="butSaveDep" type="submit" value="OK">');
    rowForm.append(child);
    rowForm.append('</form>');
    $('#content').append(rowForm);

    if ($.isNumeric(depID)) {
        $.ajax({
            url: "/editDepartment",
            type: "GET",
            dataType: 'json',
            data: {depID: depID},
            success: function (data) {
                console.log(data);
                $('#name').val(data.name);
                $('#id').val(data.id);
            },
            error: function (xhr, resp, text) {
            }
        });
    }
    else {
        console.log('new Dep');
        $('#name').val('');
        $('#id').val('');
    }
//----------
    $('#depSave').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            remote : {
                url: "/getDepName",
                type: "post",
                data: {
                    id: function() {
                    return $('#id').val();
                    },
                    name: function () {
                        return $("#name").val();
                    }
                }

            }
        },
        messages: {
            name: {
                required: "Type name, please",
                minlength: "Name is low 3",
                remote: "This name exist"
            }

        },
        submitHandler: function () {
            $.ajax({
                url: '/depSave',
                type: "POST",
                dataType: 'json',
                data: $('#depSave').serialize(),
                success: function (data) {
                    changeState('depList');
                }
            });
        }
    });
}

function DeleteDep(config, callBack) {
    var depID = config.depID;
    var changeState = callBack;

    $.ajax({
        url: '/deleteDep',
        type: "POST",
        dataType: 'json',
        data: {depID: depID},
        success: function (result) {
            console.log("Delete id:" + result);
            changeState('depList');
        },
        error: function (xhr, resp, text) {
        }
    });

}

function displayDepForm() {
    $('#name').val('');
    $('#id').val('');
    $("#content").empty();
    var rowForm = $('<form id="depSave" action="depSave" method="post">');
    var child = $('<input id="name" type="text" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}" value=""/><br>');
    child.append('<input id="id" type="hidden" name="id"  value=""/>');
    child.append('</form>');
    rowForm.append(child);
    rowForm.append('<input id="butSaveDep" type="submit" value="OK">');
    $('#content').append(rowForm);
}


function displayDepartments() {
    var depTable = (function (data) {
        //clear black
        $('#name').val('');
        $('#id').val('');
        $("#content").empty();

        var table = $('<table id="depTable">' + '<caption>' + '<h2>' + 'Departments' + '</h2>' + '</caption>' + '</table>');
        var row = $('<tr></tr>');
        row.append('<th>' + " id " + '</th>');
        row.append('<th>' + " name " + '</th>');
        row.append('<th>' + "select" + '</th>');
        row.append('<th>' + "edit" + '</th>');
        row.append('<th>' + "delete" + '</th>');
        table.append(row);
        $.each(data, function (k, v) {

            $.each(v, function (key, value) {
                var idDep;
                if (key == 'id') {
                    row = $('<tr>').attr('id', value);
                    row.append('</tr>');
                    row.append('<td>' + value + '</td>');
                }
                if (key == 'name') {
                    row.append('<td>' + value + '</td>');
                    row.append('<td id="select">' + 'select' + '</td>');
                    row.append('<td id="edit">' + 'edit' + '</td>');
                    row.append('<td id="delete">' + 'delete' + '</td>');
                }
            });
            table.append(row);

        });
        $('#content').append(table);
    });
}
//----------------------------------- employee
    function EmpList(config, callBack){
        var depID = config.depID;
        var empID = config.empID;
        var changeState = callBack;

        var showEmpForm = function (depID) {
            $("#content").empty();
            var myButton = $('<table id="formButton">' + '</table>');
            var rowButton = $('<tr></tr>');
            rowButton.append('<th>' + '<input id="butNewEmp" class="submit" type="button" value="new Employee">' + '</th>');
            myButton.append(rowButton);
            $('#content').append(myButton);
            $('#empSaveForm').attr('depID', depID);//set id in form
        }

        $.ajax({
            url: "/employeesList",
            type: "GET",
            dataType: 'json',
            data: {depID: depID},
            success: function (data) {
                showEmpForm(depID);
                empTable(data);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }

        });

        var empTable = (function (data) {
            var table = $('<table id="empTable">' + '<caption>' + '<h2>' + 'Employees' + '</h2>' + '</caption>' + '</table>');
            var row = $('<tr></tr>');

            row.append('<th>' + " id " + '</th>');
            row.append('<th>' + " firstName " + '</th>');
            row.append('<th>' + " secondName " + '</th>');
            row.append('<th>' + " grade " + '</th>');
            row.append('<th>' + " birthday " + '</th>');
            row.append('<th>' + " eMail " + '</th>');

            row.append('<th>' + "edit" + '</th>');
            row.append('<th>' + "delete" + '</th>');
            table.append(row);
            $.each(data, function (k, v) {
                $.each(v, function (key, value) {
                    if (key == 'id') {
                        row = $('<tr>').attr('id', value);
                        row.append('</tr>');
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'firstName') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'secondName') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'grade') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'birthday') {
                        row.append('<td>' + value + '</td>');
                    }
                    if (key == 'eMail') {
                        row.append('<td>' + value + '</td>');
                        row.append('<td id="edit">' + 'edit' + '</td>');
                        row.append('<td id="delete">' + 'delete' + '</td>');
                    }
                });
                table.append(row);

            });
            $('#content').append(table);
        });

        $('#content').on("click", "#empTable td", function () {
            empID = $(this).closest('tr').attr('id');// table row ID
            config.empID = empID;
            $("#content").off();
            if ($(this).attr('id') === "edit") {
                changeState('employeeEdit');
            }
            if ($(this).attr('id') === "delete") {
                changeState('empDelete');
            }
        });

        $('#content').on("click", "#butNewEmp", function () {
            $("#content").off();
            config.empID = '';
            changeState('employeeEdit');
        });
}
//--
    function EmpDelete(config, callBack){
        var depID = config.depID;
        var empID = config.empID;
        var changeState = callBack;

        $.ajax({
            url: '/empDelete',
            type: "POST",
            dataType: 'json',
            data: {
                depID: depID,
                empID: empID
            },
            success: function (result) {

                changeState('empList');
            },
            error: function (xhr, resp, text) {
                //console.log(xhr, resp, text);
            }
        });

    }
//--
    function EmployeeEdit(config, callBack){
        var depID = config.depID;
        var empID = config.empID;
        var changeState = callBack;

        $("#content").empty();

        var firstParent = $('<form id="empSaveForm" method="post" action="" onsubmit = "return false"></form>');
        var row = $('<fildset></fildset>');
        row.append(' <legend>Employees form </legend>');
        row.append('<p> <label for="firstName">FirstName </label>' +
            '<input id="firstName" name="firstName" type="text"> ' +
            '</p>');
        row.append('<p> <label for="secondName">SecondName</label>' +
            '<input id="secondName" name="secondName" type="text"> ' +
            '</p>');
        row.append('<p> <label for="grade">Gade   </label>' +
            '<input id="grade" name="grade" type="number"> ' +
            '</p>');
        row.append('<p> <label for="birthday">Birthday </label>' +
            '<input id="birthday" name="birthday" type="date"> ' +
            '</p>');
        row.append('<p> <label for="eMail">eMail </label>' +
            '<input id="eMail" name="eMail" type="email"> ' +
            '</p>');
        row.append('<p> <input id="submit" class="submit" type="submit" value="Submit">' +
            '</p>');
        row.append('<input id="id" type="hidden" name="id" value=""/>' +
            '<input id="depID" type="hidden" name="depID" value=""/>');

        firstParent.append(row);
        $('#content').append(firstParent);

        if($.isNumeric(empID) ) {
            $.ajax({
                url: '/employeeEdit',
                type: "GET",
                dataType: 'json',
                data: {
                    depID: depID,
                    empID: empID
                },
                success: function (data) {
                    $('#id').val(data.id);
                    $('#firstName').val(data.firstName);
                    $('#secondName').val(data.secondName);
                    $('#grade').val(data.grade);
                    $('#birthday').val(data.birthday);
                    $('#eMail').val(data.eMail);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }else{
            console.log('new Emp edit');
            $('#id').val('');
            $('#firstName').val('');
            $('#secondName').val('');
            $('#grade').val('');
            $('#birthday').val('');
            $('#eMail').val('');
        }

        $('#depID').val(depID);

  $('#empSaveForm').validate({
            rules: {
                firstName: {
                    required: true,
                    minlength: 2
                },
                secondName: {
                    required: true,
                    minlength: 2
                },
                grade: {
                    required: true,
                    number: true
                },
                eMail: {
                    required: true,
                    email: true
                }
            },
            messages: {
                firstName: "Enter your firstname min 2 chars",
                secondName: "Enter your secondname min 2 chars",
                grade: "Enter a valid number",
                eMail: "Enter correct email"
            },
      submitHandler: function () {
              $.ajax({
                  url: '/empSave',
                  type: 'post',
                  dataType: 'json',
                  data: $("#empSaveForm").serialize(),
                  success: function (data) {
                      changeState('empList');

                  },
                  error: function (xhr, resp, text) {
                      alert('Employee not save');
                      changeState('empList');
                  }
              });
      }
  });

}
