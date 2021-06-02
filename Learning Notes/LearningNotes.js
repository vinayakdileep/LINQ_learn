//!  Headings
//* Sub Headings
//? Main Headings
//TODO Important notes



//! LINQ -- Language Integrated Query

//?LINQ enables us to query any type of data store (SQL Server, XML documents, Objects in memory etc).

// LINQ provider is a component between the LINQ query and the actual data source, 
// which converts the LINQ query into a format that the underlying data source can understand. 
// For example LINQ to SQL provider converts a LINQ query to T-SQL that SQL Server database can understand.

//?To write LINQ queries we use the LINQ Standard Query Operators. The following are a few Examples of Standard Query Operators
//* select
//* from
//* where 
//* orderby 
//* join
//* groupby

//? There are 2 ways to write LINQ queries using these Standard Query Operators
//* 1. Using Lambda Expressions.

//* 2. Using SQL like query expressions

//? LINQ query using Lambda Expressions.
// IEnumerable<Student> students = Student.GetAllStudents()
//     .Where(student => student.Gender == "Male");

//? LINQ query using using SQL like query expressions
// IEnumerable<Student> students = from student in Student.GetAllStudents()
//                                                            where student.Gender == "Male"
//                                                            select student;

//! Extension Methods

// Extension methods enable you to "add" methods to existing types without creating a new derived type, 
// recompiling, or otherwise modifying the original type.
// Extension methods are a special kind of static method, 
// but they are called as if they were instance methods on the extended type. 

//? string strName= "pragim";
//? string result = strName.ChangeFirstLetterCase();

//here ChangeFirstLetterCase() is  called extension method.

//? To convert ChangeFirstLetterCase() method to an extension method, make the following 2 changes
//* 1. Make StringHelper static class
//* 2. The type the method extends should be passed as a first parameter with this keyword preceeding it.

// This means we should also be able to call LINQ extension methods (select, where etc), 
// using wrapper class style syntax

//! LINQ Standard Query Operators 

// public static void Main()
//         {
//             int[] Numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

//             int smallestNumber = Numbers.Min();
//             int smallestEvenNumber = Numbers.Where(n => n % 2 == 0).Min();

//             int largestNumber = Numbers.Max();
//             int largestEvenNumber = Numbers.Where(n => n % 2 == 0).Max();

//             int sumOfAllNumbers = Numbers.Sum();
//             int sumOfAllEvenNumbers = Numbers.Where(n => n % 2 == 0).Sum();

//             int countOfAllNumbers = Numbers.Count();
//             int countOfAllEvenNumbers = Numbers.Where(n => n % 2 == 0).Count();

//             double averageOfAllNumbers = Numbers.Average();
//             double averageOfAllEvenNumbers = Numbers.Where(n => n % 2 == 0).Average();

 //            string[] countries = { "India", "USA", "UK" };

//             int minCount = countries.Min(x => x.Length);
//             int maxCount = countries.Max(x => x.Length);
//         }

//!     LINQ Aggregate function

// for combing the array in to comma separated string
// class Program
//     {
//         static void Main()
//         {
//             string[] countries = { "India", "US", "UK", "Canada", "Australia" };

//             string result = countries.Aggregate((a, b) => a + ", " + b);

//             Console.WriteLine(result);
//         }
//     }

//!  Restriction Operators in LINQ

//?  The WHERE standard query operator belong to Restriction Operators category in LINQ.

// What is a Predicate?
// A predicate is a function to test each element for a condition

// In the following example, the Lambda expression (num => num % 2 == 0) runs for each element in List<int>. 
// If the number is divisible by 2, then a boolean value true is returned otherwise false.

// static void Main()
//         {
//             List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
//             IEnumerable<int> evenNumbers = numbers.Where(num => num % 2 == 0);

//             foreach (int evenNumber in evenNumbers)
//             {
//                 Console.WriteLine(evenNumber);
//             }
//         }

// Using SQL like syntax
// IEnumerable<int> evenNumbers = from num in numbers
//                                where num % 2 == 0
//                                select num;

//?The following program prints the index position of all the even numbers

// List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// IEnumerable<int> evenNumberIndexPositions = numbers
//     .Select((num, index) => new { Number = num, Index = index })
//     .Where(x => x.Number % 2 == 0)
//     .Select(x => x.Index);

//!     Projection Operators

//? Select
//? SelectMany

