<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page buffer="8192kb" %>

<%--<link rel="stylesheet" type="text/css" href="/resources/css/style.css">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>--%>

<%--<script type="text/javascript" src="/resources/js/jquery.validate.js"> </script>--%>

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
<script type="text/javascript" src="/resources/js/dist/bandle.js"> </script>
<script>
    var config = {
        context: '${pageContext.request.contextPath}',
        linkDep: '/depList',
        depID: '',
        empID: ''
    };

    var main = new MainController (config);
    main.init();

</script>
<footer>©copyright 2017</footer>
</body>
</html>

