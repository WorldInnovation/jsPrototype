function depController(){

    constructor = function() {
        departmentView.prototype =  DepView();
        departmentService.prototype =DepService();
    }

    showAllDepartments = function() {
        this.departmentService.getAll()
            .then(function(response) {
            this.departmentView.displayDepartments(response);
        });
    };

    deleteDepartment = function(event) {
        var id = event.target.name;
        this.departmentService.delete(id)
            .then(function(response) {
            this.departmentView.displayDepartments(response);
        });
    };

}