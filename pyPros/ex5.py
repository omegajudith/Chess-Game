
# __author__ = 'jeffreyhunt'

num = int(input("Please enter a number to divide: "))

listRange = list(range(1,num+1))

divisorList = []

for number in listRange:
    if num % number == 0:
        divisorList.append(number)

print(divisorList)


# The program takes a number and generates all the divisors of the number.

# Problem Solution
# 1.	Take the value of the integer and store it in a variable.
# 2.	Use a for loop and if statement to generate the divisors of the integer.
# 3.	Print the divisors of the number.
# 4.	Exit.

# Program/Source Code
# Here is source code of the Python Program to generate all the divisors of an integer. The program output is also shown below.

 
# n=int(input("Enter an integer:"))
# print("The divisors of the number are:")
# for i in range(1,n+1):
#     if(n%i==0):
#         print(i)
# Program Explanation
# 1.	User must first enter the value and store it in a variable.
# 2.	Use a for loop to generate numbers from 1 to n.
# 3.	Using an if statement check if the number divided by i gives the remainder as 0 which is basically the divisor of the integer.
# 4.	Print the divisors of the number.

# Runtime Test Cases
 
# Case 1:
# Enter an integer:25
# The divisors of the number are:
# 1
# 5
# 25
 
# Case 2:
# Enter an integer:20
# The divisors of the number are:
# 1
# 2
# 4
# 5
# 10
# 20