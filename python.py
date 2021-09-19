# 미션을 편하게 입력하기 위해 사용하는 코드
# 1. 2. 3. ...으로 되어있는 미션리스트를 ','단위로 쪼개서 정리해줌
arr = []
d = 'a'
while d != 'end':
    d = input()
    if(d[2] == ' '):
        arr.append(d[3:])
    else:
        arr.append(d[4:])
for i in arr:
	if(i == arr[len(arr) - 1] or i == arr[len(arr) - 2]):
		print(i, end='')
	else:
		print(i, end=',')