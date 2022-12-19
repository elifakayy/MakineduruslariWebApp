const button0 = document.getElementById("Button0");
const button1 = document.getElementById("Button1");
const button2 = document.getElementById("Button2");
const button3 = document.getElementById("Button3");
const button4 = document.getElementById("Button4");
const button5 = document.getElementById("Button5");
const button6 = document.getElementById("Button6");
const button7 = document.getElementById("Button7");
const button8 = document.getElementById("Button8");
const button9 = document.getElementById("Button9");
const buttonBackspace = document.getElementById("ButtonBackspace");

var sectionField = document.getElementById("benchSelect");
button0.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "0";
});
button1.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "1";
});
button2.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "2";
});
button3.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "3";
});
button4.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "4";
});
button5.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "5";
});
button6.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "6";
});
button7.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "7";
});
button8.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "8";
});
button9.addEventListener('click', function (e) {
    sectionField.value = sectionField.value + "9";
});
buttonBackspace.addEventListener('click', function (e) {
    sectionField.value = sectionField.value.slice(0, -1);
});



