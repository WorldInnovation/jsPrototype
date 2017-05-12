function EmpView() {

    var displayEmpForm = function (depID) {
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

    var displayEmployees = (function (data) {
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

}