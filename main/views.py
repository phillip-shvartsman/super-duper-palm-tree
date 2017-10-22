# -*- coding: utf-8 -*-

from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.template import loader
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from boardprocessor import matrixBuilder
from boardprocessor import plotPrettyMatrix
from boardprocessor import layBoards
import json
import numpy
# Create your views here.

def index(request):
	context = {}
	return render(request,'main/index.html',context)
@csrf_exempt
def process(request):
	vertices = json.loads(request.POST['text']) #contains all the points .. access using data['0'] for first tuple .. data['0']['x'] for first
		#tuples x value .. sadly they must be index using strings :(
	#boardSize = json.loads(request.POST['boardsize'])
	size = 400
	unit = request.POST['unit']
	mainMatrix = matrixBuilder(size,vertices)
	plotPrettyMatrix(mainMatrix)
	layBoards(mainMatrix,boardSize,vertices)
	##To return to server##
	return JsonResponse({'foo':'Hello!',"numbBoard":6});