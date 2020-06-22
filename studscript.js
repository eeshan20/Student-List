var student=[];
var studid=1;
document.getElementById("body").style.backgroundColor="85DD9B";
var newstudent= document.getElementById("newstudent");
var adddetails=document.getElementById("adddetails");
var displaydetails= document.getElementById("displaydetails");

newstudent.addEventListener("click",function(event)
{
  createnewstudent(0,getIndex(parseInt(studid)));
}
);

var arr= JSON.parse(localStorage.getItem("1"));
for(var i=0;i<arr.length;i++)
{
student.push(arr[i]);
studid=arr[i].Id+1;
addDetailsToDOM(arr[i],i);
}


function addDetailsToArr()
{ var studobj= new Object();
studobj.Id=studid;
studobj.Rollno=document.getElementById("rollno").value;
studobj.Name=document.getElementById("name").value;
student.push(studobj);

var str= JSON.stringify(student);
localStorage.setItem("1",str);

addDetailsToDOM(studobj,student.length-1);
deleteNewStudent();
studid++;
displaydetails.setAttribute("style","visibility:visible");
}

function addDetailsToDOM(studobj,i)
{ 
   var divdetails= document.createElement("div");
divdetails.setAttribute("id",student[i].Id);

var divrollno= document.createElement("label");
divrollno.setAttribute("id","divrollno");
divrollno.innerHTML= studobj.Rollno;
divrollno.style.color="Red";
divdetails.appendChild(divrollno);

insertBlankLine(divdetails);

var divname=document.createElement("label");
divname.setAttribute("id","divname");
divname.innerHTML=studobj.Name;
divname.style.color="Red";
divdetails.appendChild(divname);

insertBlankLine(divdetails);

var divdelete=document.createElement("a");
divdelete.innerHTML="Delete";
divdelete.setAttribute("href","#");
divdetails.appendChild(divdelete);

divdelete.addEventListener("click",function(event)
{
 var index=getIndex(parseInt(event.target.parentNode.id));
removefromarr(index);
event.target.parentNode.parentNode.removeChild(event.target.parentNode);
str= JSON.stringify(student);
localStorage.setItem("1",str);
});

insertBlankLine(divdetails);

 var divedit= document.createElement("a");
divedit.innerHTML="Edit";
divedit.setAttribute("href","#");
divdetails.appendChild(divedit);

divedit.addEventListener("click",function(event)
{
displaydetails.setAttribute("style","visibility:hidden");
var index=getIndex(parseInt(event.target.parentNode.id));
createnewstudent(1,index);
});


displaydetails.appendChild(divdetails);

insertBlankLine(displaydetails);
insertBlankLine(displaydetails);

unhidenewstudent();
}
function editfunc(index)
{
student[index].Rollno= document.getElementById("rollno").value;
student[index].Name= document.getElementById("name").value;
str= JSON.stringify(student);
localStorage.setItem("1",str);
var childnodes= displaydetails.childNodes;
for(var i=0;childnodes.length>0;)
{
displaydetails.removeChild(childnodes[i]);
}
for(var i=0;i<student.length;i++)
{
  addDetailsToDOM(student[i],i);
}
deleteNewStudent();
displaydetails.setAttribute("style","visibility:visible");
}
function deleteNewStudent()
{
var childnodes= adddetails.childNodes;
for(var i=0;childnodes.length>0;)
{
adddetails.removeChild(childnodes[i]);
}
}
function getIndex(id)
{
for(var i=0;i<student.length;i++)
{
if(student[i].Id==id)
return i;
}

}
function removefromarr(index)
{
student.splice(index,1);
console.log(student);
}
function hidenewstudent()
{
newstudent.setAttribute("style","visibility:hidden");
}

function unhidenewstudent()
{
newstudent.setAttribute("style","visibility:visible");
}

function insertBlankLine(element)
{
var br= document.createElement("br");
element.appendChild(br);
}

function createnewstudent(x,index)
{
  hidenewstudent();
  displaydetails.setAttribute("style","visibility:hidden");
  
var rollno= document.createElement("input");
rollno.setAttribute("type","number"); 
rollno.setAttribute("id","rollno");
rollno.setAttribute("placeholder","Enter Roll No.");
adddetails.appendChild(rollno);


insertBlankLine(adddetails);
insertBlankLine(adddetails);

var name= document.createElement("input"); 
name.setAttribute("type","text"); 
name.setAttribute("id","name");
name.setAttribute("placeholder","Enter Full Name");
adddetails.appendChild(name);

insertBlankLine(adddetails);
insertBlankLine(adddetails);
if(x==0)
{
var butt= document.createElement("button");
butt.setAttribute("id","butt");
butt.innerHTML="Add Student Details";
adddetails.appendChild(butt);

butt.addEventListener("click",function(event){
        addDetailsToArr();
});
}

else
{
var editt= document.createElement("button");
editt.setAttribute("id","editt");
editt.innerHTML="Edit";
adddetails.appendChild(editt);
editt.addEventListener("click",function(event){
        editfunc(index);
});
rollno.value=student[index].Rollno;
name.value=student[index].Name;

}

}






