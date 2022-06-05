let title = document.getElementById("distrText");
let path = location.href;
let arr = path.split("/");
title.innerText = `${arr[arr.length - 1]}`;