//* LINQ SELECT standard query operator allows us to specify what properties we want to retrieve. 
//* It also allows us to perform calculations.

//* The following are the properties of the Employee class.
//* EmployeeID
//* FirstName
//* LastName
//* AnnualSalay
//* Gender

//* Now using the SELECT projection operator
//* 1. We can select just EmployeeID property OR
//* 2. We can select multiple properties (FirstName & Gender) into an anonymous type OR
//* 3. Perform calculations 
//*     a) MonthlySalary = AnnualSalay/12
//*    b) FullName = FirstName + " " + LastName

// Example 1: Retrieves just the EmployeeID property of all employees
// IEnumerable<int> employeeIds = Employee.GetAllEmployees()
//     .Select(emp => emp.EmployeeID);
// foreach (int id in employeeIds)
// {
//     Console.WriteLine(id);
// }

// Example 2: Projects FirstName & Gender properties of all employees into anonymous type.
// var result = Employee.GetAllEmployees().Select(emp => new
//                     {
//                         FirstName = emp.FirstName,
//                         Gender = emp.Gender
//                     });
// foreach (var v in result)
// {
//     Console.WriteLine(v.FirstName + " - " + v.Gender);
// }

// Example 3: Computes FullName and MonthlySalay of all employees and projects these 2 new computed properties into anonymous type.
// var result = Employee.GetAllEmployees().Select(emp => new
// {
//     FullName = emp.FirstName + " " + emp.LastName,
//     MonthlySalary = emp.AnnualSalary / 12
// });

// foreach (var v in result)
// {
//     Console.WriteLine(v.FullName + " - " + v.MonthlySalary);
// }

// Example 4: Give 10% bonus to all employees whose annual salary is greater than 50000
//  and project all such employee's FirstName, AnnualSalay and Bonus into anonymous type.

// var result = Employee.GetAllEmployees()
//                 .Where(emp => emp.AnnualSalary > 50000)
//                 .Select(emp => new
//                  {
//                     Name = emp.FirstName,
//                     Salary = emp.AnnualSalary,
//                     Bonus = emp.AnnualSalary * .1
//                  });

// foreach (var v in result)
// {
//     Console.WriteLine(v.Name + " : " + v.Salary + " - " + v.Bonus);
// }
//! SelectMany Operator
//? SelectMany Operator belong to Projection Operators category. 
//? It is used to project each element of a sequence to an IEnumerable<T> and flattens the resulting sequences into one sequence.

//public class Student
// {
//     public string Name { get; set; }
//     public string Gender { get; set; }
//     public List<string> Subjects { get; set; }
// }
//? Example 1: Projects all subject strings of a given a student to an IEnumerable<string>. 
// In this example since we have 4 students, there will be 4 IEnumerable<string> sequences, 
// which are then flattened to form a single sequence i.e a single IEnumerable<string> sequence.


//* IEnumerable<string> allSubjects = Student.GetAllStudetns().SelectMany(s => s.Subjects);
// foreach (string subject in allSubjects)
// {
//     Console.WriteLine(subject);
// }

//? Example 2: Selects only the distinct subjects
//* IEnumerable<string> allSubjects = Student.GetAllStudetns().SelectMany(s => s.Subjects).Distinct();
// foreach (string subject in allSubjects)
// {
//     Console.WriteLine(subject);
// }

//? Example 3: Selects student name along with all the subjects
//* var result = Student.GetAllStudetns().SelectMany(s => s.Subjects, (student, subject) =>
//*     new { StudentName = student.Name, Subject = subject });

//!      Ordering Operators

//? OrderBy
//? OrderByDescending
//? ThenBy
//? ThenByDescending
//? Reverse

//* OrderBy, OrderByDescending, ThenBy, and ThenByDescending can be used to sort data. 
//* Reverse method simply reverses the items in a given collection.

//* IEnumerable<Student> result = Student.GetAllStudents().OrderBy(s => s.Name);

//* IEnumerable<Student> result = Student.GetAllStudents().OrderByDescending(s => s.Name);

//? OrderBy or OrderByDescending work fine when we want to sort a collection just by one value or expression. 

//? If want to sort by more than one value or expression, that's when we use ThenBy or 
//? ThenByDescending along with OrderBy or OrderByDescending.

 //? OrderBy or OrderByDescending performs the primary sort. ThenBy or ThenByDescending is used for adding secondary sort. 
