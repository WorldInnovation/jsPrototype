function DepController() {

    constructor = function () {
        departmentView.prototype =  DepView.create();
        departmentService.prototype = DepService.create();
    }

    showAllDepartments = function () {
        this.departmentService.getAll()
            .then(function (response) {
                this.departmentView.displayDepartments(response);
            });
    };

    deleteDepartment = function (event) {
        var id = event.target.name;
        this.departmentService.delete(id)
            .then(function (response) {
                this.departmentView.displayDepartments(response);
            });
    };

    editDepartment = function (event) {
        var id = event.target.id;
        var name = event.target.name;
        this.departmentService.edit(id, name)
            .then(function (response) {
                this.departmentView.displayDepForm(response);
            });
    } ;
    saveDepartment = function (event) {
        var id = event.target.id;
        var name = event.target.name;
        this.departmentService.save(id, name)
            .then(function (response) {
                this.departmentView.displayDepForm(response);
            });
    };

}
