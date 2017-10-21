# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
# Create your views here.

def index(request):
	context = {}
	return render(request,'main/index.html',context)
@csrf_exempt
def process(request):
	vertices = json.loads(request.POST['text']) #contains all the points .. access using data['0'] for first tuple .. data['0']['x'] for first
		#tuples x value .. sadly they must be index using strings :(
	boardsize = json.loads(request.POST['boardsize'])
	boardsize = []
	unit = request.POST['unit']
	matrix = [[0 for i in range(25)] for k in range(25)]
	#Set the points to one
	for i in range(len(vertices)):
		x = vertices[str(i)]['x']
		y = vertices[str(i)]['y']
		matrix[x][y] = 1;
	#Draw from point to point
	for i in range(len(vertices)):
		if (i == (len(vertices)-1)):
			break
		x1 = vertices[str(i)]['x']
		y1 = vertices[str(i)]['y']
		x2 = vertices[str(i+1)]['x']
		y2 = vertices[str(i+1)]['y']
		if(x1==x2):
			if(y2 > y1):
				for j in range(y1,y2,1):
					matrix[x1][j]=1
			if(y1 > y2):
				for j in range(y2,y1,1):
					matrix[x1][j]=1
		if(y1==y2):
			if(x2 > x1):
				for j in range(x1,x2,1):
					matrix[j][y1]=1
			if(x1 > x2):
				for j in range(x2,x1,1):
					matrix[j][y1]=1
	#Fill in openings
	fill = 0
	for i in range(25):
		for j in range(25):	
			if(matrix[i][j]==0):
				if(fill==1):
					matrix[i][j]=1
					continue
				elif(fill==0):
					continue
			if(matrix[i][j]==1):
				if(fill==1):
					fill=0
					break
				elif(fill==0):
					fill=1
					continue
	s = [[str(e) for e in row] for row in matrix]
	lens = [max(map(len, col)) for col in zip(*s)]
	fmt = '\t'.join('{{:{}}}'.format(x) for x in lens)
	table = [fmt.format(*row) for row in s]
	print '\n'.join(table)
	#return render(request,'main/index.html',context)
	return JsonResponse({'foo':'Hello!'});