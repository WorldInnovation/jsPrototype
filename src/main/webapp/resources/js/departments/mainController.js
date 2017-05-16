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

/*            case 'saveDep':
                var saveDep = new SaveDep(config, router);
                return saveDep;
                break;*/

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

            case 'empSave':
                var empSave = new EmpSave(config, router);
                return empSave;
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

        var rowForm = $('<form id="empty"  method="post">');
        var child = $('<div></div>');
        child.append('<input id="name" type="hidden" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}" value=""/><br>')
        child.append('<input id="id" type="hidden" name="id"  value=""/><br>');
        child.append('<input id="butNewDep" type="button" value="new Dep">');
        rowForm.append(child);
        rowForm.append('</form>');
        $('#content').append(rowForm);


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

    $("#content").on("click", "#butNewDep", function () {
        alert('click');
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

    var rowForm = $('<form id="depSave"  >');
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


    $("#butSaveDep").submit(function()
      {

        $.ajax({
            url: '/depSave',
            type: "POST",
            dataType: 'json',
            data: $("#depSave").serialize(), // post data || get data
            success: function (data) {
                alert('save ok');
            }
        });
          callBack('depList');

    });

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
            empFormView(depID);
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

        var empFormView = function (depID) {
            var firstParent = $('<form id="empSaveForm" method="post" action="empSave"></form>');
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

            $('#depID').val(depID);

        }

        //table click event
        $("body").on("click", "#empTable td", function () {
            empID = $(this).closest('tr').attr('id');// table row ID
            config.empID = empID;
            if ($(this).attr('id') === "edit") {
                callBack('editEmp');
            }
            if ($(this).attr('id') === "delete") {
                callBack('deleteEmp');
            }
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
                alert("Delete id:" + result);
                console.log(result);
                callBack('empList');
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }
//--
    function employeeEdit(config, callBack){
        var config = config;
        var callback = callBack;
        var depID = config.depID;
        var empID = config.empID;

        $.ajax({
            url: '/employeeEdit',
            type: "GET",
            dataType: 'json',
            data: {
                depID: depID,
                empID: empID
            },
            success: function (data) {
                alert("Edit id:" + data.id);
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

        var firstParent = $('<form id="empSaveForm" method="post" action="empSave"></form>');
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

        $('#depID').val(depID);

        $("body").on("submit", "#empSaveForm", function () {
            $.ajax({
                url: '/empSave',
                type: 'post',
                dataType: 'json',
                data: $('#empSaveForm').serialize(),
                success: function (data) {
                    console.log(data);
                    alert('Employee save');
                    callBack('empList');
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                    alert('Employee not save');
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



