<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page buffer="8192kb" %>

<link rel="stylesheet" type="text/css" href="/resources/css/style.css">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <%--<script type="text/javascript" src="/resources/js/departments/depController.js"> </script>
    <script type="text/javascript" src="/resources/js/departments/depView.js"> </script>--%>
<script type="text/javascript" src="/resources/js/departments/mainController.js"> </script>
<script type="text/javascript" src="/resources/js/jquery.validate.js"> </script>


<%--<script type="text/javascript" src="/app/bandle.js"> </script>--%>
<%--<script type="text/javascript" src="/resources/js/depView.js.js"> </script>--%>


<html>
<head>
    <title> Departments</title>
</head>

<body>
<header>
    <h1>Wellcome</h1>
    <p>to Departments</p>
</header>

<main id="main">
    <div id="content" class="mainView"/>
</main>
<script>
    var config = {
        context: '${pageContext.request.contextPath}',
        linkDep: '/depLink',
        depID: '',
        empID: ''
    };

    var main = new MainController (config);
    main.init();

</script>
<footer>©copyright 2017</footer>
</body>
</html>

