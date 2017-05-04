$('document').ready(function () {

    var departmetList = (function () {
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
    });

    var deleteDep = function (depID) {
        $.ajax({
            url: '/deleteDep',
            type: "POST",
            dataType: 'json',
            data: {depID: depID},
            success: function (result) {
                alert("Delete id:" + result);
                console.log(result);
                departmetList();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }

    var editDepartment = function (depID) {
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

    var depTable = (function (data) {
        //clear black
        $('#name').val('');
        $('#id').val('');
        $("table").empty();

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
                    row.append('<td>' + value + '</td>' + '<input type="hidden" name="depID" value="${idDep}">');
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

    $("#butSaveDep").click(function () {
        $.ajax({
            url: '/depSave',
            type: "POST",
            dataType: 'json',
            data: $("#depSave").serialize(), // post data || get data
            success: function (data) {
                console.log(data);
                departmetList();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

    //table click event
    $("body").on("click", "#depTable td", function (e) {
        var depID = $(this).closest('tr').attr('id');// table row ID
        if ($(this).attr('id') === "select") employeesList();
        if ($(this).attr('id') === "edit") editDepartment(depID);
        if ($(this).attr('id') === "delete") deleteDep(depID);
    });

//here show
    if (!$('#depTable').is()) {
        departmetList();
    }

});


