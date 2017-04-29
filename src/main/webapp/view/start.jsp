<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page buffer="8192kb" %>

<link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/resources/css/style.css">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery.jqGrid.js"></script>
<script type="text/javascript" src="/resources/js/script.js"></script>

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
        <form id="depSave" action="depSave" method="post">
                    <input type="text" name="name" placeholder="Enter department" pattern="[A-Za-z]{3,}"
                           value="<c:out value="${param['DepName'] eq null ? department.name : param['DepName']}"/>"/><br>
                    <input type="hidden" name="id" value="${depId}"/>
        </form>
        <input id="butSaveDep" type="submit" value="OK">
        <input id="getDepTable" type="submit" value="TableGet" >
    </article>
    <article id="articleTable">
        <table id="tableDep"></table>
    </article>
</main>
<script>iventCheck();</script>
<footer>©copyright 2017</footer>
</body>
</html>
