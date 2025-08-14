document.getElementById("startSurvey").addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();
    const birth = document.getElementById("birth").value.trim();

    if (!name || !birth) {
        alert("이름과 생년월일을 모두 입력해주세요.");
        return;
    }

    // Firebase 없이 LocalStorage 사용 (survey 페이지에서 활용)
    localStorage.setItem("userName", name);
    localStorage.setItem("userBirth", birth);

    // survey.html로 이동
    window.location.href = "survey.html";
});
