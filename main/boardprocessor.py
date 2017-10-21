def matrixBuilder(size,vertices):
	matrix = [[0 for i in range(size)] for k in range(size)]
	#Set the points to one
	#Loop through the points that we were sent and set them to 1 in the matrix
	for i in range(len(vertices)):
		x = vertices[str(i)]['x']
		y = vertices[str(i)]['y']
		matrix[x][y] = 1;
	#Draw from point to point
	#Starting from the first point go to next point and draw a line of 1s
	for i in range(len(vertices)):
		#The last point is the same as the first point so skip
		if (i == (len(vertices)-1)):
			break
		x1 = vertices[str(i)]['x']
		y1 = vertices[str(i)]['y']
		x2 = vertices[str(i+1)]['x']
		y2 = vertices[str(i+1)]['y']
		#If they are on the same x axis
		if(x1==x2):
			if(y2 > y1):
				for j in range(y1,y2,1):
					matrix[x1][j]=1
			if(y1 > y2):
				for j in range(y2,y1,1):
					matrix[x1][j]=1
		#If they are the same y axis
		if(y1==y2):
			if(x2 > x1):
				for j in range(x1,x2,1):
					matrix[j][y1]=1
			if(x1 > x2):
				for j in range(x2,x1,1):
					matrix[j][y1]=1
	#Fill in openings
	fill = 0 #boolean value
	#Loop through the matrix
	for i in range(size):
		for j in range(size):
			#Executes code based on the fill variable 
			if(matrix[i][j]==0):
				if(fill==1):
					#If fill is true and the current point is 0
					matrix[i][j]=1
					continue
				elif(fill==0):
					#Just keep on keeping on
					continue
			if(matrix[i][j]==1):
				if(fill==1):
					#If you hit two 1's in a row just go to the next line
					fill=0
					break
				elif(fill==0):
					#If you hit a wall set the fill boolean to true: you will fill the next block
					fill=1
					continue
	return matrix
def plotPrettyMatrix(matrix):
	##Crazy code I got online#########################				
	s = [[str(e) for e in row] for row in matrix]
	lens = [max(map(len, col)) for col in zip(*s)]
	fmt = '\t'.join('{{:{}}}'.format(x) for x in lens)
	table = [fmt.format(*row) for row in s]
	print '\n'.join(table)
	##################################################
	return 0
def layBoards(matrix,boardSize):
	#Takes in matrix
	return 0