<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page buffer="8192kb" %>
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
    <p>Departments</p>
</header>
<main id="content" class="wrapper box">
    <article id="articleFormLoad">
        <h2>Edit Departments:</h2>
        <form id="depSave" action="depSave" method="post">
                    <input type="text" name="name" pattern="[A-Za-z]{3,}"
                           value="<c:out value="${param['DepName'] eq null ? department.name : param['DepName']}"/>"/>
                    <input type="hidden" name="id" value="${depId}"/>
                <input id="butSaveDep" value="OK">
        </form>
        <button id="getDepTable">TableGet</button>
    </article>
    <article id="articleTable">
        <table id="tableDep"></table>
    </article>
</main>

<footer>©copyright 2017</footer>
</body>
</html>
