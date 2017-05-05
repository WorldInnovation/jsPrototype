<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page buffer="8192kb" %>

<link rel="stylesheet" type="text/css" href="/resources/css/style.css">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/js/script.js"> </script>

<html>
<head>
    <title> Departments</title>
</head>

<body>
<header>
    <h1>Wellcome</h1>
    <p>to Departments</p>
</header>
<main id="content" class="wrapper box">
    <article id="articleFormLoad">
        <div id="formPlace"/>
<%--        <form id="depSave" action="depSave" method="post">
                    <input id="name" type="text" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}"
                           value="<c:out value="${param['DepName'] eq null ? department.name : param['DepName']}"/>"/><br>
                    <input id="id" type="hidden" name="id"  value="${depId}"/>
        </form>
        <input id="butSaveDep" type="submit" value="OK">--%>
    </article>
    <article id="articleTable">
        <table id="test"></table>
    </article>
</main>
<script>

</script>
<footer>©copyright 2017</footer>
</body>
</html>

