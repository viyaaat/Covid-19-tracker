let list = {};
let arr = [];
let tc = 0, tr = 0, td = 0;
function getinfo() {
    fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            let len = data['Countries'].length;
            for (let i = 0; i < len; i++) {
                let obj = { TotalConfirmed: '24', TotalDeaths: '54', TotalRecovered: '78' };
                let obj1 = { Country: 'india', TotalConfirmed: '24', TotalDeaths: '54', TotalRecovered: '78' };
                obj1.Country = data['Countries'][i]['Country'];
                obj1.TotalConfirmed = data['Countries'][i]['TotalConfirmed'];
                obj1.TotalDeaths = data['Countries'][i]['TotalDeaths'];
                obj1.TotalRecovered = data['Countries'][i]['TotalRecovered'];
                arr.push(obj1);
                let Country = data['Countries'][i]['Country'];
                obj.TotalConfirmed = data['Countries'][i]['TotalConfirmed'];
                obj.TotalDeaths = data['Countries'][i]['TotalDeaths'];
                obj.TotalRecovered = data['Countries'][i]['TotalRecovered'];
                list[Country] = obj;
                tc += obj1.TotalConfirmed;
                tr += obj1.TotalRecovered;
                td += obj1.TotalDeaths;
            }
            tr = tc - td;
            document.getElementById("b1").innerHTML = tc;
            document.getElementById("b2").innerHTML = tr;
            document.getElementById("b3").innerHTML = td;
            arr.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1);

        })
        .catch(error => console.error(error))
}
getinfo();
let mybox = document.getElementById("bx");
go("");
function go(cntry) {
    mybox.innerHTML = "";
    if (arr.length == 0) {
        mybox.innerHTML = "please wait a second and check your internet or refresh";
        setTimeout(() => {
            go("");
        }, 100);
    }
    else {
        mybox.style.backgroundColor = "Transparent";
        if (cntry == "") {
            for (let i = 0; i < arr.length; i++) {
                print(arr[i]);
            }
            //print(arr[0]);
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].Country.toLowerCase().indexOf(cntry) > -1) {
                    print(arr[i]);
                }
            }
        }
    }
}
function print(obj) {
    //console.log(obj);
    let lst = document.createElement('ul');
    lst.setAttribute("class", "inn");
    let cntry = document.createElement('li');
    cntry.innerHTML = obj.Country;
    cntry.setAttribute("class", "stree");
    let num1 = document.createElement('li');
    num1.setAttribute("class", "purush");
    num1.style.color = "blue";
    num1.innerHTML = obj.TotalConfirmed;
    let num2 = document.createElement('li');
    num2.setAttribute("class", "purush");
    num2.style.color = "darkgreen";
    num2.innerHTML = obj.TotalConfirmed - obj.TotalDeaths;
    let num3 = document.createElement('li');
    num3.setAttribute("class", "purush");
    num3.style.color = "red";
    num3.innerHTML = obj.TotalDeaths;
    lst.appendChild(cntry);
    lst.appendChild(num1);
    lst.appendChild(num2);
    lst.appendChild(num3);
    mybox.appendChild(lst);
}
const search = () => {
    let val = document.getElementById("ip1").value.toLowerCase();
    go(val);
}