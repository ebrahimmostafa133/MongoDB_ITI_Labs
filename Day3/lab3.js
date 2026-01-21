//Display employees fullname and department name for all employees 
db.employee.find().forEach(emp => {
    var dept = db.department.findOne({ department_id: emp.department_id });    
    print(emp.first_name + " " + emp.last_name + " | " + (dept ? dept.name : "No Dept"));
});