//? Secondary Sort operators (ThenBy or ThenByDescending ) can be used more than once in the same LINQ query.

//* IEnumerable<Student> result = Student.GetAllStudetns()
//*     .OrderBy(s => s.TotalMarks).ThenBy(s => s.Name).ThenBy(s => s.StudentID);

//* IEnumerable<Student> result = students.Reverse();

//! implementing paging using Skip and Take 

//? The following console application use Skip() and Take() operators to achieve this.
// using System;
// using System.Collections.Generic;
// using System.Linq;

// namespace Demo
// {
//     class Program
//     {
//         public static void Main()
//         {
//             IEnumerable<Student> students = Student.GetAllStudetns();

//             do
//             {
//                 Console.WriteLine("Please enter Page Number - 1,2,3 or 4");
//                 int pageNumber = 0;

//                 if (int.TryParse(Console.ReadLine(), out pageNumber))
//                 {
//                     if (pageNumber >= 1 && pageNumber <= 4)
//                     {
//                         int pageSize = 3;
// *                        IEnumerable<Student> result = students
// *                                                     .Skip((pageNumber - 1) * pageSize).Take(pageSize);

//                         Console.WriteLine();
//                         Console.WriteLine("Displaying Page " + pageNumber);
//                         foreach (Student student in result)
//                         {
//                             Console.WriteLine(student.StudentID + "\t" + 
//                                                                         student.Name + "\t" + student.TotalMarks);
//                         }
//                         Console.WriteLine();
//                     }
//                     else
//                     {
//                         Console.WriteLine("Page number must be an integer between 1 and 4");
//                     }
//                 }
//                 else
//                 {
//                     Console.WriteLine("Page number must be an integer between 1 and 4");
//                 }
//             } while (1 == 1);
//         }
//     }
// }


//! LINQ operators can be broadly classified into 2 categories based on the behaviour of query execution
//? 1. Deferred or Lazy Operators -  These query operators use deferred execution.
//? Examples - select, where, Take, Skip etc
//? 2. Immediate or Greedy Operators - These query operators use immediate execution. 
//? Examples - count, average, min, max, ToList etc

//? LINQ Deferred Execution Example 1
// namespace Demo
// {
//     public class Student
//     {
//         public int StudentID { get; set; }
//         public string Name { get; set; }
//         public int TotalMarks { get; set; }
//     }

//     class Program
//     {
//         public static void Main()
//         {
//             List<Student> listStudents = new List<Student>
//             {
//                 new Student { StudentID= 101, Name = "Tom", TotalMarks = 800 },
//                 new Student { StudentID= 102, Name = "Mary", TotalMarks = 900 },

 
//                 new Student { StudentID= 103, Name = "Pam", TotalMarks = 800 }
//             };

//*             // LINQ Query is only defined here and is not executed at this point
//*             // If the query is executed at this point, the result should not display Tim
//             IEnumerable<Student> result = from student in listStudents
//                                           where student.TotalMarks == 800
//                                           select student;

//*             // Add a new student object with TotalMarks = 800 to the source
//             listStudents.Add(new Student { StudentID = 104, Name = "Tim", TotalMarks = 800 });

// *            // The above query is actually executed when we iterate thru the sequence
// *            // using the foreach loop. This is proved as Tim is also included in the result
//             foreach (Student s in result)
//             {
//                 Console.WriteLine(s.StudentID + "\t" + s.Name + "\t" + s.TotalMarks);
//             }
//         }
//     }
// }

//? LINQ Immediate Execution Example 1 
// using System;
// using System.Collections.Generic;
// using System.Linq;

// namespace Demo
// {
//     public class Student
//     {
//         public int StudentID { get; set; }
//         public string Name { get; set; }
//         public int TotalMarks { get; set; }
//     }

//     class Program
//     {
//         public static void Main()
//         {
//             List<Student> listStudents = new List<Student>
//             {
//                 new Student { StudentID= 101, Name = "Tom", TotalMarks = 800 },
//                 new Student { StudentID= 102, Name = "Mary", TotalMarks = 900 },

 
//                 new Student { StudentID= 103, Name = "Pam", TotalMarks = 800 }
//             };

//*             // Since we are using ToList() which is a greedy operator
//*             // the LINQ Query is executed immediately at this point
//             IEnumerable<Student> result = (from student in listStudents
//                                            where student.TotalMarks == 800
//*                                            select student).ToList();    // ToList() will make this to execute here itself

