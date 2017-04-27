<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<link rel="stylesheet" type="text/css" href="/resources/css/style.css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/js/script.js"></script>

<html>
<head>
    <title> Departments</title>
</head>

<body>
<div id="mainApp" />
<button id="test">Load</button>
<button id="getDeps">getDepartments</button>
<form id= "depSave" action="depSave" method="post">
    <div>
        <label>
            <input type="text" name="name" pattern="[A-Za-z]{3,}" value="<c:out value="${param['DepName'] eq null ? department.name : param['DepName']}"/>"/>
            <input type="hidden" name="id" value="${depId}"/>
        </label>
    </div>
    <div>
        <input type="submit" value="OK">
    </div>
</form>

</body>
</html>
