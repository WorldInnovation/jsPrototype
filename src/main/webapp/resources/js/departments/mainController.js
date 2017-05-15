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

            case 'saveDep':
                var saveDep = new SaveDep(config, router);
                return saveDep;
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

        var rowForm = $('<form id="depSave" action="editDepartment" method="get">');
        var child = $('<input id="name" type="hidden" value=""/><br>');
        child.append('<input id="id" type="hidden" name="id"  value=""/>');
        child.append('</form>');
        rowForm.append(child);
        rowForm.append('<input id="butSaveDep" type="submit" value="NewDepartments">');
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

    $("body").on("submit", "#depSave", function () {
        config.depID = '';
        callBack('depEdit');
    });
}

function EditDepartment(config, callBack){
    var depID = config.depID;
    var callback = callBack;
    //clear black




    if(depID == "") {
        console.log('depID is empty');
        $('#name').val('');
        $('#id').val('');
    }
    else {
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


    $("#content").empty();
    var rowForm = $('<form id="depSave" action="depSave" method="post">');
    var child = $('<input id="name" type="text" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}" value=""/><br>');
    child.append('<input id="id" type="hidden" name="id"  value=""/>');
    child.append('</form>');
    rowForm.append(child);
    rowForm.append('<input id="butSaveDep" type="submit" value="OK">');
    $('#content').append(rowForm);




    $("body").on("submit", "#depSave", function () {
        $.ajax({
            url: '/depSave',
            type: "POST",
            dataType: 'json',
            data: $("#depSave").serialize(), // post data || get data
            success: function (data) {
                console.log(data);
                callBack('depList');
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
        return false;
    });

}
//------------------------------------
function DeleteDep(config, callBack) {
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




