function MainController(config) {
    var context = config.context;
    var lickToDep = config.dfg;
    var depID;
    var empID;

    var initApp = function () {
        console.log('start');
        router('depList');
    };

    var router = function (state) {
        switch (state) {
            case 'depList':
                var depList = new ListDep(config, router);
                return depList;
                break;

            case 'depEdit':
                console.log(config.depID);
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
                console.log(config.empID);
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
    var config = config;
    var callback = callBack;


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

    $("body").on("click", "#depTable td", function () {
        depID = $(this).closest('tr').attr('id');// table row ID
        config.depID = depID;
        window.depID = $(this).depID;
        if ($(this).attr('id') === "select") callBack('empList');
        if ($(this).attr('id') === "edit") callBack('depEdit');//editDepartment(depID);
        if ($(this).attr('id') === "delete") callBack('deleteDep');
    });

    $("body").on("click", "#butNewDep", function () {
        config.depID = '';
        callBack('depEdit');
    });
}

function EditDepartment(config, callBack){
    var config = config;
    var depID = config.depID;
    var callback = callBack;
    //clear black

    $("#content").empty();

    var rowForm = $('<form id="depSave" onsubmit = "return false">');
    var child = $('<div></div>');
    child.append('<input id="name" type="text" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}" value=""/><br>')
    child.append('<input id="id" type="hidden" name="id"  value=""/><br>');
    child.append('<input id="butSaveDep" type="submit" value="OK">');
    rowForm.append(child);
    rowForm.append('</form>');
    $('#content').append(rowForm);

    if($.isNumeric(depID) ) {
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
                console.log(xhr, resp, text);
            }
        });
    }
    else {
        console.log('depID is empty');
        $('#name').val('');
        $('#id').val('');
    }

    $("#depSave").submit(function(){
        alert('send');
        $.ajax({
            url: '/depSave',
            type: "POST",
            dataType: 'json',
            data: $(this).serialize(),
            success: function (data) {
                $("#depSave")
                callBack('depList');
            }

        });

    })

}
//------------------------------------
function DeleteDep(config, callBack) {
    var config = config;
    var depID = config.depID;
    var callback = callBack;

    $.ajax({
        url: '/deleteDep',
        type: "POST",
        dataType: 'json',
        data: {depID: depID},
        success: function (result) {
            alert("Delete id:" + result);
            console.log(result);
            callBack('depList');
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
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
        var config = config;
        var callback = callBack;
        var depID = config.depID;

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

        //table click event
        $("body").on("click", "#empTable td", function () {
            empID = $(this).closest('tr').attr('id');// table row ID
            config.empID = empID;
            if ($(this).attr('id') === "edit") {
                callBack('employeeEdit');
            }
            if ($(this).attr('id') === "delete") {
                callBack('empDelete');
            }
        });

        $("body").on("click", "#butNewEmp", function () {
            config.empID = '';
            callBack('employeeEdit');
        });
}
//--
    function EmpDelete(config, callBack){
        var config = config;
        var callback = callBack;
        var depID = config.depID;
        var empID = config.empID;

        $.ajax({
            url: '/empDelete',
            type: "POST",
            dataType: 'json',
            data: {
                depID: depID,
                empID: empID
            },
            success: function (result) {

                callBack('empList');
            },
            error: function (xhr, resp, text) {
                //console.log(xhr, resp, text);
            }
        });

    }
//--
    function EmployeeEdit(config, callBack){
        var config = config;
        var callback = callBack;
        var depID = config.depID;
        var empID = config.empID;

        $("#content").empty();

        var firstParent = $('<form id="empSaveForm" method="post" action="" onsubmit = "return false"></form>');
        var row = $('<fildset></fildset>');
        row.append(' <legend>Employees form </legend>');
        row.append('<p> <label for="firstName">FirstName </label>' +
            '<input id="firstName" name="firstName" type="text"> ' +
            '</p>');
        row.append('<p> <label for="secondName">LastName </label>' +
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
            console.log('empID is empty');
            $('#id').val('');
            $('#firstName').val('');
            $('#secondName').val('');
            $('#grade').val('');
            $('#birthday').val('');
            $('#eMail').val('');
        }

        $('#depID').val(depID);

        $("#empSaveForm").submit( function () {
           // $("body").on("submit", "#empSaveForm", function () {
            $.ajax({
                url: '/empSave',
                type: 'post',
                dataType: 'json',
                data: $(this).serialize(),
                success: function (data) {
                    callBack('empList');

                },
                error: function (xhr, resp, text) {
                    alert('Employee not save');
                    callBack('empList');
                }
            });

        });

}


/*
 validateDepartment() {
 $('#departmentForm').validate({
 rules: {
 name: {
 required: true,
 minlength: 5,
 maxlength: 10,
 remote: {
 url: "/uniqueName",
 type: "POST",
 data: {
 id: () => {
 return $('#id').val();
 },
 name: () => {
 return $('#name').val();
 }
 }
 }
 }
 },
 messages: {
 name: {
 required: "Type name, please",
 minlength: "Your password must be at least 5 characters long",
 maxlength: "Your password must not be longer than 10 characters",
 remote: "This name is already used!"
 }
 },
 submitHandler: () => {
 $( "#saveDepartment" ).addClass('listener').trigger( 'click' );
 }
 });
 };

 validateEmployee() {
 $('#employeeForm').validate({
 rules: {
 name: {
 required: true,
 minlength: 5,
 maxlength: 10
 },
 email: {
 required: true,
 email: true,
 remote: {
 url: "/uniqueEmail",
 type: "POST",
 data: {
 id: () => {
 return $('#id').val();
 },
 email: () => {
 return $('#email').val();
 }
 }
 }
 },
 salary: {
 required: true,
 digits: true,
 },
 birthDate: {
 required: true,
 date: true
 }
 },
 messages: {
 name: {
 required: "Type name, please",
 minlength: "Your password must be at least 5 characters long",
 maxlength: "Your password must not be longer than 10 characters",
 },
 email: {
 required: "Type email, please",
 email: "Type correct email!!",
 remote: "This email is already used!"
 },
 salary: {
 required: "Input salary, please",
 digits: "Type only digits!",
 },
 birthDate: {
 required: "Type birthday, please",
 date: "input correct date"
 }
 },
 submitHandler: () => {
 $("#saveEmployee").addClass('listener').trigger('click');
 }
 });
 };
 */



