// Academic Performance Form Source Code
// Behind the intuitive interface, all the calculations are being done here!

// SECTION 1: Check for correct data inserted to each field in the table.
// Making sure that only acceptable data is inserted.

function checkNumber(input, min, max, msg) {

    var str = input.value;
    for (var i = 0; i < str.length; i++) {
        var ch = str.substring(i, i + 1)
        if ((ch < "0" || "9" < ch) && ch != '.') {
           return false;
        }
    }
 
    var num = 0 + str
    if (num < min || max < num) {
        return false;
    }
    input.value = str;
    return true;
}

// SECTION 2: Defining the pointer values for each grades given by user.
// Changes of pointer values can be done if needed easily.

function calculateGradeNo(input) {

  var gradenum=input;
  var thegrade=input;
	if (thegrade=="A" || thegrade=="a") gradenum=4.00;
	if (thegrade=="A-" || thegrade=="a-") gradenum=3.67;
	if (thegrade=="B+" || thegrade=="b+") gradenum=3.33;  
	if (thegrade=="B" || thegrade=="b") gradenum=3.00;
	if (thegrade=="B-" || thegrade=="b-") gradenum=2.67;
	if (thegrade=="C+" || thegrade=="c+") gradenum=2.33;
	if (thegrade=="C" || thegrade=="c") gradenum=2.00;
	if (thegrade=="C-" || thegrade=="c-") gradenum=1.67;
	if (thegrade=="D+" || thegrade=="d+") gradenum=1.33;
	if (thegrade=="D" || thegrade=="d") gradenum=1.00;
	if (thegrade=="F" || thegrade=="f") gradenum=0.00;
  return gradenum;
}

// SECTION 3: Calculate the inputs given by user.
// Each data will be sent to the next section.

function calculateField(input,setNum)
{
	if (input.value != null && input.value.length != 0)
		input.value = "" + eval(input.value);
		calculateForm(input.form,setNum);
}
 
// SECTION 4: Calculate inputs before display them to defined fields.
// Fields involved: Grade Point and [Credit Hours] X [Grade Points]
// Grade Point and [Credit Hours] X [Grade Points] rounded off to two decimal places.
// Error output will be shown when invalid or incomplete data is inserted.
 
function calculateForm(form,setNum)
{
	var roundup = calculateGradeNo(form.elements["grade"+setNum].value);
	
	var	grads = form.elements["gradeplus"+setNum].value = roundup.toFixed(2);
	
	if ((form.elements["gradeplus"+setNum].value == null || form.elements["gradeplus"+setNum].length == 0))
    {
		return grads;
	}

    if ((form.elements["credithours"+setNum].value == null || form.elements["credithours"+setNum].length == 0))
    {
		return;
	}
	
	if (!checkNumber(form.elements["credithours"+setNum], 1, 1000)) 
	{
		form.elements["gradepoint"+setNum].value = "Error";
		return;
	}
 
	if ((form.elements["grade"+setNum].value == null || form.elements["grade"+setNum].value.length == 0))
	{
		return;
	}
	
	var roundupagain = ((calculateGradeNo(form.elements["grade"+setNum].value)) * form.elements["credithours"+setNum].value);
	
	var point = form.elements["gradepoint"+setNum].value = roundupagain.toFixed(2);
	
		{
		if (form.elements["gradepoint"+setNum].value=="NaN") 
			{
			return form.elements["gradepoint"+setNum].value = "Error";
			} 
			else 
			{
			return point;
			}
		}
	
}

// SECTION 5: Calculate GPA when correct inputs are given.
// Only active fields will be in white color while the others will be greyed out.
// GPA is rounded off to two decimal places for consistency.

