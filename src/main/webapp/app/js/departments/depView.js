  function DepView() {

    var depID;

    var  displayDepForm = function(){
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
    var  displayDepartments = function(){
        var depTable = (function (data) {
            //clear black
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

    //table click event
    $("body").on("click", "#depTable td", function () {
        depID = $(this).closest('tr').attr('id');// table row ID
        window.depID = $(this).depID;
        if ($(this).attr('id') === "select") employeeList(depID);
        if ($(this).attr('id') === "edit") editDepartment(depID);
        if ($(this).attr('id') === "delete") deleteDep(depID);
    });



};