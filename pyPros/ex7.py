# string = "example"
# for l in string:
#     print(f"one letter: {l}")



# word = input("Please enter a word: ")
# word = str(word)
# rvs = word[::-1]
# print(rvs)
# if word == rvs:

#     #palindrome is word that can have meaning both in reverse and forward
#     print("This word is a palindrome")
# else:
#     print("This word is not a palindrome")
    
    # same thing using for loop
def reverse(word):
	x = ''
	for i in range(len(word)):
		x += word[len(word)-1-i]
		return x

word = input('give me a word:\n')
x = reverse(word)
if x == word:
	print('This is a Palindrome')
else:
	print('This is NOT a Palindrome')