function calculateGPA(form)
{
	// Process of adding all the credit hours.
	// The output will be rounded off to two decimal places.
	
	var totalCreditHours = 0;
	for (var i = 1; i < form.elements["fieldCount"].value; i++)
	{
		if (form.elements["credithours"+i].value.length > 0)
		{
		totalCreditHours = totalCreditHours + parseFloat(form.elements["credithours"+i].value);
		form.elements["number"+i].style.backgroundColor = "#FFFFFF";
		form.elements["grade"+i].style.backgroundColor = "#FFFFFF";
		form.elements["credithours"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradepoint"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradeplus"+i].style.backgroundColor = "#FFFFFF";
		} 
		else {form.elements["number"+i].style.backgroundColor = "#CCCCCC";
		form.elements["grade"+i].style.backgroundColor = "#CCCCCC";
		form.elements["credithours"+i].style.backgroundColor = "#CCCCCC";
		form.elements["gradepoint"+i].style.backgroundColor = "#CCCCCC";
		form.elements["name"+i].style.backgroundColor = "#CCCCCC";
		form.elements["code"+i].style.backgroundColor = "#CCCCCC";
		form.elements["gradeplus"+i].style.backgroundColor = "#CCCCCC";
		}
	}
	
	form.elements["totalCreditHours"].value = Math.round(totalCreditHours * 100)/100;
	
	// Process of adding all the grade points.
	
	var totalGradePoint = 0;
	for (var i = 1; i < form.elements["fieldCount"].value; i++)
	{
		if (form.elements["gradepoint"+i].value.length > 0) { 
		totalGradePoint = totalGradePoint + parseFloat(form.elements["gradepoint"+i].value);
		form.elements["number"+i].style.backgroundColor = "#FFFFFF";
		form.elements["grade"+i].style.backgroundColor = "#FFFFFF";
		form.elements["credithours"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradepoint"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradeplus"+i].style.backgroundColor = "#FFFFFF";
		}
		else {
		form.elements["number"+i].style.backgroundColor = "#CCCCCC";
		form.elements["grade"+i].style.backgroundColor = "#CCCCCC";
		form.elements["credithours"+i].style.backgroundColor = "#CCCCCC";
		form.elements["gradepoint"+i].style.backgroundColor = "#CCCCCC";
		form.elements["name"+i].style.backgroundColor = "#CCCCCC";
		form.elements["code"+i].style.backgroundColor = "#CCCCCC";
		form.elements["gradeplus"+i].style.backgroundColor = "#CCCCCC";
		}
	}
	
	// The final process of calculating GPA involving division.
	// Total of Grade Points divided by Total of Credit Hours and the output will
	// be rounded off to two decimal places.
	// Error will show when NotANumber value exists.
	
	var roundabout = Math.round(totalGradePoint / totalCreditHours * 100)/100;
	var cgpa = form.elements["gpa"].value = roundabout.toFixed(2);
		{
		if (form.elements["gpa"].value=="NaN") 
			{
			return form.elements["gpa"].value = "Error!", alert('Fill all the required (*) fields with valid data!');
			} 
			else 
			{
			return cgpa;
			}
		}
}

// The reset button will clear all data inserted by user.
// It will also reset all fields back to white color.

function resetForm(form,switcher)
{
	for (var i = 1; i < form.elements["fieldCount"].value; i++)
	{
		if (switcher == "1") 
		{
		form.elements["number"+i].style.backgroundColor = "#FFFFFF";
		form.elements["grade"+i].style.backgroundColor = "#FFFFFF"; 
		form.elements["name"+i].style.backgroundColor = "#FFFFFF";
		form.elements["code"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradeplus"+i].style.backgroundColor = "#FFFFFF";
		}
		form.elements["credithours"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradepoint"+i].style.backgroundColor = "#FFFFFF";
		form.elements["name"+i].style.backgroundColor = "#FFFFFF";
		form.elements["code"+i].style.backgroundColor = "#FFFFFF";
		form.elements["gradeplus"+i].style.backgroundColor = "#FFFFFF";
	}
}

// Thank you for your time.
// End of File