//*             // Adding a new student object with TotalMarks = 800 to the source
//*             // will have no effect on the result as the query is already executed
//             listStudents.Add(new Student { StudentID = 104, Name = "Tim", TotalMarks = 800 });

// *            // The above query is executed at the point where it is defined.
//*             // This is proved as Tim is not included in the result
//             foreach (Student s in result)
//             {
//                 Console.WriteLine(s.StudentID + "\t" + s.Name + "\t" + s.TotalMarks);
//             }
//         }
//     }
// }


//!   Conversion Operators

//? ToList
//? ToArray
//? ToDictionary
//? ToLookup
//? Cast
//? OfType
//? AsEnumerable 
//? AsQueryable


//? ToList

//* ToList operator extracts all of the items from the source sequence and returns a new List<T>.
//* This operator causes the query to be executed immediately. This operator does not use deferred execution.

// public static void Main()
//         {
//             int[] numbers = { 1, 2, 3, 4, 5 };

//             List<int> result = numbers.ToList();

//             foreach (int i in result)
//             {
//                 Console.WriteLine(i);
//             }
//         }


//? ToArray

//* ToArray operator extracts all of the items from the source sequence and returns a new Array. 
//* This operator causes the query to be executed immediately. This operator does not use deferred execution.


// public static void Main()
// {
//     List<string> countries = new List<string> { "US", "India", "UK", "Australia", "Canada" };

//     string[] result = (from country in countries
//                        orderby country ascending
//                        select country).ToArray();

//     foreach (string str in result)
//     {
//         Console.WriteLine(str);
//     }
// }

//? ToDictionary

//* ToDictionary operator extracts all of the items from the source sequence and returns a new Dictionary. 
//* This operator causes the query to be executed immediately. This operator does not use deferred execution.

//* Example 3 : Convert List<Student> to a Dictionary. StudentID should be the key and Name should be the value. 
//* In this example, we are using the overloaded of ToDictionary() that takes 2 parameters 
//* a) keySelector - A function to extract a key from each element
//* b) elementSelector - A function to produce a result element from each element in the sequence

// namespace Demo
// {
//     public class Student
//     {
//         public int StudentID { get; set; }
//         public string Name { get; set; }
//         public int TotalMarks { get; set; }
//     }

//     class Program
//     {
//         public static void Main()
//         {
//             List<Student> listStudents = new List<Student>
//             {
//                 new Student { StudentID= 101, Name = "Tom", TotalMarks = 800 },
//                 new Student { StudentID= 102, Name = "Mary", TotalMarks = 900 },
//                 new Student { StudentID= 103, Name = "Pam", TotalMarks = 800 }
//             };

//*             Dictionary<int, string> result = listStudents.ToDictionary(x => x.StudentID, x => x.Name); 
                    //* here studenID will be the Key and Name will become value

//             foreach (KeyValuePair<int, string> kvp in result)
//             {
//                 Console.WriteLine(kvp.Key + " " + kvp.Value);
//             }
//         }
//     }
// }

//* Example 4 : Convert List<Student> to a Dictionary. 
//* StudentID should be the key and Student object should be the value. 
//* In this example, we are using the overloaded of ToDictionary() that takes 1 parameter
//* a) keySelector - A function to extract a key from each element

// namespace Demo
// {
//     public class Student
//     {
//         public int StudentID { get; set; }
//         public string Name { get; set; }
//         public int TotalMarks { get; set; }
//     }

//     class Program
//     {
//         public static void Main()
//         {
//             List<Student> listStudents = new List<Student>
//             {
//                 new Student { StudentID= 101, Name = "Tom", TotalMarks = 800 },
//                 new Student { StudentID= 102, Name = "Mary", TotalMarks = 900 },

 
//                 new Student { StudentID= 103, Name = "Pam", TotalMarks = 800 }
//             };

// *            Dictionary<int, Student> result = listStudents.ToDictionary(x => x.StudentID);  
                //* here studentID will be the key and Student class object will be the value

//             foreach (KeyValuePair<int, Student> kvp in result)
//             {
//                 Console.WriteLine(kvp.Key + "\t" + kvp.Value.Name + "\t" + kvp.Value.TotalMarks);
//             }
//         }
//     }
// }

//* Keys in the dictionary must be unique. If two identical keys are created by the keySelector function it will throw exception

//? Lookup

