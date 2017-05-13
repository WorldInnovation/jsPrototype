
function MainController(config) {
    var context = config.context;
    var lickToDep = config.dfg;

    var initApp = function () {
        console.log('start');
        router('depList');
    };

    var router = function (state) {
        if(state == 'depList'){
            var config = {
                contextDep: context
            };
            var depList = new DepartList(config, router);
        }

        if(state == 'depForm'){
            var config = {
                contextDep: context,
                lickToDep: lickToDep
            };
            var depList = new DepartList(config, router);
        }
    };

    return {
        init: initApp
    }
}

function DepartList(config, callBack) {
    var ss = config.ddd;
    var callbac = callBack;

    $('#buttonEm').on('click', true, function () {
        destroyDom();
        callbac('depEmpl');
    });

    var destroyDom = function () {

    }

}

function DepartList(config, callBack) {
    var ss = config.ddd;
    var callbac = callBack;

    $('#buttonEm').on('click', true, function () {
        destroyDom();
        callbac('depEmpl');
    });

    var destroyDom = function () {

    }

}



