function depService() {

    var depID;

    getAll = function() {
        var departmetList = (function () {
            $.ajax({
                type: "GET",
                url: "/deps",
                dataType: 'json',
                success: function (data) {

                }
            });
        });
        return departmetList;
    };

    depDelete = function() {
        var deleteDep = function (depID) {
            $.ajax({
                url: '/deleteDep',
                type: "POST",
                dataType: 'json',
                data: {depID: depID},
                success: function (result) {
                    alert("Delete id:" + result);
                    console.log(result);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }
        return deleteDep;
    }

    editDepartment = function() {
        var editDepartment = function (depID) {
            $.ajax({
                url: "/editDepartment",
                type: "GET",
                dataType: 'json',
                data: {depID: depID},
                success: function (data) {
                    console.log(data);
                    // $('#name').val(data.name);
                    // $('#id').val(data.id);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        }
        return editDepartment;
    }

    depSave = function(id, name){
        $.ajax({
            url: '/depSave',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify({
                id: id,
                name: name
            }),
            success: function (data) {
                console.log(data);

            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    }



}