//* ToLookup creates a Lookup. Just like a dictionary, a Lookup is a collection of key/value pairs. 
//* A dictionary cannot contain keys with identical values, where as a Lookup can.

//* Example 5: Create 2 Lookups. First lookup should group Employees by JobTitle, and second lookup should group Employees by City.
// using System;
// using System.Collections.Generic;
// using System.Linq;

// namespace Demo
// {
//     public class Employee
//     {
//         public string Name { get; set; }
//         public string JobTitle { get; set; }
//         public string City { get; set; }
//     }

//     class Program
//     {
//         public static void Main()
//         {
//             List<Employee> listEmployees = new List<Employee>
//             {
//                 new Employee() { Name = "Ben", JobTitle = "Developer", City = "London" },
//                 new Employee() { Name = "John", JobTitle = "Sr. Developer", City = "Bangalore" },

 
//                 new Employee() { Name = "Steve", JobTitle = "Developer", City = "Bangalore" },
//                 new Employee() { Name = "Stuart", JobTitle = "Sr. Developer", City = "London" },
//                 new Employee() { Name = "Sara", JobTitle = "Developer", City = "London" },
//                 new Employee() { Name = "Pam", JobTitle = "Developer", City = "London" }
//             };

//*             // Group employees by JobTitle
//*             var employeesByJobTitle = listEmployees.ToLookup(x => x.JobTitle);

//             Console.WriteLine("Employees Grouped By JobTitle");
//             foreach (var kvp in employeesByJobTitle)
//             {
//                 Console.WriteLine(kvp.Key);
//*                 // Lookup employees by JobTitle
//*                 foreach (var item in employeesByJobTitle[kvp.Key])
//                 {
//                     Console.WriteLine("\t" + item.Name + "\t" + item.JobTitle + "\t" + item.City);
//                 }
//             }

//             Console.WriteLine(); Console.WriteLine();

//*             // Group employees by City
//             var employeesByCity = listEmployees.ToLookup(x => x.City);

//             Console.WriteLine("Employees Grouped By City");
//             foreach (var kvp in employeesByCity)
//             {
//                 Console.WriteLine(kvp.Key);
//*                 // Lookup employees by City
//                 foreach (var item in employeesByCity[kvp.Key])
//                 {
//                     Console.WriteLine("\t" + item.Name + "\t" + item.JobTitle + "\t" + item.City);
//                 }
//             }
//         }
//     }
// }

//? Cast operator


//* Cast operator attempts to convert all of the items within an existing collection to another type and return them in a new collection. 
//* If an item fails conversion an exception will be thrown. This method uses deferred execution.

// public static void Main()
//         {
//             ArrayList list = new ArrayList();
//             list.Add(1);
//             list.Add(2);
//             list.Add(3);

// *            // The following item causes an exception
//*            // list.Add("ABC");

//             IEnumerable<int> result = list.Cast<int>();

//             foreach (int i in result)
//             {
//                 Console.WriteLine(i);
//             }
//         }

//? OfType

// OfType operator will return only elements of the specified type. 
// The other type elements are simply ignored and excluded from the result set.

// public static void Main()
// {
//     ArrayList list = new ArrayList();
//     list.Add(1);
//     list.Add(2);
//     list.Add(3);
//     list.Add("4");
//     list.Add("ABC");

// *    IEnumerable<int> result = list.OfType<int>(); 
        //* OfType will return elements of the specified type only other types are ignored

//     foreach (int i in result)
//     {
//         Console.WriteLine(i);
//     }
// }

//? AsEnumerable

//Difference  FROM
//* var result = dbContext.Employees.Where(x => x.Gender == "Male").OrderByDescending(x => x.Salary).Take(5);

// TO 
//* var result = dbContext.Employees.AsEnumerable()
//*                                                .Where(x => x.Gender == "Male")
//*                                                .OrderByDescending(x => x.Salary).Take(5);

// AsEnumerable operator breaks the query into 2 parts
// 1. The "inside part" that is the query before AsEnumerable operator is executed as Linq-to-SQL
// 2. The "ouside part" that is the query after AsEnumerable operator is executed as Linq-to-Objects

//* So in this example the following SQL Query is executed against SQL Server, all the data is brought into the console application 
//* and then the WHERE, ORDERBY & TOP operators are applied on the client-side
//* AsEnumerable operator is used to move query processing to the client side.

//* The main use of AsQueryable operator is unit testing to mock a queryable data source using an in-memory data source.
